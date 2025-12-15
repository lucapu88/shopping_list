// tests/unit/stores/CategoriesStore.spec.js
import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCategoriesStore } from "@/store/CategoriesStore";
import { useLanguageStore } from "@/store/LanguageStore";

describe("CategoriesStore", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		localStorage.clear();
	});

	describe("State", () => {
		it("should initialize with empty categories array", () => {
			const store = useCategoriesStore();

			expect(Array.isArray(store.categories)).toBe(true);
			expect(store.engCategories).toEqual([]);
			expect(store.itaCategories).toEqual([]);
			expect(store.spanCategories).toEqual([]);
		});
	});

	describe("initializeCategories", () => {
		it("should build all language categories on first call", () => {
			const store = useCategoriesStore();

			store.initializeCategories();

			expect(store.engCategories.length).toBeGreaterThan(0);
			expect(store.itaCategories.length).toBeGreaterThan(0);
			expect(store.spanCategories.length).toBeGreaterThan(0);
		});

		it("should not rebuild categories on subsequent calls", () => {
			const store = useCategoriesStore();
			store.initializeCategories();
			const firstLength = store.engCategories.length;

			store.initializeCategories();

			expect(store.engCategories.length).toBe(firstLength);
		});

		it("should build 27 categories for each language", () => {
			const store = useCategoriesStore();

			store.initializeCategories();

			expect(store.engCategories.length).toBe(27);
			expect(store.itaCategories.length).toBe(27);
			expect(store.spanCategories.length).toBe(27);
		});
	});

	describe("buildCategoriesForLanguage", () => {
		it("should build categories with correct structure", () => {
			const store = useCategoriesStore();
			const categories = store.buildCategoriesForLanguage("eng");

			expect(Array.isArray(categories)).toBe(true);
			categories.forEach((cat) => {
				expect(cat.name).toBeDefined();
				expect(cat.emojy).toBeDefined();
				expect(cat.active).toBeDefined();
			});
		});

		it("should build English categories correctly", () => {
			const store = useCategoriesStore();
			const categories = store.buildCategoriesForLanguage("eng");

			expect(categories[0].name).toBe("vegetables");
			expect(categories.find((c) => c.name === "meat")).toBeDefined();
			expect(categories.find((c) => c.name === "fish")).toBeDefined();
		});

		it("should build Italian categories correctly", () => {
			const store = useCategoriesStore();
			const categories = store.buildCategoriesForLanguage("ita");

			expect(categories[0].name).toBe("vegetali");
			expect(categories.find((c) => c.name === "carne")).toBeDefined();
			expect(categories.find((c) => c.name === "pesce")).toBeDefined();
		});

		it("should build Spanish categories correctly", () => {
			const store = useCategoriesStore();
			const categories = store.buildCategoriesForLanguage("span");

			expect(categories[0].name).toBe("verduras");
			expect(categories.find((c) => c.name === "carnes")).toBeDefined();
			expect(categories.find((c) => c.name === "pescado")).toBeDefined();
		});

		it("should include Christmas gifts category", () => {
			const store = useCategoriesStore();

			const engCategories = store.buildCategoriesForLanguage("eng");
			const itaCategories = store.buildCategoriesForLanguage("ita");
			const spanCategories = store.buildCategoriesForLanguage("span");

			expect(engCategories.find((c) => c.name === "christmas gifts")).toBeDefined();
			expect(itaCategories.find((c) => c.name === "regali di natale")).toBeDefined();
			expect(spanCategories.find((c) => c.name === "regalos de navidad")).toBeDefined();
		});

		it("should assign emoji to each category", () => {
			const store = useCategoriesStore();
			const categories = store.buildCategoriesForLanguage("eng");

			categories.forEach((cat) => {
				expect(cat.emojy).toBeTruthy();
				expect(typeof cat.emojy).toBe("string");
			});
		});
	});

	describe("getCurrentLanguageCategories", () => {
		it("should return English categories by default", () => {
			const langStore = useLanguageStore();
			langStore.langEnglish = true;
			const store = useCategoriesStore();

			const categories = store.getCurrentLanguageCategories();

			expect(categories).toEqual(store.engCategories);
		});

		it("should return Italian categories when Italian is selected", () => {
			const langStore = useLanguageStore();
			langStore.langIta = true;
			const store = useCategoriesStore();

			const categories = store.getCurrentLanguageCategories();

			expect(categories).toEqual(store.itaCategories);
		});

		it("should return Spanish categories when Spanish is selected", () => {
			const langStore = useLanguageStore();
			langStore.langSpanish = true;
			const store = useCategoriesStore();

			const categories = store.getCurrentLanguageCategories();

			expect(categories).toEqual(store.spanCategories);
		});

		it("should initialize categories if not already initialized", () => {
			const store = useCategoriesStore();

			const categories = store.getCurrentLanguageCategories();

			expect(categories.length).toBeGreaterThan(0);
		});
	});

	describe("sortCategories", () => {
		it("should sort categories alphabetically by name", () => {
			const store = useCategoriesStore();
			store.categories = [
				{ name: "zebra", emojy: "🦓", active: true },
				{ name: "apple", emojy: "🍎", active: true },
				{ name: "monkey", emojy: "🐵", active: true },
			];

			store.sortCategories();

			expect(store.categories[0].name).toBe("apple");
			expect(store.categories[1].name).toBe("monkey");
			expect(store.categories[2].name).toBe("zebra");
		});

		it("should be case-insensitive", () => {
			const store = useCategoriesStore();
			store.categories = [
				{ name: "Zebra", emojy: "🦓", active: true },
				{ name: "apple", emojy: "🍎", active: true },
			];

			store.sortCategories();

			expect(store.categories[0].name).toBe("apple");
			expect(store.categories[1].name).toBe("Zebra");
		});

		it("should maintain category structure after sorting", () => {
			const store = useCategoriesStore();
			store.categories = [
				{ name: "zebra", emojy: "🦓", active: true },
				{ name: "apple", emojy: "🍎", active: false },
			];

			store.sortCategories();

			store.categories.forEach((cat) => {
				expect(cat.emojy).toBeDefined();
				expect(cat.active !== undefined).toBe(true);
			});
		});
	});

	describe("setAllActiveCategory", () => {
		it("should enable all categories when initialized after activation", () => {
			const store = useCategoriesStore();

			store.setAllActiveCategory();
			store.initializeCategories();

			const allCategories = [...store.engCategories, ...store.itaCategories, ...store.spanCategories];
			allCategories.forEach((cat) => {
				expect(cat.active).toBe(true);
			});
		});

		it("should activate categories for all languages", () => {
			const store = useCategoriesStore();

			store.initializeCategories();
			store.setAllActiveCategory();
			store.initializeCategories();

			expect(store.engCategories.every((c) => c.active)).toBe(true);
			expect(store.itaCategories.every((c) => c.active)).toBe(true);
			expect(store.spanCategories.every((c) => c.active)).toBe(true);
		});
	});
});