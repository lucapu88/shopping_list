/* eslint-env node */
/* eslint-disable no-inner-declarations */
// Verifica la build nel browser senza usare credenziali, effettuare pagamenti o chiamare API reali.
// Eseguire prima npm run build; servono Node 22+ e Chrome o Edge installato.
const assert = require('node:assert/strict');
const http = require('node:http');
const { spawn } = require('node:child_process');
const { existsSync, mkdtempSync, readFileSync, statSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const root = path.resolve(__dirname, '../dist');
const browserPath = process.env.PWA_BROWSER || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync);
assert(browserPath, 'Set PWA_BROWSER to a Chromium browser executable');
assert(existsSync(path.join(root, 'sw.js')), 'Run npm run build first');
const profile = mkdtempSync(path.join(tmpdir(), 'shopping-list-pwa-'));
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon' };
const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const file = path.resolve(root, `.${url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname)}`);
  if (!file.startsWith(root + path.sep) || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  response.end(readFileSync(file));
});

(async () => {
  let browser;
  let socket;
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    browser = spawn(browserPath, ['--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-background-networking', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
    const portFile = path.join(profile, 'DevToolsActivePort');
    for (let i = 0; i < 100 && !existsSync(portFile); i++) await delay(100);
    assert(existsSync(portFile), 'Browser did not start');
    const port = readFileSync(portFile, 'utf8').split('\n')[0];
    const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
    socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
    let nextId = 0;
    const pending = new Map();
    const exceptions = [];
    let externalRequests = 0;
    socket.onmessage = ({ data }) => {
      const event = JSON.parse(data);
      if (event.id) {
        const task = pending.get(event.id);
        if (!task) return;
        pending.delete(event.id);
        clearTimeout(task.timer);
        event.error ? task.reject(new Error(event.error.message)) : task.resolve(event.result);
      } else if (event.method === 'Runtime.exceptionThrown') {
        exceptions.push(event.params.exceptionDetails.exception?.description || event.params.exceptionDetails.text);
      } else if (event.method === 'Fetch.requestPaused') {
        externalRequests++;
        command('Fetch.failRequest', { requestId: event.params.requestId, errorReason: 'InternetDisconnected' }).catch(() => {});
      }
    };
    function command(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++nextId;
        const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timed out: ${method}`)); }, 20000);
        pending.set(id, { resolve, reject, timer });
        socket.send(JSON.stringify({ id, method, params }));
      });
    }
    async function evaluate(expression) {
      const result = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
      assert(!result.exceptionDetails, result.exceptionDetails?.exception?.description || 'Browser evaluation failed');
      return result.result.value;
    }
    async function waitFor(expression, label) {
      for (let i = 0; i < 100; i++) {
        if (await evaluate(expression)) return;
        await delay(100);
      }
      const diagnostics = await evaluate(`({ input: !!document.querySelector('.inputText'), recipeDisabled: document.querySelector('.recipe-generator button')?.disabled, text: document.body.innerText.slice(0, 200) })`);
      throw new Error(`Not ready: ${label}; ${JSON.stringify(diagnostics)}; ${JSON.stringify(exceptions)}`);
    }
    async function click(selector) {
      await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
      await delay(100);
    }
    async function addItem(name) {
      await evaluate(`(() => { const input = document.querySelector('.inputText'); input.value = ${JSON.stringify(name)}; input.dispatchEvent(new Event('input', { bubbles: true })); })()`);
      await delay(50);
      await click('.input-btns-container > .btn-info');
      await waitFor(`document.querySelector('#todo-list')?.textContent.includes(${JSON.stringify(name)})`, 'saved item');
    }
    async function offline(enabled) {
      await command('Network.emulateNetworkConditions', { offline: enabled, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
      await waitFor(`navigator.onLine === ${!enabled}`, 'network state');
    }
    await command('Page.enable');
    await command('Runtime.enable');
    await command('Network.enable');
    await command('Network.setCacheDisabled', { cacheDisabled: true });
    // Blocca le richieste esterne per evitare che la verifica contatti i servizi di produzione.
    await command('Fetch.enable', { patterns: [{ urlPattern: 'https://*', requestStage: 'Request' }] });
    await command('Page.addScriptToEvaluateOnNewDocument', { source: `if (window === window.top && location.origin === ${JSON.stringify(origin)} && !localStorage.getItem('pwa-test-seeded')) { localStorage.setItem('pwa-test-seeded', 'true'); localStorage.setItem('newMarkAndCopyMode2', 'true'); localStorage.setItem('canShowCategoriesModal', 'false'); localStorage.setItem('langIta', 'true'); localStorage.setItem('lightTheme', 'true'); localStorage.setItem('todos', '[]'); }` });
    await command('Page.navigate', { url: origin });
    await waitFor(`!!document.querySelector('.inputText')`, 'initial app');
    await evaluate('navigator.serviceWorker.ready.then(() => true)');
    await waitFor('!!navigator.serviceWorker.controller', 'service worker control');
    await addItem('Pane online');
    await waitFor(`!document.querySelector('.recipe-generator button').disabled`, 'online recipe button');
    console.log('PASS production shell installed; list saved online');

    // Simula la perdita di rete dopo l'apertura del login, prima del tentativo di accesso.
    await click('.recipe-generator button');
    await waitFor(`!!document.querySelector('.login-btn')`, 'payment modal');
    await click('.login-btn');
    await waitFor(`!!document.querySelector('.btn-google')`, 'login modal');
    await offline(true);
    await click('.btn-google');
    await waitFor(`document.querySelector('[role="alert"]')?.textContent.includes('Connessione internet assente')`, 'offline login notice');
    console.log('PASS login blocked after losing connection');

    await command('Network.clearBrowserCache');
    await command('Page.reload', { ignoreCache: true });
    await waitFor(`document.querySelector('#todo-list')?.textContent.includes('Pane online')`, 'offline reload');
    await addItem('Latte offline');
    console.log('PASS offline cold reload; persisted and new list items');
    await click('.feedback-icon');
    await waitFor(`document.querySelector('[role="alert"]')?.textContent.includes('Connessione internet assente')`, 'offline feedback notice');
    assert.equal(await evaluate(`!!document.querySelector('.close-feedback-modal')`), false);
    await click('.connection-notice button');
    await waitFor(`!document.querySelector('.recipe-generator button').disabled`, 'recipe button');
    await click('.recipe-generator button');
    await waitFor(`document.querySelector('[role="alert"]')?.textContent.includes('Connessione internet assente')`, 'offline recipe notice');
    assert.equal(await evaluate(`!!document.querySelector('.payment-overlay')`), false);
    console.log('PASS offline feedback and recipes blocked with visible notices');

    await click('.helper');
    await waitFor(`!!document.querySelector('#helper-description')`, 'settings');
    await evaluate(`[...document.querySelectorAll('#helper-description .list-title')].find(element => /tema/i.test(element.textContent)).click()`);
    await delay(100);
    await evaluate(`[...document.querySelectorAll('#helper-description button')].find(element => element.textContent.trim() === 'Dark').click()`);
    await waitFor(`document.body.classList.contains('dark-body') && !!document.querySelector('.inputText')`, 'offline theme reload');
    await waitFor(`document.querySelector('#todo-list')?.textContent.includes('Latte offline')`, 'persisted offline item');
    assert.equal(await evaluate(`localStorage.getItem('darkTheme')`), 'true');
    console.log('PASS changing theme and automatic reload offline; list retained');
    await offline(false);
    await waitFor(`!document.querySelector('[role="alert"]')`, 'reconnection');
    await click('.feedback-icon');
    await waitFor(`!!document.querySelector('.close-feedback-modal')`, 'online feedback restored');
    console.log('PASS online access restored');
    assert.deepEqual(exceptions, [], 'Uncaught application errors');
    console.log(`PASS no uncaught application errors; ${externalRequests} external asset attempts safely blocked`);
  } finally {
    socket?.close();
    browser?.kill();
    server.closeAllConnections();
    server.close();
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
