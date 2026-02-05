import { defineStore } from 'pinia';
import { usePreloadStore } from './PreloadStore';

const defaultFontUrl = "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap";

const THEMES_CONFIG = {
    light: { name: 'light', className: 'light-body', fontUrl: defaultFontUrl },
    dark: { name: 'dark', className: 'dark-body', fontUrl: defaultFontUrl },
    minimal: { name: 'minimal', className: 'minimal-body', fontUrl: "https://fonts.googleapis.com/css2?family=Cabin:wght@500&display=swap" },
    retro: { name: 'retro', className: 'retro-body', fontUrl: "https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" },
    summer: { name: 'summer', className: 'summer-body', fontUrl: defaultFontUrl },
    winter: { name: 'winter', className: 'winter-body', fontUrl: defaultFontUrl },
    elegant: { name: 'elegant', className: 'elegant-body', fontUrl: "https://fonts.googleapis.com/css2?family=Tauri&display=swap" },
    pink: { name: 'pink', className: 'pink-body', fontUrl: "https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" },
    panter: { name: 'panter', className: 'panter-body', fontUrl: "https://fonts.googleapis.com/css2?family=Audiowide&display=swap" }, // Mantiene il nome originale "panter" anche se sbagliato per compatibilità con le vecchie versioni
    lemon: { name: 'lemon', className: 'lemon-body', fontUrl: "https://fonts.googleapis.com/css2?family=Creepster&display=swap" },
    jeans: { name: 'jeans', className: 'jeans-body' }
};

export const useThemeStore = defineStore('theme', {
    state: () => ({
        preloadStore: usePreloadStore(),
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

                    const fontUrl = THEMES_CONFIG[themeKey].fontUrl;
                    if (fontUrl) {
                        requestAnimationFrame(() => {
                            this.preloadStore.loadFontOnce(fontUrl);
                        });
                    }
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
            this.themeName = config.name;
            document.body.className = config.className;
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