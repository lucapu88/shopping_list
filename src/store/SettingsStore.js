import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        canDelete: false,
        dateLastUpdate: "10/07/2023",
    }),
    getters: {},
    actions: {
        canDeleteCheck() {
            const canDelete = window.localStorage.getItem('canDelete');
            this.canDelete = canDelete === 'true';
            this.canDelete ? (this.canDeleteText = 'ON') : this.canDeleteText;
        },
        checkingUpdates() {
            const languages = useLanguageStore();

            const d = new Date();
            const monthNow = d.getMonth();
            const yearNow = d.getFullYear();
            const lastMonth = window.localStorage.getItem('lastMonth');
            const lastYear = window.localStorage.getItem('lastYear');
            const month = languages.langIta
                ? ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
                : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            if ((lastMonth !== null && lastYear !== null) && monthNow == lastMonth && yearNow == lastYear) {
                this.updateText.readyForUpdate = true;
                this.dateLastUpdate = `${month[lastMonth]}/${lastYear}`;
            }
        },
    },
});