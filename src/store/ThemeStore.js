import { defineStore } from 'pinia';

const THEMES_CONFIG = {
    light: { name: 'light', backgroundColor: '#ffffff', color: '#000000', fontFamily: "'Permanent Marker', cursive" },
    dark: { name: 'dark', backgroundColor: '#333333', color: '#FFFFFF', fontFamily: "'Permanent Marker', cursive", hasCustomStyles: true },
    minimal: { name: 'minimal', backgroundColor: '#A5BECC', color: '#7C3E66', fontFamily: '"Cabin", sans-serif' },
    retro: { name: 'retro', backgroundColor: '#000000', color: '#FFFFFF', fontFamily: '"DotGothic16", sans-serif' },
    summer: { name: 'summer', backgroundColor: '#EFCB8F', color: '#000000', fontFamily: "'Permanent Marker', cursive" },
    winter: { name: 'winter', backgroundColor: '#232F34', color: '#FFFFFF', fontFamily: "'Permanent Marker', cursive" },
    elegant: { name: 'elegant', backgroundColor: 'rgb(7,60,92)', color: '#D98410', fontFamily: 'Courier New', hasCustomStyles: true },
    pink: { name: 'pink', backgroundColor: '#E8ACD0', color: '#930036', fontFamily: '"Protest Riot", sans-serif' },
    panter: { name: 'panter', backgroundColor: '#000018', color: '#656565', fontFamily: '"Audiowide", serif' }, // Mantiene il nome originale "panter" anche se sbagliato per compatibilità con le vecchie versioni
    lemon: { name: 'lemon', backgroundColor: '#fded04', color: '#8256a9', fontFamily: '"Creepster", serif' },
    jeans: { name: 'jeans', backgroundColor: '#3C628D', color: '#DAC29E', fontFamily: '"Lucida Console", "Courier New", monospace' }
};

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
        jeansTheme: false,
        themeName: 'Light',
    }),
    getters: {},
    actions: {
        getThemesName() {
            return Object.values(THEMES_CONFIG).map(theme => theme.name);
        },
        setThemeOnLoad() {
            const themeKeys = this.getThemesName();
            let hasActiveTheme = false;

            for (const themeKey of themeKeys) {
                const isActive = window.localStorage.getItem(`${themeKey}Theme`) === 'true';
                this[`${themeKey}Theme`] = isActive;
                if (isActive) {
                    this.applyTheme(themeKey);
                    hasActiveTheme = true;
                }
            }
            // Se nessun tema è impostato, usa il light di default
            if (!hasActiveTheme) {
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

            this.applySpecialStyles(themeName);
        },
        resetAllThemes() {
            const themes = this.getThemesName();

            themes.forEach(theme => {
                this[`${theme}Theme`] = false;
                window.localStorage.setItem(`${theme}Theme`, false);
            });
        },
        applyTheme(themeKey) {
            const config = THEMES_CONFIG[themeKey];
            if (!config) return;

            this.changeThemeStyle(config.name, config.backgroundColor, config.color, config.fontFamily);
        },
        applySpecialStyles(themeName) {
            switch (themeName) {
                case 'dark':
                    document.body.style.height = '100vh';
                    document.body.style.border = '10px solid #d17e47';
                    break;
                case 'elegant':
                    document.body.style.background = "linear-gradient(90deg,rgba(7, 60, 92, 1) 30%, rgba(29, 39, 49, 1) 55%)";
                    document.body.style.fontWeight = 'bold';
                    break;
            }
        },
        setLightTheme() {
            // Metodi di convenienza per impostare temi specifici (opzionali, per uso futuro).
            // Ho scritto solo il light, poi ovviamente tutti gli altri, nel caso servono, basta riscriverli uguali a questo ma cambiando nomi.
            this.resetAllThemes();
            this.lightTheme = true;
            window.localStorage.setItem('lightTheme', true);
            this.applyTheme('light');
        },
    },
});