import { defineStore } from 'pinia';
import { useTodoStore } from '@/store/TodoStore';
import { useLanguageStore } from '@/store/LanguageStore';


export const useCategoriesStore = defineStore('Categories', {
    state: () => ({
        todosStore: useTodoStore(),
        languages: useLanguageStore(),
        categories: [],
        engCategories: [
            { name: 'vegetables', emojy: String.fromCodePoint(0x1f966), active: true },
            { name: 'meat', emojy: String.fromCodePoint(0x1f969), active: true },
            { name: 'fish', emojy: String.fromCodePoint(0x1f99e), active: true },
            { name: 'fruit', emojy: String.fromCodePoint(0x1f353), active: true },
            { name: 'sweets', emojy: String.fromCodePoint(0x1f382), active: true },
            { name: 'dairy products', emojy: String.fromCodePoint(0x1f95b), active: true },
            { name: 'starchy', emojy: String.fromCodePoint(0x1f35e), active: true },
            { name: 'drinks', emojy: String.fromCodePoint(0x1f37a), active: true },
            { name: 'frozen foods', emojy: String.fromCodePoint(0x2744), active: true },
            { name: 'spices', emojy: String.fromCodePoint(0x1f9c2), active: true },
            { name: 'hygiene', emojy: String.fromCodePoint(0x1f9fb), active: true },
            { name: 'medications', emojy: String.fromCodePoint(0x1f48a), active: true },
            { name: 'stationery', emojy: String.fromCodePoint(0x1f4da), active: true },
            { name: 'babies', emojy: String.fromCodePoint(0x1f476), active: true },
            { name: 'electronics', emojy: String.fromCodePoint(0x1f4a1), active: true },
            { name: 'pets', emojy: String.fromCodePoint(0x1f439), active: true },
            { name: 'work tools', emojy: String.fromCodePoint(0x1f6E0), active: true },
            { name: 'clothes', emojy: String.fromCodePoint(0x1f457), active: true },
            { name: 'toys', emojy: String.fromCodePoint(0x1f579), active: true },
            { name: 'furniture', emojy: String.fromCodePoint(0x1fA91), active: true },
            { name: 'household objects', emojy: String.fromCodePoint(0x1f37d), active: true },
            { name: 'gardening', emojy: String.fromCodePoint(0x1fab4), active: true },
            { name: 'online shopping', emojy: String.fromCodePoint(0x1f310), active: true },
            { name: 'sports', emojy: String.fromCodePoint(0x26BD), active: true },
            { name: 'beauty', emojy: String.fromCodePoint(0x1F484), active: true },
            { name: 'other', emojy: String.fromCodePoint(0x1f4b8), active: true },
            { name: 'christmas gifts', emojy: String.fromCodePoint(0x1f385), active: false },
        ],
        itaCategories: [
            { name: 'vegetali', emojy: String.fromCodePoint(0x1f966), active: true },
            { name: 'carne', emojy: String.fromCodePoint(0x1f969), active: true },
            { name: 'pesce', emojy: String.fromCodePoint(0x1f99e), active: true },
            { name: 'frutta', emojy: String.fromCodePoint(0x1f353), active: true },
            { name: 'dolci', emojy: String.fromCodePoint(0x1f382), active: true },
            { name: 'latticini', emojy: String.fromCodePoint(0x1f95b), active: true },
            { name: 'farinacei', emojy: String.fromCodePoint(0x1f35e), active: true },
            { name: 'bevande', emojy: String.fromCodePoint(0x1f37a), active: true },
            { name: 'surgelati', emojy: String.fromCodePoint(0x2744), active: true },
            { name: 'spezie', emojy: String.fromCodePoint(0x1f9c2), active: true },
            { name: 'igiene', emojy: String.fromCodePoint(0x1f9fb), active: true },
            { name: 'farmaci', emojy: String.fromCodePoint(0x1f48a), active: true },
            { name: 'cancelleria', emojy: String.fromCodePoint(0x1f4da), active: true },
            { name: 'bimbi', emojy: String.fromCodePoint(0x1f476), active: true },
            { name: 'elettronica', emojy: String.fromCodePoint(0x1f4a1), active: true },
            { name: 'animali', emojy: String.fromCodePoint(0x1f439), active: true },
            { name: 'attrezzi', emojy: String.fromCodePoint(0x1f6E0), active: true },
            { name: 'vestiti', emojy: String.fromCodePoint(0x1f457), active: true },
            { name: 'giocattoli', emojy: String.fromCodePoint(0x1f579), active: true },
            { name: 'arredamento', emojy: String.fromCodePoint(0x1fA91), active: true },
            { name: 'oggetti domestici', emojy: String.fromCodePoint(0x1f37d), active: true },
            { name: 'giardinaggio', emojy: String.fromCodePoint(0x1fab4), active: true },
            { name: 'acquisti online', emojy: String.fromCodePoint(0x1f310), active: true },
            { name: 'sport', emojy: String.fromCodePoint(0x26BD), active: true },
            { name: 'estetica', emojy: String.fromCodePoint(0x1F484), active: true },
            { name: 'altro', emojy: String.fromCodePoint(0x1f4b8), active: true },
            { name: 'regali di natale', emojy: String.fromCodePoint(0x1f385), active: false },
        ],
        spanCategories: [
            { name: 'verduras', emojy: String.fromCodePoint(0x1f966), active: true },
            { name: 'carnes', emojy: String.fromCodePoint(0x1f969), active: true },
            { name: 'pescado', emojy: String.fromCodePoint(0x1f99e), active: true },
            { name: 'fruta', emojy: String.fromCodePoint(0x1f353), active: true },
            { name: 'dulces', emojy: String.fromCodePoint(0x1f382), active: true },
            { name: 'lácteos', emojy: String.fromCodePoint(0x1f95b), active: true },
            { name: 'harina', emojy: String.fromCodePoint(0x1f35e), active: true },
            { name: 'bebidas', emojy: String.fromCodePoint(0x1f37a), active: true },
            { name: 'congelados', emojy: String.fromCodePoint(0x2744), active: true },
            { name: 'especias', emojy: String.fromCodePoint(0x1f9c2), active: true },
            { name: 'higiene', emojy: String.fromCodePoint(0x1f9fb), active: true },
            { name: 'medicamentos', emojy: String.fromCodePoint(0x1f48a), active: true },
            { name: 'papelería', emojy: String.fromCodePoint(0x1f4da), active: true },
            { name: 'niños', emojy: String.fromCodePoint(0x1f476), active: true },
            { name: 'electrónica', emojy: String.fromCodePoint(0x1f4a1), active: true },
            { name: 'animales', emojy: String.fromCodePoint(0x1f439), active: true },
            { name: 'herramientas', emojy: String.fromCodePoint(0x1f6E0), active: true },
            { name: 'ropa', emojy: String.fromCodePoint(0x1f457), active: true },
            { name: 'juguetes', emojy: String.fromCodePoint(0x1f579), active: true },
            { name: 'mobiliario', emojy: String.fromCodePoint(0x1fA91), active: true },
            { name: 'objetos domésticos', emojy: String.fromCodePoint(0x1f37d), active: true },
            { name: 'jardinería', emojy: String.fromCodePoint(0x1fab4), active: true },
            { name: 'comprar en intenet', emojy: String.fromCodePoint(0x1f310), active: true },
            { name: 'deporte', emojy: String.fromCodePoint(0x26BD), active: true },
            { name: 'belleza', emojy: String.fromCodePoint(0x1F484), active: true },
            { name: 'otros', emojy: String.fromCodePoint(0x1f4b8), active: true },
            { name: 'regalos de navidad', emojy: String.fromCodePoint(0x1f385), active: false },
        ],
    }),
    actions: {
        insertAllCategories() {
            if (this.languages.langIta) {
                this.itaCategories.filter(cat => cat.active).forEach((category) => {
                    this.todosStore.newTodo = category.name;
                    this.todosStore.skipCheck = true;
                    this.todosStore.addTodo();
                });
            } else if (this.languages.langSpanish) {
                this.spanCategories.filter(cat => cat.active).forEach((category) => {
                    this.todosStore.newTodo = category.name;
                    this.todosStore.skipCheck = true;
                    this.todosStore.addTodo();
                });
            } else {
                this.engCategories.filter(cat => cat.active).forEach((category) => {
                    this.todosStore.newTodo = category.name;
                    this.todosStore.skipCheck = true;
                    this.todosStore.addTodo();
                });
            }
        },
        sortCategories() {
            this.categories.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        }
    }
});