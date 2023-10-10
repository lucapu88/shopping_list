import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        canDelete: false,
        canDeleteText: 'OFF',
        dateLastUpdate: "10/07/2023",
        languages: useLanguageStore(),
        canDeleteEmptyCategories: false,
        canDeleteEmptyCategoriesText: 'OFF',
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
    },
});