import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    languages: useLanguageStore(),
    canDelete: false,
    canDeleteText: 'OFF',
    dateLastUpdate: "--/--/----",
    canDeleteEmptyCategories: false,
    canDeleteEmptyCategoriesText: 'OFF',
    helper: false,
    helperInClosing: false,
    privacyPolicy: false,
    troubleshooting: false,
    changeLanguage: false,
    changeTheme: false,
    autoDeleteEmptyCategories: false,
    safeMode: false,
    pasteList: false,
    showOnlyLatestDeleted: false,
    backupList: false,
    addEditDelete: false,
    categoriesInfo: false,
    suggestions: false,
    dragNdrop: false,
    selectAndDelete: false,
    copyHighlights: false,
    deleteAllInfo: false,
    tutorial: false,
    support: false,
    feature: null,
    section: null,
    video: true,
    featureInfo: false,
    info: true,
  }),
  getters: {},
  actions: {
    canDeleteCheck() {
      //setto le impostazioni scelte dall'utente sia sulla conferma di cancellazione per todo, sia sull'autoeliminazione delle categorie vuote
      const canDelete = window.localStorage.getItem('canDelete');
      this.canDelete = canDelete === 'true';
      this.canDelete ? (this.canDeleteText = 'ON') : this.canDeleteText;
      //setto le impostazioni scelte dall'utente sulla cancellazione automatica categorie
      const canDeleteAutoCategoriesStorage = window.localStorage.getItem('canDeleteEmptyCategories');
      this.canDeleteEmptyCategories = canDeleteAutoCategoriesStorage === 'true';
      this.canDeleteEmptyCategories ? (this.canDeleteEmptyCategoriesText = 'ON') : this.canDeleteEmptyCategoriesText;
    },
    checkingUpdates() {
      const d = new Date();
      const monthNow = d.getMonth();
      const yearNow = d.getFullYear();
      const lastMonth = window.localStorage.getItem('lastMonth');
      const lastYear = window.localStorage.getItem('lastYear');
      const month = this.languages.langIta
        ? ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
        : this.languages.langSpanish
          ? ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
          : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      if (lastMonth && lastYear && monthNow == lastMonth && yearNow == lastYear) {
        this.languages.updateText.readyForUpdate = true;
        this.dateLastUpdate = `${month[lastMonth]}/${lastYear}`;
      }
    },
    toggleDeleteConfirm() {
      //Per IMPOSTARE il popup di conferma prima dell'eliminazione
      this.canDelete = !this.canDelete;
      if (this.canDelete) {
        this.canDeleteText = 'ON';
        window.localStorage.setItem('canDelete', true);
      } else {
        this.canDeleteText = 'OFF';
        window.localStorage.setItem('canDelete', false);
      }
    },
    toggleAutomaticDeleteEmptyCategories() {
      this.canDeleteEmptyCategories = !this.canDeleteEmptyCategories;
      if (this.canDeleteEmptyCategories) {
        this.canDeleteEmptyCategoriesText = 'ON';
        window.localStorage.setItem('canDeleteEmptyCategories', true);
      } else {
        this.canDeleteEmptyCategoriesText = 'OFF';
        window.localStorage.setItem('canDeleteEmptyCategories', false);
      }
    },
    openHelper() {
      this.helper = true;
    },
    closeHelper() {
      this.helperInClosing = true;
      //faccio questo per far funzionare l'animazione dello slide down
      setTimeout(() => {
        this.helper = false;
        this.helperInClosing = false;
      }, 1500);
      this.resetHelperSettingsAndIstructions();
    },
    showPrivacyPolicy() {
      this.privacyPolicy = true;
    },
    closePrivacyPolicy() {
      this.privacyPolicy = false;
    },
    resetHelperSettingsAndIstructions() {
      //IMPOSTAZIONI
      this.changeLanguage = false;
      this.changeTheme = false;
      this.autoDeleteEmptyCategories = false;
      this.safeMode = false;
      this.pasteList = false;
      this.showOnlyLatestDeleted = false;
      this.backupList = false;
      //RISOLUZIONE PROBLEMI
      this.troubleshooting = false;
      //ISTRUZIONI
      this.addEditDelete = false;
      this.categoriesInfo = false;
      this.suggestions = false;
      this.dragNdrop = false;
      this.selectAndDelete = false;
      this.copyHighlights = false;
      this.deleteAllInfo = false;
      this.tutorial = false;
      this.support = false;
    },
    showListInstructions(section) {
      // Per gli accordion nell'helper
      this.feature = null;
      this.video = true;

      const sectionMap = {
        changeLanguage: 'changeLanguage',
        changeTheme: 'changeTheme',
        autoDeleteEmptyCategories: 'autoDeleteEmptyCategories',
        safeMode: 'safeMode',
        pasteList: 'pasteList',
        showOnlyLatestDeleted: 'showOnlyLatestDeleted',
        backupList: 'backupList',
        addEditDelete: 'addEditDelete',
        categoriesInfo: 'categoriesInfo',
        suggestions: 'suggestions',
        dragNdrop: 'dragNdrop',
        selectAndDelete: 'selectAndDelete',
        copyHighlights: 'copyHighlights',
        deleteAllInfo: 'deleteAllInfo',
        tutorial: 'tutorial',
        support: 'support',
        troubleshooting: 'troubleshooting',
      };

      if (sectionMap[section]) {
        const prop = sectionMap[section];
        this[prop] = this.section === section ? !this[prop] : true;
        this.section = section;
      }
    },
    toggleTutorial(feature) {
      /*  tutto ciò è fatto per far si che al click su un pulsante mostra il video, 
          al click su un altro pulsante ne mostra un altro e nasconde il precedente, 
          ma se clicchi sullo stesso video deve poterlo nascondere o rimostrare.    */
      this.feature === feature ? this.video = !this.video : this.video = true;
      this.feature = feature;
    }
  },
});