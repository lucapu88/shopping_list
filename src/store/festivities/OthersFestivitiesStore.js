import { defineStore } from 'pinia';

export const useOthersFestivitiesStore = defineStore('OthersFestivities', {
    state: () => ({
        halloweenDays: [25, 26, 27, 28, 29, 30, 31],
        halloweenTheme: false,
        worldCancerDay: false,
        worldPeaceDay: false,
        HolocaustMemorialDay: false,
        earthDay: false,
        beerDay: false,
        parentsDay: false,
        toiletDay: false,
        internetDay: false,
        worldPizzaDay: false,
        valentinesDay: false,
        worldEnvironmentDay: false,
        humanRightsDayText: false,
        starWarsDay: false,
        newYear: false,
    }),
    getters: {},
    actions: {
        resetFestivities() {
            this.halloweenTheme = false;
            this.worldCancerDay = false;
            this.worldPeaceDay = false;
            this.HolocaustMemorialDay = false;
            this.earthDay = false;
            this.beerDay = false;
            this.parentsDay = false;
            this.toiletDay = false;
            this.internetDay = false;
            this.worldPizzaDay = false;
            this.valentinesDay = false;
            this.worldEnvironmentDay = false;
            this.humanRightsDayText = false;
            this.starWarsDay = false;
            this.newYear = false;
        },
        checkFestivities() {
            this.resetFestivities();
            const today = new Date();
            const currentMonth = today.getMonth() + 1;
            const currentDay = today.getDate();
            const weekDay = today.getDay();

            if ((this.halloweenDays.includes(currentDay) && currentMonth === 10) || (currentDay === 1 && currentMonth === 11)) {
                this.halloweenTheme = true;
            }
            if (currentDay === 1 && currentMonth === 1) {
                this.worldPeaceDay = true;
            }
            if (currentDay === 17 && currentMonth === 1) {
                this.worldPizzaDay = true;
            }
            if (currentDay === 27 && currentMonth === 1) {
                this.HolocaustMemorialDay = true;
            }
            if (currentDay === 4 && currentMonth === 2) {
                this.worldCancerDay = true;
            }
            if (currentDay === 14 && currentMonth === 2) {
                this.valentinesDay = true;
            }
            if (currentDay === 8 && currentMonth === 3) {
                this.womensDay = true;
            }
            if (currentDay === 22 && currentMonth === 4) {
                this.earthDay = true;
            }
            if (currentDay === 25 && currentMonth === 5) {
                this.starWarsDay = true; // E CHE LA FORZA SIA CON TE!
            }
            if (currentMonth === 8 && currentDay <= 7 && weekDay === 5) {
                this.beerDay = true;
            }
            if (currentDay === 1 && currentMonth === 6) {
                this.parentsDay = true;
                //volevo aggiungere anche la festa dei nonni ma purtroppo la chiesa è stronza e non da una data precisa ma sceglie a cazzi suoi
            }
            if (currentDay === 5 && currentMonth === 7) {
                this.worldEnvironmentDay = true;
            }
            if (currentDay === 6 && currentMonth === 8 && !this.beerDay) {
                //Se capita nel beerDay, diamo precedenza assoluta alla birra
                this.internetDay = true;
            }
            if (currentDay === 19 && currentMonth === 11) {
                //questa l'ho messa solo perchè è divertente XD
                this.toiletDay = true;
            }
            if (currentDay === 10 && currentMonth === 12) {
                this.humanRightsDayText = true;
            }
        }
    },
});