import { defineStore } from 'pinia';
import { useTodoStore } from '@/store/TodoStore';
import { useLanguageStore } from '@/store/LanguageStore';

const CATEGORIES_BASE_CONFIG = [
    { emoji: String.fromCodePoint(0x1f966), active: true }, // vegetables/vegetali/verduras
    { emoji: String.fromCodePoint(0x1f969), active: true }, // meat/carne/carnes
    { emoji: String.fromCodePoint(0x1f99e), active: true }, // fish/pesce/pescado
    { emoji: String.fromCodePoint(0x1f353), active: true }, // fruit/frutta/fruta
    { emoji: String.fromCodePoint(0x1f382), active: true }, // sweets/dolci/dulces
    { emoji: String.fromCodePoint(0x1f95b), active: true }, // dairy products/latticini/lácteos
    { emoji: String.fromCodePoint(0x1f35e), active: true }, // starchy/farinacei/harina
    { emoji: String.fromCodePoint(0x1f37a), active: true }, // drinks/bevande/bebidas
    { emoji: String.fromCodePoint(0x2744), active: true }, // frozen foods/surgelati/congelados
    { emoji: String.fromCodePoint(0x1f9c2), active: true }, // spices/spezie/especias
    { emoji: String.fromCodePoint(0x1f9fb), active: true }, // hygiene/igiene/higiene
    { emoji: String.fromCodePoint(0x1f48a), active: true }, // medications/farmaci/medicamentos
    { emoji: String.fromCodePoint(0x1f4da), active: true }, // stationery/cancelleria/papelería
    { emoji: String.fromCodePoint(0x1f476), active: true }, // babies/bimbi/niños
    { emoji: String.fromCodePoint(0x1f4a1), active: true }, // electronics/elettronica/electrónica
    { emoji: String.fromCodePoint(0x1f439), active: true }, // pets/animali/animales
    { emoji: String.fromCodePoint(0x1f6E0), active: true }, // work tools/attrezzi/herramientas
    { emoji: String.fromCodePoint(0x1f457), active: true }, // clothes/vestiti/ropa
    { emoji: String.fromCodePoint(0x1f579), active: true }, // toys/giocattoli/juguetes
    { emoji: String.fromCodePoint(0x1fA91), active: true }, // furniture/arredamento/mobiliario
    { emoji: String.fromCodePoint(0x1f37d), active: true }, // household objects/oggetti domestici/objetos domésticos
    { emoji: String.fromCodePoint(0x1fab4), active: true }, // gardening/giardinaggio/jardinería
    { emoji: String.fromCodePoint(0x1f310), active: true }, // online shopping/acquisti online/comprar en intenet
    { emoji: String.fromCodePoint(0x26BD), active: true }, // sports/sport/deporte
    { emoji: String.fromCodePoint(0x1F484), active: true }, // beauty/estetica/belleza
    { emoji: String.fromCodePoint(0x1f4b8), active: true }, // other/altro/otros
    { emoji: String.fromCodePoint(0x1f385), active: false }, // christmas gifts/regali di natale/regalos de navidad
];

const CATEGORIES_NAMES = {
    eng: [
        'vegetables', 'meat', 'fish', 'fruit', 'sweets', 'dairy products', 'starchy', 'drinks',
        'frozen foods', 'spices', 'hygiene', 'medications', 'stationery', 'babies', 'electronics',
        'pets', 'work tools', 'clothes', 'toys', 'furniture', 'household objects', 'gardening',
        'online shopping', 'sports', 'beauty', 'other', 'christmas gifts'
    ],
    ita: [
        'vegetali', 'carne', 'pesce', 'frutta', 'dolci', 'latticini', 'farinacei', 'bevande',
        'surgelati', 'spezie', 'igiene', 'farmaci', 'cancelleria', 'bimbi', 'elettronica',
        'animali', 'attrezzi', 'vestiti', 'giocattoli', 'arredamento', 'oggetti domestici', 'giardinaggio',
        'acquisti online', 'sport', 'estetica', 'altro', 'regali di natale'
    ],
    span: [
        'verduras', 'carnes', 'pescado', 'fruta', 'dulces', 'lácteos', 'harina', 'bebidas',
        'congelados', 'especias', 'higiene', 'medicamentos', 'papelería', 'niños', 'electrónica',
        'animales', 'herramientas', 'ropa', 'juguetes', 'mobiliario', 'objetos domésticos', 'jardinería',
        'comprar en intenet', 'deporte', 'belleza', 'otros', 'regalos de navidad'
    ],
    fra: [
        'légumes', 'viande', 'poisson', 'fruits', 'sucreries', 'produits laitiers', 'amidon',
        'boissons', 'produits surgelés', 'épices', 'hygiène', 'médicaments', 'papeterie',
        'bébés', 'électronique', 'animaux', 'outils de travail', 'vêtements', 'jouets',
        'meubles', 'objets domestiques', 'jardinage', 'achats en ligne', 'sportive',
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
                this.todosStore.addTodo();
            });
        },
        sortCategories() {
            this.categories.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        },
        setAllActiveCategory() {
            CATEGORIES_BASE_CONFIG.forEach(cat => { cat.active = true; });
        }
    }
});