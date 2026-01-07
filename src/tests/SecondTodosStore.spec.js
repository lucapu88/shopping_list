// tests/unit/stores/SecondTodoStore.spec.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSecondTodoStore } from '@/store/SecondTodoStore';

describe('SecondTodoStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('State', () => {
        it('should initialize with all lists set to false', () => {
            const store = useSecondTodoStore();

            expect(store.secondList).toBe(false);
            expect(store.thirdList).toBe(false);
            expect(store.fourthList).toBe(false);
            expect(store.fifthList).toBe(false);
            expect(store.sixthList).toBe(false);
            expect(store.seventhList).toBe(false);
            expect(store.eighthList).toBe(false);
        });

        it('should have loading flags initialized to false', () => {
            const store = useSecondTodoStore();

            expect(store.loading).toBe(false);
            expect(store.loadingOpenAIRes).toBe(false);
            expect(store.loadingRecipes).toBe(false);
        });
    });

    describe('resetAllLists', () => {
        it('should reset all list flags and localStorage', () => {
            const store = useSecondTodoStore();
            store.secondList = true;
            store.thirdList = true;
            localStorage.setItem('secondList', 'true');
            localStorage.setItem('thirdList', 'true');

            store.resetAllLists();

            expect(store.secondList).toBe(false);
            expect(store.thirdList).toBe(false);
            expect(localStorage.getItem('secondList')).toBeNull();
            expect(localStorage.getItem('thirdList')).toBeNull();
        });
    });

    describe('setSelectedLists', () => {
        it('should set selected lists from localStorage', () => {
            localStorage.setItem('secondList', 'true');
            localStorage.setItem('thirdList', 'true');

            const store = useSecondTodoStore();
            store.setSelectedLists();

            expect(store.secondList).toBe('true');
            expect(store.thirdList).toBe('true');
        });

        it('should handle missing localStorage entries', () => {
            const store = useSecondTodoStore();
            store.setSelectedLists();

            expect(store.secondList).toBeNull();
            expect(store.thirdList).toBeNull();
        });
    });

    describe('localStorageSettings', () => {
        it('should set value for existing key in array', () => {
            const store = useSecondTodoStore();
            localStorage.setItem('secondList', 'true');

            const arrayOfObjects = [
                { check: 'secondList', set: 'ListNumber2' },
            ];

            store.localStorageSettings(arrayOfObjects, 'test data', 'default');

            expect(localStorage.getItem('ListNumber2')).toBe('test data');
        });

        it('should set default value if no key matches', () => {
            const store = useSecondTodoStore();

            const arrayOfObjects = [
                { check: 'secondList', set: 'ListNumber2' },
            ];

            store.localStorageSettings(arrayOfObjects, 'test data', 'default');

            expect(localStorage.getItem('default')).toBe('test data');
        });
    });
});