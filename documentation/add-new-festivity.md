PROCEDURA PER AGGIUNGERE UNA FESTIVITA':

- Nel file OthersFestivitiesStore.js aggiungere la variabile con il nome della festività.

- Inserirla nella funzione resetFestivities e creare il suo if con la data in cui si desidera che venga visualizzata.

- Nel file Festivities-and-occurrences.vue vai in fondo all'html ed aggiungi la rispettiva immagine e la rispettiva descrizione (ovviamente in più lingue) con i loro if.

- Per le traduzioni ci sono nel file LanguageStore.js le rispettive funzioni festivitiesITATranslations per l'italinao, e festivitiesSPATranslations per lo spagnolo. Per l'inglese invece dove sono definite le variabili in alto, c'è la sezione apposita commentata: //--------------------------------------------------------------------- FESTIVITÀ

- Assicurati sempre di caricare le immagini nel componente Preload-images.vue
