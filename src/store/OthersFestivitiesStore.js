import { defineStore } from 'pinia';

export const useOthersFestivitiesStore = defineStore('OthersFestivities', {
    state: () => ({
        halloweenTheme: false,
        worldCancerDay: false,
        worldPeaceDay: false,
        HolocaustMemorialDay: false,
        earthDay: false,
        beerDay: false,
        parentsDay: false,
        toiletDay: false,
        internetDay: false,
    }),
    getters: {},
    actions: {
        checkFestivities() {
            const today = new Date();
            const currentMonth = today.getMonth() + 1;
            const currentDay = today.getDate();
            const weekDay = today.getDay();

            if ((currentDay <= 2 && currentMonth === 11) || ((currentDay >= 23 || currentDay <= 31) && currentMonth === 10)) {
                this.halloweenTheme = true;
            }
            if (currentDay === 4 && currentMonth === 2) {
                this.worldCancerDay = true;
            }
            if (currentDay === 1 && currentMonth === 1) {
                this.worldPeaceDay = true;
            }
            if (currentDay === 8 && currentMonth === 3) {
                this.womensDay = true;
            }
            if (currentDay === 27 && currentMonth === 1) {
                this.HolocaustMemorialDay = true;
            }
            if (currentDay === 22 && currentMonth === 4) {
                this.earthDay = true;
            }
            if (currentMonth === 8 && currentDay <= 7 && weekDay === 5) {
                this.beerDay = true;
            }
            if (currentDay === 1 && currentMonth === 7) {
                this.parentsDay = true;
                //volevo aggiungere anche la festa dei nonni ma purtroppo la chiesa è stronza e non da una data precisa ma sceglie a cazzi suoi
            }
            if (currentDay === 19 && currentMonth === 11) {
                //questa l'ho messa solo perchè è divertente XD
                this.toiletDay = true;
            }
            if (currentDay === 6 && currentMonth === 8 && !this.beerDay) { //diamo precedenza assoluta alla birra
                this.internetDay = true;
            }
        }
    },
});