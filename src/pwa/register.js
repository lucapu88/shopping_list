import { shallowReactive } from 'vue';

export const pwaState = shallowReactive({ ready: false, installPrompt: null });
let registrationPromise;

export function registerPwa() {
  // In sviluppo evita la cache offline, così le modifiche di Vite restano subito visibili.
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  window.addEventListener('beforeinstallprompt', event => {
    // Conserva la richiesta del browser per mostrarla quando si preme «Installa app».
    event.preventDefault();
    pwaState.installPrompt = event;
  });
  window.addEventListener('appinstalled', () => { pwaState.installPrompt = null; });
  navigator.serviceWorker.ready.then(() => { pwaState.ready = true; });
  registrationPromise = navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
    .catch(error => {
      console.warn('Installazione offline non riuscita:', error);
      return null;
    });
  const check = () => {
    if (navigator.onLine !== false && !document.hidden) {
      registrationPromise.then(registration => registration?.update()).catch(() => {});
    }
  };
  window.addEventListener('online', check);
  document.addEventListener('visibilitychange', check);
}

export async function installPwa() {
  const prompt = pwaState.installPrompt;
  if (!prompt) return;
  pwaState.installPrompt = null;
  await prompt.prompt();
}

// Attiva subito la nuova versione solo dal pulsante «Aggiorna», evitando ricaricamenti automatici mentre si usa la lista.
export async function updatePwa() {
  const registration = await registrationPromise;
  if (!registration) return;
  await registration.update();
  const worker = registration.installing;
  if (worker) {
    await new Promise((resolve, reject) => {
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed') resolve();
        if (worker.state === 'redundant') reject(new Error('Aggiornamento offline non riuscito'));
      });
    });
  }
  if (registration.waiting) {
    await new Promise(resolve => {
      navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    });
  }
}
