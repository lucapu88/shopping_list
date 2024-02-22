import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        lightTheme: true,
        darkTheme: false,
        minimalTheme: false,
        retroTheme: false,
        summerTheme: false,
        winterTheme: false,
        elegantTheme: false,
        pinkTheme: false,
        themeName: 'Light',
    }),
    getters: {},
    actions: {
        setThemeOnLoad() {
            const lightThemeSelected = window.localStorage.getItem('lightTheme');
            this.lightTheme = lightThemeSelected === 'true';
            if (this.lightTheme) { this.changeThemeStyle('Light', '#ffffff', '#000000', "'Permanent Marker', cursive"); }

            const darkThemeSelected = window.localStorage.getItem('darkTheme');
            this.darkTheme = darkThemeSelected === 'true';
            if (this.darkTheme) {
                this.changeThemeStyle('Dark', '#333333', '#FFFFFF', "'Permanent Marker', cursive");
                document.body.style.height = '100vh';
                document.body.style.border = '10px solid #d17e47';
            }

            const minimalThemeSelected = window.localStorage.getItem('minimalTheme');
            this.minimalTheme = minimalThemeSelected === 'true';
            if (this.minimalTheme) {
                this.changeThemeStyle('Minimal', '#A5BECC', '#7C3E66', '"Cabin", sans-serif');
            }

            const retroThemeSelected = window.localStorage.getItem('retroTheme');
            this.retroTheme = retroThemeSelected === 'true';
            if (this.retroTheme) {
                this.changeThemeStyle('Dos', '#090A0C', '#FFFFFF', '"DotGothic16", sans-serif');
            }

            const summerThemeSelected = window.localStorage.getItem('summerTheme');
            this.summerTheme = summerThemeSelected === 'true';
            if (this.summerTheme) {
                this.changeThemeStyle('Summer', '#EFCB8F', '#000000', "'Permanent Marker', cursive");
            }

            const winterThemeSelected = window.localStorage.getItem('winterTheme');
            this.winterTheme = winterThemeSelected === 'true';
            if (this.winterTheme) {
                this.changeThemeStyle('Winter', '#232F34', '#FFFFFF', "'Permanent Marker', cursive");
            }

            const elegantThemeSelected = window.localStorage.getItem('elegantTheme');
            this.elegantTheme = elegantThemeSelected === 'true';
            if (this.elegantTheme) {
                this.changeThemeStyle('Elegant', 'rgb(7,60,92)', '#D98410', "Courier New");
            }

            const pinkThemeSelected = window.localStorage.getItem('pinkTheme');
            this.pinkTheme = pinkThemeSelected === 'true';
            if (this.pinkTheme) {
                this.changeThemeStyle('Pink', '#E8ACD0', '#930036', '"Protest Riot", sans-serif');
            }

            if (!lightThemeSelected
                && !darkThemeSelected
                && !minimalThemeSelected
                && !retroThemeSelected
                && !summerThemeSelected
                && !winterThemeSelected
                && !elegantThemeSelected
                && !pinkThemeSelected) {
                //se nessun tema è stato impostato (quindi l'app è appena scaricata), imposto il tema di default che sarebbe light
                this.lightThemeDefaultSetting();
            }
        },
        async lightThemeDefaultSetting() {
            window.localStorage.setItem('lightTheme', true);
            this.lightTheme = await window.localStorage.getItem('lightTheme');
        },
        changeThemeStyle(themeName, backgroundColor, color, fontFamily) {
            this.themeName = themeName;
            document.body.style.backgroundColor = backgroundColor;
            if (color) { document.body.style.color = color; }
            if (fontFamily) { document.body.style.fontFamily = fontFamily; }
            if (themeName === 'Elegant') {
                document.body.style.background = "linear-gradient(90deg,rgba(7, 60, 92, 1) 30%, rgba(29, 39, 49, 1) 55%)";
                document.body.style.fontWeight = 'bold';
            }
        },
        resetAllThemes() {
            this.lightTheme = false;
            window.localStorage.setItem('lightTheme', false);
            this.darkTheme = false;
            window.localStorage.setItem('darkTheme', false);
            this.minimalTheme = false;
            window.localStorage.setItem('minimalTheme', false);
            this.retroTheme = false;
            window.localStorage.setItem('retroTheme', false);
            this.summerTheme = false;
            window.localStorage.setItem('summerTheme', false);
            this.winterTheme = false;
            window.localStorage.setItem('winterTheme', false);
            this.elegantTheme = false;
            window.localStorage.setItem('elegantTheme', false);
            this.pinkTheme = false;
            window.localStorage.setItem('pinkTheme', false);
        },
    },
});


