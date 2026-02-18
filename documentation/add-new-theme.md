PROCEDURA PER AGGIUNGERE UN TEMA:

- Vai nel file ThemeStore.js ed aggiungi in THEMES_CONFIG un nuovo nodo con il nome del tema e le sue rispettive proprietà, esattamente come gli altri.

- Crea una variabile con il nome del tema setttandola a false.

- Nel file Change-themes.vue inserisci l'elemento button html e poi aggiungi il relativo codice nella funzione changeTheme. Copia gli altri e cambia nome con il nuovo tema.

- Crea un file .css nella cartella assets/themes e ricordati che la cosa principale è il settaggio del body.

- Nel nuovo file includi tutte le variabili e le classi riguardanti il tema. Dopo di che devi aggiungerle nei vari componenti prendendo spunto dagli altri temi già esistenti.

- In fine aggiorna il test nel file Helper.cy.js. Purtroppo in cypress si rompono i test se inserisci il formato esadecimale del colore, quindi per farlo funzionare devi inserire il formato rgb.

- Per le immagini di sfondo del tema (se ci sono), assicurati che vengano caricate in preloadThemeImg().

- Per le immagini di background delle modali settate nel css, assicurati che vengano caricate correttamente nel PreloadStore.js in loadConfirmBackgroundImg().

- Se usi un font di google-font arricurati che venga precaricato nel PreloadStore.js in loadFontOnce().

- Assicurati che cambi anche lo stile all'interno delle varie sezioni dell'helper.
