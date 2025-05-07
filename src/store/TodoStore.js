import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useChristmasStore } from '@/store/festivities/ChristmasStore';
import { useOthersFestivitiesStore } from '@/store/festivities/OthersFestivitiesStore';
import { useSuggestionsStore } from '@/store/suggestions/SuggestionsStore';
import { useCategoriesStore } from '@/store/CategoriesStore';
import { useSecondTodoStore } from "@/store/SecondTodoStore";


export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    languages: useLanguageStore(),
    settings: useSettingsStore(),
    christmas: useChristmasStore(),
    festivities: useOthersFestivitiesStore(),
    suggestionsStore: useSuggestionsStore(),
    categoriesStore: useCategoriesStore(),
    secondTodos: useSecondTodoStore(),
    todos: [], //conterrà gli elementi che noi digitiamo
    newTodo: null, //elemento che scriviamo noi e andrà a riempire l'array
    copiedTodo: null,
    visible: true, //serve per la visibilità del contenitore dell'alert
    categoryList: false,
    categoryListChildren: null,
    helper: null,
    christmasTheme: false,
    isCategory: false,
    categoryEmoji: '',
    addTodoInCategory: { condition: false, id: null },
    isDraggable: false,
    selectedByHolding: true,
    inModification: false,
    categoryName: null,
    categoryEmo: null,
    confirmDeleteModal: false,
    index: null,
    deleteSelected: false,
    confirmRemove: false,
    canDeleteMultipleTodo: false,
    multiple: false,
    focusIn: false,
    totalPrice: 0,
    showOnlyImportantTodos: false,
    deletedTodos: null,
    deletedSingleTodo: null,
    todosCategorySelected: [],
    categoryAdded: false,
    addedImportant: false,
    duplicateFound: false,
    insertDuplicate: false,
    devNotes: false,
    confirmDeselectAll: false,
    openDeleteAllModal: false,
    skipCheck: false,
    isVisible: false,
  }),
  actions: {
    addTodo(tip) {
      this.settings.checkingUpdates();
      this.christmas.merryChristmasTheme();
      this.festivities.checkFestivities();

      if (tip) { this.newTodo = tip; } //se ho cliccato un suggerimento nella modale suggestions
      if (!this.newTodo) { return; } //solo se scrivo qualcosa lo aggiunge

      this.createCategory();

      const todoObject = {
        name: this.newTodo.trim(),
        isActive: false,
        isSelected: false,
        category: this.isCategory,
        emojy: this.categoryEmoji,
        multipleDelete: false,
        modify: false,
        todoAdded: true,
      };

      if (!this.skipCheck) {
        //skipCheck è inserito quando si inseriscono tutte le categorie dall'apposito pulsante. Le deve inserire comunque. 
        this.checkDuplicates(todoObject);
      }

      if (this.duplicateFound && !this.insertDuplicate) { return; }

      !this.addTodoInCategory.condition
        ? this.todos.push(todoObject)
        : this.todos.splice(this.addTodoInCategory.id + 1, 0, todoObject);

      setTimeout(() => {
        //faccio questo per crearmi un'animazione visibile per un lasso di tempo appena si aggiunge un todo
        this.changeTodoAdded(this.todos);
      }, 1500);

      if (this.settings.canMultipleCategoryInsertion) {
        //Se ho tolto l'inserimento di più elementi nella categoria, ad ogni singolo todo aggiunto in categoria, vado a togliere "l'evidenziazione" della categoria
        this.removeSelectedCategoryToAddItem();
      }
      this.resetTodoProperty();
      this.settings.resetHelperSettingsAndIstructions();
      this.saveTodos();
      this.toggleButtonDeleteSelectedTodo();
      this.resetModify();
    },
    checkDuplicates(todo) {
      this.focusIn = false;

      this.todos.forEach(t => {
        if (t.name.toLowerCase() === todo.name.toLowerCase()) {
          this.duplicateFound = true;
        }
      });
    },
    addTodoAfterDuplicateCheck(yesOrNo) {
      if (yesOrNo) {
        this.insertDuplicate = true;
        this.addTodo();
        this.duplicateFound = false;
        this.insertDuplicate = false;
      } else {
        this.newTodo = null;
        this.duplicateFound = false;
        this.insertDuplicate = false;
      }
    },
    createCategory() {
      this.isCategory = false;
      this.categoryEmoji = '';
      this.categoriesStore.categories.forEach((category) => {
        //se scrivo un nome che è presente nella lista di categorie, creo una categoria evidenziata
        if (this.newTodo.toLowerCase().trim() === category.name) {
          this.isCategory = true;
          this.categoryEmoji = category.emojy;
        }
      });
    },
    resetTodoProperty() {
      this.newTodo = '';
      this.isCategory = false;
      this.categoryEmoji = '';
      this.categoryList = false;
      this.isDraggable = false;
      this.skipCheck = false; //non fa parte del todo, per il momento lo metto qui, cambia poco dove va messo.
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
      this.settings.resetHelperSettingsAndIstructions();
      this.toggleButtonDeleteSelectedTodo();
    },
    confirmedRemoveTodo(x) {
      this.backupList();
      if (!this.todos[x].category) { this.setOnlyDeletedTodos(x); }
      this.todos.splice(x, 1);
      this.saveTodos();
      this.toggleButtonDeleteSelectedTodo();
      this.confirmDeleteModal = false;
      // se ho impostato l'eliminazione automatica categorie vuote
      if (this.settings.canDeleteEmptyCategories) { this.removeOnlyEmpty(); }
      //navigator.vibrate(220); TOFIX vedere come mai non funziona su mobile e vedere se tenerlo o meno
    },
    saveTodos(draggedElement) {
      const parsedTodos = JSON.stringify(draggedElement || this.todos);
      //TOFIX Sistemare questi orripilanti if else if
      if (window.localStorage.getItem('secondList')) {
        window.localStorage.setItem('todos2', parsedTodos);
      } else if (window.localStorage.getItem('thirdList')) {
        window.localStorage.setItem('todos3', parsedTodos);
      } else if (window.localStorage.getItem('fourthList')) {
        window.localStorage.setItem('todos4', parsedTodos);
      } else {
        window.localStorage.setItem('todos', parsedTodos);
      }
      this.priceCalculator();
      this.backupList();
    },
    createTodosList() {
      //TOFIX Sistemare questi orripilanti if else if
      if (window.localStorage.getItem('secondList')) {
        this.getCorrectTodoList('todos2');
      } else if (window.localStorage.getItem('thirdList')) {
        this.getCorrectTodoList('todos3');
      } else if (window.localStorage.getItem('fourthList')) {
        this.getCorrectTodoList('todos4');
      } else {
        this.getCorrectTodoList('todos');
      }
      if (!this.addTodoInCategory.condition) { this.todos.map((t) => (t.isSelected = false)); }
      this.secondTodos.setSelectedLists();
    },
    getCorrectTodoList(todos) {
      //se si deve prendere un oggetto da salvare in locale
      try {
        const parsedTodoList = JSON.parse(window.localStorage.getItem(todos));
        parsedTodoList.forEach(todo => {
          //faccio questo perchè ci sono i vecchi todo salvati in locale nei dispositivi degli utenti che hanno ancora la proprietà class
          if (todo.class) { todo.category = todo.class; }
        });
        this.todos = parsedTodoList; //prova a trasformare l'array in un oggetto javascript
        this.resetModify(); //lo faccio qui perchè altrimenti non funzionerebbe il tasto del modifica todo per gli utenti con elementi vecchi inseriti nella lista
      } catch (e) {
        window.localStorage.removeItem(todos); //se viene trovato un errore, rimuovi l'oggetto (o meglio, non salvare niente)
      }
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
      this.selectedByHolding = !this.isDraggable;
      this.categoryList = false;
      this.resetVisibility();
      this.resetModify();
      this.removeSelectedCategoryToAddItem();
    },
    removeSelectedCategoryToAddItem() {
      //serve per togliere la selezione di una categoria aggiunta (quando clicchi su un nome di una categoria e diventa blu)
      this.todos.map((t) => (t.isSelected = false));
      this.languages.placeholder = this.languages.defaultPlaceholderText;
      this.addTodoInCategory.condition = false;
      this.focusIn = false;
      this.inModification = false;
      this.todosCategorySelected.length = 0;
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
    selectCategoryName(selectedCategoryName) {
      this.newTodo = selectedCategoryName;
      this.addTodo();
      this.categoryAdded = true;
      setTimeout(() => {
        this.categoryAdded = false;
      }, 5500);
    },
    removeOnlyEmpty() {
      const last = this.todos[this.todos.length - 1];
      //se l'ultimo della lista è una categoria (allora sotto di lui non avrà nulla) aggiungo una proprietà per rimuoverlo
      if (last?.category) { last.categoryToBeDeleted = true; }

      this.todos.forEach((todo, index) => {
        const next = this.todos[index + 1];
        //se l'elemento è una categoria ed il suo successivo/precedente pure, vuol dire che sono categorie vuote
        if (todo?.category && next?.category) { todo.categoryToBeDeleted = true; }
      });
      this.todos = this.todos.filter((todo) => !todo.categoryToBeDeleted);
      this.saveTodos();
      this.categoryList = false;
    },
    deleteSelectedTodos() {
      this.backupList();
      const multipleDeleteFiltered = this.todos.filter(t => t.multipleDelete);
      multipleDeleteFiltered.length === 1 ? this.setOnlyDeletedTodos('onlyOne', multipleDeleteFiltered) : this.setOnlyDeletedTodos('multipleDelete');
      //Elimina solo i todo che sono stati selezionati.
      this.todos = this.todos.filter((todo) => !todo.multipleDelete);
      this.isDraggable = false;
      this.saveTodos();
      if (this.settings.canDeleteEmptyCategories) { this.removeOnlyEmpty(); }
      this.confirmDeleteModal = false;
      this.toggleButtonDeleteSelectedTodo();
    },
    selectCategoryToAddItem(index, todo) {
      //solo se è nella lista categorie faccio tutto
      if (todo.category) {
        const allCategories = [...this.categoriesStore.engCategories, ...this.categoriesStore.itaCategories, ...this.categoriesStore.spanCategories];
        this.todos.map((t) => (t.isSelected = false)); //azzero tutto

        allCategories.forEach((category) => {
          if (todo.name.toLowerCase() === category.name) {
            this.toggleCategorySelection(todo);

            this.addTodoInCategory.id = index;

            if (this.addTodoInCategory.condition) {
              //se clicco su una categoria ed è evidenziata il focus va sull'input
              this.focusIn = true;
              this.languages.placeholder = (this.languages.langIta ? 'Aggiungi in '
                : this.languages.langSpanish ? 'Añadir en '
                  : 'Add in ') + todo.emojy + todo.name.toUpperCase();

              this.inModification = true;
              this.categoryName = todo.name.toUpperCase();
              this.categoryEmo = todo.emojy;
              this.suggestionsStore.checkAndSetSuggestionsLanguage(this.categoryName);
            } else {
              this.focusIn = false;
              this.inModification = false;
              this.languages.placeholder = this.languages.defaultPlaceholderText;
            }
          }
          todo.isSelected = this.addTodoInCategory.condition;
        });
        this.saveTodos();
      }
    },
    toggleCategorySelection(todo) {
      // L'utente fa toggle della categoria se clicca sulla stessa oppure ne seleziona un'altra se clicca su una diversa
      this.todosCategorySelected.push(todo.name);
      if (new Set(this.todosCategorySelected).size !== this.todosCategorySelected.length) {
        this.addTodoInCategory.condition = !this.addTodoInCategory.condition;
        this.todosCategorySelected.length = 0;
      } else {
        this.addTodoInCategory.condition = true;
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
    setAsImportant(n) {
      if (!this.todos[n].category) {
        //al click setta la proprietà del singolo todo isActive (evidenzia rosso l'elemento cliccato)
        this.todos[n].multipleDelete = false;
        this.todos[n].isActive = !this.todos[n].isActive;
        this.todos[n].isDisabled = !this.todos[n].isDisabled; //disabilito i pulsanti

        this.showAddedImportantAlert(this.todos[n].isActive);
        this.toggleButtonDeleteSelectedTodo();
        this.removeSelectedCategoryToAddItem();
        this.saveTodos();
      }
    },
    showAddedImportantAlert(important) {
      //imposto un piccolo alert per indicare che è stato settato come importante il todo
      if (important) {
        this.addedImportant = true;
        setTimeout(() => {
          this.addedImportant = false;
        }, 2500);
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
      this.confirmDeselectAll = !this.canDeleteMultipleTodo;
    },
    openModalForDeleteSelectedTodos(multiple) {
      this.multiple = !!multiple;
      this.confirmDeleteModal = true;
      this.confirmRemove = false;
      this.deleteSelected = true;
      this.languages.completeConfirmText = `${this.languages.selectedTodosConfirmText}:`;
      this.removeSelectedCategoryToAddItem();
    },
    removeAllTodo(x) {
      if (!this.todos.length) {
        return;
      }
      this.backupList();
      const todoCategoryFiltered = this.todos.filter(t => !t.category);
      todoCategoryFiltered.length === 1 ? this.setOnlyDeletedTodos('onlyOne', todoCategoryFiltered) : this.setOnlyDeletedTodos('deleteAll');
      this.todos.splice(x);
      this.categoryList = false;
      this.isDraggable = false;
      this.canDeleteMultipleTodo = false;
      this.inModification = false;
      this.languages.placeholder = this.languages.defaultPlaceholderText;
      this.saveTodos();
      this.languages.placeholderplaceholder = this.languages.placeholderdefaultPlaceholderText;
      //navigator.vibrate(1000); TOFIX vedere come mai non funziona su mobile e vedere se tenerlo o meno
      const range = Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500;
      setTimeout(() => {
        location.reload();
      }, range);
    },
    backupList() {
      const newTodoList = [...this.todos];
      const parsedTodos = JSON.stringify(newTodoList);
      //TOFIX Sistemare questi orripilanti if else if
      if (window.localStorage.getItem('secondList')) {
        window.localStorage.setItem('todosBackup2', parsedTodos);
      } else if (window.localStorage.getItem('thirdList')) {
        window.localStorage.setItem('todosBackup3', parsedTodos);
      } else if (window.localStorage.getItem('fourthList')) {
        window.localStorage.setItem('todosBackup4', parsedTodos);
      } else {
        window.localStorage.setItem('todosBackup', parsedTodos);
      }
    },
    showOnlyImportant() {
      const thereAreTodoFiltered = this.todos.filter((todo) => todo.isActive);
      if (!thereAreTodoFiltered.length) {
        this.showNoImportantTodosAlert();
        return;
      }
      this.showOnlyImportantTodos = !this.showOnlyImportantTodos;

      if (this.showOnlyImportantTodos) {
        this.confirmDeselectAll = false;
        this.isDraggable = false;
        this.categoryList = false;
        this.canDeleteMultipleTodo = false;
        this.openDeleteAllModal = false;
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
    deselectAllImportant() {
      this.createTodosList();
      this.toggleButtonDeleteSelectedTodo();
      this.changeTodoAdded(this.todos);
      this.todos.forEach((todo) => {
        todo.isActive = false;
        todo.isDisabled = false;
      });
      this.showOnlyImportantTodos = false;
      this.saveTodos();
    },
    setOnlyDeletedTodos(index, arrayWithOneElement) {
      let todosToDelete = [];
      let storageKey = '';

      switch (index) {
        case 'multipleDelete':
          //Salvo I todo selezionati da eliminare
          todosToDelete = this.todos.filter(todo => todo.multipleDelete).map(t => t.name);
          storageKey = 'deletedTodos';
          break;
        case 'deleteAll':
          //Salvo TUTTI i todo da eliminare
          todosToDelete = this.todos.filter(todo => !todo.category).map(t => t.name);
          storageKey = 'deletedTodos';
          break;
        case 'onlyOne':
          //Se ho cliccato elimina tutti o elimina selezionati ma la lista ne conteneva solo uno. Allora diventa un'eliminazione singola
          // eslint-disable-next-line no-case-declarations
          const [todoName] = arrayWithOneElement;
          todosToDelete = [todoName.name];
          storageKey = 'singleTodoDeleted';
          break;
        default:
          //Salvo IL todo singolo da eliminare
          todosToDelete = [this.todos[index].name];
          storageKey = 'singleTodoDeleted';
          break;
      }

      if (todosToDelete.length > 0) {
        const listNumber = window.localStorage.getItem('listNumber').toString();
        todosToDelete.push(this.settings.setDate());
        todosToDelete.unshift(listNumber);
        window.localStorage.setItem(storageKey, todosToDelete);
      }
    },
    getOnlyDeletedTodos() {
      const deletedSingleTodo = window.localStorage.getItem('singleTodoDeleted');
      if (deletedSingleTodo) { this.deletedSingleTodo = deletedSingleTodo.split(","); }
      const getDeletedTodos = window.localStorage.getItem('deletedTodos');
      if (getDeletedTodos) { this.deletedTodos = getDeletedTodos.split(","); }
    },
    toggleSelectedTodosForDelete() {
      this.isVisible = !this.isVisible;
      this.isVisible
        ? this.todos.forEach(todo => { if (todo.multipleDelete) todo.hidden = true; })
        : this.todos.forEach(todo => { todo.hidden = false; });
      /* TOFIX Decidere se farlo permanente...Secondo me al momento va bene così perchè se resta permanente l'utente potrebbe dimenticarsi di averlo inserito ed andare in confusione
        this.saveTodos(); */
    },
    resetVisibility() {
      this.isVisible = false;
      this.todos.forEach(todo => { todo.hidden = false; });
      /* TOFIX Decidere se farlo permanente...Secondo me al momento va bene così perchè se resta permanente l'utente potrebbe dimenticarsi di averlo inserito ed andare in confusione
        this.saveTodos(); */
    }
    //------------------- HAI RAGGIUNTO IL LIMITE DI LUNGHEZZA DI QUESTO FILE, DAI PROSSIMI METODI IN POI CREA UN NUOVO STORE.
  }
});