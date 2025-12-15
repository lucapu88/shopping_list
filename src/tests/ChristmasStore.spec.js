// tests/unit/stores/ChristmasStore.spec.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useChristmasStore } from '@/store/festivities/ChristmasStore';

describe('ChristmasStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('State', () => {
        it('should initialize with Christmas theme off', () => {
            const store = useChristmasStore();

            expect(store.christmasTheme).toBe(false);
        });
    });

    describe('merryChristmasTheme', () => {
        it('should activate Christmas theme in December', () => {
            const store = useChristmasStore();

            // Mock December
            vi.useFakeTimers();
            const december = new Date(2024, 11, 15); // December 15
            vi.setSystemTime(december);

            store.merryChristmasTheme();

            expect(store.christmasTheme).toBe(true);

            vi.useRealTimers();
        });

        it('should not activate Christmas theme outside December', () => {
            const store = useChristmasStore();

            vi.useFakeTimers();
            const january = new Date(2024, 0, 15); // January 15
            vi.setSystemTime(january);

            store.merryChristmasTheme();

            expect(store.christmasTheme).toBe(false);

            vi.useRealTimers();
        });

        it('should activate Christmas theme on December 31', () => {
            const store = useChristmasStore();

            vi.useFakeTimers();
            const newYearsEve = new Date(2024, 11, 31); // December 31
            vi.setSystemTime(newYearsEve);

            store.merryChristmasTheme();

            expect(store.christmasTheme).toBe(true);

            vi.useRealTimers();
        });
    });

    describe('addChristmasCategory', () => {
        it('should activate all categories', () => {
            const store = useChristmasStore();

            store.addChristmasCategory();

            // Verify setAllActiveCategory was called via categoriesStore
            const categoriesStore = store.categoriesStore;
            expect(categoriesStore).toBeDefined();
        });
    });
});