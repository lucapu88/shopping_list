import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';


export const useAddModifyDeleteTodosStore = defineStore('addModifyDelete', {
    state: () => ({
        todos: [], //conterrà gli elementi che noi digitiamo
        newTodo: null, //elemento che scriviamo noi e andrà a riempire l'array
        copiedTodo: null,
        visible: true, //serve per la visibilità del contenitore dell'alert
        categoryList: null,
        categoryListChildren: null,
        helper: null,
        christmasTheme: false,
        highlits: null,
        categoryClass: false,
        categoryEmoji: '',
        categories: [],
        addTodoInCategory: { condition: false, id: null },
        isDraggable: false,
    }),
    getters: {
    },
    actions: {
        addTodo() {
            if (!this.newTodo) { return; } //solo se scrivo qualcosa lo aggiunge

            this.categories.forEach((category) => {
                //se scrivo un nome che è presente nella lista di categorie, creo una categoria evidenziata
                if (this.newTodo.toLowerCase().trim() === category.name) {
                    this.categoryClass = true;
                    this.categoryEmoji = category.emojy;
                }
            });

            const todoObject = {
                name: this.newTodo.trim(),
                isActive: false,
                isSelected: false,
                class: this.categoryClass,
                emojy: this.categoryEmoji,
                multipleDelete: false,
                modify: false,
                todoAdded: true,
            };

            !this.addTodoInCategory.condition
                ? this.todos.push(todoObject)
                : this.todos.splice(this.addTodoInCategory.id + 1, 0, todoObject);

            setTimeout(() => {
                //faccio questo per crearmi un'animazione visibile per un lasso di tempo appena si aggiunge un todo
                this.changeTodoAdded(this.todos);
            }, 1500);

            this.newTodo = '';
            this.categoryClass = false;
            this.categoryEmoji = '';
            this.categoryList = false;
            this.isDraggable = false;
            // this.resetListIstructions();
            // this.saveTodos();
            // this.toggleButtonDeleteSelectedTodo();
            this.resetModify();
            console.log(this.todos);
        },
        changeTodoAdded(array) {
            //mi serve solo per "evidenziare" il bordo con il boxshadow (per n secondi) quando si aggiunge un nuovo todo
            array.forEach(item => item.todoAdded = false);
        },
        toggleDragDrop() {
            this.isDraggable = !this.isDraggable;
            this.categoryList = false;
            this.resetModify();
            this.removeSelectedCategoryToAddItem();
        },
        removeSelectedCategoryToAddItem() {
            //serve per togliere la selezione di una categoria aggiunta (quando clicchi su un nome evidenziato verde e diventa blu)
            this.todos.map((t) => (t.isSelected = false));
            useLanguageStore.placeholder = useLanguageStore.defaultPlaceholderText;
            this.addTodoInCategory.condition = false;
        },
        resetModify(copiedTodo) {
            const todoEmpty = this.todos.find((todo) => todo.modify);
            if (copiedTodo && todoEmpty) {
                /*se ho ricevuto una copia di un todo vuol dire che sto abbandonando il vecchio todo senza salvare, 
                quindi il vecchio todo riprende il nome che aveva, ovvero quello della copia e poi dopo setto tutti i todo in modifica a false*/
                todoEmpty.name = copiedTodo.name;
            }
            this.todos.forEach((todo) => (todo.modify = false));
        },
    },
});