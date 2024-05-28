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
            this.languages.itaCategories.find(cat => cat.name === 'regali di natale').active = true;
            this.languages.spanCategories.find(cat => cat.name === 'regalos de navidad').active = true;
            this.languages.engCategories.find(cat => cat.name === 'christmas gifts').active = true;
        }
    },
});