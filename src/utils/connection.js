import { reactive } from 'vue';

export const connection = reactive({ online: navigator.onLine !== false, notice: '' });
let noticeTimer;

function updateOfflineFont() {
  document.documentElement.classList.toggle('offline-font', !connection.online);
}

// Imposta il font prima del primo rendering, così l'avvio offline non mostra per un attimo quello del tema.
updateOfflineFont();

export function notifyConnection(message = 'Connessione internet assente. Questa funzionalità richiede internet. Puoi continuare a usare le liste e le impostazioni offline.') {
  clearTimeout(noticeTimer);
  connection.notice = message;
  noticeTimer = setTimeout(() => { connection.notice = ''; }, 6500);
}

// Da chiamare prima delle azioni online: mostra l'avviso senza avviare la richiesta se manca la rete.
export function requireConnection() {
  connection.online = navigator.onLine !== false;
  updateOfflineFont();
  if (connection.online) return true;
  notifyConnection();
  return false;
}

export function notifyNetworkFailure(error) {
  // Il browser può risultare connesso al Wi-Fi anche senza internet: controlla anche gli errori delle richieste.
  if (navigator.onLine === false) notifyConnection();
  else if (error instanceof TypeError || error?.status === 0 || /network|unavailable/i.test(error?.code || '')) {
    notifyConnection('Impossibile contattare il servizio online. Verifica la connessione internet e riprova.');
  }
}

export async function onlineFetch(input, options) {
  if (!requireConnection()) throw new Error('Connessione internet assente');
  try {
    return await fetch(input, options);
  } catch (error) {
    notifyNetworkFailure(error);
    throw error;
  }
}

export function startConnectionMonitor() {
  // Aggiorna l'interfaccia quando cambia la rete; al ritorno online rimuove l'avviso precedente.
  const update = () => {
    connection.online = navigator.onLine !== false;
    updateOfflineFont();
    if (connection.online) connection.notice = '';
  };
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  return () => {
    window.removeEventListener('online', update);
    window.removeEventListener('offline', update);
    clearTimeout(noticeTimer);
  };
}
