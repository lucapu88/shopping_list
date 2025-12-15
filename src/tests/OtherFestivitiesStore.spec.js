
// tests/unit/stores/OthersFestivitiesStore.spec.js
import { describe, it, expect, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useOthersFestivitiesStore } from '@/store/festivities/OthersFestivitiesStore';

describe('OthersFestivitiesStore', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    describe('State', () => {
        it('should initialize with all festivities false', () => {
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            expect(store.halloweenTheme).toBe(false);
            expect(store.worldCancerDay).toBe(false);
            expect(store.valentinesDay).toBe(false);
            expect(store.newYear).toBe(false);
        });
    });

    describe('resetFestivities', () => {
        it('should reset all festivities to false', () => {
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();
            store.halloweenTheme = true;
            store.valentinesDay = true;

            store.resetFestivities();

            expect(store.halloweenTheme).toBe(false);
            expect(store.valentinesDay).toBe(false);
        });
    });

    describe('checkFestivities', () => {
        it('should detect New Year (January 1)', () => {
            //TOFIX questa cosa viene fatta nel componente e non nello store

            // vi.useFakeTimers();
            // vi.setSystemTime(new Date(2024, 0, 1)); // January 1
            // setActivePinia(createPinia());
            // const store = useOthersFestivitiesStore();

            // store.checkFestivities();

            // expect(store.newYear).toBe(true);
        });

        it('should detect World Peace Day (January 1)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 0, 1)); // January 1
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.worldPeaceDay).toBe(true);
        });

        it('should detect World Pizza Day (January 17)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 0, 17)); // January 17
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.worldPizzaDay).toBe(true);
        });

        it('should detect Holocaust Memorial Day (January 27)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 0, 27)); // January 27
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.HolocaustMemorialDay).toBe(true);
        });

        it('should detect World Cancer Day (February 4)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 1, 4)); // February 4
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.worldCancerDay).toBe(true);
        });

        it('should detect Valentines Day (February 14)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 1, 14)); // February 14
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.valentinesDay).toBe(true);
        });

        it('should detect Earth Day (April 22)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 3, 22)); // April 22
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.earthDay).toBe(true);
        });

        it('should detect Star Wars Day (May 25)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 4, 25)); // May 25
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.starWarsDay).toBe(true);
        });

        it('should detect Parents Day (June 1)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 5, 1)); // June 1
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.parentsDay).toBe(true);
        });

        it('should detect World Environment Day (July 5)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 6, 5)); // July 5
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.worldEnvironmentDay).toBe(true);
        });

        it('should detect Internet Day (August 6)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 7, 6)); // August 6 (Tuesday)
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.internetDay).toBe(true);
        });

        it('should detect Toilet Day (November 19)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 10, 19)); // November 19
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.toiletDay).toBe(true);
        });

        it('should detect Human Rights Day (December 10)', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 11, 10)); // December 10
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.humanRightsDayText).toBe(true);
        });

        it('should detect Halloween on October 25', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 9, 25)); // October 25
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.halloweenTheme).toBe(true);
        });

        it('should detect Halloween on October 31', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 9, 31)); // October 31
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.halloweenTheme).toBe(true);
        });

        it('should detect Halloween on November 1', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 10, 1)); // November 1
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.halloweenTheme).toBe(true);
        });

        it('should reset previous festivities before checking', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 0, 1)); // January 1
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();
            store.halloweenTheme = true;

            store.checkFestivities();

            expect(store.halloweenTheme).toBe(false);
        });

        it('should not detect Halloween in December', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2024, 11, 15)); // December 15
            setActivePinia(createPinia());
            const store = useOthersFestivitiesStore();

            store.checkFestivities();

            expect(store.halloweenTheme).toBe(false);
        });
    });
});