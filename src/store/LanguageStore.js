import { defineStore } from 'pinia';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';


export const useLanguageStore = defineStore('Language', {
  state: () => ({
    todosStore: useAddModifyDeleteTodosStore(),
    categories: [],
    engCategories: [
      { name: 'vegetables', emojy: String.fromCodePoint(0x1f966) },
      { name: 'meat', emojy: String.fromCodePoint(0x1f969) },
      { name: 'fish', emojy: String.fromCodePoint(0x1f99e) },
      { name: 'fruit', emojy: String.fromCodePoint(0x1f353) },
      { name: 'sweets', emojy: String.fromCodePoint(0x1f382) },
      { name: 'dairy products', emojy: String.fromCodePoint(0x1f95b) },
      { name: 'starchy', emojy: String.fromCodePoint(0x1f35e) },
      { name: 'drinks', emojy: String.fromCodePoint(0x1f37a) },
      { name: 'hygiene', emojy: String.fromCodePoint(0x1f9fb) },
      { name: 'medications', emojy: String.fromCodePoint(0x1f48a) },
      { name: 'stationery', emojy: String.fromCodePoint(0x1f4da) },
      { name: 'babies', emojy: String.fromCodePoint(0x1f476) },
      { name: 'electronics', emojy: String.fromCodePoint(0x1f4a1) },
      { name: 'pets', emojy: String.fromCodePoint(0x1f439) },
      { name: 'other', emojy: String.fromCodePoint(0x1f4b8) },
    ],
    itaCategories: [
      { name: 'verdura', emojy: String.fromCodePoint(0x1f966) },
      { name: 'carne', emojy: String.fromCodePoint(0x1f969) },
      { name: 'pesce', emojy: String.fromCodePoint(0x1f99e) },
      { name: 'frutta', emojy: String.fromCodePoint(0x1f353) },
      { name: 'dolci', emojy: String.fromCodePoint(0x1f382) },
      { name: 'latticini', emojy: String.fromCodePoint(0x1f95b) },
      { name: 'farinacei', emojy: String.fromCodePoint(0x1f35e) },
      { name: 'bevande', emojy: String.fromCodePoint(0x1f37a) },
      { name: 'igiene', emojy: String.fromCodePoint(0x1f9fb) },
      { name: 'farmaci', emojy: String.fromCodePoint(0x1f48a) },
      { name: 'cancelleria', emojy: String.fromCodePoint(0x1f4da) },
      { name: 'bimbi', emojy: String.fromCodePoint(0x1f476) },
      { name: 'elettronica', emojy: String.fromCodePoint(0x1f4a1) },
      { name: 'animali', emojy: String.fromCodePoint(0x1f439) },
      { name: 'altro', emojy: String.fromCodePoint(0x1f4b8) },
    ],
    langIta: false,
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
    confirmText: 'Are you sure you want to delete:',
    completeConfirmText: '',
    selectedTodosConfirmText: 'Are you sure you want to delete the selected items',
    themeName: 'light',
    safeModeText: {
      title: 'Safe delete mode',
      description: 'it will ask you to confirm the deletion for each single product on the list',
      function: 'Click to activate/deactivate',
    },
    chosenThemeText: 'Chosen theme',
    changeThemeText: 'Change theme',
    autoDeleteEmptyCategoriesInfo: false,
    autoDeleteEmptyCategoriesText: {
      title: 'Auto delete of empty categories',
      description: 'Choose whether to delete the categories left empty manually, or have them deleted automatically.',
      function: 'Click to activate/deactivate',
    },
    pasteListText: {
      title: 'Export a list from other apps',
      subtitle: 'Just copy and paste it into the box and click import. N.B.: Separates list items by sending them to a head',
    },
    shareText: 'Share',
    updateText: {
      description: 'If the button is green, click to update the app',
      available: 'Updates available',
      unavailable: 'There are no updates',
      readyForUpdate: false,
    },
    insertAll: 'Insert all',
    removeEmpty: 'Remove only empty',
    deleteAll: 'Delete ALL',
    helperDescription: {
      troubleshooting: 'Troubleshooting:',
      troubleshootingText: "If you experience slowness or blocks in loading images, check your connection, if it's ok try restarting the app. If the problem persists, report it to the e-mail in the support section.",
      instructionsTitle: 'Instructions:',
      addEditDelete: 'Add, Edit, Delete.',
      add: 'is used to add stuff to buy list.',
      edit: 'is used to change a name and save the changes by clicking',
      delete: 'is used to remove stuff from the list.',
      backToTop: 'is used to returns at the top of the list. It works when the list it is very long.',
      categories: 'Categories.',
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
      dragNdropTitle: 'Drag and Drop.',
      dragNdropText: {
        part1: 'By clicking on',
        part2: 'you can drag the elements and move them wherever you want.'
      },
      multipleDeleteTitle: 'Select and delete multiple items.',
      multipleDeleteText: {
        part1: 'You can delete multiple products together by clicking on',
        part2: 'So you mark them and then at the end of shopping by clicking on',
        part3: 'at the bottom only the ones you marked will be deleted.',
      },
      copyListTitle: 'Copy list, Highlight items.',
      copyListText: 'is used to copy the list and paste it wherever you want.',
      highlightImportant: {
        part1: 'You can make a product "important" by clicking on the name and it will be ',
        part2: 'highlighted',
        part3: 'so it cannot be deleted or edited.'
      },
      deleteAllTitle: 'Delete all.',
      deleteAllText: {
        part1: 'If you click on',
        part2: 'you will see a confirmation box for delete ALL the list.',
      },
      videoAlert: 'Your device does not support video tags. Please contact support.',
      support: 'Support.',
      supportText: 'For any report you can contact me:',
      socialText: 'Follow us on social media:',
      adviceTitle: 'IMPORTANT:',
      adviceText: "This is a web app converted to a smartphone app, and is always maintained, so don't pay attention to the date of the last update that appears in the store. That's just the day I published it or did system updates. The actual date of the last update is: ",
    }
  }),
  getters: {},
  actions: {
    checkAndSetLanguage() {
      const langIta = window.localStorage.getItem('langIta');
      this.langIta = langIta === 'true';
      if (this.langIta) {
        this.placeholder = 'Scrivi qui cosa comprare';
        this.defaultPlaceholderText = 'Scrivi qui cosa comprare';
        this.categories = this.itaCategories;
        this.copyList.text = 'Lista copiata negli appunti';
        this.share.text = 'Link copiato negli appunti, incollalo con chi vuoi.';
        this.confirmText = 'Sei sicuro di voler eliminare:';
        this.selectedTodosConfirmText =
          'Sei sicuro di voler eliminare gli elementi selezionati';
        this.settingsTextTitle = 'Impostazioni';
        this.changeLanguage = 'Cambio lingua';
        this.safeModeText.title = 'Modalità eliminazione sicura';
        this.safeModeText.description =
          'ti chiederà conferma di eliminazione per ogni singolo prodotto della lista';
        this.safeModeText.function = 'Clicca per attivare/disattivare';
        this.chosenThemeText = 'Tema impostato';
        this.changeThemeText = 'Cambia tema';
        this.autoDeleteEmptyCategoriesText.title = 'Auto eliminazione categorie vuote';
        this.autoDeleteEmptyCategoriesText.description = 'Scegli se eliminare manualmente le categorie rimaste vuote, oppure che vengano eliminate automaticamente.';
        this.autoDeleteEmptyCategoriesText.function = 'Clicca per attivare/disattivare';
        this.pasteListText.title = "Esporta una lista da altre app";
        this.pasteListText.subtitle = 'Basterà copiarla e incollarla nel riquadro e cliccare su importa. NB: separa gli elementi della lista mandandoli a capo';
        this.shareText = 'Condividi';
        this.updateText.description = "Se il pulsante è verde, clicca per aggiornare";
        this.updateText.available = 'Aggiornamento disponibile';
        this.updateText.unavailable = 'Non ci sono aggiornamenti';
        this.insertAll = 'Inserisci tutte';
        this.removeEmpty = 'Rimuovi vuote';
        this.deleteAll = 'Cancella tutto';
        this.helperDescription.troubleshooting = 'Risoluzione Problemi:';
        this.helperDescription.troubleshootingText = " Nel caso riscontrassi lentezza o blocchi nel caricamento di immagini, controlla la tua connessione, se è ok prova a riavviare l'app. Se il problema persiste segnalalo all'email nella sezione contatti.";
        this.helperDescription.instructionsTitle = 'Istruzioni';
        this.helperDescription.addEditDelete = 'Aggiungere, Modificare, Eliminare.';
        this.helperDescription.add = 'serve per aggiungere alla lista roba da comprare.';
        this.helperDescription.edit = 'serve per modificare un nome e salvare le modifiche cliccando';
        this.helperDescription.delete = 'serve per modificare eliminare roba dalla lista.';
        this.helperDescription.backToTop = 'serve per tornare in cima alla lista. Funziona quando la lista è molto lunga.';
        this.helperDescription.categories = 'Categorie.';
        this.helperDescription.addCategory.part1 = 'Per aggiungere una categoria basta scriverla e cliccare su';
        this.helperDescription.addCategory.part2 = 'oppure sceglierla nel riquadro cliccando';
        this.helperDescription.addCategory.part3 = 'Ti apparirà';
        this.helperDescription.addCategory.part4 = 'Così';
        this.helperDescription.addCategory.part5 = 'e cliccando sul nome si,';
        this.helperDescription.addCategory.part6 = 'evidenzierà';
        this.helperDescription.addCategory.part7 = ' così potrai aggiungerci roba al suo interno.Una volta finito basta ricliccare sul nome o su qualsiasi altro nome di altre categorie.';
        this.helperDescription.addAllCat = 'È possibile aggiungere tutte le categorie cliccando su';
        this.helperDescription.removeEmptyCat = 'È possibile eliminare solo le categorie lasciate vuote cliccando su';
        this.helperDescription.dragNdropTitle = 'Trascina e sposta elementi.';
        this.helperDescription.dragNdropText.part1 = 'Cliccando su';
        this.helperDescription.dragNdropText.part2 = 'potrai trascinare gli elementi e spostarli dove vuoi.';
        this.helperDescription.multipleDeleteTitle = 'Seleziona ed elimina più elementi.';
        this.helperDescription.multipleDeleteText.part1 = 'Puoi eliminare più prodotti insieme cliccando su';
        this.helperDescription.multipleDeleteText.part2 = 'Così li smarchi e poi a fine spesa cliccado sul';
        this.helperDescription.multipleDeleteText.part3 = 'in basso verranno eliminati solo quelli che hai smarcato.';
        this.helperDescription.copyListTitle = 'Copia lista, Evidenzia elementi.';
        this.helperDescription.copyListText = 'serve per copiare la lista e incollarla dove vuoi.';
        this.helperDescription.highlightImportant.part1 = 'Puoi rendere "importante" un prodotto cliccando sul nome e verrà';
        this.helperDescription.highlightImportant.part2 = 'evidenziato';
        this.helperDescription.highlightImportant.part3 = 'così non potrà essere eliminato o modificato.';
        this.helperDescription.deleteAllTitle = 'Elimina tutto.';
        this.helperDescription.deleteAllText.part1 = 'Se clicchi su';
        this.helperDescription.deleteAllText.part2 = "ti apparirà un riquadro di conferma per l'eliminazione di TUTTA la lista.";
        this.helperDescription.videoAlert = 'Il tuo device non supporta i video tag. Contatta il supporto.';
        this.helperDescription.support = 'Contatti.';
        this.helperDescription.supportText = 'Per qualsiasi segnalazione puoi contattarmi:';
        this.helperDescription.socialText = 'Seguici sui social:';
        this.helperDescription.adviceTitle = 'IMPORTANTE:';
        this.helperDescription.adviceText = "Questa è una web app convertita in app per smartphone, ed è sempre manutenuta, quindi non fare caso alla data dell'ultimo aggiornamento che appare nello store.Quello è solo il giorno in cui l'ho pubblicata oppure ho fatto aggiornamenti di sistema. La data reale dell'ultimo aggiornamento è:";
      } else {
        this.categories = this.engCategories;
      }
    },
    setEnglishLanguage() {
      this.langIta = false;
      this.placeholder = 'Write what to buy';
      this.defaultPlaceholderText = 'Write what to buy';
      this.categories = this.engCategories;
      this.copyList.text = 'List copied to clipboard';
      this.share.text = 'Link copied to clipboard, paste it with whoever you want.';
      window.localStorage.setItem('langIta', false);
      location.reload(); // TOFIX lo faccio solo perchè mi obbligano ad inserire librerie del c---- per la privacy policy che mi buggano il codice.
    },
    setItalianoLanguage() {
      this.langIta = true;
      this.placeholder = 'Scrivi qui cosa comprare';
      this.defaultPlaceholderText = 'Scrivi qui cosa comprare';
      this.categories = this.itaCategories;
      this.copyList.text = 'Lista copiata negli appunti';
      this.share.text = 'Link copiato negli appunti, incollalo con chi vuoi.';
      window.localStorage.setItem('langIta', true);
      location.reload(); // TOFIX lo faccio solo perchè mi obbligano ad inserire librerie del c---- per la privacy policy e mi buggano il codice.
    },
    insertAllCategories() {
      if (this.langIta) {
        this.itaCategories.forEach((category) => {
          this.todosStore.newTodo = category.name;
          this.todosStore.addTodo();
        });
      } else {
        this.engCategories.forEach((category) => {
          this.todosStore.newTodo = category.name;
          this.todosStore.addTodo();
        });
      }
    },
  },
});

