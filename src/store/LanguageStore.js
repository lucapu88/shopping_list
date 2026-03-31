import { defineStore } from 'pinia';
import { useTodoStore } from '@/store/TodoStore';
import { useCategoriesStore } from '@/store/CategoriesStore';

export const useLanguageStore = defineStore('Language', {
  state: () => ({
    todosStore: useTodoStore(),
    categoriesStore: useCategoriesStore(),
    languagesBtns: {
      english: 'English',
      spanish: 'Spanish',
      italian: 'Italian',
      french: 'French',
    },
    langIta: false,
    langSpanish: false,
    langEnglish: false,
    langFrench: false,
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
      title: 'Share App',
      info: 'Share the app with whoever you want! By sending the link or having the QR code scanned.',
      text: 'Link copied to clipboard, paste it with whoever you want.',
      qrMessage: "Increase screen brightness for better scanning",
      desktop: 'There is also a desktop version dedicated to Apple users or to use it from a PC'
    },
    confirmText: 'Are you sure you want to delete:\n',
    completeConfirmText: '', // Questo testo viene editato nel TodoStore.js
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
    multipleCategoryInsertionText: {
      title: 'Multiple category entries',
      description: 'Allows you to enter multiple items when selecting a category.',
      function: 'Click to activate/deactivate',
      momentaryAlert: 'The function is already active because it was already like that from the beginning, but now if you want you can deactivate it.'
    },
    pasteListText: {
      title: 'Import a list from other apps',
      subtitle: 'Just copy and paste it into the box and click import. N.B.: Separates list items by sending them to a head',
    },
    importText: 'Import',
    updateText: {
      description: 'If the button is green, click to update the app',
      available: 'Update',
      unavailable: 'No Updates',
      updated: false,
    },
    insertAll: 'Insert all',
    removeEmpty: 'Remove only empty',
    deleteAll: 'Delete',
    deleteAllConfirmText: 'Are you sure you want \n delete the whole list?',
    renameListText: {
      title: "Rename Lists",
      description: 'Here you can give a name to your lists, just enter it in the input and then click on "save".'
    },
    toggleCategoriesModalText: {
      title: "Show/Hide Categories",
      description: "Choose whether or not to automatically show the category modal when you type something.",
    },
    //-------------------------------------------------------------------------- HELPER DESCRIPTIONS
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
        part1: 'To add a category, click on',
        part2: 'and select it from the box by clicking',
        part3: 'It will appear in the highlighted list',
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
        part1: 'If you click on',
        part2: 'you can drag elements and, by holding them down, move them wherever you want.',
        dragginText: 'Drag the elements of the list where you want'
      },
      multipleDeleteTitle: 'Select and delete multiple items',
      multipleDeleteText: {
        part1: 'You can delete multiple products together by clicking on',
        part2: 'So you mark them and then at the end of shopping by clicking on',
        part3: 'at the bottom only the ones you marked will be deleted.',
        deselectAllText: 'You can deselect them all by clicking on',
        confirmDeselectAllText: 'and then confirming (or cancelling) by clicking on',
        hideText: 'You can choose to hide selected items by clicking on',
        showText: 'Or show them by clicking on'
      },
      openSecondPanelText: "This is used to display a secondary panel that will give you other options, such as those listed below",
      copyListTitle: 'Copy list, Highlight items',
      copyListText: 'is used to copy the list and paste it wherever you want.',
      highlightImportant: {
        part1: 'You can make a product "important" by DOUBLE clicking on the name and it will be ',
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
      dateLastUpdateText: "The actual date of the last update is: ",
      changeList: {
        changeListTitle: 'Change list',
        part1: 'To change the list you are working on, just click on',
        part2: 'and choose the list you want to work on',
        moveText: "You can move items from one list to another by clicking on",
        copyText: "You can also copy items from one list to another by clicking on",
        final: "Both buttons show instructions that will guide you step by step."
      },
    },
    //--------------------------------------------------------------------- FESTIVITÀ
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
    newYearText: 'Happy New Year!',
    merryChristmasText: 'Merry Christmas and Happy Holidays! 🎄',
    //------------------------------------------------------------------------------------ ALTRO
    backupListText: {
      title: 'Import Last Backup',
      preDescriprion: 'Every time you delete something, AND ONLY IF YOU DELETE IT, an automatic backup of THE LAST deletion is saved.',
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
      emptyListText: 'No deletions made yet',
    },
    suggestions: {
      tipsBtnText: 'Show suggestions',
      headerInfo: 'Click on one of these items to add it to the list',
    },
    categoryTipText: 'If you click on the category you can add products to it',
    reloadAppText: 'Reload',
    duplicateText: {
      title: 'Product already listed',
      body: 'Insert it anyway?'
    },
    alertMomentaneo: "Now you can create multiple lists! Isn't that wonderful? If you shop at different supermarkets or want to have different lists based on your needs, you have 4 new lists at your disposal! Enjoy!",
    alertMomentaneoTitolo: "New Feature: ",
    saveText: "Save",
    feedback: {
      title: "Your opinion matters to us as we grow! Send us your opinion or suggestion",
      subtitle: "To report bugs or errors, you can write to: shoppinglist.service@outlook.com or include your email below, so I can contact you to understand the problem.",
      placeholder: "Leave your comments. ATTENTION: Messages containing swear words will be automatically discarded after sending. ✌️",
      extraText: "If you'd like us to contact you, please include your email address in your message.",
      successMessage: "Message sent successfully, thank you! 🤗",
      errorMessage: "❌ Error sending message. Please try again. If the service doesn't work, please contact us directly at: ",
      statusText: "Please enter a message before sending.",
    },
    send: "Send",
    listSelection: {
      title: 'Choose the list you want',
      alert: 'You are already on this list'
    },
    archive: 'Archive',
    moveMode: {
      moveOrCopyTitle: 'Move or Copy items from lists',
      moveElementText: 'Move',
      copyElementText: 'Copy',
      istruction1: 'Select the items to move from the list',
      copyIstruction1: 'Select the items to copy from the list',
      istruction2: 'Select the destination list',
      istructionAlert: 'The item is already in this list. Please select another',
      movedText: 'MOVED successfully in list',
      copiedText: 'COPIED successfully in list',
    },
    selectedListText: 'You are writing on the list: ',
    welcomeMessage: 'Thank you for downloading Shopping List, and welcome!',
    totalPriceText: 'Total Price: ',
    loyalityCards: {
      title: 'Loyalty Cards',
      functionText: 'Add a card',
      selectCardText: 'Select card',
      nameInputPlaceholder: 'Card Name',
      isctructionText: 'Enter a name to save the image',
      confirmAlertMessage: 'Are you sure you want to delete the card',
      alertMessage: 'A card with this name already exists, change it and try again please',
      infoText: 'Here you can save images of your loyalty cards. Tip: the photo must be clear and sharp to be easily read at the supermarket',
      infoSubText: 'You can save up to a maximum of 25 cards, if you want more contact me at the email in the support section',
      errorMessage: 'Error loading cards... Please try again',
      maxNumberCardsMessage: 'You have reached the maximum number of savable cards',
      cropMessage: 'Crop the photo taking only the barcode',
      orderText: 'Alphabetical order'
    },
    refreshText: 'Refresh',
    alertMessageTitle: "NEW IMPORTANT CHANGES",
    understandText: "I understand",
    importantBtnText: "Important",
    importantInfoText: "In this section you will find, in view mode, only the items you have marked as important",
    selectCategoryText: "Choose the category you want to list the product in",
    copyListBtnText: 'Copy list',
    importListExampleText: 'Example of how it should be written',
    show: 'show',
    hide: 'hide',
    close: 'close',
    periodicList: {
      periodicListAddedText: 'Added to periodic list',
      periodicListTitle: 'Periodic List',
      info: {
        part1: 'Here there are products that you buy more often, so you can insert them faster into the list.',
        part2: 'To insert a product in this list, just click, in the main list, on: ',
        part3: 'To add a product to your main list, just click on the product, then on the category (or vice versa) and then on the "send" button.',
        part4: 'You can also not select any category and insert the product directly by selecting only it.'
      },
      periodicListButtonText: 'Periodic List',
      confirmText: "Do you confirm the removal?",
      confirmSendText: "Successfully added to the list"
    },
    downloadAppText: "You are on the desktop version: we recommend downloading the app for better usability",
    recipes: {
      recipesDisclaimer: "WARNING: AI can make mistakes! Automatically generated recipes may contain errors. ALWAYS check the ingredients!",
      recipesSubDisclaimer: "The app and its developers assume no responsibility for any damages or problems arising from the use of the recipes or the user's failure to check the ingredients.",
      totalRecipesText: "Generations left:",
      generationsEndedText: "Generations ended",
      alertRecepiesText: "It may take 30 to 60 seconds...It depends on the chef's stress level 😜",
      recipesBtnText: "Generate recipe",
      ingredients: "Ingredients",
      preparation: "Preparation",
      time: "Time",
      difficulty: "Difficulty",
      recipeGeneratedText: "Ready recipe",
      latestText: "latest recipes"
    },
    paymentModal: {
      title: "Unlock AI Recipes",
      description: "Transform your shopping list into delicious dishes with artificial intelligence",
      subdescription: "The AI ​​will read your list discarding inedible products and create a recipe for you based on what you entered",
      popularText: 'Most popular',
      generationsText: "generations",
      payBtnText: "Pay with Stripe",
      stripeFooterInfo: "Secure and encrypted payment with Stripe",
      byRecipePrice: 'By generation',
      selectPlanAlertText: "Choose the plan you want",
      loggetText: "Logged in as",
      loginFirstText: "Log in before paying",
      noSubscriptionText: "One-time purchase, NO subscription required"
    },
    login: {
      title: "Save your recipes",
      subtitle: "Sign in to avoid losing your generations if you change devices.",
      google: "Continue with Google",
      otherEmail: "Continue with Email",
      register: "Register",
      singIn: "Sign in",
      accountOk: 'Already have an account? Log in',
      accountNo: "Don't have an account? Register",
      resetPassword: 'Forgot your password?',
      emailSentText: "Email sent! Check your inbox.",
      recLink: "Send recovery link",
      emailTitle: "Enter your email to receive the recovery link"
    },
    randomPhrases: [
      `...Lighting the coals...`,
      `...Heating up the stove...`,
      `...I can't find the pot, damn it!`,
      `...Give me a ladle!`,
      `...Preparing the ingredients...`,
      `...Slicing the salami...`,
      `...Checking the fridge...`,
      `...Drinking a beer...`,
      `...Getting mad at the waiter...`,
      `...Breaking the blender...`,
      `...I can't find the ingredient...`,
      `...Ingredient found...`,
      `...The water is boiling...`,
      `...Is the order right?`,
      `UÉ UÉÉÉÉÉÉÉÉÉÉÉÉÉÉ!!!`,
    ],
    microphoneRec: {
      permissionDeniedText: "Microphone permission denied. Please allow microphone access in your browser settings and try again.",
      voiceError: "Voice recognition error, try again and if it persists, contact support. Error:"
    }
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
      const langFrench = window.localStorage.getItem('langFrench');
      this.langFrench = langFrench === 'true';

      if (!this.langIta && !this.langEnglish && !this.langSpanish && !this.langFrench) {
        //se non c'è nessuna lingua impostata, imposto di default quella in inglese
        this.englishDefaultSetting();
      }
      if (this.langIta) {
        this.setItalianTranslations();
      } else if (this.langSpanish) {
        this.setSpanishTranslations();
      } else if (this.langFrench) {
        this.setFrenchTranslations();
      } else {
        this.categoriesStore.categories = this.categoriesStore.engCategories;
      }
      this.categoriesStore.sortCategories();
    },
    async englishDefaultSetting() {
      window.localStorage.setItem('langEnglish', true);
      this.langEnglish = await window.localStorage.getItem('langEnglish');
    },
    setEnglishLanguage() {
      this.langIta = false;
      this.langSpanish = false;
      this.langFrench = false;
      this.langEnglish = true;
      this.placeholder = 'Write what to buy';
      this.defaultPlaceholderText = 'Write what to buy';
      this.categoriesStore.categories = this.categoriesStore.engCategories;
      this.copyList.text = 'List copied to clipboard';
      this.share.text = 'Link copied to clipboard, paste it with whoever you want.';
      window.localStorage.setItem('langIta', false);
      window.localStorage.setItem('langSpanish', false);
      window.localStorage.setItem('langFrench', false);
      window.localStorage.setItem('langEnglish', true);
    },
    setItalianoLanguage() {
      this.langSpanish = false;
      this.langEnglish = false;
      this.langFrench = false;
      this.langIta = true;
      this.placeholder = 'Scrivi qui cosa comprare';
      this.defaultPlaceholderText = 'Scrivi qui cosa comprare';
      this.categoriesStore.categories = this.categoriesStore.itaCategories;
      this.copyList.text = 'Lista copiata negli appunti';
      this.share.text = 'Link copiato negli appunti, incollalo con chi vuoi.';
      window.localStorage.setItem('langSpanish', false);
      window.localStorage.setItem('langEnglish', false);
      window.localStorage.setItem('langFrench', false);
      window.localStorage.setItem('langIta', true);
    },
    setSpanishLanguage() {
      this.langEnglish = false;
      this.langIta = false;
      this.langFrench = false;
      this.langSpanish = true;
      this.placeholder = 'Escriba aquí qué comprar';
      this.defaultPlaceholderText = 'Escriba aquí qué comprar';
      this.categoriesStore.categories = this.categoriesStore.spanCategories;
      this.copyList.text = 'Lista copiada en el portapapeles';
      this.share.text = 'Copia el enlace en el portapapeles y pégalo con quien quieras.';
      window.localStorage.setItem('langIta', false);
      window.localStorage.setItem('langEnglish', false);
      window.localStorage.setItem('langFrench', false);
      window.localStorage.setItem('langSpanish', true);
    },
    setFrenchLanguage() {
      this.langEnglish = false;
      this.langIta = false;
      this.langSpanish = false;
      this.langFrench = true;
      this.placeholder = 'Écrivez ici quoi acheter';
      this.defaultPlaceholderText = 'Écrivez ici quoi acheter';
      this.categoriesStore.categories = this.categoriesStore.fraCategories;
      this.copyList.text = 'Liste copiée dans le presse-papiers';
      this.share.text = 'Lien copié dans le presse-papiers, collez-le avec qui vous voulez.';
      window.localStorage.setItem('langIta', false);
      window.localStorage.setItem('langEnglish', false);
      window.localStorage.setItem('langSpanish', false);
      window.localStorage.setItem('langFrench', true);
    },
    setItalianTranslations() { //------------------------------------------  ITA
      this.placeholder = 'Scrivi qui cosa comprare';
      this.defaultPlaceholderText = 'Scrivi qui cosa comprare';
      this.categoriesStore.categories = this.categoriesStore.itaCategories;
      this.copyList.text = 'Lista copiata negli appunti';
      this.share.text = 'Link copiato negli appunti, incollalo con chi vuoi.';
      this.confirmText = 'Sei sicuro di voler eliminare:\n';
      this.selectedTodosConfirmText = 'Stai per eliminare questi elementi';
      this.settingsTextTitle = 'Impostazioni';
      this.shoppingListTitle = 'Lista Spesa';
      this.choseCategoryText = 'Scegli una categoria tra queste:';
      this.changeLanguage = 'Cambio lingua';
      this.languagesBtns.english = 'Inglese';
      this.languagesBtns.spanish = 'Spagnolo';
      this.languagesBtns.italian = 'Italiano';
      this.languagesBtns.french = 'Francese';
      this.safeModeText.title = 'Modalità eliminazione sicura';
      this.safeModeText.description = 'ti chiederà conferma di eliminazione per ogni singolo prodotto della lista';
      this.safeModeText.function = 'Clicca per attivare/disattivare';
      this.chosenThemeText = 'Tema impostato';
      this.changeThemeText = 'Cambio tema';
      this.autoDeleteEmptyCategoriesText.title = 'Auto eliminazione categorie vuote';
      this.autoDeleteEmptyCategoriesText.description = 'Scegli se eliminare manualmente le categorie rimaste vuote, oppure che vengano eliminate automaticamente.';
      this.autoDeleteEmptyCategoriesText.function = 'Clicca per attivare/disattivare';
      this.multipleCategoryInsertionText.title = "Inserimento multiplo in categoria";
      this.multipleCategoryInsertionText.description = "Ti permette di inserire più elementi quando selezioni una categoria.";
      this.multipleCategoryInsertionText.function = 'Clicca per attivare/disattivare';
      this.multipleCategoryInsertionText.momentaryAlert = "La funzione già è attiva perchè era già così dall'inizio, ma adesso se vuoi puoi disattivarla.";
      this.pasteListText.title = "Importa una lista da altre app";
      this.pasteListText.subtitle = 'Basterà copiarla e incollarla nel riquadro e cliccare su importa. NB: separa gli elementi della lista mandandoli a capo';
      this.share.title = 'Condividi App';
      this.share.info = "Condividi l'app con chi vuoi! Inviando il link oppure facendo scannerizzare il QR code.";
      this.share.qrMessage = "Aumenta la luminisità dello schermo per una migliore scansione";
      this.share.desktop = "Esiste anche una versione desktop dedicata agli utenti Apple o per usarla da PC";
      this.importText = 'Importa';
      this.updateText.description = "Se il pulsante è verde, clicca per aggiornare";
      this.updateText.available = 'Aggiorna';
      this.updateText.unavailable = 'Nessun Aggiornamento';
      this.insertAll = 'Inserisci tutte';
      this.removeEmpty = 'Rimuovi vuote';
      this.deleteAll = 'Svuota';
      this.deleteAllConfirmText = 'Sei sicuro di voler eliminare \n tutta la lista?';
      this.renameListText.title = 'Rinomina Liste';
      this.renameListText.description = "Qui potrai dare un nome alle tue liste, basterà inserirlo nell'input e poi cliccare su 'salva'.";
      this.helperItaTranslations();
      this.festivitiesITATranslations();
      this.backupListText.title = 'Importa ultimo backup';
      this.backupListText.preDescriprion = "Ogni volta che elimini qualcosa, E SOLO SE LA ELIMINI, viene salvato un backup automatico DELL'ULTIMA eliminazione.";
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
      this.showOnlyLatestDeletedText.emptyListText = "Nessuna eliminazione effettuata ancora";
      this.suggestions.tipsBtnText = 'Mostra suggerimenti';
      this.suggestions.headerInfo = 'Clicca su uno di questi elementi per aggiungerlo alla lista';
      this.categoryTipText = 'Se clicchi sulla categoria potrai aggiungere prodotti al suo interno';
      this.reloadAppText = "Ricarica";
      this.duplicateText.title = "Prodotto già presente in lista";
      this.duplicateText.body = "Inserirlo comunque?";
      this.alertMomentaneo = "Ora puoi creare più liste! Non è meraviglioso? Nel caso fai spesa in supermercati diversi oppure vuoi avere liste diverse in base alle tue esigenze, insomma hai a disposizione 4 liste tutte nuove! Buon divertimento ";
      this.alertMomentaneoTitolo = "Nuova Funzionalità: ";
      this.saveText = "Salva";
      this.feedback.title = "Il tuo parere conta per farci crescere! Inviaci la tua opinione o un suggerimento";
      this.feedback.subtitle = "Per segnalazioni di bug o errori puoi scrivere a: shoppinglist.service@outlook.com oppure includi la tua mail qui sotto, così posso contattarti per comprendere il problema";
      this.feedback.placeholder = "Scrivi qui le tue osservazioni. ATTENZIONE: i messaggi con parolacce verranno automaticamente scartati dopo l'invio. ✌️";
      this.feedback.extraText = "Se desideri essere ricontattato, includi nel tuo messaggio il tuo indirizzo e-mail.";
      this.feedback.successMessage = "Messaggio inviato con successo, grazie! 🤗";
      this.feedback.errorMessage = "❌ Errore nell'invio del messaggio. Riprova. Se il servizio non funziona, contattaci direttamente a: ";
      this.feedback.statusText = "Inserisci un messaggio prima di inviare.";
      this.send = "Invia";
      this.listSelection.title = 'Scegli la lista che desideri';
      this.listSelection.alert = 'Sei già su questa lista';
      this.archive = 'Archivio';
      this.moveMode.moveOrCopyTitle = 'Sposta o Copia elementi dalle liste';
      this.moveMode.moveElementText = 'Sposta';
      this.moveMode.copyElementText = 'Copia';
      this.moveMode.istruction1 = 'Seleziona dalla lista gli elementi da spostare';
      this.moveMode.copyIstruction1 = 'Seleziona dalla lista gli elementi da copiare';
      this.moveMode.istruction2 = 'Seleziona la lista di destinazione';
      this.moveMode.istructionAlert = "L'elemento è già in questa lista. Selezionane un'altra";
      this.moveMode.movedText = 'SPOSTATO con successo in lista';
      this.moveMode.copiedText = 'COPIATO con successo in lista';
      this.selectedListText = 'Stai scrivendo sulla lista: ';
      this.welcomeMessage = "Grazie per aver scaricato Shopping List, e benvenuto!";
      this.totalPriceText = 'Prezzo Totale: ';
      this.loyalityCardsITA();
      this.refreshText = 'Ricarica';
      this.alertMessageTitle = "NUOVI CAMBIAMENTI IMPORTANTI";
      this.understandText = "Ho capito";
      this.copyListBtnText = "Copia lista";
      this.importantBtnText = "Importanti";
      this.importantInfoText = "In questa sezione troverai, in modalità visualizzazione, solo gli elementi che hai segnato come importante";
      this.selectCategoryText = "Scegli in che categoria vuoi inserire il prodotto";
      this.importListExampleText = "Esempio di come va scritta";
      this.show = "mostra";
      this.hide = 'nascondi';
      this.close = "chiudi";
      this.periodicList.periodicListAddedText = "Aggiunto alla lista periodica";
      this.periodicList.periodicListTitle = "Lista Periodica";
      this.periodicList.info.part1 = "Qui ci sono prodotti che acquisti più spesso, così da poterli inserire più velocemente nella lista.";
      this.periodicList.info.part2 = "Per inserire un prodotto in questa lista, basta cliccare, nella lista principale, su: ";
      this.periodicList.info.part3 = "Per aggiungere un prodotto alla tua lista principale, basta cliccare sul prodotto, poi sulla categoria (o viceversa) e poi sul  pulsante 'invia'.";
      this.periodicList.info.part4 = "Puoi anche non selezionare nessuna categoria ed inserire direttamente il prodotto selezionando solo lui.";
      this.periodicList.periodicListButtonText = "Lista Periodica";
      this.periodicList.confirmText = "Confermi la rimozione?";
      this.periodicList.confirmSendText = "Inserito con successo in lista";
      this.downloadAppText = "Sei su versione desktop: ti consigliamo di scaricare l'app per una migliore usabilità";
      this.recipes.recipesDisclaimer = "FAI ATTENZIONE: L'AI può sbagliare! Le ricette generate automaticamente possono contenere errori. Verificare SEMPRE gli ingredienti!";
      this.recipes.recipesSubDisclaimer = "L’app e i suoi sviluppatori non si assumono alcuna responsabilità per eventuali danni o problemi derivanti dall’utilizzo delle ricette o dal mancato controllo degli ingredienti da parte dell’utente.";
      this.recipes.totalRecipesText = "Generazioni rimaste:";
      this.recipes.generationsEndedText = "Generazioni terminate";
      this.recipes.alertRecepiesText = "Potrebbero volerci dai 30 ai 60 secondi...Dipende dallo stress dello chef 😜";
      this.recipes.recipesBtnText = "Genera ricetta";
      this.recipes.ingredients = "Ingredienti";
      this.recipes.preparation = "Preparazione";
      this.recipes.time = "Tempo";
      this.recipes.difficulty = "Difficoltà";
      this.recipes.recipeGeneratedText = "Ricetta pronta";
      this.recipes.latestText = "ultime ricette";
      this.paymentModal.title = "Sblocca le Ricette AI";
      this.paymentModal.description = "Trasforma la tua lista della spesa in piatti deliziosi con l'intelligenza artificiale";
      this.paymentModal.subdescription = "L'intelligenza artificiale leggerà la tua lista scartando i prodotti non commestibili e creerà una ricetta per te in base a ciò che hai inserito";
      this.paymentModal.generationsText = "generazioni";
      this.paymentModal.payBtnText = "Paga con Stripe";
      this.paymentModal.stripeFooterInfo = "Pagamento sicuro e criptato con Stripe";
      this.paymentModal.popularText = "Più popolare";
      this.paymentModal.byRecipePrice = "Per generazione";
      this.paymentModal.selectPlanAlertText = "Seleziona il piano che desideri";
      this.paymentModal.loggetText = "Loggato come";
      this.paymentModal.loginFirstText = "Accedi prima di pagare";
      this.paymentModal.noSubscriptionText = "Aquisto una tantum, NON sottoscrivi nessun abbonamento";
      this.login.title = "Salva le tue ricette";
      this.login.subtitle = "Accedi per non perdere le tue generazioni se cambi dispositivo";
      this.login.google = "Continua con google";
      this.login.otherEmail = "Continua con Email";
      this.login.register = "Registrati";
      this.login.singIn = "Accedi";
      this.login.accountOk = "Hai già un account? Accedi";
      this.login.accountNo = "Non hai un account? Registrati";
      this.login.resetPassword = "Hai dimenticato la password?";
      this.login.emailSentText = "Email inviata! Controlla la tua casella.";
      this.login.recLink = "Invia link di recupero";
      this.login.emailTitle = "Inserisci la tua email per ricevere il link di recupero";
      this.randomPhrases = [
        `...Accendo la brace...`,
        `...Scaldo i fornelli...`,
        `...Non trovo la pentola dannazione!`,
        `...Datemi un mestolo!`,
        `...Preparo gli ingredienti...`,
        `...Affetto il salame...`,
        `...Controllo il frigorifero...`,
        `...Bevo una birra...`,
        `...Mi arrabbio con il cameriere...`,
        `...Spacco il frullatore...`,
        `...Non trovo l'ingrediente...`,
        `...Ingrediente trovato...`,
        `...L'acqua bolle...`,
        `...La comanda è giusta?`,
        `UÉ UÉÉÉÉÉÉÉÉÉÉÉÉÉÉ!!!`,
      ];
      this.microphoneRec.permissionDeniedText = "Permesso microfono negato. Per favore consenti l'accesso al microfono nelle impostazioni del tuo browser e riprova.";
      this.microphoneRec.voiceError = "Errore riconoscimento vocale, riprova e se persiste contatta il supporto. Errore: ";
      this.toggleCategoriesModalText.title = "Mostra/Nascondi categorie";
      this.toggleCategoriesModalText.description = "Scegli se mostrare o nascondere la finestra delle categorie quando digiti qualcosa.";
    },
    setSpanishTranslations() { // ---------------------------------- SPA
      this.placeholder = 'Escriba aquí qué comprar';
      this.defaultPlaceholderText = 'Escriba aquí qué comprar';
      this.categoriesStore.categories = this.categoriesStore.spanCategories;
      this.copyList.text = 'Lista copiada en el portapapeles';
      this.share.text = 'Copia el enlace en el portapapeles y pégalo con quien quieras.';
      this.confirmText = '¿Estás seguro de que quieres borrar:\n';
      this.selectedTodosConfirmText = 'Está a punto de eliminar estos elementos';
      this.settingsTextTitle = 'Ajustes';
      this.shoppingListTitle = 'Lista de la compra';
      this.choseCategoryText = 'Elija una categoría de estas:';
      this.changeLanguage = 'Cambio idioma';
      this.languagesBtns.english = 'Inglés';
      this.languagesBtns.spanish = 'Español';
      this.languagesBtns.italian = 'Italiano';
      this.languagesBtns.french = 'Francés';
      this.safeModeText.title = 'Modo de borrado seguro';
      this.safeModeText.description = 'le pedirá que confirme la eliminación de cada producto de la lista.';
      this.safeModeText.function = 'Pulse para activar/desactivar';
      this.chosenThemeText = 'Conjunto de temas';
      this.changeThemeText = 'Cambiar de tema';
      this.autoDeleteEmptyCategoriesText.title = 'Eliminación automática de categorías vacías';
      this.autoDeleteEmptyCategoriesText.description = 'Elija si desea eliminar manualmente las categorías vacías o que se eliminen automáticamente.';
      this.autoDeleteEmptyCategoriesText.function = 'Pulse para activar/desactivar';
      this.multipleCategoryInsertionText.title = "Entradas de categorías múltiples";
      this.multipleCategoryInsertionText.description = "Le permite ingresar múltiples elementos al seleccionar una categoría.";
      this.multipleCategoryInsertionText.function = 'Pulse para activar/desactivar';
      this.multipleCategoryInsertionText.momentaryAlert = 'La función ya está activa porque ya era así desde el principio, pero ahora si quieres puedes desactivarla.';
      this.pasteListText.title = "Importar una lista desde otras aplicaciones";
      this.pasteListText.subtitle = 'Basta con copiarla y pegarla en la casilla y hacer clic en importar. Nota: separe los elementos de la lista enviándolos con un retorno de carro.';
      this.share.title = 'Compartir App';
      this.share.info = 'Comparte la aplicación con quien quieras! Enviando el enlace o haciendo escanear el código QR.';
      this.share.qrMessage = "Aumenta el brillo de la pantalla para una mejor exploración";
      this.share.desktop = "También existe una versión de escritorio dedicada a los usuarios de Apple o para usarla desde PC";
      this.importText = 'Importar';
      this.updateText.description = "Si el botón está verde, pulse para actualizar";
      this.updateText.available = 'Actualización';
      this.updateText.unavailable = 'Ninguna Actualización';
      this.insertAll = 'Introduzca todos';
      this.removeEmpty = 'Eliminar categorías vacías';
      this.deleteAll = 'Vacíar';
      this.deleteAllConfirmText = '¿Estás seguro de que quieres borrar \n toda la lista?';
      this.renameListText.title = 'Cambiar el nombre de las listas';
      this.renameListText.description = "Aquí puedes dar un nombre a tus listas, solo introdúcelo en el campo y luego haz clic en 'guardar'.";
      this.helperSpaTranslations();
      this.festivitiesSPATranslations();
      this.backupListText.title = 'Importar la última copia de seguridad';
      this.backupListText.preDescriprion = "Cada vez que eliminas algo, Y SÓLO SI LO ELIMINAS, se guarda una copia de seguridad automática de LA ÚLTIMA eliminación";
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
      this.showOnlyLatestDeletedText.emptyListText = "No se han realizado eliminaciones todavía";
      this.suggestions.tipsBtnText = 'Mostrar consejos';
      this.suggestions.headerInfo = 'Haga clic en uno de estos elementos para añadirlo a la lista';
      this.categoryTipText = 'Si hace clic en la categoría puede añadir productos a la misma';
      this.reloadAppText = "Recargar";
      this.duplicateText.title = "Producto ya listado";
      this.duplicateText.body = "¿Insertarlo de todos modos?";
      this.alertMomentaneo = "¡ahora puedes crear múltiples listas! ¿No es maravilloso? Si compras en diferentes supermercados o quieres tener listas diferentes en función de tus necesidades, ¡tienes 4 listas completamente nuevas a tu disposición! Divertirse";
      this.alertMomentaneoTitolo = "Nueva característica: ";
      this.saveText = "Guardar";
      this.feedback.title = "¡Tu opinión nos importa a medida que crecemos! Envíanos tu opinión o sugerencia";
      this.feedback.subtitle = "Para informar de errores o fallos, puede escribir a shoppinglist.service@outlook.com o incluir su correo electrónico a continuación para que pueda ponerme en contacto con usted y comprender el problema.";
      this.feedback.placeholder = "Deja tus comentarios. ATENCIÓN: Los mensajes que contengan palabrotas serán automáticamente descartados después de enviarlos. ✌️";
      this.feedback.extraText = "Si desea que nos pongamos en contacto con usted, incluya su dirección de correo electrónico en su mensaje.";
      this.feedback.successMessage = "Mensaje enviado con éxito, ¡gracias! 🤗";
      this.feedback.errorMessage = "❌ Error al enviar el mensaje. Por favor, inténtelo de nuevo. Si el servicio no funciona, contáctenos directamente en: ";
      this.feedback.statusText = "Por favor, introduzca un mensaje antes de enviarlo.";
      this.send = "Enviar";
      this.listSelection.title = 'Elija la lista que desee';
      this.listSelection.alert = 'Ya estás en esta lista';
      this.archive = 'Archivo';
      this.moveMode.moveOrCopyTitle = 'Mover o Copiar elementos de las listas';
      this.moveMode.moveElementText = 'Mover';
      this.moveMode.copyElementText = 'Copiar';
      this.moveMode.istruction1 = 'Seleccione los elementos que desea mover de la lista';
      this.moveMode.copyIstruction1 = 'Seleccione los elementos que desea copiar de la lista';
      this.moveMode.istruction2 = 'Seleccione la lista de destino';
      this.moveMode.istructionAlert = "El artículo ya está en esta lista. Seleccione otro";
      this.moveMode.movedText = 'MOVIDO con éxito a la lista';
      this.moveMode.copiedText = 'COPIADO con éxito a la lista';
      this.selectedListText = 'Estás escribiendo en la lista: ';
      this.welcomeMessage = 'Gracias por descargar Lista de Compras, ¡y bienvenido!';
      this.totalPriceText = 'Precio Total: ';
      this.loyalityCardsSPA();
      this.refreshText = 'Recargar';
      this.alertMessageTitle = "CAMBIOS IMPORTANTES NUEVOS";
      this.understandText = "Entiendo";
      this.copyListBtnText = "Copiar lista";
      this.importantBtnText = "Importante";
      this.importantInfoText = "En esta sección encontrarás, en modo visualización, solo los elementos que has marcado como importantes";
      this.selectCategoryText = "Elija la categoría en la que desea incluir el producto";
      this.importListExampleText = "Ejemplo de cómo debe escribirse";
      this.show = "mostrar";
      this.hide = 'ocultar';
      this.close = "cerrar";
      this.periodicList.periodicListAddedText = "Añadido a la lista periódica";
      this.periodicList.periodicListTitle = "Lista Periódica";
      this.periodicList.info.part1 = "Aquí hay productos que compras más a menudo, para que puedas insertarlos más rápido en la lista.";
      this.periodicList.info.part2 = "Para insertar un producto en esta lista, basta con hacer clic, en la lista principal, en: ";
      this.periodicList.info.part3 = "Para añadir un producto a tu lista principal, basta con hacer clic en el producto, luego en la categoría (o viceversa) y luego en el botón 'Enviar'.";
      this.periodicList.info.part4 = "También puedes no seleccionar ninguna categoría e insertar directamente el producto seleccionándolo solo a él.";
      this.periodicList.periodicListButtonText = "Lista Periódica";
      this.periodicList.confirmText = "¿Confirma la eliminación?";
      this.periodicList.confirmSendText = "Añadido exitosamente a la lista";
      this.downloadAppText = "Estás en la versión de escritorio: recomendamos descargar la aplicación para una mejor usabilidad";
      this.recipes.recipesDisclaimer = "ADVERTENCIA: ¡La IA puede cometer errores! Las recetas generadas automáticamente pueden contener errores. ¡SIEMPRE revise los ingredientes!";
      this.recipes.recipesSubDisclaimer = "La aplicación y sus desarrolladores no asumen ninguna responsabilidad por daños o problemas que surjan del uso de las recetas o de la falta de verificación de los ingredientes por parte del usuario.";
      this.recipes.totalRecipesText = "Generaciones restantes:";
      this.recipes.generationsEndedText = "Las generaciones han terminado";
      this.recipes.alertRecepiesText = "Puede tomar entre 30 y 60 segundos...Depende del nivel de estrés del chef. 😜";
      this.recipes.recipesBtnText = "Generar receta";
      this.recipes.ingredients = "Ingredientes";
      this.recipes.preparation = "Preparación";
      this.recipes.time = "Tiempo";
      this.recipes.difficulty = "Dificultad";
      this.recipes.recipeGeneratedText = "Receta lista";
      this.recipes.latestText = "últimas recetas";
      this.paymentModal.title = "Desbloquear recetas de IA";
      this.paymentModal.description = "Transforma tu lista de compras en deliciosos platos con inteligencia artificial";
      this.paymentModal.subdescription = "La IA leerá tu lista descartando productos no comestibles y creará una receta para ti basada en lo que ingresaste.";
      this.paymentModal.generationsText = "generaciones";
      this.paymentModal.payBtnText = "Paga con Stripe";
      this.paymentModal.stripeFooterInfo = "Pago seguro y cifrado con Stripe";
      this.paymentModal.popularText = "mas popular";
      this.paymentModal.byRecipePrice = "Por generación";
      this.paymentModal.selectPlanAlertText = "Elige el plan que quieras";
      this.paymentModal.loggetText = "Sesión iniciada como";
      this.paymentModal.loginFirstText = "Inicia sesión antes de pagar";
      this.paymentModal.noSubscriptionText = "Compra única, no se requiere suscripción";
      this.login.title = "Guarda tus recetas";
      this.login.subtitle = "Inicia sesión para no perder tus generaciones si cambias de dispositivo";
      this.login.google = "Continuar con Google";
      this.login.otherEmail = "Continuar con el correo electrónico";
      this.login.register = "Registrarse";
      this.login.singIn = "Iniciar sesión";
      this.login.accountOk = "¿Ya tienes una cuenta? Inicia sesión";
      this.login.accountNo = "¿No tienes una cuenta? Regístrate";
      this.login.resetPassword = "¿Olvidaste tu contraseña?";
      this.login.emailSentText = "¡Correo electrónico enviado! Por favor, revise su bandeja de entrada.";
      this.login.recLink = "Enviar enlace de recuperación";
      this.login.emailTitle = "Ingrese su correo electrónico para recibir el enlace de recuperación";
      this.randomPhrases = [
        `...Enciendo las brasas...`,
        `...Caliento los fogones...`,
        `...¡No encuentro la olla, maldición!`,
        `...¡Dadme un cucharón!`,
        `...Preparo los ingredientes...`,
        `...Corto el salchichón...`,
        `...Reviso la nevera...`,
        `...Bebo una cerveza...`,
        `...Me enfado con el camarero...`,
        `...Rompo la batidora...`,
        `...No encuentro el ingrediente...`,
        `...Ingrediente encontrado...`,
        `...El agua está hirviendo...`,
        `...¿La comanda es correcta?`,
      ];
      this.microphoneRec.permissionDeniedText = "Permiso de micrófono denegado. Por favor, permita el acceso al micrófono en la configuración de su navegador e inténtelo de nuevo.";
      this.microphoneRec.voiceError = "Error de reconocimiento de voz, inténtelo de nuevo y si persiste, contacte con el soporte. Error: ";
      this.toggleCategoriesModalText.title = "Mostrar/Ocultar categorías";
      this.toggleCategoriesModalText.description = "Elija si desea mostrar u ocultar la ventana de categorías al escribir algo.";
    },
    setFrenchTranslations() { // ---------------------------------- FRA
      this.placeholder = 'Écrivez ici quoi acheter';
      this.defaultPlaceholderText = 'Écrivez ici quoi acheter';
      this.categoriesStore.categories = this.categoriesStore.fraCategories;
      this.copyList.text = 'Liste copiée dans le presse-papiers';
      this.share.text = 'Lien copié dans le presse-papiers, collez-le avec qui vous voulez.';
      this.confirmText = 'Êtes-vous sûr de vouloir supprimer :\n';
      this.selectedTodosConfirmText = 'Vous allez supprimer ces éléments';
      this.settingsTextTitle = 'Paramètres';
      this.shoppingListTitle = 'Liste de courses';
      this.choseCategoryText = 'Choisissez une catégorie parmi celles-ci :';
      this.changeLanguage = 'Changer de langue';
      this.languagesBtns.english = 'Anglais';
      this.languagesBtns.spanish = 'Espagnol';
      this.languagesBtns.italian = 'Italien';
      this.languagesBtns.french = 'Français';
      this.safeModeText.title = 'Mode de suppression sécurisé';
      this.safeModeText.description = 'vous demandera confirmation de suppression pour chaque produit de la liste';
      this.safeModeText.function = 'Cliquez pour activer/désactiver';
      this.chosenThemeText = 'Thème choisi';
      this.changeThemeText = 'Changer de thème';
      this.autoDeleteEmptyCategoriesText.title = 'Suppression automatique des catégories vides';
      this.autoDeleteEmptyCategoriesText.description = 'Choisissez de supprimer manuellement les catégories laissées vides, ou de les supprimer automatiquement.';
      this.autoDeleteEmptyCategoriesText.function = 'Cliquez pour activer/désactiver';
      this.multipleCategoryInsertionText.title = "Insertion multiple dans la catégorie";
      this.multipleCategoryInsertionText.description = "Vous permet d'insérer plusieurs éléments lors de la sélection d'une catégorie.";
      this.multipleCategoryInsertionText.function = 'Cliquez pour activer/désactiver';
      this.multipleCategoryInsertionText.momentaryAlert = "La fonction est déjà active car elle l'était depuis le début, mais maintenant si vous voulez vous pouvez la désactiver.";
      this.pasteListText.title = "Importer une liste depuis d'autres applications";
      this.pasteListText.subtitle = 'Il suffit de la copier et de la coller dans la case et de cliquer sur importer. N.B. : Séparez les éléments de la liste en les envoyant à la ligne';
      this.share.title = 'Partager l\'application';
      this.share.info = "Partagez l'application avec qui vous voulez ! En envoyant le lien ou en faisant scanner le code QR.";
      this.share.qrMessage = "Augmentez la luminosité de l'écran pour une meilleure numérisation";
      this.share.desktop = "Il existe également une version de bureau dédiée aux utilisateurs Apple ou pour l'utiliser depuis un PC";
      this.importText = 'Importer';
      this.updateText.description = "Si le bouton est vert, cliquez pour mettre à jour";
      this.updateText.available = 'Mettre à jour';
      this.updateText.unavailable = 'Aucune mise à jour';
      this.insertAll = 'Insérer toutes';
      this.removeEmpty = 'Supprimer les vides';
      this.deleteAll = 'Vider';
      this.deleteAllConfirmText = 'Êtes-vous sûr de vouloir supprimer \n toute la liste ?';
      this.renameListText.title = 'Renommer les listes';
      this.renameListText.description = "Ici vous pouvez donner un nom à vos listes, il suffit de l'entrer dans le champ et de cliquer sur 'enregistrer'.";
      this.helperFraTranslations();
      this.festivitiesFRATranslations();
      this.backupListText.title = 'Importer la dernière sauvegarde';
      this.backupListText.preDescriprion = "Chaque fois que vous supprimez quelque chose, ET SEULEMENT SI VOUS LE SUPPRIMEZ, une sauvegarde automatique de LA DERNIÈRE suppression est enregistrée.";
      this.backupListText.description = "Si vous avez supprimé quelque chose ou toute la liste par erreur, vous pouvez récupérer toute la liste depuis LA DERNIÈRE suppression.";
      this.backupListText.confirm = "Êtes-vous sûr ?";
      this.backupListText.noBackupText = 'Il n\'y a pas de sauvegardes enregistrées';
      this.infoCategoriesAlert = 'Si vous ne trouvez pas les catégories, assurez-vous que la langue est correcte. Les catégories sont importées correctement si elles sont écrites dans la langue sélectionnée.';
      this.priceText = 'Si vous tapez un nombre avec la devise € ou £ ou $, il calculera automatiquement le total de tous les prix écrits dans la liste, mais attention, cela ne fonctionne que si vous tapez la devise, par exemple : pain 2,99€.';
      this.deselectAllText = 'Tout désélectionner';
      this.importantTodos.alert = "Il n'y a pas d'éléments sélectionnés comme importants";
      this.importantTodos.text.part1 = "En cliquant sur";
      this.importantTodos.text.part2 = "vous pourrez afficher uniquement les éléments importants que vous avez sélectionnés. Actuellement, c'est uniquement en mode affichage.";
      this.importantTodos.addedImportantText = "Marqué comme important";
      this.showOnlyLatestDeletedText.title = "Afficher les derniers supprimés";
      this.showOnlyLatestDeletedText.description = "Ici vous ne trouverez que votre dernière suppression unique ou multiple, juste comme résumé";
      this.showOnlyLatestDeletedText.singleTodoText = "Dernière suppression unique";
      this.showOnlyLatestDeletedText.multipleTodosText = "Dernière suppression multiple";
      this.showOnlyLatestDeletedText.emptyListText = "Aucune suppression effectuée encore";
      this.suggestions.tipsBtnText = 'Afficher les suggestions';
      this.suggestions.headerInfo = 'Cliquez sur l\'un de ces éléments pour l\'ajouter à la liste';
      this.categoryTipText = 'Si vous cliquez sur la catégorie, vous pouvez ajouter des produits à l\'intérieur';
      this.reloadAppText = "Recharger";
      this.duplicateText.title = "Produit déjà présent dans la liste";
      this.duplicateText.body = "L'insérer quand même ?";
      this.alertMomentaneo = "Maintenant vous pouvez créer plusieurs listes ! N'est-ce pas merveilleux ? Si vous faites vos courses dans différents supermarchés ou si vous voulez avoir des listes différentes selon vos besoins, vous avez 4 nouvelles listes à votre disposition ! Amusez-vous bien !";
      this.alertMomentaneoTitolo = "Nouvelle fonctionnalité : ";
      this.saveText = "Enregistrer";
      this.feedback.title = "Votre opinion compte pour nous dans notre développement ! Envoyez-nous votre avis ou suggestion";
      this.feedback.subtitle = "Pour signaler des bugs ou des erreurs, vous pouvez écrire à : shoppinglist.service@outlook.com ou indiquer votre adresse e-mail ci-dessous afin que je puisse vous contacter pour comprendre le problème.";
      this.feedback.placeholder = "Laissez vos commentaires. ATTENTION : Les messages contenant des gros mots seront automatiquement rejetés après l'envoi. ✌️";
      this.feedback.extraText = "Si vous souhaitez que nous vous contactions, veuillez inclure votre adresse e-mail dans votre message.";
      this.feedback.successMessage = "Message envoyé avec succès, merci ! 🤗";
      this.feedback.errorMessage = "❌ Erreur lors de l'envoi du message. Veuillez réessayer. Si le service ne fonctionne pas, contactez-nous directement à : ";
      this.feedback.statusText = "Veuillez entrer un message avant d'envoyer.";
      this.send = "Envoyer";
      this.listSelection.title = 'Choisissez la liste que vous voulez';
      this.listSelection.alert = 'Vous êtes déjà sur cette liste';
      this.archive = 'Archiver';
      this.moveMode.moveOrCopyTitle = 'Déplacer ou Copier des éléments des listes';
      this.moveMode.moveElementText = 'Déplacer';
      this.moveMode.copyElementText = 'Copier';
      this.moveMode.istruction1 = 'Sélectionnez les éléments à déplacer de la liste';
      this.moveMode.copyIstruction1 = 'Sélectionnez les éléments à copier de la liste';
      this.moveMode.istruction2 = 'Sélectionnez la liste de destination';
      this.moveMode.istructionAlert = "L'élément est déjà dans cette liste. Veuillez en sélectionner une autre";
      this.moveMode.movedText = 'DÉPLACÉ avec succès dans la liste';
      this.moveMode.copiedText = 'COPIÉ avec succès dans la liste';
      this.selectedListText = 'Vous écrivez sur la liste : ';
      this.welcomeMessage = "Merci d'avoir téléchargé Shopping List, et bienvenue !";
      this.totalPriceText = 'Prix Total : ';
      this.loyalityCardsFRA();
      this.refreshText = 'Actualiser';
      this.alertMessageTitle = "NOUVEAUX CHANGEMENTS IMPORTANTS";
      this.understandText = "Je comprends";
      this.copyListBtnText = "Copier la liste";
      this.importantBtnText = "Important";
      this.importantInfoText = "Dans cette section, en mode d'affichage, vous trouverez uniquement les éléments que vous avez marqués comme importants.";
      this.selectCategoryText = "Choisissez la catégorie dans laquelle vous souhaitez lister le produit";
      this.importListExampleText = "Exemple de la manière dont cela devrait être écrit";
      this.show = "show";
      this.hide = 'cacher';
      this.close = "fermer";
      this.periodicList.periodicListAddedText = "Ajouté à la liste périodique";
      this.periodicList.periodicListTitle = "Liste périodique";
      this.periodicList.info.part1 = "Ici, il y a des produits que vous achetez plus souvent, afin que vous puissiez les insérer plus rapidement dans la liste.";
      this.periodicList.info.part2 = "Pour insérer un produit dans cette liste, il suffit de cliquer, dans la liste principale, sur : ";
      this.periodicList.info.part3 = "Pour ajouter un produit à votre liste principale, il suffit de cliquer sur le produit, puis sur la catégorie (ou vice versa) et ensuite sur le bouton 'Envoyer'.";
      this.periodicList.info.part4 = "Vous pouvez également ne sélectionner aucune catégorie et insérer directement le produit en le sélectionnant uniquement lui.";
      this.periodicList.periodicListButtonText = "Liste périodique";
      this.periodicList.confirmText = "Confirmez-vous la suppression?";
      this.periodicList.confirmSendText = "Ajouté avec succès à la liste";
      this.downloadAppText = "Vous êtes sur la version de bureau : nous vous recommandons de télécharger l'application pour une meilleure expérience utilisateur";
      this.recipes.recipesDisclaimer = "ATTENTION : L'IA peut faire des erreurs ! Les recettes générées automatiquement peuvent contenir des erreurs. Vérifiez TOUJOURS les ingrédients !";
      this.recipes.recipesSubDisclaimer = "L'application et ses développeurs déclinent toute responsabilité en cas de dommages ou de problèmes résultant de l'utilisation des recettes ou du défaut de vérification des ingrédients par l'utilisateur.";
      this.recipes.totalRecipesText = "Générations restantes :";
      this.recipes.generationsEndedText = "Les générations se terminent";
      this.recipes.alertRecepiesText = "Cela peut prendre de 30 à 60 secondes... Cela dépend du niveau de stress du chef. 😜";
      this.recipes.recipesBtnText = "Générer une recette";
      this.recipes.ingredients = "Ingrédients";
      this.recipes.preparation = "Préparation";
      this.recipes.time = "Temps";
      this.recipes.difficulty = "Difficulté";
      this.recipes.recipeGeneratedText = "Recette prête";
      this.recipes.latestText = "dernières recettes";
      this.paymentModal.title = "Débloquez des recettes IA";
      this.paymentModal.description = "Transformez votre liste de courses en plats délicieux grâce à l'intelligence artificielle";
      this.paymentModal.subdescription = "L'IA lira votre liste en rejetant les produits non comestibles et créera pour vous une recette basée sur ce que vous avez saisi.";
      this.paymentModal.generationsText = "générations";
      this.paymentModal.payBtnText = "Payer avec Stripe";
      this.paymentModal.stripeFooterInfo = "Paiement sécurisé et crypté avec Stripe";
      this.paymentModal.popularText = "Plus populaire";
      this.paymentModal.byRecipePrice = "Par génération";
      this.paymentModal.selectPlanAlertText = "Choisissez le forfait que vous souhaitez";
      this.paymentModal.loggetText = "Connecté en tant que";
      this.paymentModal.loginFirstText = "Connectez-vous avant de payer";
      this.paymentModal.noSubscriptionText = "Achat unique, aucun abonnement requis";
      this.login.title = "Enregistrez vos recettes";
      this.login.subtitle = "Connectez-vous pour ne pas perdre vos générations si vous changez d'appareil";
      this.login.google = "Continuer avec Google";
      this.login.otherEmail = "Continuer avec l'e-mail";
      this.login.register = "S'inscrire";
      this.login.singIn = "Connexion";
      this.login.accountOk = "Vous avez déjà un compte ? Connectez-vous";
      this.login.accountNo = "Vous n'avez pas de compte ? Inscrivez-vous";
      this.login.resetPassword = "Mot de passe oublié ?";
      this.login.emailSentText = "Courriel envoyé ! Veuillez consulter votre boîte de réception.";
      this.login.recLink = "Envoyer le lien de récupération";
      this.login.emailTitle = "Saisissez votre adresse e-mail pour recevoir le lien de récupération";
      this.randomPhrases = [
        `...J'allume la braise...`,
        `...Je chauffe les fourneaux...`,
        `...Je non trouve pas la casserole, mince !`,
        `...Donnez-moi una louche !`,
        `...Je prépare les ingrédients...`,
        `...Je tranche le salami...`,
        `...Je vérifie le frigo...`,
        `...Je bois une bière...`,
        `...Je m'énerve contre le serveur...`,
        `...Je casse le mixeur...`,
        `...Je ne trouve pas l'ingrédient...`,
        `...Ingrédient trouvé...`,
        `...L'eau bout...`,
        `...La commande est-elle correcte ?`,
      ];
      this.microphoneRec.permissionDeniedText = "Permission de microphone refusée. Veuillez autoriser l'accès au microphone dans les paramètres de votre navigateur et réessayer.";
      this.microphoneRec.voiceError = "Erreur de reconnaissance vocale, réessayez et si le problème persiste, contactez le support. Erreur : ";
      this.toggleCategoriesModalText.title = "Afficher/Masquer les catégories";
      this.toggleCategoriesModalText.description = "Choisissez d'afficher ou de masquer la fenêtre des catégories lorsque vous tapez quelque chose.";
    },
    //-------------------------------------------------------------------------------------  CARTE FEDELTÀ
    loyalityCardsITA() {
      this.loyalityCards.title = 'Carte Fedeltà';
      this.loyalityCards.functionText = 'Aggiungi una carta';
      this.loyalityCards.selectCardText = 'Seleziona carta';
      this.loyalityCards.nameInputPlaceholder = 'Nome Carta';
      this.loyalityCards.isctructionText = "Inserisci un nome per poter salvare l'immagine";
      this.loyalityCards.confirmAlertMessage = 'Sei sicuro di voler eliminare la carta';
      this.loyalityCards.alertMessage = 'Esiste già una carta con questo nome, cambialo e riprova per favore';
      this.loyalityCards.infoText = 'Qui puoi salvare le immagini delle tue carte fedeltà. Consiglio: la foto deve essere chiara e nitida per poter essere letta facilmente al supermercato';
      this.loyalityCards.infoSubText = 'Puoi salvare fino ad un massimo di 25 carte, se ne vuoi di più contattami alla mail nella sezione supporto';
      this.loyalityCards.errorMessage = 'Errore nel caricare le carte... Riprova per favore';
      this.loyalityCards.maxNumberCardsMessage = 'Hai raggiunto il numero massimo di carte salvabili';
      this.loyalityCards.cropMessage = "Ritaglia la foto prendendo solo il codice a barre";
      this.loyalityCards.orderText = 'Ordine Alfabetico';
    },
    loyalityCardsSPA() {
      this.loyalityCards.title = 'Tarjetas de Fidelidad';
      this.loyalityCards.functionText = 'Añadir una tarjeta';
      this.loyalityCards.selectCardText = 'Seleccionar tarjeta';
      this.loyalityCards.nameInputPlaceholder = 'Nombre de la Tarjeta';
      this.loyalityCards.isctructionText = 'Introduzca un nombre para guardar la imagen';
      this.loyalityCards.confirmAlertMessage = '¿Está seguro de que desea eliminar la tarjeta';
      this.loyalityCards.alertMessage = 'Ya existe una tarjeta con este nombre, cámbielo y vuelva a intentarlo por favor';
      this.loyalityCards.infoText = 'Aquí puedes guardar las imágenes de tus tarjetas de fidelidad. Consejo: la foto debe ser clara y nítida para que pueda leerse fácilmente en el supermercado';
      this.loyalityCards.infoSubText = 'Puedes guardar hasta un máximo de 25 tarjetas, si quieres más contáctame en el correo electrónico de la sección de soporte';
      this.loyalityCards.errorMessage = 'Error al cargar las tarjetas... Inténtelo de nuevo por favor';
      this.loyalityCards.maxNumberCardsMessage = 'Has alcanzado el número máximo de tarjetas guardables';
      this.loyalityCards.cropMessage = "Recortar la foto tomando solo el código de barras";
      this.loyalityCards.orderText = 'Orden alfabético';
    },
    loyalityCardsFRA() {
      this.loyalityCards.title = 'Cartes de fidélité';
      this.loyalityCards.functionText = 'Ajouter une carte';
      this.loyalityCards.selectCardText = 'Sélectionner la carte';
      this.loyalityCards.nameInputPlaceholder = 'Nom de la carte';
      this.loyalityCards.isctructionText = "Entrez un nom pour pouvoir enregistrer l'image";
      this.loyalityCards.confirmAlertMessage = 'Êtes-vous sûr de vouloir supprimer la carte';
      this.loyalityCards.alertMessage = 'Une carte avec ce nom existe déjà, changez-le et réessayez s\'il vous plaît';
      this.loyalityCards.infoText = 'Ici vous pouvez enregistrer les images de vos cartes de fidélité. Conseil : la photo doit être claire et nette pour pouvoir être lue facilement au supermarché';
      this.loyalityCards.infoSubText = 'Vous pouvez enregistrer jusqu\'à un maximum de 25 cartes, si vous en voulez plus contactez-moi à l\'e-mail dans la section support';
      this.loyalityCards.errorMessage = 'Erreur lors du chargement des cartes... Réessayez s\'il vous plaît';
      this.loyalityCards.maxNumberCardsMessage = 'Vous avez atteint le nombre maximum de cartes enregistrables';
      this.loyalityCards.cropMessage = "Recadrez la photo en prenant uniquement le code-barres";
      this.loyalityCards.orderText = 'Ordre alphabétique';
    },
    //-------------------------------------------------------------------------------------  FESTIVITÀ
    festivitiesITATranslations() { // ITALIANO
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
      this.newYearText = "Buon Anno!";
      this.merryChristmasText = 'Buon Natale e Felici Feste! 🎄';
    },
    festivitiesSPATranslations() { // SPAGNOLO
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
      this.newYearText = "¡Feliz Año Nuevo!";
      this.merryChristmasText = '¡Feliz Navidad y Felices Fiestas! 🎄';
    },
    festivitiesFRATranslations() { // FRANÇAIS
      this.cancerDayText = '4 février : Journée mondiale contre le cancer';
      this.peaceDayText = '1er janvier : Journée mondiale de la paix';
      this.womensDayText = 'Meilleurs vœux à toutes les femmes';
      this.shoahText = '27 janvier : Journée de la mémoire de l\'Holocauste';
      this.earthDayText = '22 avril : Journée de la Terre';
      this.beerDayText = 'Bonne journée de la bière';
      this.parentsDayText = '1er juin : Meilleurs vœux à tous les parents';
      this.toiletDayText = '19 novembre : Journée mondiale des toilettes 🤣';
      this.worldWideWebText = 'Le 6 août 1991, le World Wide Web est né';
      this.worldPizzaDayText = '17 janvier : Journée mondiale de la pizza 🤌🏻';
      this.valentinesDayText = 'Joyeuse Saint-Valentin ❤️';
      this.worldEnvironmentDayText = '5 juin : Journée mondiale de l\'environnement';
      this.humanRightsDayText = '10 décembre : Journée mondiale des droits de l\'homme';
      this.starWarsDay = '25 mai 1977 : Star Wars sort au cinéma';
      this.newYearText = "Bonne année !";
      this.merryChristmasText = 'Joyeux Noël et bonnes fêtes ! 🎄';
    },
    //------------------------------------------------------------------------------------- HELPER
    helperItaTranslations() { // ITALIANO
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
      this.helperDescription.addCategory.part1 = 'Per aggiungere una categoria bisogna cliccare su';
      this.helperDescription.addCategory.part2 = 'e sceglierla nel riquadro cliccando';
      this.helperDescription.addCategory.part3 = 'Ti apparirà in lista evidenziata';
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
      this.helperDescription.dragNdropText.part1 = 'Se clicchi su';
      this.helperDescription.dragNdropText.part2 = 'potrai trascinare gli elementi e, tenendo premuto, spostarli dove vuoi.';
      this.helperDescription.dragNdropText.dragginText = 'Trascina gli elementi della lista dove vuoi';
      this.helperDescription.multipleDeleteTitle = 'Seleziona ed elimina più elementi';
      this.helperDescription.multipleDeleteText.part1 = 'Puoi eliminare più prodotti insieme cliccando su';
      this.helperDescription.multipleDeleteText.part2 = 'Così li smarchi e poi a fine spesa cliccado sul';
      this.helperDescription.multipleDeleteText.part3 = 'in basso verranno eliminati solo quelli che hai smarcato.';
      this.helperDescription.multipleDeleteText.deselectAllText = 'Puoi deselezionarli tutti cliccando su';
      this.helperDescription.multipleDeleteText.confirmDeselectAllText = 'e poi confermando (o annullando) cliccando su';
      this.helperDescription.multipleDeleteText.hideText = 'Puoi scegliere di nascondere gli elementi selezionati cliccando su';
      this.helperDescription.multipleDeleteText.showText = 'Oppure di mostrarli cliccando su';
      this.helperDescription.openSecondPanelText = 'serve per mostrare un pannello secondario che ti darà altre opzioni, come quelle sotto elencate';
      this.helperDescription.copyListTitle = 'Copia lista, Evidenzia elementi';
      this.helperDescription.copyListText = 'serve per copiare la lista e incollarla dove vuoi.';
      this.helperDescription.highlightImportant.part1 = 'Puoi rendere "importante" un prodotto facendo DOPPIO click sul nome e verrà';
      this.helperDescription.highlightImportant.part2 = 'evidenziato';
      this.helperDescription.highlightImportant.part3 = 'così NON potrà essere eliminato o modificato.';
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
      this.helperDescription.changeList.changeListTitle = 'Cambia lista';
      this.helperDescription.changeList.part1 = 'Per cambiare la lista su cui stai lavorando, clicca su';
      this.helperDescription.changeList.part2 = 'e scegli la lista che vuoi utilizzare.';
      this.helperDescription.changeList.moveText = "Puoi spostare elementi da una lista all'altra cliccando su";
      this.helperDescription.changeList.copyText = "Puoi anche copiare elementi da una lista all'altra cliccando su";
      this.helperDescription.changeList.final = "Entrambi i pulsanti mostrano le istruzioni che ti guideranno passo passo.";
    },
    helperSpaTranslations() { // SPAGNOLO
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
      this.helperDescription.addCategory.part1 = 'Para agregar una categoría, haga clic en';
      this.helperDescription.addCategory.part2 = 'y selecciónela del cuadro haciendo clic';
      this.helperDescription.addCategory.part3 = 'Aparecerá en la lista resaltada';
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
      this.helperDescription.dragNdropText.part1 = 'Si hace clic en';
      this.helperDescription.dragNdropText.part2 = 'puedes arrastrar elementos y, manteniéndolos pulsados, moverlos donde quieras.';
      this.helperDescription.dragNdropText.dragginText = 'Arrastre los elementos de la lista hasta donde desee';
      this.helperDescription.multipleDeleteTitle = 'Seleccionar y eliminar varios elementos';
      this.helperDescription.multipleDeleteText.part1 = 'Puede eliminar varios productos a la vez pulsando en';
      this.helperDescription.multipleDeleteText.part2 = 'Así que las desmarcas y al final de la compra haces clic en el botón';
      this.helperDescription.multipleDeleteText.part3 = 'en la parte inferior, sólo se borrarán los que hayas desmarcado.';
      this.helperDescription.multipleDeleteText.deselectAllText = 'Puede anular la selección de todos ellos haciendo clic en';
      this.helperDescription.multipleDeleteText.confirmDeselectAllText = 'y luego confirmar (o cancelar) pulsando en';
      this.helperDescription.multipleDeleteText.hideText = 'Puede optar por ocultar los elementos seleccionados haciendo clic en';
      this.helperDescription.multipleDeleteText.showText = 'O muéstrelas haciendo clic en';
      this.helperDescription.openSecondPanelText = 'Esto se utiliza para mostrar un panel secundario que le brindará otras opciones, como las que se enumeran a continuación';
      this.helperDescription.copyListTitle = 'Copiar lista, Resaltar elementos';
      this.helperDescription.copyListText = 'sirve para copiar la lista y pegarla donde quieras.';
      this.helperDescription.highlightImportant.part1 = 'Puedes hacer que un producto sea "importante" haciendo DOBLE clic en el nombre y así será ';
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
      this.helperDescription.changeList.changeListTitle = 'Cambiar lista';
      this.helperDescription.changeList.part1 = 'Para cambiar la lista en la que estás trabajando, haz clic en';
      this.helperDescription.changeList.part2 = 'y elige la lista que quieres usar.';
      this.helperDescription.changeList.moveText = "Puedes mover elementos de una lista a otra haciendo clic en";
      this.helperDescription.changeList.copyText = "También puedes copiar elementos de una lista a otra haciendo clic en";
      this.helperDescription.changeList.final = "Ambos botones muestran las instrucciones que te guiarán paso a paso.";
    },
    helperFraTranslations() { // FRANÇAIS
      this.helperDescription.troubleshooting = 'Dépannage';
      this.helperDescription.troubleshootingText.part1 = " Si tu constates une lenteur ou des blocages lors du chargement des images, vérifie ta connexion. Si tout est OK, essaie de redémarrer l’application. Si le problème persiste, signale-le à l’e-mail dans la section contact ci-dessus.";
      this.helperDescription.troubleshootingText.part2 = "Nous ne sauvegardons aucune donnée, aucun de tes renseignements personnels, ni ta localisation, ni tes listes de courses. Les données sont sauvegardées uniquement en local sur ton appareil. Donc, si tu perds la liste en la supprimant par erreur, la seule façon de la récupérer est de cliquer sur le bouton dans la section « importer la dernière sauvegarde » plus haut.";
      this.helperDescription.troubleshootingText.part3 = "Mais attention ! Cela importe uniquement la dernière suppression effectuée !";
      this.helperDescription.troubleshootingText.part4 = "Si tu trouves ta liste vidée sans l’avoir réellement fait, il est très probable que ton smartphone ait un espace de stockage faible.";
      this.helperDescription.troubleshootingText.part5 = "Si au contraire tu affirmes avoir de la mémoire et que les données s’effacent quand même, signale-le à l’e-mail dans la section contact ci-dessus.";
      this.helperDescription.instructionsTitle = 'Instructions';
      this.helperDescription.addEditDelete = 'Ajouter, Modifier, Supprimer';
      this.helperDescription.add = 'sert à ajouter dans la liste des choses à acheter.';
      this.helperDescription.edit = 'sert à modifier un nom et enregistrer les modifications en cliquant sur';
      this.helperDescription.delete = 'sert à supprimer des éléments de la liste.';
      this.helperDescription.backToTop = 'sert à revenir en haut de la liste. Utile lorsque la liste est très longue.';
      this.helperDescription.categories = 'Catégories';
      this.helperDescription.addCategory.part1 = 'Pour ajouter une catégorie, cliquez sur';
      this.helperDescription.addCategory.part2 = 'et sélectionnez-la dans la liste en cliquant';
      this.helperDescription.addCategory.part3 = 'Il apparaîtra dans la liste mise en évidence';
      this.helperDescription.addCategory.part4 = 'Comme ceci';
      this.helperDescription.addCategory.part5 = 'et en cliquant sur le nom, il sera';
      this.helperDescription.addCategory.part6 = 'mis en surbrillance';
      this.helperDescription.addCategory.part7 = ' pour que tu puisses y ajouter des éléments. Une fois terminé, clique à nouveau sur le nom ou sur n’importe quel autre nom de catégorie.';
      this.helperDescription.addAllCat = 'Tu peux ajouter toutes les catégories en cliquant sur';
      this.helperDescription.removeEmptyCat = 'Tu peux supprimer uniquement les catégories laissées vides en cliquant sur';
      this.helperDescription.suggestionsTitle = 'Suggestions';
      this.helperDescription.suggestions.part1 = 'Lorsque tu cliques sur une catégorie pour ajouter des éléments, ce bouton apparaît';
      this.helperDescription.suggestions.part2 = "et au clic il affiche une série de produits suggérés liés à la catégorie sélectionnée. Clique simplement sur l’élément qui t’intéresse et tu le trouveras ajouté dans la liste dans la catégorie appropriée.";
      this.helperDescription.dragNdropTitle = 'Glisser-déposer les éléments';
      this.helperDescription.dragNdropText.part1 = 'Si tu cliques sur';
      this.helperDescription.dragNdropText.part2 = 'tu peux faire glisser les éléments et, en maintenant appuyé, les déplacer où tu veux.';
      this.helperDescription.dragNdropText.dragginText = 'Glisse les éléments de la liste où tu veux';
      this.helperDescription.multipleDeleteTitle = 'Sélectionner et supprimer plusieurs éléments';
      this.helperDescription.multipleDeleteText.part1 = 'Tu peux supprimer plusieurs produits ensemble en cliquant sur';
      this.helperDescription.multipleDeleteText.part2 = 'Ainsi tu les décoches puis, en fin de courses, en cliquant sur';
      this.helperDescription.multipleDeleteText.part3 = 'en bas, seuls ceux décochés seront supprimés.';
      this.helperDescription.multipleDeleteText.deselectAllText = 'Tu peux tous les désélectionner en cliquant sur';
      this.helperDescription.multipleDeleteText.confirmDeselectAllText = 'puis confirmer (ou annuler) en cliquant sur';
      this.helperDescription.multipleDeleteText.hideText = 'Tu peux choisir de masquer les éléments sélectionnés en cliquant sur';
      this.helperDescription.multipleDeleteText.showText = 'Ou de les afficher en cliquant sur';
      this.helperDescription.openSecondPanelText = "Ceci permet d'afficher un panneau secondaire qui vous proposera d'autres options, telles que celles énumérées ci-dessous";
      this.helperDescription.copyListTitle = 'Copier la liste, Mettre en évidence';
      this.helperDescription.copyListText = 'sert à copier la liste et la coller où tu veux.';
      this.helperDescription.highlightImportant.part1 = 'Vous pouvez rendre un produit « important » en DOUBLE-cliquant sur son nom et il le sera ';
      this.helperDescription.highlightImportant.part2 = 'mis en évidence';
      this.helperDescription.highlightImportant.part3 = 'et ne pourra pas être supprimé ou modifié.';
      this.helperDescription.deleteAllTitle = 'Tout supprimer';
      this.helperDescription.deleteAllText.part1 = 'Si tu cliques sur';
      this.helperDescription.deleteAllText.part2 = 'un cadre de confirmation s’affichera pour supprimer TOUTE la liste.';
      this.helperDescription.videoAlert = 'Ton appareil ne supporte pas la balise vidéo. Contacte le support.';
      this.helperDescription.support = 'Contacts';
      this.helperDescription.supportText = 'Pour tout signalement, tu peux me contacter :';
      this.helperDescription.socialText = 'Suis les pages sociales du développeur, tu peux aussi me contacter ici :';
      this.helperDescription.githubText = 'Si tu es développeur, tu peux peut-être me donner quelques conseils pour améliorer le code :';
      this.helperDescription.adviceTitle = 'IMPORTANT : ';
      this.helperDescription.adviceText = "C’est une web-app convertie en app smartphone et elle est constamment maintenue, donc ne fais pas attention à la date de la dernière mise à jour affichée sur le store.";
      this.helperDescription.dateLastUpdateText = "La vraie date de la dernière mise à jour est : ";
      this.helperDescription.changeList.changeListTitle = 'Changer de liste';
      this.helperDescription.changeList.part1 = 'Pour changer la liste sur laquelle tu travailles, clique sur';
      this.helperDescription.changeList.part2 = 'et choisis la liste que tu veux utiliser.';
      this.helperDescription.changeList.moveText = "Tu peux déplacer des éléments d’une liste à l’autre en cliquant sur";
      this.helperDescription.changeList.copyText = "Tu peux aussi copier des éléments d’une liste à l’autre en cliquant sur";
      this.helperDescription.changeList.final = "Les deux boutons affichent les instructions pour te guider étape par étape.";
    },
  }
});

