import { defineStore } from 'pinia';
import { useCategoriesStore } from '@/store/CategoriesStore';

export const useChristmasStore = defineStore('christmas', {
    state: () => ({
        christmasTheme: false,
        categoriesStore: useCategoriesStore(),
    }),
    getters: {},
    actions: {
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
            this.categoriesStore.itaCategories.find(cat => cat.name === 'regali di natale').active = true;
            this.categoriesStore.spanCategories.find(cat => cat.name === 'regalos de navidad').active = true;
            this.categoriesStore.engCategories.find(cat => cat.name === 'christmas gifts').active = true;
        }
    },
});