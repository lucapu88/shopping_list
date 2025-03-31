PROCEDURA PER AGGIUNGERE UNA NUOVA CATEGORIA:

- Nel file CategoriesStore.js aggiungi una nuova riga all'interno dei rispettivi array engCategories, itaCategories e spanCategories copiando lo stesso contenuto e cambiando il nome e l'emojy. la proprietà "active" riguarda solo le categorie che vuoi far vedere per un periodo limitato, tipo quella dei regali di natale.

- Per prendere l'emoticon io uso questo sito: https://unicode.org/emoji/charts/full-emoji-list.html#1f600 e mi prendo il codice, ad esempio U+1F600 e lo modifico in 0x1F600

- Nel file SuggestionsStore.js aggiungerla nello switch. Va aggiunta 3 volte, una per ogni lingua.

- Nei file EnglishSuggStore.js, ItalianSuggStore.js e SpanishSuggStore.js aggiungi l'array con i suggerimenti di prodotti.

- Ricordati di aggiornare il numero nella variabile categoryNumber all'interno del test HeaderPushButtonsContainer.cy.js
