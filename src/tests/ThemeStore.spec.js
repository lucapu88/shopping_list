// tests/unit/stores/ThemeStore.spec.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useThemeStore } from '@/store/ThemeStore';

describe('ThemeStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('State', () => {
        it('should initialize with default light theme', () => {
            const store = useThemeStore();
            expect(store.lightTheme).toBe(true);
            expect(store.themeName).toBe('Light');
        });

        it('should have all theme flags initialized to false except for state', () => {
            const store = useThemeStore();
            expect(store.darkTheme).toBe(false);
            expect(store.minimalTheme).toBe(false);
            expect(store.retroTheme).toBe(false);
        });
    });

    describe('getThemesName', () => {
        it('should return array of all theme names', () => {
            const store = useThemeStore();
            const themes = store.getThemesName();

            expect(Array.isArray(themes)).toBe(true);
            expect(themes).toContain('light');
            expect(themes).toContain('dark');
            expect(themes).toContain('elegant');
            expect(themes.length).toBeGreaterThan(0);
        });
    });

    describe('lightThemeDefaultSetting', () => {
        it('should set light theme as default in localStorage', async () => {
            const store = useThemeStore();
            await store.lightThemeDefaultSetting();

            expect(window.localStorage.getItem('lightTheme')).toBe('true');
            expect(store.lightTheme).toBe('true');
        });
    });

    describe('setThemeOnLoad', () => {
        it('should load light theme by default if no theme is set', () => {
            const store = useThemeStore();
            store.setThemeOnLoad();

            expect(store.lightTheme).toBe(false);
            expect(window.localStorage.getItem('lightTheme')).toBe('true');
        });

        it('should restore saved theme from localStorage', () => {
            localStorage.setItem('darkTheme', 'true');
            const store = useThemeStore();
            store.setThemeOnLoad();

            expect(store.darkTheme).toBe(true);
        });
    });

    describe('resetAllThemes', () => {
        it('should reset all themes to false and clear localStorage', () => {
            const store = useThemeStore();
            store.lightTheme = true;
            store.darkTheme = true;
            localStorage.setItem('lightTheme', 'true');
            localStorage.setItem('darkTheme', 'true');

            store.resetAllThemes();

            expect(store.lightTheme).toBe(false);
            expect(store.darkTheme).toBe(false);
            expect(localStorage.getItem('lightTheme')).toBe('false');
            expect(localStorage.getItem('darkTheme')).toBe('false');
        });
    });

    describe('applyTheme', () => {
        it('should apply light theme class', () => {
            const store = useThemeStore();

            store.applyTheme('light');

            expect(store.themeName).toBe('light');
            expect(document.body.className).toBe('light-body');
        });

        it('should apply dark theme class', () => {
            const store = useThemeStore();

            store.applyTheme('dark');

            expect(store.themeName).toBe('dark');
            expect(document.body.className).toBe('dark-body');
        });

        it('should not apply unknown themes', () => {
            const store = useThemeStore();
            const currentTheme = store.themeName;
            store.applyTheme('unknownTheme');

            expect(store.themeName).toBe(currentTheme);
        });
    });

    describe('setLightTheme', () => {
        it('should set light theme and reset others', () => {
            const store = useThemeStore();
            store.darkTheme = true;

            store.setLightTheme();

            expect(store.lightTheme).toBe(true);
            expect(store.darkTheme).toBe(false);
            expect(localStorage.getItem('lightTheme')).toBe('true');
        });
    });
});