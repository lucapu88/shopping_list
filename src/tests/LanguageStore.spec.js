// tests/unit/stores/LanguageStore.spec.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';
import { useCategoriesStore } from '@/store/CategoriesStore';

describe('LanguageStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('State', () => {
        it('should initialize with default values', () => {
            const store = useLanguageStore();

            expect(store.langEnglish).toBe(false);
            expect(store.langIta).toBe(false);
            expect(store.langSpanish).toBe(false);
        });

        it('should have placeholder text', () => {
            const store = useLanguageStore();

            expect(store.placeholder).toBeDefined();
            expect(store.defaultPlaceholderText).toBeDefined();
        });

        it('should have language buttons', () => {
            const store = useLanguageStore();

            expect(store.languagesBtns).toBeDefined();
            expect(store.languagesBtns.english).toBe('English');
            expect(store.languagesBtns.spanish).toBe('Spanish');
            expect(store.languagesBtns.italian).toBe('Italian');
        });
    });

    describe('englishDefaultSetting', () => {
        it('should set English as default language', async () => {
            const store = useLanguageStore();
            await store.englishDefaultSetting();

            expect(store.langEnglish).toBe('true');
            expect(localStorage.getItem('langEnglish')).toBe('true');
        });
    });

    describe('setEnglishLanguage', () => {
        it('should set English language and update localStorage', () => {
            const store = useLanguageStore();

            store.setEnglishLanguage();

            expect(store.langEnglish).toBe(true);
            expect(store.langIta).toBe(false);
            expect(store.langSpanish).toBe(false);
            expect(localStorage.getItem('langEnglish')).toBe('true');
            expect(localStorage.getItem('langIta')).toBe('false');
            expect(localStorage.getItem('langSpanish')).toBe('false');
        });

        it('should update placeholder text to English', () => {
            const store = useLanguageStore();
            store.setEnglishLanguage();

            expect(store.placeholder).toContain('Write');
        });

        it('should set English categories', () => {
            const catStore = useCategoriesStore();
            const store = useLanguageStore();

            store.setEnglishLanguage();

            expect(catStore.categories).toBeDefined();
        });
    });

    describe('setItalianoLanguage', () => {
        it('should set Italian language', () => {
            const store = useLanguageStore();

            store.setItalianoLanguage();

            expect(store.langIta).toBe(true);
            expect(store.langEnglish).toBe(false);
            expect(store.langSpanish).toBe(false);
            expect(localStorage.getItem('langIta')).toBe('true');
            expect(localStorage.getItem('langEnglish')).toBe('false');
            expect(localStorage.getItem('langSpanish')).toBe('false');
        });

        it('should update placeholder to Italian text', () => {
            const store = useLanguageStore();
            store.setItalianoLanguage();

            expect(store.placeholder).toContain('Scrivi');
        });
    });

    describe('setSpanishLanguage', () => {
        it('should set Spanish language', () => {
            const store = useLanguageStore();

            store.setSpanishLanguage();

            expect(store.langSpanish).toBe(true);
            expect(store.langEnglish).toBe(false);
            expect(store.langIta).toBe(false);
            expect(localStorage.getItem('langSpanish')).toBe('true');
            expect(localStorage.getItem('langEnglish')).toBe('false');
            expect(localStorage.getItem('langIta')).toBe('false');
        });

        it('should update placeholder to Spanish text', () => {
            const store = useLanguageStore();
            store.setSpanishLanguage();

            expect(store.placeholder).toContain('Escriba');
        });
    });

    describe('checkAndSetLanguage', () => {
        it('should set English as default when no language is saved', async () => {
            const store = useLanguageStore();

            store.checkAndSetLanguage();
            await new Promise(resolve => setTimeout(resolve, 10));

            expect(store.langEnglish).toBe('true');
        });

        it('should restore saved Italian language', async () => {
            localStorage.setItem('langIta', 'true');
            const store = useLanguageStore();

            store.checkAndSetLanguage();
            await new Promise(resolve => setTimeout(resolve, 10));

            expect(store.langIta).toBe(true);
        });

        it('should restore saved Spanish language', async () => {
            localStorage.setItem('langSpanish', 'true');
            const store = useLanguageStore();

            store.checkAndSetLanguage();
            await new Promise(resolve => setTimeout(resolve, 10));

            expect(store.langSpanish).toBe(true);
        });

        it('should set Italian translations when Italian is selected', async () => {
            localStorage.setItem('langIta', 'true');
            const store = useLanguageStore();

            store.checkAndSetLanguage();
            await new Promise(resolve => setTimeout(resolve, 10));

            expect(store.placeholder).toContain('Scrivi');
        });

        it('should set Spanish translations when Spanish is selected', async () => {
            localStorage.setItem('langSpanish', 'true');
            const store = useLanguageStore();

            store.checkAndSetLanguage();
            await new Promise(resolve => setTimeout(resolve, 10));

            expect(store.placeholder).toContain('Escriba');
        });

        it('should sort categories after setting language', async () => {
            const catStore = useCategoriesStore();
            const store = useLanguageStore();

            store.checkAndSetLanguage();
            await new Promise(resolve => setTimeout(resolve, 10));

            expect(catStore.categories).toBeDefined();
        });
    });

    describe('setItalianTranslations', () => {
        it('should set Italian placeholder', () => {
            const store = useLanguageStore();

            store.setItalianTranslations();

            expect(store.placeholder).toContain('Scrivi');
            expect(store.defaultPlaceholderText).toContain('Scrivi');
        });

        it('should set Italian UI text', () => {
            const store = useLanguageStore();

            store.setItalianTranslations();

            expect(store.shoppingListTitle).toBe('Lista Spesa');
            expect(store.settingsTextTitle).toContain('Impostazioni');
        });

        it('should update Italian confirmation text', () => {
            const store = useLanguageStore();

            store.setItalianTranslations();

            expect(store.confirmText).toContain('sicuro');
        });
    });

    describe('setSpanishTranslations', () => {
        it('should set Spanish placeholder', () => {
            const store = useLanguageStore();

            store.setSpanishTranslations();

            expect(store.placeholder).toContain('Escriba');
            expect(store.defaultPlaceholderText).toContain('Escriba');
        });

        it('should set Spanish UI text', () => {
            const store = useLanguageStore();

            store.setSpanishTranslations();

            expect(store.shoppingListTitle).toContain('Lista');
            expect(store.settingsTextTitle).toContain('Ajustes');
        });

        it('should update Spanish confirmation text', () => {
            const store = useLanguageStore();

            store.setSpanishTranslations();

            expect(store.confirmText).toContain('seguro');
        });
    });
});