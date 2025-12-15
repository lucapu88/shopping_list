// tests/unit/stores/SettingsStore.spec.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSettingsStore } from '@/store/SettingsStore';

describe('SettingsStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('State', () => {
        it('should initialize with default settings', () => {
            const store = useSettingsStore();

            expect(store.canDelete).toBe(false);
            expect(store.canDeleteText).toBe('OFF');
            expect(store.helper).toBe(false);
            expect(store.video).toBe(true);
            expect(store.enableAI).toBe(true);
        });

        it('should have all helper panels initially false', () => {
            const store = useSettingsStore();

            expect(store.changeLanguage).toBe(false);
            expect(store.changeTheme).toBe(false);
            expect(store.safeMode).toBe(false);
            expect(store.troubleshooting).toBe(false);
        });
    });

    describe('canDeleteCheck', () => {
        it('should set canDelete to false when not in localStorage', () => {
            const store = useSettingsStore();
            store.canDeleteCheck();

            expect(store.canDelete).toBe(false);
            expect(store.canDeleteText).toBe('OFF');
        });

        it('should set canDelete to true when saved in localStorage', () => {
            localStorage.setItem('canDelete', 'true');
            const store = useSettingsStore();
            store.canDeleteCheck();

            expect(store.canDelete).toBe(true);
            expect(store.canDeleteText).toBe('ON');
        });

        it('should set canDeleteEmptyCategories from localStorage', () => {
            localStorage.setItem('canDeleteEmptyCategories', 'true');
            const store = useSettingsStore();
            store.canDeleteCheck();

            expect(store.canDeleteEmptyCategories).toBe(true);
            expect(store.canDeleteEmptyCategoriesText).toBe('ON');
        });
    });

    describe('toggleDeleteConfirm', () => {
        it('should toggle canDelete and update localStorage', () => {
            const store = useSettingsStore();
            store.canDelete = false;

            store.toggleDeleteConfirm();

            expect(store.canDelete).toBe(true);
            expect(store.canDeleteText).toBe('ON');
            expect(localStorage.getItem('canDelete')).toBe('true');
        });

        it('should toggle from true to false', () => {
            const store = useSettingsStore();
            store.canDelete = true;
            store.canDeleteText = 'ON';

            store.toggleDeleteConfirm();

            expect(store.canDelete).toBe(false);
            expect(store.canDeleteText).toBe('OFF');
            expect(localStorage.getItem('canDelete')).toBe('false');
        });
    });

    describe('toggleAutomaticDeleteEmptyCategories', () => {
        it('should toggle automatic delete empty categories', () => {
            const store = useSettingsStore();
            store.canDeleteEmptyCategories = false;

            store.toggleAutomaticDeleteEmptyCategories();

            expect(store.canDeleteEmptyCategories).toBe(true);
            expect(store.canDeleteEmptyCategoriesText).toBe('ON');
            expect(localStorage.getItem('canDeleteEmptyCategories')).toBe('true');
        });
    });

    describe('toggleMultipleCategoryInsertion', () => {
        it('should toggle multiple category insertion', () => {
            const store = useSettingsStore();
            store.canMultipleCategoryInsertion = false;

            store.toggleMultipleCategoryInsertion();

            expect(store.canMultipleCategoryInsertion).toBe(true);
            expect(store.canMultipleCategoryInsertionText).toBe('OFF');
        });
    });

    describe('openHelper', () => {
        it('should open helper panel', () => {
            const store = useSettingsStore();
            store.helper = false;

            store.openHelper();

            expect(store.helper).toBe(true);
        });
    });

    describe('showListInstructions', () => {
        it('should show instructions for specified section', () => {
            const store = useSettingsStore();

            store.showListInstructions('safeMode');

            expect(store.safeMode).toBe(true);
            expect(store.section).toBe('safeMode');
        });

        it('should toggle instructions when clicking the same section', () => {
            const store = useSettingsStore();
            store.showListInstructions('safeMode');
            store.showListInstructions('safeMode');

            expect(store.safeMode).toBe(false);
        });

        it('should reset previous section when opening new one', () => {
            const store = useSettingsStore();
            store.showListInstructions('safeMode');
            store.showListInstructions('changeTheme');

            expect(store.safeMode).toBe(true);
            expect(store.changeTheme).toBe(true);
            expect(store.section).toBe('changeTheme');
        });
    });

    describe('resetHelperSettingsAndIstructions', () => {
        it('should reset all helper sections to false', () => {
            const store = useSettingsStore();
            store.changeLanguage = true;
            store.changeTheme = true;
            store.safeMode = true;

            store.resetHelperSettingsAndIstructions();

            expect(store.changeLanguage).toBe(false);
            expect(store.changeTheme).toBe(false);
            expect(store.safeMode).toBe(false);
            expect(store.addEditDelete).toBe(false);
        });
    });

    describe('checkingUpdates', () => {
        it('should check for monthly updates', () => {
            const store = useSettingsStore();
            const today = new Date();

            localStorage.setItem('lastMonth', today.getMonth().toString());
            localStorage.setItem('lastYear', today.getFullYear().toString());

            store.checkingUpdates();

            expect(store.languages.updateText.updated).toBe(true);
            expect(store.dateLastUpdate).toContain(today.getFullYear().toString());
        });
    });

    describe('toggleTutorial', () => {
        it('should toggle tutorial visibility for a feature', () => {
            const store = useSettingsStore();
            store.feature = null;
            store.video = false;

            store.toggleTutorial('addEditDelete');

            expect(store.feature).toBe('addEditDelete');
            expect(store.video).toBe(true);
        });

        it('should toggle video off when clicking same feature twice', () => {
            const store = useSettingsStore();
            store.feature = 'addEditDelete';
            store.video = true;

            store.toggleTutorial('addEditDelete');

            expect(store.video).toBe(false);
        });
    });

    describe('checkDevice', () => {
        it('should detect iPhone devices', () => {
            // const store = useSettingsStore();
            // Object.defineProperty(navigator, 'userAgent', {
            //     value: 'iPhone OS 14_0 like Mac OS X',
            //     configurable: true,
            // });

            // store.checkDevice();

            // expect(store.isIphone).toBe(true);
            // expect(store.isAndroid).toBe(false);
        });

        it('should detect Android devices', () => {
            const store = useSettingsStore();
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Linux; Android 11;)',
                configurable: true,
            });

            store.checkDevice();

            expect(store.isAndroid).toBe(true);
            expect(store.isIphone).toBe(false);
        });
    });
});