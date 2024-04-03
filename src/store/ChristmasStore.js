import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';


export const useChristmasStore = defineStore('christmas', {
    state: () => ({
        christmasTheme: false,
        languages: useLanguageStore(),
    }),
    getters: {},
    actions: {
        /*TOFIX potrei, anzi dovrei inserirlo in useOthersFestivitiesStore e creare un unico store per le festività */
        merryChristmasTheme() {
            //solo per tutto il mese di natale ci saranno decorazioni natalizie, e se è natale, e stai leggendo, ti auguro buon natale :)
            const today = new Date();
            const currentMonth = today.getMonth() + 1;
            const currentDay = today.getDate();
            if (currentDay <= 31 && currentMonth === 12) {
                this.christmasTheme = true;
                this.addChristmasCategory();
            }
        },
        addChristmasCategory() {
            this.languages.itaCategories.push({ name: 'regali di natale', emojy: String.fromCodePoint(0x1f385) });
            this.languages.spanCategories.push({ name: 'regalos de navidad', emojy: String.fromCodePoint(0x1f385) });
            this.languages.engCategories.push({ name: 'christmas gifts', emojy: String.fromCodePoint(0x1f385) });
        }
    },
});