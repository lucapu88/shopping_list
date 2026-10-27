import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';

const source = readFileSync('src/pwa/service-worker.js', 'utf8')
  .replace('__BUILD_VERSION__', 'test')
  .replace('__PRECACHE_URLS__', JSON.stringify(['/index.html', '/assets/app.js', '/assets/theme.css']));

function worker() {
  const handlers = {};
  const shell = new Map([
    ['/index.html', { body: 'offline app' }],
    ['/assets/app.js', { body: 'offline JavaScript' }],
    ['/assets/theme.css', { body: 'offline theme' }],
  ]);
  const cache = { match: vi.fn(path => shell.get(path)), addAll: vi.fn(), put: vi.fn() };
  const caches = { open: vi.fn(async () => cache), keys: vi.fn(async () => ['shopping-list-shell-old', 'shopping-list-shell-test', 'another-app']), delete: vi.fn() };
  const self = { location: { origin: 'https://app.test' }, addEventListener: (name, handler) => { handlers[name] = handler; }, clients: { claim: vi.fn() }, skipWaiting: vi.fn() };
  const fetch = vi.fn().mockRejectedValue(new TypeError('Offline'));
  runInNewContext(source, { self, caches, fetch, URL, Response });
  return { handlers, cache, caches, fetch, self };
}

describe('PWA service worker cache boundaries', () => {
  it('serves the entry point and unused themes with the network unavailable', async () => {
    const { handlers, fetch } = worker();
    for (const [path, mode, body] of [['/?from=home', 'navigate', 'offline app'], ['/assets/theme.css', 'cors', 'offline theme']]) {
      let response;
      handlers.fetch({ request: { method: 'GET', url: `https://app.test${path}`, mode }, respondWith: promise => { response = promise; } });
      expect((await response).body).toBe(body);
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it('never intercepts API, auth, payment or mutation requests', () => {
    const { handlers, caches } = worker();
    for (const [url, method] of [
      ['https://api.test/generate-recipe', 'POST'],
      ['https://api.test/generazioni?token=private', 'GET'],
      ['https://accounts.google.com/auth', 'GET'],
      ['https://checkout.stripe.com/pay', 'GET'],
      ['https://app.test/api/data', 'GET'],
    ]) {
      const respondWith = vi.fn();
      handlers.fetch({ request: { url, method, mode: 'navigate' }, respondWith });
      expect(respondWith).not.toHaveBeenCalled();
    }
    expect(caches.open).not.toHaveBeenCalled();
  });

  it('prepares all local files before installation and deletes only its own old cache', async () => {
    const { handlers, cache, caches, self } = worker();
    let task;
    handlers.install({ waitUntil: promise => { task = promise; } });
    await task;
    expect(cache.addAll).toHaveBeenCalledWith(['/index.html', '/assets/app.js', '/assets/theme.css']);
    expect(self.skipWaiting).not.toHaveBeenCalled();
    handlers.activate({ waitUntil: promise => { task = promise; } });
    await task;
    expect(caches.delete).toHaveBeenCalledTimes(1);
    expect(caches.delete).toHaveBeenCalledWith('shopping-list-shell-old');
    expect(self.clients.claim).toHaveBeenCalled();
  });
});
