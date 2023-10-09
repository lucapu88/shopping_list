import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('Language', {
    state: () => ({
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
            { name: 'altro', emojy: String.fromCodePoint(0x1f4b8) },
        ],
        langIta: false,
    }),
    getters: {},
    actions: {
        setCategories() {
            this.categories = this.engCategories;
        },
        checkAndSetLanguage() {
            const langIta = window.localStorage.getItem('langIta');
            this.langIta = langIta === 'true';
        }
    },
});

