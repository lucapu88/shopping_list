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
        panterTheme: false,
        lemonTheme: false,
        themeName: 'Light',
    }),
    getters: {},
    actions: {
        setThemeOnLoad() {
            const root = document.documentElement;
            const style = getComputedStyle(root);

            const lightThemeSelected = window.localStorage.getItem('lightTheme');
            const lightBkgrColor = style.getPropertyValue("--light-background-color").trim();
            const lightFontFamily = "'Permanent Marker', cursive";
            this.lightTheme = lightThemeSelected === 'true';
            if (this.lightTheme) { this.changeThemeStyle('Light', lightBkgrColor, '#000000', lightFontFamily); }

            const darkThemeSelected = window.localStorage.getItem('darkTheme');
            const darkBkgrColor = style.getPropertyValue("--dark-background-color").trim();
            this.darkTheme = darkThemeSelected === 'true';
            if (this.darkTheme) {
                this.changeThemeStyle('Dark', darkBkgrColor, '#FFFFFF', lightFontFamily);
                document.body.style.height = '100vh';
                document.body.style.border = '10px solid #d17e47';
            }

            const minimalThemeSelected = window.localStorage.getItem('minimalTheme');
            const minimalBkgrColor = style.getPropertyValue("--minimal-primary-color").trim();
            const minimalTextColor = style.getPropertyValue("--minimal-secondary-color").trim();
            this.minimalTheme = minimalThemeSelected === 'true';
            if (this.minimalTheme) {
                this.changeThemeStyle('Minimal', minimalBkgrColor, minimalTextColor, '"Cabin", sans-serif');
            }

            //Questo tema inizialmente si chiamava Retro, poi l'ho rinominato in dos, perchè mi ricordava quando da piccolo usavo l'MSDOS
            const retroThemeSelected = window.localStorage.getItem('retroTheme');
            const retroBkgrColor = style.getPropertyValue("--dos-secondary-color").trim();
            const retroTextColor = style.getPropertyValue("--dos-text-color").trim();
            this.retroTheme = retroThemeSelected === 'true';
            if (this.retroTheme) {
                this.changeThemeStyle('Dos', retroBkgrColor, retroTextColor, '"DotGothic16", sans-serif');
            }

            const summerThemeSelected = window.localStorage.getItem('summerTheme');
            const summerBkgrColor = style.getPropertyValue("--summer-primary-color").trim();
            const summerTextColor = style.getPropertyValue("--summer-text-color").trim();
            this.summerTheme = summerThemeSelected === 'true';
            if (this.summerTheme) {
                this.changeThemeStyle('Summer', summerBkgrColor, summerTextColor, lightFontFamily);
            }

            const winterThemeSelected = window.localStorage.getItem('winterTheme');
            const winterBkgrColor = style.getPropertyValue("--winter-background-color").trim();
            const winterTextColor = style.getPropertyValue("--winter-text-color").trim();
            this.winterTheme = winterThemeSelected === 'true';
            if (this.winterTheme) {
                this.changeThemeStyle('Winter', winterBkgrColor, winterTextColor, lightFontFamily);
            }

            const elegantThemeSelected = window.localStorage.getItem('elegantTheme');
            const elegantBkgrColor = style.getPropertyValue("--elegant-primary-color-dark").trim();
            const elegantTextColor = style.getPropertyValue("--elegant-text-color").trim();
            this.elegantTheme = elegantThemeSelected === 'true';
            if (this.elegantTheme) {
                this.changeThemeStyle('Elegant', elegantBkgrColor, elegantTextColor, "Courier New");
            }

            const pinkThemeSelected = window.localStorage.getItem('pinkTheme');
            const pinkBkgrColor = style.getPropertyValue("--pink-background-color").trim();
            const pinkTextColor = style.getPropertyValue("--pink-text-color").trim();
            this.pinkTheme = pinkThemeSelected === 'true';
            if (this.pinkTheme) {
                this.changeThemeStyle('Pink', pinkBkgrColor, pinkTextColor, '"Protest Riot", sans-serif');
            }

            /* Lo so, che sono un coglione e panter non si scrive così, lo soooooo!!! 
             purtroppo ho sbagliato all'inizio e col cazzo che cambio ovunque il termine per una fottuta H bastarda!!! :P */
            const panterThemeSelected = window.localStorage.getItem('panterTheme');
            const pantherBkgrColor = style.getPropertyValue("--panter-primary-color").trim();
            const pantherTextColor = style.getPropertyValue("--panter-tertiary-color").trim();
            this.panterTheme = panterThemeSelected === 'true';
            if (this.panterTheme) {
                this.changeThemeStyle('Panter', pantherBkgrColor, pantherTextColor, '"Audiowide", serif');
            }

            const lemonThemeSelected = window.localStorage.getItem('lemonTheme');
            const lemonBkgrColor = style.getPropertyValue("--lemon-primary-color").trim();
            const lemonTextColor = style.getPropertyValue("--lemon-text-color").trim();
            this.lemonTheme = lemonThemeSelected === 'true';
            if (this.lemonTheme) {
                this.changeThemeStyle('Lemon', lemonBkgrColor, lemonTextColor, '"Creepster", serif');
            }

            if (!lightThemeSelected
                && !darkThemeSelected
                && !minimalThemeSelected
                && !retroThemeSelected
                && !summerThemeSelected
                && !winterThemeSelected
                && !elegantThemeSelected
                && !pinkThemeSelected
                && !panterThemeSelected
                && !lemonThemeSelected
            ) {
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
            this.panterTheme = false;
            window.localStorage.setItem('panterTheme', false);
            this.lemonTheme = false;
            window.localStorage.setItem('lemonTheme', false);
        },
    },
});


