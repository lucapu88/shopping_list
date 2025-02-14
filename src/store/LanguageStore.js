import { defineStore } from 'pinia';
import { useTodoStore } from '@/store/TodoStore';

export const useLanguageStore = defineStore('Language', {
  state: () => ({
    todosStore: useTodoStore(),
    languagesBtns: {
      english: 'English',
      spanish: 'Spanish',
      italian: 'Italian',
    },
    categories: [],
    engCategories: [
      { name: 'vegetables', emojy: String.fromCodePoint(0x1f966), active: true },
      { name: 'meat', emojy: String.fromCodePoint(0x1f969), active: true },
      { name: 'fish', emojy: String.fromCodePoint(0x1f99e), active: true },
      { name: 'fruit', emojy: String.fromCodePoint(0x1f353), active: true },
      { name: 'sweets', emojy: String.fromCodePoint(0x1f382), active: true },
      { name: 'dairy products', emojy: String.fromCodePoint(0x1f95b), active: true },
      { name: 'starchy', emojy: String.fromCodePoint(0x1f35e), active: true },
      { name: 'drinks', emojy: String.fromCodePoint(0x1f37a), active: true },
      { name: 'frozen foods', emojy: String.fromCodePoint(0x2744), active: true },
      { name: 'spices', emojy: String.fromCodePoint(0x1f9c2), active: true },
      { name: 'hygiene', emojy: String.fromCodePoint(0x1f9fb), active: true },
      { name: 'medications', emojy: String.fromCodePoint(0x1f48a), active: true },
      { name: 'stationery', emojy: String.fromCodePoint(0x1f4da), active: true },
      { name: 'babies', emojy: String.fromCodePoint(0x1f476), active: true },
      { name: 'electronics', emojy: String.fromCodePoint(0x1f4a1), active: true },
      { name: 'pets', emojy: String.fromCodePoint(0x1f439), active: true },
      { name: 'work tools', emojy: String.fromCodePoint(0x1f6E0), active: true },
      { name: 'clothes', emojy: String.fromCodePoint(0x1f457), active: true },
      { name: 'toys', emojy: String.fromCodePoint(0x1f579), active: true },
      { name: 'furniture', emojy: String.fromCodePoint(0x1fA91), active: true },
      { name: 'household objects', emojy: String.fromCodePoint(0x1f37d), active: true },
      { name: 'gardening', emojy: String.fromCodePoint(0x1fab4), active: true },
      { name: 'online shopping', emojy: String.fromCodePoint(0x1f310), active: true },
      { name: 'other', emojy: String.fromCodePoint(0x1f4b8), active: true },
      { name: 'christmas gifts', emojy: String.fromCodePoint(0x1f385), active: false },
    ],
    itaCategories: [
      { name: 'vegetali', emojy: String.fromCodePoint(0x1f966), active: true },
      { name: 'carne', emojy: String.fromCodePoint(0x1f969), active: true },
      { name: 'pesce', emojy: String.fromCodePoint(0x1f99e), active: true },
      { name: 'frutta', emojy: String.fromCodePoint(0x1f353), active: true },
      { name: 'dolci', emojy: String.fromCodePoint(0x1f382), active: true },
      { name: 'latticini', emojy: String.fromCodePoint(0x1f95b), active: true },
      { name: 'farinacei', emojy: String.fromCodePoint(0x1f35e), active: true },
      { name: 'bevande', emojy: String.fromCodePoint(0x1f37a), active: true },
      { name: 'surgelati', emojy: String.fromCodePoint(0x2744), active: true },
      { name: 'spezie', emojy: String.fromCodePoint(0x1f9c2), active: true },
      { name: 'igiene', emojy: String.fromCodePoint(0x1f9fb), active: true },
      { name: 'farmaci', emojy: String.fromCodePoint(0x1f48a), active: true },
      { name: 'cancelleria', emojy: String.fromCodePoint(0x1f4da), active: true },
      { name: 'bimbi', emojy: String.fromCodePoint(0x1f476), active: true },
      { name: 'elettronica', emojy: String.fromCodePoint(0x1f4a1), active: true },
      { name: 'animali', emojy: String.fromCodePoint(0x1f439), active: true },
      { name: 'attrezzi', emojy: String.fromCodePoint(0x1f6E0), active: true },
      { name: 'vestiti', emojy: String.fromCodePoint(0x1f457), active: true },
      { name: 'giocattoli', emojy: String.fromCodePoint(0x1f579), active: true },
      { name: 'arredamento', emojy: String.fromCodePoint(0x1fA91), active: true },
      { name: 'oggetti domestici', emojy: String.fromCodePoint(0x1f37d), active: true },
      { name: 'giardinaggio', emojy: String.fromCodePoint(0x1fab4), active: true },
      { name: 'acquisti online', emojy: String.fromCodePoint(0x1f310), active: true },
      { name: 'altro', emojy: String.fromCodePoint(0x1f4b8), active: true },
      { name: 'regali di natale', emojy: String.fromCodePoint(0x1f385), active: false },
    ],
    spanCategories: [
      { name: 'verduras', emojy: String.fromCodePoint(0x1f966), active: true },
      { name: 'carnes', emojy: String.fromCodePoint(0x1f969), active: true },
      { name: 'pescado', emojy: String.fromCodePoint(0x1f99e), active: true },
      { name: 'fruta', emojy: String.fromCodePoint(0x1f353), active: true },
      { name: 'dulces', emojy: String.fromCodePoint(0x1f382), active: true },
      { name: 'lácteos', emojy: String.fromCodePoint(0x1f95b), active: true },
      { name: 'harina', emojy: String.fromCodePoint(0x1f35e), active: true },
      { name: 'bebidas', emojy: String.fromCodePoint(0x1f37a), active: true },
      { name: 'congelados', emojy: String.fromCodePoint(0x2744), active: true },
      { name: 'especias', emojy: String.fromCodePoint(0x1f9c2), active: true },
      { name: 'higiene', emojy: String.fromCodePoint(0x1f9fb), active: true },
      { name: 'medicamentos', emojy: String.fromCodePoint(0x1f48a), active: true },
      { name: 'papelería', emojy: String.fromCodePoint(0x1f4da), active: true },
      { name: 'niños', emojy: String.fromCodePoint(0x1f476), active: true },
      { name: 'electrónica', emojy: String.fromCodePoint(0x1f4a1), active: true },
      { name: 'animales', emojy: String.fromCodePoint(0x1f439), active: true },
      { name: 'herramientas', emojy: String.fromCodePoint(0x1f6E0), active: true },
      { name: 'ropa', emojy: String.fromCodePoint(0x1f457), active: true },
      { name: 'juguetes', emojy: String.fromCodePoint(0x1f579), active: true },
      { name: 'mobiliario', emojy: String.fromCodePoint(0x1fA91), active: true },
      { name: 'objetos domésticos', emojy: String.fromCodePoint(0x1f37d), active: true },
      { name: 'jardinería', emojy: String.fromCodePoint(0x1fab4), active: true },
      { name: 'comprar en intenet', emojy: String.fromCodePoint(0x1f310), active: true },
      { name: 'otros', emojy: String.fromCodePoint(0x1f4b8), active: true },
      { name: 'regalos de navidad', emojy: String.fromCodePoint(0x1f385), active: false },
    ],
    langIta: false,
    langSpanish: false,
    langEnglish: false,
    shoppingListTitle: 'Shopping List',
    choseCategoryText: 'Choose a category among these:',
    changeLanguage: 'Change language',
    settingsTextTitle: 'Settings',
    placeholder: 'Write here what to buy',
    defaultPlaceholderText: 'Write here what to buy',
    copyList: {
      text: 'List copied to clipboard',
      visible: false,
    },
    share: {
      text: 'Link copied to clipboard, paste it with whoever you want.',
      visible: false,
    },
    confirmText: 'Are you sure you want to delete:\n',
    completeConfirmText: '', // Questo testo viene editato nell' TodoStore.js
    selectedTodosConfirmText: 'You are going to delete these elements',
    themeName: 'light',
    safeModeText: {
      title: 'Safe delete mode',
      description: 'it will ask you to confirm the deletion for each single product on the list',
      function: 'Click to activate/deactivate',
    },
    chosenThemeText: 'Chosen theme',
    changeThemeText: 'Change theme',
    autoDeleteEmptyCategoriesText: {
      title: 'Auto delete of empty categories',
      description: 'Choose whether to delete the categories left empty manually, or have them deleted automatically.',
      function: 'Click to activate/deactivate',
    },
    pasteListText: {
      title: 'Import a list from other apps',
      subtitle: 'Just copy and paste it into the box and click import. N.B.: Separates list items by sending them to a head',
    },
    importText: 'Import',
    shareText: 'Share App',
    updateText: {
      description: 'If the button is green, click to update the app',
      available: 'Update',
      unavailable: 'No Updates',
      updated: false,
    },
    insertAll: 'Insert all',
    removeEmpty: 'Remove only empty',
    deleteAll: 'Delete ALL',
    deleteAllConfirmText: 'Are you sure you want \n delete the whole list?',
    helperDescription: {
      troubleshooting: 'Troubleshooting',
      troubleshootingText: {
        part1: "If you experience slowness or blocks in loading images, check your connection, if it's ok try restarting the app. If the problem persists, report it to the e-mail in the support section above.",
        part2: "We do not save any of your personal data or location, nor do we save your shopping lists. The data is only saved locally on your device, so if you should lose your list by accident by deleting it, the only way to recover it is by clicking on the button in the ‘import last backup’ section above.",
        part3: "Be careful! You only care about the last deletion made!",
        part4: "If you should find your list emptied without having actually done so, it is most likely that your smartphone has low storage space.",
        part5: "If, on the other hand, you claim to have memory and the data is still deleted, then report this to the email in the support section above."
      },
      instructionsTitle: 'Instructions:',
      addEditDelete: 'Add, Edit, Delete',
      add: 'is used to add stuff to buy list.',
      edit: 'is used to change a name and save the changes by clicking',
      delete: 'is used to remove stuff from the list.',
      backToTop: 'is used to returns at the top of the list. It works when the list it is very long.',
      categories: 'Categories',
      addCategory: {
        part1: 'To add a category just type it in and click',
        part2: 'or choose it in the box by clicking',
        part3: 'It will appear',
        part4: 'to you like',
        part5: 'and clicking on the name will',
        part6: 'highlight it',
        part7: 'So you can add stuff into it.When you are done just click back on the name or any other category names.',
      },
      addAllCat: 'You can add all the categories by clicking on',
      removeEmptyCat: 'You can delete only the categories left empty by clicking on',
      suggestionsTitle: 'Suggestions',
      suggestions: {
        part1: 'When you click on a category to add items, this button appears',
        part2: 'which upon clicking shows you a series of product suggestions related to the selected category. Simply click on the item you are interested in and you will find it listed in the appropriate category.'
      },
      dragNdropTitle: 'Drag and Drop',
      dragNdropText: {
        part1: 'If you hold down on the product name for 3 seconds or if you click on',
        part2: 'you can drag elements and, by holding them down, move them wherever you want.',
        dragginText: 'Drag the elements of the list where you want'
      },
      multipleDeleteTitle: 'Select and delete multiple items',
      multipleDeleteText: {
        part1: 'You can delete multiple products together by clicking on',
        part2: 'So you mark them and then at the end of shopping by clicking on',
        part3: 'at the bottom only the ones you marked will be deleted.',
        deselectAllText: 'You can deselect them all by clicking on',
        confirmDeselectAllText: 'and then confirming (or cancelling) by clicking on'
      },
      copyListTitle: 'Copy list, Highlight items',
      copyListText: 'is used to copy the list and paste it wherever you want.',
      highlightImportant: {
        part1: 'You can make a product "important" by clicking on the name and it will be ',
        part2: 'highlighted',
        part3: 'so it cannot be deleted or edited.'
      },
      deleteAllTitle: 'Delete all',
      deleteAllText: {
        part1: 'If you click on',
        part2: 'you will see a confirmation box for delete ALL the list.',
      },
      videoAlert: 'Your device does not support video tags. Please contact support.',
      support: 'Support',
      supportText: 'For any report you can contact me:',
      socialText: 'Follow the social developer pages, you can also contact me here:',
      githubText: 'If you are a developer maybe you can give me some advice on how to improve in the code:',
      adviceTitle: 'IMPORTANT: ',
      adviceText: "This is a web app converted to a smartphone app, and is always maintained, so don't pay attention to the date of the last update that appears in the store.",
      dateLastUpdateText: "The actual date of the last update is: "
    },
    cancerDayText: '4 February: World Cancer Day',
    peaceDayText: '1 January: World Peace Day',
    womensDayText: "Best wishes to all women",
    shoahText: '27 January: Holocaust memorial day',
    earthDayText: '22 April: Earth Day',
    beerDayText: 'Happy Beer Day',
    parentsDayText: '1 June: Best wishes to all parents',
    toiletDayText: '19 November: World Toilet Day 🤣',
    worldWideWebText: 'On 6 August 1991, the World Wide Web was born',
    worldPizzaDayText: '17 January: World Pizza day 🤌🏻',
    valentinesDayText: "Happy Valentine's Day ❤️",
    worldEnvironmentDayText: '5 June: World Environment Day',
    humanRightsDayText: '10 December: World Human Rights Day',
    starWarsDay: '25 May 1977: Star Wars is released in cinemas',
    backupListText: {
      title: 'Import Last Backup',
      description: "If you have deleted something or the entire list by mistake, you can recover the entire list from the LAST deletion.",
      confirm: 'Are you sure?',
      noBackupText: 'There are no backups saved'
    },
    infoCategoriesAlert: 'If you cannot find the categories, make sure the language is correct. Categories are imported correctly if they are written in the selected language.',
    priceText: 'If you type in a number with the currency € or £ or $ it will automatically calculate the total of all prices written in the list, but beware it only works if you type in the currency, e.g. bread 2.99€.',
    deselectAllText: 'Deselect All',
    importantTodos: {
      alert: 'There are no elements selected as important',
      addedImportantText: "Marked as important",
      visible: false,
      text: {
        part1: 'Click on',
        part2: 'to display only the important items you have selected.It is currently only in display mode.'
      },
    },
    showOnlyLatestDeletedText: {
      title: 'Show latest deleted',
      description: 'Here you will only find your last single or multiple deletion, just as a summary',
      singleTodoText: 'Last single elimination',
      multipleTodosText: 'Last multiple elimination',
    },
    suggestions: {
      tipsBtnText: 'Show suggestions',
      headerInfo: 'Click on one of these items to add it to the list',
    },
    categoryTipText: 'If you click on the category you can add products to it',
    reloadAppText: 'Reload app:',
    duplicateText: {
      title: 'Product already listed',
      body: 'Insert it anyway?'
    },
    newYearText: 'Happy New Year!'
  }),
  getters: {},
  actions: {
    checkAndSetLanguage() {
      const langIta = window.localStorage.getItem('langIta');
      this.langIta = langIta === 'true';
      const langSpanish = window.localStorage.getItem('langSpanish');
      this.langSpanish = langSpanish === 'true';
      const langEnglish = window.localStorage.getItem('langEnglish');
      this.langEnglish = langEnglish === 'true';

      if (!this.langIta && !this.langEnglish && !this.langSpanish) {
        //se non c'è nessuna lingua impostata, imposto di default quella in inglese
        this.englishDefaultSetting();
      }
      if (this.langIta) {
        this.setItalianTranslations();
      } else if (this.langSpanish) {
        this.setSpanishTranslations();
      } else {
        this.categories = this.engCategories;
      }
      this.categories.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    },
    async englishDefaultSetting() {
      window.localStorage.setItem('langEnglish', true);
      this.langEnglish = await window.localStorage.getItem('langEnglish');
    },
    setEnglishLanguage() {
      this.langIta = false;
      this.langSpanish = false;
      this.langEnglish = true;
      this.placeholder = 'Write what to buy';
      this.defaultPlaceholderText = 'Write what to buy';
      this.categories = this.engCategories;
      this.copyList.text = 'List copied to clipboard';
      this.share.text = 'Link copied to clipboard, paste it with whoever you want.';
      window.localStorage.setItem('langIta', false);
      window.localStorage.setItem('langSpanish', false);
      window.localStorage.setItem('langEnglish', true);
    },
    setItalianoLanguage() {
      this.langSpanish = false;
      this.langEnglish = false;
      this.langIta = true;
      this.placeholder = 'Scrivi qui cosa comprare';
      this.defaultPlaceholderText = 'Scrivi qui cosa comprare';
      this.categories = this.itaCategories;
      this.copyList.text = 'Lista copiata negli appunti';
      this.share.text = 'Link copiato negli appunti, incollalo con chi vuoi.';
      window.localStorage.setItem('langSpanish', false);
      window.localStorage.setItem('langEnglish', false);
      window.localStorage.setItem('langIta', true);
    },
    setSpanishLanguage() {
      this.langEnglish = false;
      this.langIta = false;
      this.langSpanish = true;
      this.placeholder = 'Escriba aquí qué comprar';
      this.defaultPlaceholderText = 'Escriba aquí qué comprar';
      this.categories = this.spanCategories;
      this.copyList.text = 'Lista copiada en el portapapeles';
      this.share.text = 'Copia el enlace en el portapapeles y pégalo con quien quieras.';
      window.localStorage.setItem('langIta', false);
      window.localStorage.setItem('langEnglish', false);
      window.localStorage.setItem('langSpanish', true);
    },
    insertAllCategories() {
      if (this.langIta) {
        this.itaCategories.filter(cat => cat.active).forEach((category) => {
          this.todosStore.newTodo = category.name;
          this.todosStore.skipCheck = true;
          this.todosStore.addTodo();
        });
      } else if (this.langSpanish) {
        this.spanCategories.filter(cat => cat.active).forEach((category) => {
          this.todosStore.newTodo = category.name;
          this.todosStore.skipCheck = true;
          this.todosStore.addTodo();
        });
      } else {
        this.engCategories.filter(cat => cat.active).forEach((category) => {
          this.todosStore.newTodo = category.name;
          this.todosStore.skipCheck = true;
          this.todosStore.addTodo();
        });
      }
    },
    setItalianTranslations() {
      this.placeholder = 'Scrivi qui cosa comprare';
      this.defaultPlaceholderText = 'Scrivi qui cosa comprare';
      this.categories = this.itaCategories;
      this.copyList.text = 'Lista copiata negli appunti';
      this.share.text = 'Link copiato negli appunti, incollalo con chi vuoi.';
      this.confirmText = 'Sei sicuro di voler eliminare:\n';
      this.selectedTodosConfirmText =
        'Stai per eliminare questi elementi';
      this.settingsTextTitle = 'Impostazioni';
      this.shoppingListTitle = 'Lista Spesa';
      this.choseCategoryText = 'Scegli una categoria tra queste:';
      this.changeLanguage = 'Cambio lingua';
      this.languagesBtns.english = 'Inglese';
      this.languagesBtns.spanish = 'Spagnolo';
      this.languagesBtns.italian = 'Italiano';
      this.safeModeText.title = 'Modalità eliminazione sicura';
      this.safeModeText.description =
        'ti chiederà conferma di eliminazione per ogni singolo prodotto della lista';
      this.safeModeText.function = 'Clicca per attivare/disattivare';
      this.chosenThemeText = 'Tema impostato';
      this.changeThemeText = 'Cambio tema';
      this.autoDeleteEmptyCategoriesText.title = 'Auto eliminazione categorie vuote';
      this.autoDeleteEmptyCategoriesText.description = 'Scegli se eliminare manualmente le categorie rimaste vuote, oppure che vengano eliminate automaticamente.';
      this.autoDeleteEmptyCategoriesText.function = 'Clicca per attivare/disattivare';
      this.pasteListText.title = "Importa una lista da altre app";
      this.pasteListText.subtitle = 'Basterà copiarla e incollarla nel riquadro e cliccare su importa. NB: separa gli elementi della lista mandandoli a capo';
      this.shareText = 'Condividi App';
      this.importText = 'Importa';
      this.updateText.description = "Se il pulsante è verde, clicca per aggiornare";
      this.updateText.available = 'Aggiorna';
      this.updateText.unavailable = 'Nessun Aggiornamento';
      this.insertAll = 'Inserisci tutte';
      this.removeEmpty = 'Rimuovi vuote';
      this.deleteAll = 'Cancella tutto';
      this.deleteAllConfirmText = 'Sei sicuro di voler eliminare \n tutta la lista?';
      this.helperDescription.troubleshooting = 'Risoluzione Problemi';
      this.helperDescription.troubleshootingText.part1 = " Nel caso riscontrassi lentezza o blocchi nel caricamento di immagini, controlla la tua connessione, se è ok prova a riavviare l'app. Se il problema persiste segnalalo all'email nella sezione contatti qui sopra.";
      this.helperDescription.troubleshootingText.part2 = "Non salviamo dati, non salviamo nessun tuo dato personale, ne posizione, e non salviamo le tue liste della spesa. I dati vengono salvati in locale solamente sul tuo dispositivo, quindi se dovessi perdere la lista eliminandola per sbaglio, l'unico modo per recuperarla è cliccando sul pulsante nella sezione 'importa ultimo backup' più in alto.";
      this.helperDescription.troubleshootingText.part3 = "Ma attenzione! ti importa solo l'ultima cancellazione fatta!";
      this.helperDescription.troubleshootingText.part4 = "Se dovessi trovarti la lista svuotata senza che tu l'abbia fatto realmente, molto probabilmente il tuo smartphone ha uno spazio di archiviazione in memoria basso.";
      this.helperDescription.troubleshootingText.part5 = "Se invece sostieni di avere memoria e i dati si cancellano ugualmente, allora segnalalo all'email nella sezione contatti qui sopra.";
      this.helperDescription.instructionsTitle = 'Istruzioni';
      this.helperDescription.addEditDelete = 'Aggiungere, Modificare, Eliminare';
      this.helperDescription.add = 'serve per aggiungere alla lista roba da comprare.';
      this.helperDescription.edit = 'serve per modificare un nome e salvare le modifiche cliccando';
      this.helperDescription.delete = 'serve per modificare eliminare roba dalla lista.';
      this.helperDescription.backToTop = 'serve per tornare in cima alla lista. Funziona quando la lista è molto lunga.';
      this.helperDescription.categories = 'Categorie';
      this.helperDescription.addCategory.part1 = 'Per aggiungere una categoria basta scriverla e cliccare su';
      this.helperDescription.addCategory.part2 = 'oppure sceglierla nel riquadro cliccando';
      this.helperDescription.addCategory.part3 = 'Ti apparirà';
      this.helperDescription.addCategory.part4 = 'Così';
      this.helperDescription.addCategory.part5 = 'e cliccando sul nome si';
      this.helperDescription.addCategory.part6 = 'evidenzierà';
      this.helperDescription.addCategory.part7 = ' così potrai aggiungerci roba al suo interno.Una volta finito basta ricliccare sul nome o su qualsiasi altro nome di altre categorie.';
      this.helperDescription.addAllCat = 'È possibile aggiungere tutte le categorie cliccando su';
      this.helperDescription.removeEmptyCat = 'È possibile eliminare solo le categorie lasciate vuote cliccando su';
      this.helperDescription.suggestionsTitle = 'Suggerimenti';
      this.helperDescription.suggestions.part1 = 'Quando clicchi su una categoria per aggiungere elementi, compare questo pulsante';
      this.helperDescription.suggestions.part2 = "che al click ti mostra una serie di suggerimenti di prodotti inerenti alla categoria selezionata. Basta cliccare su l'elemento che ti interessa e lo troverai inserito in lista nella categoria apposita.";
      this.helperDescription.dragNdropTitle = 'Trascina e sposta elementi';
      this.helperDescription.dragNdropText.part1 = 'Se tieni premuto sul nome del prodotto per 3 secondi oppure se clicchi su';
      this.helperDescription.dragNdropText.part2 = 'potrai trascinare gli elementi e, tenendo premuto, spostarli dove vuoi.';
      this.helperDescription.dragNdropText.dragginText = 'Trascina gli elementi della lista dove vuoi';
      this.helperDescription.multipleDeleteTitle = 'Seleziona ed elimina più elementi';
      this.helperDescription.multipleDeleteText.part1 = 'Puoi eliminare più prodotti insieme cliccando su';
      this.helperDescription.multipleDeleteText.part2 = 'Così li smarchi e poi a fine spesa cliccado sul';
      this.helperDescription.multipleDeleteText.part3 = 'in basso verranno eliminati solo quelli che hai smarcato.';
      this.helperDescription.multipleDeleteText.deselectAllText = 'Puoi deselezionarli tutti cliccando su';
      this.helperDescription.multipleDeleteText.confirmDeselectAllText = 'e poi confermando (o annullando) cliccando su';
      this.helperDescription.copyListTitle = 'Copia lista, Evidenzia elementi';
      this.helperDescription.copyListText = 'serve per copiare la lista e incollarla dove vuoi.';
      this.helperDescription.highlightImportant.part1 = 'Puoi rendere "importante" un prodotto cliccando sul nome e verrà';
      this.helperDescription.highlightImportant.part2 = 'evidenziato';
      this.helperDescription.highlightImportant.part3 = 'così non potrà essere eliminato o modificato.';
      this.helperDescription.deleteAllTitle = 'Elimina tutto';
      this.helperDescription.deleteAllText.part1 = 'Se clicchi su';
      this.helperDescription.deleteAllText.part2 = "ti apparirà un riquadro di conferma per l'eliminazione di TUTTA la lista.";
      this.helperDescription.videoAlert = 'Il tuo device non supporta i video tag. Contatta il supporto.';
      this.helperDescription.support = 'Contatti';
      this.helperDescription.supportText = 'Per qualsiasi segnalazione puoi contattarmi:';
      this.helperDescription.socialText = 'Segui le pagine social dello sviluppatore, puoi contattarmi anche qui:';
      this.helperDescription.githubText = 'Se sei uno sviluppatore magari puoi darmi qualche consiglio su come migliorare nel codice:';
      this.helperDescription.adviceTitle = 'IMPORTANTE: ';
      this.helperDescription.adviceText = "Questa è una web app convertita in app per smartphone, ed è sempre manutenuta, quindi non fare caso alla data dell'ultimo aggiornamento che appare nello store.";
      this.helperDescription.dateLastUpdateText = "La data reale dell'ultimo aggiornamento è: ";
      this.cancerDayText = '4 Febbraio: Giornata mondiale contro il cancro';
      this.peaceDayText = '1 Gennaio: Giornata mondiale della pace';
      this.womensDayText = 'Auguri a tutte le donne';
      this.shoahText = '27 gennaio: Giorno della memoria';
      this.earthDayText = '22 aprile: Giornata della terra';
      this.beerDayText = 'Buona giornata della birra';
      this.parentsDayText = '1 Giugno: Auguri a tutti i genitori';
      this.toiletDayText = '19 Novembre: Giornata Mondiale del Gabinetto 🤣';
      this.worldWideWebText = 'Il 6 agosto 1991 nasce il World Wide Web';
      this.worldPizzaDayText = '17 Gennaio: Giornata mondiale della Pizza 🤌🏻';
      this.valentinesDayText = 'Buon San Valentino ❤️';
      this.worldEnvironmentDayText = "5 Giugno: Giornata mondiale dell'ambiente";
      this.humanRightsDayText = '10 dicembre: Giornata mondiale dei diritti umani';
      this.starWarsDay = '25 Maggio 1977: Esce al cinema Star Wars';
      this.backupListText.title = 'Importa ultimo backup';
      this.backupListText.description = "Se hai eliminato qualcosa o tutta la lista per sbaglio, puoi recuperare l'intera lista DALL'ULTIMA eliminazione.";
      this.backupListText.confirm = "Sei sicuro?";
      this.backupListText.noBackupText = 'Non ci sono backup salvati';
      this.infoCategoriesAlert = 'Se non ritrovi le categorie assicurati che la lingua sia quella esatta. Le categorie vengono importate correttamente se sono scritte nella lingua selezionata.';
      this.priceText = 'Se scrivi un numero con la valuta € o £ o $ in automatico ti calcolerà il totale di tutti i prezzi scritti in lista, ma attenzione funziona solo se scrivi la valuta, ad esempio: pane 2,99€.';
      this.deselectAllText = 'Deseleziona Tutti';
      this.importantTodos.alert = "Non ci sono elementi selezionati come importanti";
      this.importantTodos.text.part1 = "Cliccando su";
      this.importantTodos.text.part2 = "potrai visualizzare solo gli elementi importanti che hai selezionato. Attualmente è solo in modalità visualizzazione.";
      this.importantTodos.addedImportantText = "Segnato come importante";
      this.showOnlyLatestDeletedText.title = "Mostra gli ultimi cancellati";
      this.showOnlyLatestDeletedText.description = "Qui troverai soltanto la tua ultima cancellazione singola o multipla, giusto come riepilogo";
      this.showOnlyLatestDeletedText.singleTodoText = "Ultima eliminazione singola";
      this.showOnlyLatestDeletedText.multipleTodosText = "Ultima eliminazione multipla";
      this.suggestions.tipsBtnText = 'Mostra suggerimenti';
      this.suggestions.headerInfo = 'Clicca su uno di questi elementi per aggiungerlo alla lista';
      this.categoryTipText = 'Se clicchi sulla categoria potrai aggiungere prodotti al suo interno';
      this.reloadAppText = "Ricarica l'app:";
      this.duplicateText.title = "Prodotto già presente in lista";
      this.duplicateText.body = "Inserirlo comunque?";
      this.newYearText = "Buon Anno!";
    },
    setSpanishTranslations() {
      this.placeholder = 'Escriba aquí qué comprar';
      this.defaultPlaceholderText = 'Escriba aquí qué comprar';
      this.categories = this.spanCategories;
      this.copyList.text = 'Lista copiada en el portapapeles';
      this.share.text = 'Copia el enlace en el portapapeles y pégalo con quien quieras.';
      this.confirmText = '¿Estás seguro de que quieres borrar:\n';
      this.selectedTodosConfirmText =
        'Está a punto de eliminar estos elementos';
      this.settingsTextTitle = 'Ajustes';
      this.shoppingListTitle = 'Lista de la compra';
      this.choseCategoryText = 'Elija una categoría de estas:';
      this.changeLanguage = 'Cambio idioma';
      this.languagesBtns.english = 'Inglés';
      this.languagesBtns.spanish = 'Español';
      this.languagesBtns.italian = 'Italiano';
      this.safeModeText.title = 'Modo de borrado seguro';
      this.safeModeText.description =
        'le pedirá que confirme la eliminación de cada producto de la lista.';
      this.safeModeText.function = 'Pulse para activar/desactivar';
      this.chosenThemeText = 'Conjunto de temas';
      this.changeThemeText = 'Cambiar de tema';
      this.autoDeleteEmptyCategoriesText.title = 'Eliminación automática de categorías vacías';
      this.autoDeleteEmptyCategoriesText.description = 'Elija si desea eliminar manualmente las categorías vacías o que se eliminen automáticamente.';
      this.autoDeleteEmptyCategoriesText.function = 'Pulse para activar/desactivar';
      this.pasteListText.title = "Importar una lista desde otras aplicaciones";
      this.pasteListText.subtitle = 'Basta con copiarla y pegarla en la casilla y hacer clic en importar. Nota: separe los elementos de la lista enviándolos con un retorno de carro.';
      this.shareText = 'Compartir App';
      this.importText = 'Importar';
      this.updateText.description = "Si el botón está verde, pulse para actualizar";
      this.updateText.available = 'Actualización';
      this.updateText.unavailable = 'Ninguna Actualización';
      this.insertAll = 'Introduzca todos';
      this.removeEmpty = 'Eliminar categorías vacías';
      this.deleteAll = 'Borrar todo';
      this.deleteAllConfirmText = '¿Estás seguro de que quieres borrar \n toda la lista?';
      this.helperDescription.troubleshooting = 'Solución de problemas';
      this.helperDescription.troubleshootingText.part1 = "En caso de que experimentes lentitud o congelación al cargar las imágenes, comprueba tu conexión, si está bien prueba a reiniciar la aplicación. Si el problema persiste repórtalo al correo electrónico en la sección de contactos anterior.";
      this.helperDescription.troubleshootingText.part2 = "No guardamos ninguno de tus datos, ni ubicación, ni guardamos tus listas de la compra. Los datos solo se guardan localmente en tu dispositivo, por lo que si pierdes tu lista por accidente borrándola, la única forma de recuperarla es pulsando el botón de la sección 'importar última copia de seguridad' que aparece más arriba.";
      this.helperDescription.troubleshootingText.part3 = "¡Cuidado! ¡Sólo te importa el último borrado realizado!";
      this.helperDescription.troubleshootingText.part4 = "Si ves que tu lista se ha vaciado sin haberlo hecho realmente, lo más probable es que tu smartphone tenga poco espacio de almacenamiento.";
      this.helperDescription.troubleshootingText.part5 = "Si, por el contrario, afirma tener memoria y los datos siguen borrados, comunícalo al correo electrónico de la sección de contactos anterior.";
      this.helperDescription.instructionsTitle = 'Instrucciones';
      this.helperDescription.addEditDelete = 'Añadir, Editar, Borrar';
      this.helperDescription.add = 'sirve para añadir a la lista de cosas que comprar.';
      this.helperDescription.edit = 'se utiliza para editar un nombre y guardar los cambios pulsando';
      this.helperDescription.delete = 'se utiliza para editar borrar cosas de la lista.';
      this.helperDescription.backToTop = 'se utiliza para volver al principio de la lista. Funciona cuando la lista es muy larga.';
      this.helperDescription.categories = 'Categorías';
      this.helperDescription.addCategory.part1 = 'Para añadir una categoría, basta con escribirla y hacer clic en';
      this.helperDescription.addCategory.part2 = 'o elíjalo en el recuadro haciendo clic en';
      this.helperDescription.addCategory.part3 = 'Te parecerá';
      this.helperDescription.addCategory.part4 = 'Así';
      this.helperDescription.addCategory.part5 = 'y haciendo clic en el nombre sí';
      this.helperDescription.addCategory.part6 = 'destacará';
      this.helperDescription.addCategory.part7 = ' Una vez que hayas terminado, haz clic en el nombre de la categoría o en cualquier otro nombre.';
      this.helperDescription.addAllCat = 'Puede añadir todas las categorías haciendo clic en';
      this.helperDescription.removeEmptyCat = 'Sólo puede eliminar las categorías que quedan vacías pulsando en';
      this.helperDescription.suggestionsTitle = 'Consejos';
      this.helperDescription.suggestions.part1 = 'Al hacer clic en una categoría para añadir artículos, aparece este botón';
      this.helperDescription.suggestions.part2 = "que al pulsarlo le muestra una serie de sugerencias de productos relacionados con la categoría seleccionada. Simplemente haga clic en el artículo que le interese y lo encontrará listado en la categoría correspondiente.";
      this.helperDescription.dragNdropTitle = 'Arrastre y suelte elementos';
      this.helperDescription.dragNdropText.part1 = 'Si mantiene pulsado el nombre del producto durante 3 segundos o si hace clic en';
      this.helperDescription.dragNdropText.part2 = 'puedes arrastrar elementos y, manteniéndolos pulsados, moverlos donde quieras.';
      this.helperDescription.dragNdropText.dragginText = 'Arrastre los elementos de la lista hasta donde desee';
      this.helperDescription.multipleDeleteTitle = 'Seleccionar y eliminar varios elementos';
      this.helperDescription.multipleDeleteText.part1 = 'Puede eliminar varios productos a la vez pulsando en';
      this.helperDescription.multipleDeleteText.part2 = 'Así que las desmarcas y al final de la compra haces clic en el botón';
      this.helperDescription.multipleDeleteText.part3 = 'en la parte inferior, sólo se borrarán los que hayas desmarcado.';
      this.helperDescription.multipleDeleteText.deselectAllText = 'Puede anular la selección de todos ellos haciendo clic en';
      this.helperDescription.multipleDeleteText.confirmDeselectAllText = 'y luego confirmar (o cancelar) pulsando en';
      this.helperDescription.copyListTitle = 'Copiar lista, Resaltar elementos';
      this.helperDescription.copyListText = 'sirve para copiar la lista y pegarla donde quieras.';
      this.helperDescription.highlightImportant.part1 = 'Puede hacer que un producto sea "importante" haciendo clic en el nombre y será';
      this.helperDescription.highlightImportant.part2 = 'destacado';
      this.helperDescription.highlightImportant.part3 = 'para que no pueda borrarse ni modificarse.';
      this.helperDescription.deleteAllTitle = 'Borra todo';
      this.helperDescription.deleteAllText.part1 = 'Si pulsa en';
      this.helperDescription.deleteAllText.part2 = "verá un cuadro de confirmación para borrar TODA la lista.";
      this.helperDescription.videoAlert = 'Tu dispositivo no admite etiquetas de vídeo. Póngase en contacto con el servicio de asistencia.';
      this.helperDescription.support = 'Contactos';
      this.helperDescription.supportText = 'Para cualquier informe puede ponerse en contacto conmigo:';
      this.helperDescription.socialText = 'Siga las páginas sociales del desarrollador, también puede ponerse en contacto conmigo aquí:';
      this.helperDescription.githubText = 'Si usted es un desarrollador tal vez usted me puede dar algunos consejos sobre cómo mejorar en el código:';
      this.helperDescription.adviceTitle = 'IMPORTANTE: ';
      this.helperDescription.adviceText = "Esta es una aplicación web convertida en aplicación para smartphone, y se mantiene siempre, así que no prestes atención a la fecha de la última actualización que aparece en la tienda.";
      this.helperDescription.dateLastUpdateText = "La fecha real de la última actualización es: ";
      this.cancerDayText = '4 de febrero: Día Mundial contra el Cáncer';
      this.peaceDayText = '1 de enero: Día Mundial de la Paz';
      this.womensDayText = 'Mis mejores deseos a todas las mujeres';
      this.shoahText = '27 de enero: Día de la Memoria';
      this.earthDayText = 'Día de la Tierra';
      this.beerDayText = 'Feliz Día de la Cerveza';
      this.parentsDayText = '1 de junio: saludos a todos los padres';
      this.toiletDayText = '19 de noviembre: Día Mundial del Gabinete 🤣';
      this.worldWideWebText = 'El 6 de agosto de 1991 nació la World Wide Web';
      this.worldPizzaDayText = '17 de enero: Día Mundial de la Pizza 🤌🏻';
      this.valentinesDayText = 'Feliz Día de los Enamorados ❤️';
      this.worldEnvironmentDayText = '5 de junio: Día Mundial del Medio Ambiente';
      this.humanRightsDayText = '10 de diciembre: Día Mundial de los Derechos Humanos';
      this.starWarsDay = '25 de mayo de 1977: Star Wars se estrena en los cines';
      this.backupListText.title = 'Importar la última copia de seguridad';
      this.backupListText.description = "Si has borrado algo o toda la lista por error, puedes recuperar toda la lista desde el ÙLTIMO borrado.";
      this.backupListText.confirm = '¿Seguro?';
      this.backupListText.noBackupText = 'No hay copias de seguridad guardadas';
      this.infoCategoriesAlert = 'Si no encuentra las categorías, asegúrese de que el idioma es correcto. Las categorías se importan correctamente si están escritas en el idioma seleccionado.';
      this.priceText = 'Si tecleas un número con la moneda € o £ o $ calculará automáticamente el total de todos los precios escritos en la lista, pero cuidado, sólo funciona si tecleas la moneda, por ejemplo, pan 2,99€.';
      this.deselectAllText = 'Desmarcar Todo';
      this.importantTodos.alert = "No hay elementos seleccionados como importantes";
      this.importantTodos.text.part1 = "Haga clic en";
      this.importantTodos.text.part2 = "para visualizar sólo los elementos importantes que haya seleccionado. Actualmente sólo está en modo de visualización.";
      this.importantTodos.addedImportantText = "Marcado como importante";
      this.showOnlyLatestDeletedText.title = "Mostrar los últimos borrados";
      this.showOnlyLatestDeletedText.description = "Aquí sólo encontrarás tu último borrado único o múltiple, a modo de resumen";
      this.showOnlyLatestDeletedText.singleTodoText = "Última eliminación simple";
      this.showOnlyLatestDeletedText.multipleTodosText = "Última eliminación múltiple";
      this.suggestions.tipsBtnText = 'Mostrar consejos';
      this.suggestions.headerInfo = 'Haga clic en uno de estos elementos para añadirlo a la lista';
      this.categoryTipText = 'Si hace clic en la categoría puede añadir productos a la misma';
      this.reloadAppText = "Recargar aplicación:";
      this.duplicateText.title = "Producto ya listado";
      this.duplicateText.body = "¿Insertarlo de todos modos?";
      this.newYearText = "¡Feliz Año Nuevo!";
    }
  },
});

