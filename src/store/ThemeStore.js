import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        lightTheme: false,
        darkTheme: false,
        minimalTheme: false,
        retroTheme: false,
        summerTheme: false,
        winterTheme: false,
    }),
    getters: {},
    actions: {
        setThemeOnLoad() {
            const lightThemeSelected = window.localStorage.getItem('lightTheme');
            this.lightTheme = lightThemeSelected === 'true';
            if (this.lightTheme) { this.changeThemeStyle('Light', "url('src/img/foglio_righe.webp')"); }

            const darkThemeSelected = window.localStorage.getItem('darkTheme');
            this.darkTheme = darkThemeSelected === 'true';
            if (this.darkTheme) {
                this.changeThemeStyle('Dark', 'none', '#333333', '#FFFFFF');
                document.body.style.height = '100vh';
                document.body.style.border = '10px solid #d17e47';
            }

            const minimalThemeSelected = window.localStorage.getItem('minimalTheme');
            this.minimalTheme = minimalThemeSelected === 'true';
            if (this.minimalTheme) {
                this.changeThemeStyle('Minimal', 'none', '#A5BECC', '#7C3E66', '"Cabin", sans-serif');
            }

            const retroThemeSelected = window.localStorage.getItem('retroTheme');
            this.retroTheme = retroThemeSelected === 'true';
            if (this.retroTheme) {
                this.changeThemeStyle('Dos', 'none', '#090A0C', '#FFFFFF', '"DotGothic16", sans-serif');
            }

            const summerThemeSelected = window.localStorage.getItem('summerTheme');
            this.summerTheme = summerThemeSelected === 'true';
            if (this.summerTheme) {
                this.changeThemeStyle('Summer', "url('src/img/mare.webp')", '#EFCB8F');
                document.body.style.backgroundRepeat = 'no-repeat';
                // document.querySelector('.confirm').style.backgroundImage = 'none';  //TOFIX
            }

            const winterThemeSelected = window.localStorage.getItem('winterTheme');
            this.winterTheme = winterThemeSelected === 'true';
            if (this.winterTheme) {
                this.changeThemeStyle('Winter', "url('src/img/montagne.webp')", '#232F34', '#FFFFFF');
                // document.getElementById('todo').style.filter = 'drop-shadow(2px 4px 6px black)';  //TOFIX
                // document.querySelector('.confirm').style.backgroundImage = 'none';  //TOFIX
                // document.querySelector('.confirm').style.filter = 'drop-shadow(2px 4px 6px black)';  //TOFIX
            }
        },
        changeThemeStyle(themeName, backgroundImage, backgroundColor, color, fontFamily) {
            this.themeName = themeName;
            document.body.style.backgroundImage = backgroundImage;
            document.body.style.backgroundColor = backgroundColor;
            if (color) { document.body.style.color = color; }
            if (fontFamily) { document.body.style.fontFamily = fontFamily; }
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
        },
    },
});


