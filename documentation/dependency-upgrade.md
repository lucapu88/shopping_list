# Aggiornamento dipendenze — 5 novembre 2026

## Ambiente

Usare Node 24 LTS (verifica locale con 24.18.0). Il requisito in `package.json`
riflette quello di Vitest 5: Node 22.12+ nella linea 22, Node 24 oppure Node 26+.
Anche l'ambiente di build dell'hosting deve soddisfarlo.

La configurazione Vite è ora `vite.config.mjs`; il plugin PWA locale è
`build/pwa.mjs`. Le estensioni esplicite permettono il caricamento ESM senza
cambiare il formato degli altri file JavaScript del progetto. I target browser
della build precedente sono mantenuti esplicitamente per la WebView Android.

Il test delle categorie è stato corretto da 27 a 28 e ora controlla anche il
francese: il catalogo applicativo conteneva già 28 categorie prima degli update.

## Versioni selezionate

| Pacchetto | Prima (installato) | Dopo |
| --- | --- | --- |
| Vite | 4.5.5 | 8.3.6 |
| @vitejs/plugin-vue | 4.2.3 | 6.0.10 |
| Vitest / @vitest/ui | 1.6.1 | 5.1.0 |
| Vue | 3.5.31 (lockfile 3.3.4) | 3.5.45 |
| Pinia | 2.1.6 | 2.3.1 |
| Bootstrap | 5.3.3 | 5.3.8 |
| idb | 8.0.3 | 8.0.4 |
| Firebase | 12.5.0 | 12.19.0 |
| CropperJS | 1.5.13 | 1.7.0 |
| Cypress | 13.6.1 | 13.17.0 |
| langchain | 0.3.32 | 0.3.37 |
| @langchain/core | 0.3.73 | 0.3.80 |
| @langchain/openai | 0.6.11 | 0.6.17 |
| @langchain/langgraph | 0.4.9 | 0.4.10 |

Le altre librerie restano alle versioni precedenti: le nuove major di Zod,
jsdom, vue3-smooth-dnd ed ESLint/plugin-vue richiedono una valutazione separata;
EmailJS richiede la sostituzione del pacchetto deprecato. Pinia, Firebase,
CropperJS, Cypress e LangChain mantengono le linee compatibili delle API esistenti.
Le dipendenze LangChain sono ancora presenti per i prototipi: questo aggiornamento
non aggiorna il backend esterno su Render né ne certifica il funzionamento.

## Esito delle verifiche

- Build di produzione: completata senza errori. Resta il warning già presente
  sul bundle JavaScript superiore a 500 kB.
- Vitest 5 e relativa UI: 144 test superati in 10 file; comando finale
  `npm run test:ui -- --run --open=false` terminato con codice 0.
- PWA: superati tutti i controlli di `scripts/verify-pwa.cjs`, senza eccezioni
  applicative non gestite e con le richieste esterne bloccate.
- `npm ls --all`: nessun problema di dipendenze; manifest e lockfile coerenti.
  Nessuna nuova versione prerelease introdotta nel lockfile.
- `npm ci --dry-run --ignore-scripts --no-audit --no-fund`: simulazione riuscita;
  non equivale a una nuova installazione completa.
- ESLint senza correzioni automatiche sui file di configurazione e sul test
  unitario modificati: superato. `git diff --check`: superato.

Cypress è escluso dalle ulteriori attività su richiesta dell'utente. Il tentativo
già avviato è terminato con 29 test superati, 6 falliti e 1 già disabilitato:
cinque errori riguardano selettori posizionali non allineati alle impostazioni,
uno la sincronizzazione nella lista periodica. Non sono stati modificati i test
Cypress e la suite E2E non è dichiarata superata.

## Verifiche ripetibili

Dalla radice del progetto:

```powershell
npm test -- --run               OK
npm run build                   OK
node scripts/verify-pwa.cjs     OK
```

La verifica PWA richiede Chrome o Edge installato (in alternativa impostare
`PWA_BROWSER` al percorso del browser Chromium). Usa un profilo temporaneo,
blocca le richieste HTTPS esterne e controlla la build di produzione, la
persistenza della lista, il riavvio offline, il cambio tema e il feedback di
assenza connessione. Non richiede credenziali o pagamenti.

Per la UI dei test:

```powershell
npm run test:ui
```

## Controllo manuale prima della pubblicazione

1. Eseguire `npm run build` e `npm run preview -- --port 4173 --strictPort`.
   Aprire l'indirizzo locale mostrato dal terminale e controllare la console del
   browser durante i passaggi successivi.
2. Aggiungere, modificare, spuntare, eliminare e riordinare elementi; cambiare
   lista, categorie e lista periodica. Ricaricare e verificare la persistenza.
3. Provare tutte le lingue, i temi e i pannelli, sia desktop sia schermo mobile.
4. Aggiungere una carta fedeltà, ritagliare una foto e salvarla; ricaricare,
   visualizzarla e cancellarla. Questo verifica anche CropperJS e IndexedDB.
5. Attendere l'attivazione del service worker, passare offline nei DevTools,
   ricaricare e modificare la lista. Cambiare tema offline e poi riconnettersi.
   I comandi che richiedono rete devono mostrare un avviso comprensibile.
6. Con un account di prova, verificare login/logout e persistenza della sessione
   Firebase. Generare una ricetta soltanto se si accetta il consumo del relativo
   credito. Per Stripe usare l'ambiente di test; nessun pagamento reale è
   necessario per validare la migrazione degli strumenti di build.
7. Ripetere i flussi essenziali nell'app Android/Kodular su un dispositivo reale:
   trascinamento touch, ritaglio foto, tastiera, ripristino della lista e offline.

Non cancellare i dati del browser dell'uso quotidiano per effettuare queste prove:
utilizzare un profilo o un browser dedicato. La preview locale non prova il
passaggio da una vecchia cache PWA sul dominio pubblico: verificarlo anche in un
ambiente di staging prima della pubblicazione.

## Esito delle prove manuali — 6 novembre 2026

- L'utente riferisce di aver completato tutti i punti 1–7 senza problemi
  residui segnalati; il punto 6 è stato verificato sulla porta 5173.
- Nessun messaggio aggiuntivo segnalato nel terminale di Vite preview sulla
  porta 4173. Il terminale del server e la console del browser sono distinti:
  gli errori JavaScript e CORS vanno controllati nei DevTools del browser.
- Nel primo tentativo del punto 6 sulla porta 4173, la richiesta al backend Render per
  `/generazioni` ha restituito stato 200 ma senza l'header
  `Access-Control-Allow-Origin`, impedendo al browser di leggerne la risposta.
  Ripetendo il punto 6 sulla porta 5173, l'utente ne ha confermato il corretto
  funzionamento. L'esito è coerente con una restrizione CORS sull'origine
  locale, che include la porta. La configurazione CORS effettiva del servizio
  Render non è stata verificata in questo repository.

## Riferimenti

- [Migrazione Vite](https://vite.dev/guide/migration.html)
- [Migrazione Vitest](https://vitest.dev/guide/migration/)
- [Release Firebase](https://firebase.google.com/support/release-notes/js)
- [Changelog CropperJS 1.x](https://github.com/fengyuanchen/cropperjs/blob/v1/CHANGELOG.md)
- [Avviso corretto nelle patch LangChain](https://github.com/advisories/GHSA-r399-636x-v7f6)
