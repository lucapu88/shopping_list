# CODEX.md — Shopping List Project

> **Nota per Codex:** Parla SEMPRE in italiano con l'utente, indipendentemente dalla lingua in cui viene fatto il messaggio.

---

## Panoramica del Progetto

SPA Vue 3 per gestire liste della spesa, carte fedeltà e generazione di ricette con AI.
**Stack:** Vue 3 · Pinia · Vite · Firebase · Vitest · Cypress · Bootstrap 5 · LangChain/OpenAI · Stripe

---

## Architettura

```
src/
├── components/        # Componenti Vue organizzati per funzionalità
├── store/             # Pinia store (uno per dominio)
├── server/            # Wrapper Firebase, chiamate API, IndexedDB
│   ├── api/           # Integrazioni LangChain/OpenAI
│   └── composables/   # Logica server riutilizzabile
├── assets/            # CSS (base, temi, override Bootstrap)
└── tests/             # Test unitari Vitest (*.spec.js)
cypress/e2e/           # Test E2E Cypress
```

**Backend:** Servizio separato su Render.com — non replicare la sua logica lato client.

---

## Stile del Codice e Convenzioni

### Componenti Vue

- Usare sempre `<script setup>` per i nuovi componenti — niente Options API
- Un componente per file; nomi file in PascalCase (es. `Todo-row.vue`)
- Tenere i template leggibili: estrarre le computed property invece di espressioni inline
- Emettere eventi con `defineEmits`; non mutare mai le prop direttamente

### JavaScript

- ES2022+; preferire `const` su `let`, mai `var`
- Arrow function per i callback; funzioni con nome per composable e action degli store
- Destrutturare dove migliora la leggibilità, non solo per stile
- Nessun cast o soppressione di warning ESLint senza un commento che spieghi il perché
- Inserisci commenti su cose complicate, non su cose basilari, e scrivili sempre in lingua italiano

### Nomenclatura

- **File:** kebab-case per tutto tranne gli store Pinia (PascalCase: `TodoStore.js`)
- **Variabili/funzioni:** camelCase
- **Costanti:** UPPER_SNAKE_CASE solo per costanti globali vere
- **Componenti:** PascalCase nel `<template>` (`<TodoRow />`)
- Utilizza la lingua inglese solo per le nomenclature

### CSS e Temi

- Non aggiungere stili inline; usare CSS scoped o variabili del tema
- Gli override specifici per tema vanno nel file corrispondente in `src/assets/themes/`
- Evitare le utility class di Bootstrap per il layout quando una regola scoped è più pulita

---

## State Management (Pinia)

- Uno store per dominio — non gonfiare gli store esistenti con stato non correlato
- Lo stato deve essere serializzabile (niente istanze di classi, niente cicli reattivi)
- Getter per i dati derivati; action per mutazioni e operazioni async
- Persistere su `localStorage` esplicitamente nelle action — non fare affidamento su effetti collaterali
- Quando gli store si referenziano tra loro, importare lo store dentro l'action (non a livello di modulo) per evitare dipendenze circolari

---

## API e Async

- Tutte le chiamate `fetch` / API vanno in `src/server/` — mai direttamente nei componenti
- Gestire sempre gli errori: mostrare feedback all'utente, loggare i dettagli in console solo in sviluppo
- Usare variabili d'ambiente (`import.meta.env.VITE_*`) per tutti gli URL e le chiavi — non hardcodare mai
- Il token Firebase (`settings.yourToken`) è l'identificatore utente; verificarne la presenza prima delle chiamate API
- Le interazioni Stripe restano in composable dedicati; non mescolare mai la logica di pagamento con la UI

---

## Sicurezza

- Non loggare mai token di autenticazione, chiavi API o dati personali dell'utente in produzione
- Sanitizzare i contenuti generati dall'utente prima di inserirli nel DOM (`v-html` è vietato a meno che il contenuto non sia esplicitamente sanitizzato)
- Le regole Firebase sono il layer di controllo accessi autoritativo — non fidarsi solo dei controlli lato client
- `.env` è nel `.gitignore`; non committare mai segreti

---

## Testing

### Test Unitari (Vitest)

- File di test: `src/tests/*.spec.js`
- Ogni Pinia store deve avere un file spec corrispondente
- Resettare sempre Pinia e `localStorage` in `beforeEach` / `afterEach`
- Testare il comportamento, non l'implementazione: verificare gli esiti dello stato, non le chiamate interne
- Copertura: rami logici significativi, non il 100% di line coverage fine a se stesso

### Test E2E (Cypress)

- Nella cartella `cypress/e2e/`
- Coprire i flussi utente critici: aggiungere un elemento, spuntarlo, cambiare lista, login/logout
- Non duplicare la logica dei test unitari negli E2E — i test E2E sono per i flussi di integrazione

### Esecuzione Test

```bash
npm test          # Test unitari Vitest
npm run test:ui   # Vitest con interfaccia grafica
npm run push      # Esegue Cypress + Vitest prima del push (obbligatorio)
```

---

## Performance

- Non importare librerie pesanti a livello di modulo se usate solo condizionalmente — usare `import()` dinamico
- Chiedi sempre il permesso prima di installare una libreria, e spiega perchè serve quella libreria
- Immagini e media in `src/img/`, `src/sounds/`, `src/video/` devono essere ottimizzati prima del commit
- Preferire IndexedDB (tramite `idb`) per dati binari (foto); `localStorage` solo per valori JSON piccoli
- Evitare reattività non necessaria: usare `shallowRef` / `shallowReactive` per oggetti grandi non reattivi

---

## Da Fare / Da Non Fare

| Da Fare                                                                        | Da Non Fare                                                                |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Leggere il codice esistente prima di modificarlo                               | Modificare codice non ancora letto                                         |
| Rispettare la struttura delle cartelle per nuove funzionalità                  | Creare nuove cartelle di primo livello senza discussione                   |
| Aggiungere uno spec Vitest quando si aggiunge un nuovo store                   | Saltare i test per la logica degli store                                   |
| Usare l'alias `@` per gli import (`@/store/TodoStore`)                         | Usare catene relative `../../../`                                          |
| Controllare `import.meta.env.DEV` prima di log verbosi                         | Lasciare `console.log` nei percorsi di produzione                          |
| Tenere i componenti focalizzati su una singola responsabilità                  | Mettere logica di business nei template                                    |
| Confermare prima di toccare le regole di sicurezza Firebase o la config Stripe | Modificare silenziosamente la configurazione di pagamento o autenticazione |

---

## Workflow Commit e Push

Lo script `npm run push` esegue tutti i test prima del push. Non bypassarlo con `--no-verify`.
Messaggi di commit: lingua inglese, modo imperativo, tempo presente, sotto i 72 caratteri.
Chiedi sempre prima di committare e pushare qualcosa. Mai pushare se non hai l'ok dell'utente!

```
Add drag-and-drop reorder to secondary lists
Fix recipe counter not resetting after payment
```
