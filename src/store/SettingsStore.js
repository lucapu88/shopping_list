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
    addEditDelete: false,
    categoriesInfo: false,
    dragNdrop: false,
    selectAndDelete: false,
    copyHighlights: false,
    deleteAllInfo: false,
    tutorial: false,
    support: false,
    highlits: null,
    feature: null,
    video: true,
    featureInfo: false,
    info: true,
  }),
  getters: {},
  actions: {
    canDeleteCheck() {
      //setto le impostazioni scelte dall'utente sulla conferma di cancellazione
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

      if ((lastMonth !== null && lastYear !== null) && monthNow == lastMonth && yearNow == lastYear) {
        this.languages.updateText.readyForUpdate = true;
        this.dateLastUpdate = `${month[lastMonth]}/${lastYear}`;
      }
    },
    toggleDeleteConfirm() {
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
      this.resetListIstructions();
    },
    showPrivacyPolicy() {
      this.privacyPolicy = true;
    },
    closePrivacyPolicy() {
      this.privacyPolicy = false;
    },
    resetListIstructions() {
      this.addEditDelete = false;
      this.categoriesInfo = false;
      this.dragNdrop = false;
      this.selectAndDelete = false;
      this.copyHighlights = false;
      this.deleteAllInfo = false;
      this.tutorial = false;
      this.support = false;
    },
    showListIstructions(section) {
      this.highlits = null;
      switch (section) {
        case 'addEditDelete':
          this.addEditDelete = !this.addEditDelete;
          break;
        case 'categoriesInfo':
          this.categoriesInfo = !this.categoriesInfo;
          break;
        case 'dragNdrop':
          this.dragNdrop = !this.dragNdrop;
          break;
        case 'selectAndDelete':
          this.selectAndDelete = !this.selectAndDelete;
          break;
        case 'copyHighlights':
          this.copyHighlights = !this.copyHighlights;
          break;
        case 'deleteAllInfo':
          this.deleteAllInfo = !this.deleteAllInfo;
          break;
        case 'tutorial':
          this.tutorial = !this.tutorial;
          break;
        case 'support':
          this.support = !this.support;
          break;
      }
    },
    highlightsForTutorial(num) {
      console.log(num);
      /*Mi serve solo quando creo i video tutorial. In pratica evidenzia il testo per il quale sto mostrando la funzionalità.
        RICORDATI CHE PER IL TUTORIAL DEVI AVERE IL PULSANTA AGGIORNAMENTI ATTIVO, QUINDI DECOMMENTA LA RIGA SUCCESSIVA! */
      // window.localStorage.removeItem('lastMonth'); window.localStorage.removeItem('lastYear');
      // this.highlits = num;
      /*  --------------------------------------IMPORTANTISSIMO------------------------------------------------
                  RICORDATI DI RICOMMENTARE TUTTO QUESTO CODICE DOPO CHE HAI REGISTRATO IL TUTORIAL!            */
    },
    toggleTutorial(feature) {
      /*  tutto ciò è fatto per far si che al click su un pulsante mostra il video, 
          al click su un altro pulsante ne mostra un altro e nasconde il precedente, 
          ma se clicchi sullo stesso video deve poterlo nascondere o rimostrare.    */
      this.feature === feature ? this.video = !this.video : this.video = true;
      this.feature = feature;
    },
    toggleInfo(featureInfo) {
      //uguale a sopra ma in un punto diverso, e voglio tenere le cose ben separate con i propri nomi di riferimento
      this.featureInfo === featureInfo ? this.info = !this.info : this.info = true;
      this.featureInfo = featureInfo;
      this.video = false;
    }
  },
});