PROCEDURA PER AGGIUNGERE UN TEMA:

- Vai nel file ThemeStore.js ed aggiungi una nuova variabile con il nome del tema e poi cerca il nome di un tema qualsiasi già esistente e fai esattamente le stesse ed identiche cose. I temi che fanno cose diverse dallo standard sono il dark che aggiunge il bordo sul body, e l'elegant che aggiunge il gradient al body.

- Nel file Change-themes.vue inserisci l'elemento button html e poi aggiungi il relativo codice nella funzione changeTheme. Copia gli altri e cambia nome con il nuovo tema.

- Crea un file .css nella cartella assets/themes ed aggiungi il rispettivo tag <link ecc ecc... /> nell'head del file index.html.

- Nel nuovo file includi tutte le variabili e le classi riguardanti il tema. Dopo di che devi aggiungerle nei vari componenti prendendo spunto dagli altri temi già esistenti.

- In fine aggiorna il test nel file Helper.cy.js. Purtroppo in cypress si rompono i test se inserisci il formato esadecimale del colore, quindi per farlo funzionare devi inserire il formato rgb.

- Se aggiungi immagini assicurati che vengano caricate nel componente Preload-images.vue

- Assicurati che cambi anche lo stile all'interno delle varie sezioni dell'helper
