import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';


export const useAddModifyDeleteTodosStore = defineStore('addModifyDelete', {
    state: () => ({
        languages: useLanguageStore(),
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
        addTodoInCategory: { condition: false, id: null },
        isDraggable: false,
        confirmDeleteModal: false,
        index: null,
        deleteSelected: false,
    }),
    getters: {
    },
    actions: {
        addTodo() {
            if (!this.newTodo) { return; } //solo se scrivo qualcosa lo aggiunge

            this.languages.categories.forEach((category) => {
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
            this.saveTodos();
            // this.toggleButtonDeleteSelectedTodo();
            this.resetModify();
            console.log(this.todos);
        },
        saveTodos() {
            const parsedTodos = JSON.stringify(this.todos);
            window.localStorage.setItem('todos', parsedTodos);
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
            this.languages.placeholder = this.languages.defaultPlaceholderText;
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
        showCategoryList() {
            this.removeSelectedCategoryToAddItem();
            this.categoryList = !this.categoryList;
            this.isDraggable = false;
            this.categoryList ? setTimeout(() => { this.categoryListChildren = true; }, 400) : this.categoryListChildren = false;
        },
        selectCategoryName(categoryName) {
            this.newTodo = categoryName;
            this.addTodo();
        },
        removeOnlyEmpty() {
            const last = this.todos[this.todos.length - 1];
            //se l'ultimo della lista è una classe (allora al suo interno sarà vuoto) aggiungo una proprietà per rimuoverlo
            if (last?.class) { last.classToBedeleted = true; }

            this.todos.forEach((todo, index) => {
                const next = this.todos[index + 1];
                //se l'elemento è una categoria ed il suo successivo/precedente pure, vuol dire che sono categorie vuote
                if (todo?.class && next?.class) { todo.classToBedeleted = true; }
            });
            this.todos = this.todos.filter((todo) => !todo.classToBedeleted);
            this.saveTodos();
            this.categoryList = false;
        },
        confirmedRemoveTodo(x) {
            this.todos.splice(x, 1);
            this.saveTodos();
            this.confirmDeleteModal = false;
            // se ho impostato l'eliminazione automatica categorie vuote
            if (this.canDeleteEmptyCategories) { this.removeOnlyEmpty(); }
            navigator.vibrate(220);
        },
        deleteSelectedTodos() {
            this.todos = this.todos.filter((todo) => !todo.multipleDelete);
            this.isDraggable = false;
            this.saveTodos();
            this.confirmDeleteModal = false;
        },
    },
});