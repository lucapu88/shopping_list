import { defineStore } from 'pinia';

export const useChristmasStore = defineStore('christmas', {
    state: () => ({ christmasTheme: false }),
    getters: {},
    actions: {
        merryChristmasTheme() {
            //solo per tutto il mese di natale ci saranno decorazioni natalizie, e se è natale vi auguro buon natale :)
            const today = new Date();
            const currentMonth = today.getMonth() + 1;
            const currentDay = today.getDate();
            if (currentDay <= 31 && currentMonth === 12) { this.christmasTheme = true; }
        },
    },
});