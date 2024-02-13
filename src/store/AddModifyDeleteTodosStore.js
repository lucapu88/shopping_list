import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useOthersFestivitiesStore } from '@/store/OthersFestivitiesStore';

export const useAddModifyDeleteTodosStore = defineStore('addModifyDelete', {
  state: () => ({
    languages: useLanguageStore(),
    settings: useSettingsStore(),
    christmas: useChristmasStore(),
    festivities: useOthersFestivitiesStore(),
    todos: [], //conterrà gli elementi che noi digitiamo
    newTodo: null, //elemento che scriviamo noi e andrà a riempire l'array
    copiedTodo: null,
    visible: true, //serve per la visibilità del contenitore dell'alert
    categoryList: null,
    categoryListChildren: null,
    helper: null,
    christmasTheme: false,
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
    totalPrice: 0,
    showOnlyImportantTodos: false,
    deletedTodos: null,
    deletedSingleTodo: null,
  }),
  getters: {
    openDeleteAllModal: (state) => state.visible = !state.visible,
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
      this.christmas.merryChristmasTheme();
      this.festivities.checkFestivities();
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
      } else {
        this.confirmedRemoveTodo(x);
      }
      this.settings.resetListIstructions();
      this.toggleButtonDeleteSelectedTodo();
    },
    confirmedRemoveTodo(x) {
      this.backupList();
      this.setOnlyDeletedTodos(x);
      this.todos.splice(x, 1);
      this.saveTodos();
      this.toggleButtonDeleteSelectedTodo();
      this.confirmDeleteModal = false;
      // se ho impostato l'eliminazione automatica categorie vuote
      if (this.settings.canDeleteEmptyCategories) { this.removeOnlyEmpty(); }
      navigator.vibrate(220);
    },
    saveTodos(draggedElement) {
      const parsedTodos = JSON.stringify(draggedElement || this.todos);
      window.localStorage.setItem('todos', parsedTodos);
      this.priceCalculator();
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
    priceCalculator() {
      //se nell'input scrivo un numero che sia preceduto o anticipato da £,$ oppure € deduco sia un prezzo e quindi calcolo la somma
      let numbersArray = [];
      for (const todo of this.todos) {
        if (todo.name.includes("£") || todo.name.includes("$") || todo.name.includes("€")) {
          // const newTodo = todo.name.includes('.') ? todo.name.replace(/\./g, ",") : todo.name;
          const numero = todo.name.match(/[£$€]?(\d+(?:[.,]\d+)?)/)[1];
          numbersArray.push(numero);
        }
      }
      // eslint-disable-next-line no-useless-escape
      numbersArray = numbersArray.map(el => el.replace(/\,/g, "."));
      this.totalPrice = numbersArray.reduce((a, b) => +a + +b, 0).toFixed(2);
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
      this.focusIn = false;
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
      if (last?.class) { last.classToBeDeleted = true; }

      this.todos.forEach((todo, index) => {
        const next = this.todos[index + 1];
        //se l'elemento è una categoria ed il suo successivo/precedente pure, vuol dire che sono categorie vuote
        if (todo?.class && next?.class) { todo.classToBeDeleted = true; }
      });
      this.todos = this.todos.filter((todo) => !todo.classToBeDeleted);
      this.saveTodos();
      this.categoryList = false;
    },
    deleteSelectedTodos() {
      this.backupList();
      this.setOnlyDeletedTodos('multipleDelete');
      //Elimina solo i to do che sono stati selezionati.
      this.todos = this.todos.filter((todo) => !todo.multipleDelete);
      this.isDraggable = false;
      this.saveTodos();
      if (this.settings.canDeleteEmptyCategories) { this.removeOnlyEmpty(); }
      this.confirmDeleteModal = false;
      this.toggleButtonDeleteSelectedTodo();
    },
    selectCategoryToAddItem(index, todo) {
      //solo se è nella lista categorie faccio tutto
      if (todo.class) {
        const allCategories = [...this.languages.engCategories, ...this.languages.itaCategories, ...this.languages.spanCategories];

        this.todos.map((t) => (t.isSelected = false)); //azzero tutto
        allCategories.forEach((category) => {
          if (todo.name.toLowerCase() === category.name) {
            //se il nome è uguale alla categoria, permetto il toggle per la classe e salvo l'index
            this.addTodoInCategory.condition = !this.addTodoInCategory.condition;
            this.addTodoInCategory.id = index;

            if (this.addTodoInCategory.condition) {
              //se clicco su una categoria ed è evidenziata il focus va sull'input
              this.focusIn = true;
              this.languages.placeholder = (this.languages.langIta ? 'Aggiungi in '
                : this.languages.langSpanish ? 'Añadir en '
                  : 'Add in ') + todo.emojy + todo.name.toUpperCase();
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

        this.toggleButtonDeleteSelectedTodo();
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
    openModalFordeleteSelectedTodos() {
      this.confirmDeleteModal = true;
      this.confirmRemove = false;
      this.deleteSelected = true;
      this.languages.completeConfirmText = `${this.languages.selectedTodosConfirmText}?`;
    },
    removeAllTodo(x) {
      this.backupList();
      this.todos.splice(x);
      this.categoryList = false;
      this.isDraggable = false;
      this.canDeleteMultipleTodo = false;
      this.saveTodos();
      this.languages.placeholderplaceholder = this.languages.placeholderdefaultPlaceholderText;
      navigator.vibrate(1000);
      location.reload();
    },
    backupList() {
      const newTodoList = [...this.todos];
      const parsedTodos = JSON.stringify(newTodoList);
      window.localStorage.setItem('todosBackup', parsedTodos);
    },
    showOnlyImportant() {
      const thereAreTodoFiltered = this.todos.filter((todo) => todo.isActive);
      if (!thereAreTodoFiltered.length) {
        this.showNoImportantTodosAlert();
        return;
      }
      this.showOnlyImportantTodos = !this.showOnlyImportantTodos;

      if (this.showOnlyImportantTodos) {
        this.isDraggable = false;
        this.categoryList = false;
        this.canDeleteMultipleTodo = false;
        this.todos = this.todos.filter((todo) => todo.isActive);
      } else {
        this.createTodosList();
        this.toggleButtonDeleteSelectedTodo();
        this.changeTodoAdded(this.todos);
      }
    },
    showNoImportantTodosAlert() {
      this.languages.importantTodos.visible = true;
      setTimeout(() => (this.languages.importantTodos.visible = false), 2000);
    },
    setOnlyDeletedTodos(index) {
      if (index !== 'multipleDelete') {
        //Salvo IL todo da eliminare
        const singleTodoDeleted = [`${this.todos[index].name}`, `${this.getDate()}`];
        window.localStorage.setItem('singleTodoDeleted', singleTodoDeleted);
      } else {
        //Salvo i todo da eliminare
        const deletedTodos = this.todos.filter((todo) => todo.multipleDelete).map(t => t.name);
        deletedTodos.push(this.getDate());
        window.localStorage.setItem('deletedTodos', deletedTodos);
      }
    },
    getOnlyDeletedTodos() {
      const deletedSingleTodo = window.localStorage.getItem('singleTodoDeleted');
      if (deletedSingleTodo) { this.deletedSingleTodo = deletedSingleTodo.split(","); }
      const getDeletedTodos = window.localStorage.getItem('deletedTodos');
      if (getDeletedTodos) { this.deletedTodos = getDeletedTodos.split(","); }
    },
    getDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      return dd + '/' + mm + '/' + yyyy;
    }
  },
});