PROCEDURA PER AGGIUNGERE UN TEMA:

- Vai nel file ThemeStore.js ed aggiungi una nuova variabile con il nome del tema e poi cerca il nome di un tema qualsiasi già esistente e fai esattamente le stesse ed identiche cose. I temi che fanno cose diverse dallo standard sono il light, summer e winter che hanno immagini di sfondo, e il dark invece ha il bordo sul body.

- Nel file Change-themes.vue inserisci l'elemento button html e poi aggiungi il relativo codice nella funzione changeTheme. Copia gli altri e cambia nome con il nuovo tema.

- Crea un file .css nella cartella assets/themes ed importalo nel file main.css che è all'interno della cartella assets.

- Nel nuovo file includi tutte le variabili e le classi riguardanti il tema. Dopo di che devi aggiungerle nei vari componenti prendendo spunto dagli altri temi già esistenti.

- In fine aggiorna il test nella sezione "cambio temi" nel file Helper.cy.js
