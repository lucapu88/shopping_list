import { defineStore } from 'pinia';

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
            // this.resetModify();
            console.log(this.todos);
        },
        changeTodoAdded(array) {
            //mi serve solo per "evidenziare" il bordo con il boxshadow (per n secondi) quando si aggiunge un nuovo todo
            array.forEach(item => item.todoAdded = false);
        },
    },
});