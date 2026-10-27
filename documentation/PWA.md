# PWA e funzionamento offline

Il normale `npm run build` genera `dist/sw.js`, manifest e icone. Pubblicare
`dist` su Netlify come per il sito attuale; non servono nuovi servizi o domini.
Il service worker viene registrato solo nella build di produzione, anche quando
questa viene servita localmente per una verifica.

## Primo utilizzo e installazione

Aprire il sito con internet e attendere nelle impostazioni la scritta
«Liste e impostazioni disponibili anche offline». L'avvio offline è disponibile
solo dopo il completamento del primo salvataggio dei file sul dispositivo.
Nei browser che lo consentono appare anche il pulsante «Installa app».
Su iPhone usare Condividi → Aggiungi alla schermata Home.

Le liste, le categorie, i temi, le impostazioni, le liste periodiche, l'archivio
locale, l'importazione testuale e le tessere locali rimangono disponibili offline.
Ricette, login, registrazione, recupero password, pagamenti, feedback, AI,
dettatura e video tutorial richiedono la connessione. I tentativi offline mostrano
un avviso. Se l'AI di classificazione era attiva, l'aggiunta di un prodotto offline
prosegue come inserimento normale nella lista, con avviso.

Il rilevamento usa lo stato di rete del browser; le richieste online gestite
mostrano un avviso anche quando falliscono per problemi di rete mentre il browser
si dichiara connesso. Non equivale a garantire la raggiungibilità di ogni servizio.

Il service worker salva i file locali dell'app e, facoltativamente, i font già
visitati. I temi possono usare font di ripiego se il relativo font non è mai
stato scaricato. Video e audio non vengono scaricati preventivamente.
API, autenticazione, pagamenti e risposte contenenti dati utente non vengono
salvati nella cache del service worker. Non ci sono invii differiti di feedback
o pagamenti.

I dati della WebView Kodular restano nel suo spazio di archiviazione e non vengono
trasferiti automaticamente nella PWA. Anche browser diversi mantengono dati
separati. Cancellare i dati del sito elimina i salvataggi locali; le normali
limitazioni di spazio e conservazione del browser continuano ad applicarsi.

## Aggiornamenti

Una nuova build crea una cache con una versione derivata dal contenuto dei file.
Il nuovo service worker attende la chiusura delle pagine della versione precedente.
Il pulsante già presente «Aggiorna» verifica l'aggiornamento, lo attiva e ricarica
la pagina. Le cache eliminate appartengono esclusivamente alla vecchia versione
dell'app; localStorage e IndexedDB non vengono cancellati.

## Verifiche locali

```text
npm run build
npx vitest run src/tests/Connection.spec.js src/tests/ServiceWorker.spec.js src/tests/SettingsStore.spec.js src/tests/ThemeStore.spec.js src/tests/TodosStore.spec.js src/tests/SecondTodosStore.spec.js
node scripts/verify-pwa.cjs
```

L'ultimo comando richiede Node 22+ e Chrome o Edge; si può impostare `PWA_BROWSER`
al percorso di un browser Chromium. Serve la build tramite un server locale,
usa un profilo temporaneo, blocca le richieste HTTPS esterne e verifica avvio e
modifiche offline con la cache HTTP del browser disabilitata. Non contatta API
di produzione e non esegue login o pagamenti reali.

Dopo il deploy verificare anche l'installazione su Android e iPhone e il normale
funzionamento online dei servizi esterni. La prova locale non pubblica il sito.
