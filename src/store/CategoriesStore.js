import { defineStore } from 'pinia';
import { useTodoStore } from '@/store/TodoStore';
import { useLanguageStore } from '@/store/LanguageStore';

const CATEGORIES_BASE_CONFIG = [
    { emoji: String.fromCodePoint(0x1f966), active: true }, // vegetali
    { emoji: String.fromCodePoint(0x1f969), active: true }, // carne
    { emoji: String.fromCodePoint(0x1f99e), active: true }, // pesce
    { emoji: String.fromCodePoint(0x1f353), active: true }, // frutta
    { emoji: String.fromCodePoint(0x1f382), active: true }, // dolci
    { emoji: String.fromCodePoint(0x1f95b), active: true }, // latticini
    { emoji: String.fromCodePoint(0x1f35e), active: true }, // farinacei
    { emoji: String.fromCodePoint(0x1f37a), active: true }, // bevande
    { emoji: String.fromCodePoint(0x2744), active: true }, // surgelati
    { emoji: String.fromCodePoint(0x1f9c2), active: true }, // spezie
    { emoji: String.fromCodePoint(0x1f9fb), active: true }, // igiene
    { emoji: String.fromCodePoint(0x1f48a), active: true }, // farmaci
    { emoji: String.fromCodePoint(0x1f4da), active: true }, // cancelleria
    { emoji: String.fromCodePoint(0x1f476), active: true }, // bimbi
    { emoji: String.fromCodePoint(0x1f4a1), active: true }, // elettronica
    { emoji: String.fromCodePoint(0x1f439), active: true }, // animali
    { emoji: String.fromCodePoint(0x1f6E0), active: true }, // attrezzi 
    { emoji: String.fromCodePoint(0x1f457), active: true }, // vestiti
    { emoji: String.fromCodePoint(0x1f579), active: true }, // giocattoli
    { emoji: String.fromCodePoint(0x1fA91), active: true }, // arredamento
    { emoji: String.fromCodePoint(0x1f37d), active: true }, // casalinghi
    { emoji: String.fromCodePoint(0x1fab4), active: true }, // giardinaggio
    { emoji: String.fromCodePoint(0x1f310), active: true }, // web
    { emoji: String.fromCodePoint(0x26BD), active: true }, // sport
    { emoji: String.fromCodePoint(0x1F484), active: true }, // estetica
    { emoji: String.fromCodePoint(0x1f4b8), active: true }, // altro
    { emoji: String.fromCodePoint(0x1f385), active: false }, // regali di natale
];

const CATEGORIES_NAMES = {
    eng: [
        'vegetables', 'meat', 'fish', 'fruit', 'sweets', 'dairy', 'starchy', 'drinks',
        'frozen', 'spices', 'hygiene', 'medications', 'stationery', 'babies', 'electronics',
        'pets', 'tools', 'clothes', 'toys', 'furniture', 'household', 'gardening',
        'online', 'sports', 'beauty', 'other', 'christmas gifts'
    ],
    ita: [
        'vegetali', 'carne', 'pesce', 'frutta', 'dolci', 'latticini', 'farinacei', 'bevande',
        'surgelati', 'spezie', 'igiene', 'farmaci', 'cancelleria', 'bimbi', 'elettronica',
        'animali', 'attrezzi', 'vestiti', 'giocattoli', 'arredamento', 'casalinghi', 'giardinaggio',
        'web', 'sport', 'estetica', 'altro', 'regali di natale'
    ],
    span: [
        'verduras', 'carnes', 'pescado', 'fruta', 'dulces', 'lácteos', 'harina', 'bebidas',
        'congelados', 'especias', 'higiene', 'medicamentos', 'papelería', 'niños', 'electrónica',
        'animales', 'herramientas', 'ropa', 'juguetes', 'mobiliario', 'hogar', 'jardinería',
        'internet', 'deporte', 'belleza', 'otros', 'regalos de navidad'
    ],
    fra: [
        'légumes', 'viande', 'poisson', 'fruits', 'sucreries', 'laitages', 'amidon',
        'boissons', 'surgelés', 'épices', 'hygiène', 'médicaments', 'papeterie',
        'bébés', 'électronique', 'animaux', 'matériel', 'vêtements', 'jouets',
        'meubles', 'maison', 'jardinage', 'en ligne', 'sportive',
        'beauté', 'autre', 'cadeaux de Noël'
    ]
};

export const useCategoriesStore = defineStore('Categories', {
    state: () => ({
        todosStore: useTodoStore(),
        languages: useLanguageStore(),
        categories: [],
        engCategories: [],
        itaCategories: [],
        spanCategories: [],
        fraCategories: []
    }),

    actions: {
        initializeCategories() {
            if (this.engCategories.length === 0) {
                this.engCategories = this.buildCategoriesForLanguage('eng');
                this.itaCategories = this.buildCategoriesForLanguage('ita');
                this.spanCategories = this.buildCategoriesForLanguage('span');
                this.fraCategories = this.buildCategoriesForLanguage('fra');
            }
        },
        buildCategoriesForLanguage(language) {
            return CATEGORIES_BASE_CONFIG.map((config, index) => ({
                name: CATEGORIES_NAMES[language][index],
                emojy: config.emoji, // Mantiene il nome originale "emojy" anche se sbagliato per compatibilità con le vecchie versioni
                active: config.active
            }));
        },
        getCurrentLanguageCategories() {
            this.initializeCategories();

            if (this.languages.langIta) {
                return this.itaCategories;
            } else if (this.languages.langSpanish) {
                return this.spanCategories;
            } else if (this.languages.langFrench) {
                return this.fraCategories;
            } else {
                return this.engCategories;
            }
        },
        insertAllCategories() {
            const currentCategories = this.getCurrentLanguageCategories();

            currentCategories.filter(cat => cat.active).forEach((category) => {
                this.todosStore.newTodo = category.name;
                this.todosStore.skipCheck = true;
                this.todosStore.createCategory();
                this.todosStore.addTodo();
            });
        },
        sortCategories() {
            this.categories.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        },
        setAllActiveCategory() {
            CATEGORIES_BASE_CONFIG.forEach(cat => { cat.active = true; });
        },
        resetSelectedCat() {
            this.categories.filter(c => c.selectedCat).forEach(c => c.selectedCat = false);
        },
        resetSpecificSelectedCat(cat) {
            this.categories.filter(c => c.selectedCat).forEach(c => {
                if (cat.name !== c.name) {
                    c.selectedCat = false;
                }
            });
        },
    }
});