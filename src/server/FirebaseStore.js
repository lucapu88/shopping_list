import { defineStore } from 'pinia';
import { initializeApp, getApps } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
} from 'firebase/database';
import { markRaw } from 'vue';
import { useSettingsStore } from '@/store/SettingsStore';


const DATABASE_URL = window.localStorage.getItem("firebase"); // Se l'utente non ha l'url del db, non può usare firebase

export const useFirebaseStore = defineStore('firebase', {
  state: () => ({
    app: null,
    db: null,
    shoppingDoneList: null,
    openfirebaseModal: false,
    myYearOfShoppingsArray: [],
    firebaseLoading: false,
    firebaseErrorMessage: null,
    settings: useSettingsStore(),
    firebaseConfig: {
      apiKey: "AIzaSyCqF3MdeC9Q7F7YBUL-KqS354kvvSqnLf4",
      authDomain: "shopping-list-f73a6.firebaseapp.com",
      databaseURL: DATABASE_URL,
      projectId: "shopping-list-f73a6",
      storageBucket: "shopping-list-f73a6.appspot.com",
      messagingSenderId: "201363149569",
      appId: "1:201363149569:web:f7fb87cfe8c050bd7a4100",
    },
  }),
  actions: {
    initFirebaseOnce() {
      if (!getApps().length) {
        const app = initializeApp(this.firebaseConfig);
        return app;
      } else {
        return getApps()[0];
      }
    },
    init() {
      if (!this.settings.isIphone) {
        // CONTROLLO SE SONO SU IPHONE, SE NON LO SONO NON INIZIALIZZO FIREBASE E NON PRENDO NESSUN DATO.
        // Essendo l'app usata solo su android, questo fa si che firebase non venga usato sugli utenti, quindi NON PRENDO NESSUN DATO.
        // É solo una cosa mia personale perchè io voglio usare firebase solo per me su iphone e per le MIE spese.
        // ma in ogni caso l'utente non ha l'url del db, quindi non può usare firebase neanche per sbaglio, perciò ribadisco: NON PRENDO NESSUN DATO!!!
        return;
      }
      if (this.app && this.db) return;
      this.app = markRaw(this.initFirebaseOnce());
      try {
        this.db = markRaw(getDatabase(this.app));
      } catch (e) {
        console.error('Errore init firebase:', e);
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    async insertData(todosToDelete) {
      this.init();
      const todosDeleted = JSON.stringify(todosToDelete);
      this.resetYearCheck();
      const id = this.randomNum(0, 1000000);
      try {
        await set(ref(this.db, `shopping-done/${id}`), todosDeleted);
        return { success: true };
      } catch (error) {
        console.error('❌ insertData error:', error);
        return { success: false, error };
      }
    },
    async deleteData() {
      this.init();
      try {
        await remove(ref(this.db, 'shopping-done/'));
        return { success: true };
      } catch (error) {
        console.error('❌ deleteData error:', error);
        return { success: false, error };
      }
    },
    resetYearCheck() {
      const today = new Date();
      const yearActual = today.getFullYear();
      const lastReset = window.localStorage.getItem('ultimoResetAnno');

      if (!lastReset || parseInt(lastReset, 10) !== yearActual) {
        console.log('🧹 Nuovo anno! Resetto il database locale...');
        this.deleteData().catch(() => { });
        window.localStorage.setItem('ultimoResetAnno', String(yearActual));
      }
    },
    async getData() {
      this.init();
      try {
        this.firebaseLoading = true;
        const snapshot = await get(child(ref(this.db), 'shopping-done/'));
        if (snapshot.exists()) {
          const val = snapshot.val();
          // trasformo le stringhe di questo oggetto in array
          const parsedObj = Object.fromEntries(Object.entries(val).map(([key, value]) => [key, JSON.parse(value)]));
          console.log('✅ getData success:', parsedObj);
          this.shoppingDoneList = parsedObj;

          this.createShoppingsYear(this.shoppingDoneList);
          this.firebaseLoading = false;
          this.firebaseErrorMessage = null;
          return { success: true, data: val };
        } else {
          this.shoppingDoneList = null;
          this.firebaseLoading = false;
          this.firebaseErrorMessage = 'Nessun dato trovato nel database.';
          return { success: true, data: null };
        }
      } catch (error) {
        this.firebaseLoading = false;
        this.firebaseErrorMessage = `Errore nel recupero dei dati dal database: 
        ${error} `;
        console.error('❌ getData error:', error);
        return { success: false, error };
      }
    },
    createShoppingsYear(list) {
      const monthsOrder = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
      const forMonth = {};

      for (const arr of Object.values(list)) {
        const date = arr[arr.length - 1];
        // eslint-disable-next-line no-unused-vars
        const [day, month, year] = date.split("/");
        const monthName = monthsOrder[parseInt(month, 10) - 1];
        if (!forMonth[monthName]) forMonth[monthName] = [];
        forMonth[monthName].push(arr);
      }

      let referenceYear = new Date().getFullYear().toString();
      if (Object.values(list).length > 0) {
        const firstDate = Object.values(list)[0].at(-1);
        const [, , year] = firstDate.split("/");
        referenceYear = year;
      }

      this.myYearOfShoppingsArray = monthsOrder.map(month => ({
        month: `${month} ${referenceYear}`,
        elements: forMonth[month] || []
      }));
    },
  },
});
