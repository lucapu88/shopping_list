import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';


export const useAddModifyDeleteTodosStore = defineStore('addModifyDelete', {
  state: () => ({
    languages: useLanguageStore(),
    settings: useSettingsStore(),
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
    confirmRemove: false,
    canDeleteMultipleTodo: false,
    focusIn: false,
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
      this.settings.resetListIstructions();
      this.saveTodos();
      this.toggleButtonDeleteSelectedTodo();
      this.resetModify();
      console.log(this.todos);
    },
    modifyTodo(n) {
      this.resetModify(this.copiedTodo);
      this.todos[n].modify = !this.todos[n].modify;
      this.copiedTodo = Object.assign({}, this.todos[n]);
      this.removeSelectedCategoryToAddItem();
    },
    removeTodo(x, todo) {
      this.removeSelectedCategoryToAddItem();
      //se ho impostato la conferma all'eliminazione apro una modale prima di eliminare altrimenti elimino direttamente
      if (this.settings.canDelete) {
        this.languages.completeConfirmText = `${this.languages.confirmText} ${todo.name.toUpperCase()}?`;
        this.confirmDeleteModal = true;
        this.confirmRemove = true;
        this.deleteSelected = false;
        this.index = x;
        // se ho impostato l'eliminazione automatica categorie vuote
        if (this.settings.canDeleteEmptyCategories) { this.removeOnlyEmpty(); }
      } else {
        this.confirmedRemoveTodo(x, todo);
      }
      this.settings.resetListIstructions();
      this.toggleButtonDeleteSelectedTodo();
    },
    confirmedRemoveTodo(x) {
      this.todos.splice(x, 1);
      this.saveTodos();
      this.confirmDeleteModal = false;
      // se ho impostato l'eliminazione automatica categorie vuote
      if (this.settings.canDeleteEmptyCategories) { this.removeOnlyEmpty(); }
      navigator.vibrate(220);
    },
    saveTodos(draggedElement) {
      const parsedTodos = JSON.stringify(draggedElement ? draggedElement : this.todos);
      window.localStorage.setItem('todos', parsedTodos);
    },
    createTodosList() {
      if (window.localStorage.getItem('todos')) {
        //se si deve prendere un oggetto da salvare in locale
        try {
          this.todos = JSON.parse(window.localStorage.getItem('todos')); //prova a trasformare l'array in un oggetto javascript
          this.resetModify(); //lo faccio qui perchè altrimenti non funzionerebbe il tasto del modifica todo per gli utenti con elementi vecchi inseriti nella lista
        } catch (e) {
          window.localStorage.removeItem('todos'); //se viene trovato un errore, rimuovi l'oggetto (o meglio, non salvare niente)
        }
      }
      if (!this.addTodoInCategory.condition) { this.todos.map((t) => (t.isSelected = false)); }
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
    deleteSelectedTodos() {
      this.todos = this.todos.filter((todo) => !todo.multipleDelete);
      this.isDraggable = false;
      this.saveTodos();
      this.confirmDeleteModal = false;
    },
    selectCategoryToAddItem(index, todo) {
      //solo se è nella lista categorie faccio tutto
      if (todo.class) {
        const allCategories = [...this.languages.engCategories, ...this.languages.itaCategories];

        this.todos.map((t) => (t.isSelected = false)); //azzero tutto
        allCategories.forEach((category) => {
          if (todo.name.toLowerCase() === category.name) {
            //se il nome è uguale alla categoria, permetto il toggle per la classe e salvo l'index
            this.addTodoInCategory.condition = !this.addTodoInCategory.condition;
            this.addTodoInCategory.id = index;

            if (this.addTodoInCategory.condition) {
              //se clicco su una categoria ed è evidenziata il focus va sull'input
              this.focusIn = true;
              this.languages.placeholder = (this.languages.langIta ? 'Aggiungi in ' : 'Add in ') + todo.emojy + todo.name.toUpperCase();
            } else {
              this.focusIn = false;
              this.languages.placeholder = this.languages.defaultPlaceholderText;
            }
          }
          todo.isSelected = this.addTodoInCategory.condition;
        });
        this.saveTodos();
      }
    },
    selectTodoForDelete(index) {
      if (this.todos[index].modify) { return; }
      this.todos[index].isActive = false;
      this.todos[index].isDisabled = false;
      this.todos[index].multipleDelete = !this.todos[index].multipleDelete;
      this.toggleButtonDeleteSelectedTodo();
      this.removeSelectedCategoryToAddItem();
      this.saveTodos();
    },
    myFilter(n) {
      if (!this.todos[n].class) {
        //al click setta la proprietà del singolo todo isActive (evidenzia rosso l'elemento cliccato)
        this.todos[n].multipleDelete = false;
        this.todos[n].isActive = !this.todos[n].isActive;
        this.todos[n].isDisabled = !this.todos[n].isDisabled; //disabilito i pulsanti

        this.removeSelectedCategoryToAddItem();
        this.saveTodos();
      }
    },
    saveModifiedTodo(x, y) {
      this.todos.splice(x, 1);
      this.todos.splice(x, 0, y);
      this.saveTodos();
      this.todos[x].modify = false;
    },
    undoChanges(n) {
      this.todos[n].name = this.copiedTodo.name;
      this.todos[n].modify = false;
    },
    toggleButtonDeleteSelectedTodo() {
      this.canDeleteMultipleTodo = this.todos.some((el) => el.multipleDelete);
    },
  },
});