import { defineStore } from 'pinia';
import { useTodoStore } from '@/store/TodoStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useCategoriesStore } from '@/store/CategoriesStore';

export const useSecondTodoStore = defineStore('secondTodoStore', {
    // Store per cose varie che non riguardano direttamente le todo, ma cose generali dell'app
    state: () => ({
        todosStore: useTodoStore(),
        languages: useLanguageStore(),
        categoriesStore: useCategoriesStore(),
        secondList: false,
        thirdList: false,
        fourthList: false,
        fifthList: false,
        sixthList: false,
        seventhList: false,
        eighthList: false,
        loading: false,
        loadingOpenAIRes: false,
        loadingRecipes: false,
        recipe: null,
        showRecipeModal: false,
        listButtons: [],
        showFeedbackForm: false,
        showChangeList: false,
        showChangeListChildren: false,
        moving: false,
        istruction2Visible: false,
        moveSameList: false,
        copy: null,
        copied: false,
        moved: false,
        loyaltyCardsVisible: false,
        checkedIcon: String.fromCodePoint(0x2705),
        refreshIcon: String.fromCodePoint(0x1F504),
    }),
    actions: {
        resetAllLists() {
            this.loading = true;

            this.secondList = false;
            window.localStorage.removeItem('secondList');
            this.thirdList = false;
            window.localStorage.removeItem('thirdList');
            this.fourthList = false;
            window.localStorage.removeItem('fourthList');
            this.fifthList = false;
            window.localStorage.removeItem('fifthList');
            this.sixthList = false;
            window.localStorage.removeItem('sixthList');
            this.seventhList = false;
            window.localStorage.removeItem('seventhList');
            this.eighthList = false;
            window.localStorage.removeItem('eighthList');
        },
        todosSettings() {
            this.todosStore.createTodosList();
            this.todosStore.toggleButtonDeleteSelectedTodo();
            this.todosStore.showOnlyImportantTodos = false;
            this.todosStore.isDraggable = false;
            this.todosStore.resetModify();
            this.todosStore.inModification = false;
            this.todosStore.todos.map((t) => (t.isSelected = false));
            this.todosStore.todos.forEach(item => item.todoAdded = false);
            this.languages.placeholder = this.languages.defaultPlaceholderText;

            location.reload();
        },
        selectList(ListName, listNumber, listN, list) {
            if (this.istruction2Visible) { return; }

            this.resetAllLists();

            const listName = window.localStorage.getItem(ListName);
            if (list) {
                window.localStorage.setItem(list, true);
            }
            window.localStorage.setItem(listNumber, `${listName ? listName.toString() : listN}`);

            this.todosSettings();
        },
        setSelectedLists() {
            this.secondList = window.localStorage.getItem('secondList');
            this.thirdList = window.localStorage.getItem('thirdList');
            this.fourthList = window.localStorage.getItem('fourthList');
            this.fifthList = window.localStorage.getItem('fifthList');
            this.sixthList = window.localStorage.getItem('sixthList');
            this.seventhList = window.localStorage.getItem('seventhList');
            this.eighthList = window.localStorage.getItem('eighthList');
        },
        localStorageSettings(arrayOfObjects, listArray, defaultItem) {
            const getItem = (param) => window.localStorage.getItem(param);
            const setItem = (key, value) => window.localStorage.setItem(key, value);

            const found = arrayOfObjects.find(item => getItem(item.check));

            found ? setItem(found.set, listArray) : setItem(defaultItem, listArray);
        },
        createListsButtons() {
            const listName1 = window.localStorage.getItem('ListName1');
            const listName2 = window.localStorage.getItem('ListName2');
            const listName3 = window.localStorage.getItem('ListName3');
            const listName4 = window.localStorage.getItem('ListName4');
            const listName5 = window.localStorage.getItem('ListName5');
            const listName6 = window.localStorage.getItem('ListName6');
            const listName7 = window.localStorage.getItem('ListName7');
            const listName8 = window.localStorage.getItem('ListName8');

            this.listButtons = [
                {
                    class: "first",
                    name: `${listName1 ? listName1.toString() : "List 1"}`,
                    selectedCondition: () => !this.secondList && !this.thirdList && !this.fourthList && !this.fifthList && !this.sixthList && !this.seventhList && !this.eighthList,
                    function: () => this.selectList('ListName1', 'listNumber1', "LIST 1"),
                },
                {
                    class: "second",
                    name: `${listName2 ? listName2.toString() : "List 2"}`,
                    selectedCondition: () => this.secondList,
                    function: () => this.selectList('ListName2', 'listNumber2', "LIST 2", 'secondList'),
                },
                {
                    class: "third",
                    name: `${listName3 ? listName3.toString() : "List 3"}`,
                    selectedCondition: () => this.thirdList,
                    function: () => this.selectList('ListName3', 'listNumber3', "LIST 3", 'thirdList'),
                },
                {
                    class: "fourth",
                    name: `${listName4 ? listName4.toString() : "List 4"}`,
                    selectedCondition: () => this.fourthList,
                    function: () => this.selectList('ListName4', 'listNumber4', "LIST 4", 'fourthList'),
                },
                {
                    class: "fifth",
                    name: `${listName5 ? listName5.toString() : "List 5"}`,
                    selectedCondition: () => this.fifthList,
                    function: () => this.selectList('ListName5', 'listNumber5', "LIST 5", 'fifthList'),
                },
                {
                    class: "sixth",
                    name: `${listName6 ? listName6.toString() : "List 6"}`,
                    selectedCondition: () => this.sixthList,
                    function: () => this.selectList('ListName6', 'listNumber6', "LIST 6", 'sixthList'),
                },
                {
                    class: "seventh",
                    name: `${listName7 ? listName7.toString() : "List 7"}`,
                    selectedCondition: () => this.seventhList,
                    function: () => this.selectList('ListName7', 'listNumber7', "LIST 7", 'seventhList'),
                },
                {
                    class: "eighth",
                    name: `${listName8 ? listName8.toString() : "List 8"}`,
                    selectedCondition: () => this.eighthList,
                    function: () => this.selectList('ListName8', 'listNumber8', "LIST 8", 'eighthList'),
                },
            ];
        },
        getAndPushListsNumber(storageKey, todosToDelete) {
            const keys = ['todos', 'todos2', 'todos3', 'todos4', 'todos5', 'todos6', 'todos7', 'todos8'];
            const todosName = this.todosStore.todos.map(e => e.name);

            keys.forEach((key, index) => {
                const todos = this.getTodosFromStorage(key);

                if (this.areEqualArrays(todosName, todos)) {
                    window.localStorage.setItem(`${storageKey}-${index + 1}`, todosToDelete);
                }
            });
        },
        areEqualArrays(arr1, arr2) {
            if (arr1.length !== arr2.length) return false;
            return arr1.every((val, index) => val === arr2[index]);
        },
        getTodosFromStorage(key) {
            const data = window.localStorage.getItem(key);
            return data ? JSON.parse(data).map(e => e.name) : [];
        },
        async classificaProdotto(prodotto) {
            const openaiApiKey = window.localStorage.getItem("apikey");
            if (!this.todosStore.newTodo) { return; }

            try {
                this.loadingOpenAIRes = true;
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${openaiApiKey}`
                    },
                    body: JSON.stringify({
                        //model: "gpt-4o-mini",
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system", content: `Sei un classificatore di prodotti per una lista della spesa.  
                                    Devi classificare il prodotto: "${prodotto}"  
                                    nelle seguenti categorie già esistenti: ${this.categoriesStore.itaCategories.map(cat => cat.name)}  

                                    Regole:  
                                    - Il prodotto DEVE rientrare in una di queste categorie.  
                                    - NON inventare nuove categorie.  
                                    - Se il prodotto ha anche solo un’associazione *vaga* con una categoria, inseriscilo in quella categoria.  
                                        (Esempi: "zucchine" → vegetali, "polpo" → pesce, "salsiccia" → carne, "pesce persico" → pesce, "buste immondizia" → igiene, "pezzi per ragù" → carne)  
                                    - Usa la categoria più generale se non sai quale scegliere.  
                                    - Se proprio non rientra in nessuna, usa "altro".  

                                    Rispondi SOLO con il nome della categoria scelta, senza aggiungere altro testo.`
                            },
                        ],
                        max_tokens: 10, //numero massimo di token nella risposta. Un token è una “unità di testo” (circa 3–4 caratteri di media in italiano/inglese).
                        temperature: 0 //assicura che l’AI dia sempre la stessa categoria, senza variazioni. Si può impostare da 0 a 1, se imposti 1 da una risposta più creativa.
                    })
                });

                const data = await response.json();
                const categoryFound = data.choices[0].message.content.trim().toLowerCase();
                this.addTodoWithAI(categoryFound);
            } catch (err) {
                console.error("Errore AI:", err);
                this.languages.placeholder = `Errore con OpenAI: ${err} Riavvia l'app e riprova.`;
                return;
            }
        },
        addTodoWithAI(cat) {
            const todos = this.todosStore.todos;
            //Se la lista è vuota, creo la todo con la categoria trovata. 
            if (!todos.length) {
                this.createTodoWithCategory(cat);
                this.loadingOpenAIRes = false;
                return;
            }

            //Altrimenti controllo se esiste già la categoria e la seleziono per inserirsci il todo, altrimenti la creo.
            const indexOf = todos.findIndex(todo => todo.name === cat);
            if (indexOf !== -1) {
                const todoBackup = structuredClone(this.todosStore.newTodo);
                const objForCatSelection = {
                    //creo il tipo di oggetto che si aspetta selectCategoryToAddItem
                    name: cat,
                    isActive: false,
                    isSelected: false,
                    category: true,
                    emojy: null,
                    multipleDelete: false,
                    modify: false,
                    todoAdded: true,
                };

                this.todosStore.selectCategoryToAddItem(indexOf, objForCatSelection);
                this.todosStore.newTodo = todoBackup;
                this.todosStore.addTodo();
                this.todosStore.removeSelectedCategoryToAddItem();
            } else {
                this.createTodoWithCategory(cat);
            }
            this.loadingOpenAIRes = false;
        },
        createTodoWithCategory(cat) {
            const todoCopied = this.todosStore.newTodo;
            this.todosStore.selectCategoryName(cat);
            this.todosStore.newTodo = todoCopied;
            this.todosStore.addTodo();
        },
        toggleChangeList() {
            this.todosStore.categoryList = false;
            this.todosStore.isDraggable = false;
            this.showChangeList = !this.showChangeList;
            if (!this.showChangeList) {
                this.moving = false;
                this.hideMovingModeMessages();
            }
        },
        moveElementMode(isCopy) {
            if (!this.showChangeList) { return; }
            this.copy = isCopy;
            this.moving = !this.moving;
            this.todosStore.isDraggable = false;
            if (!this.moving) {
                this.hideMovingModeMessages();
            }
        },
        hideMovingModeMessages() {
            this.todosStore.todos.forEach(t => t.isMoving = false);
            this.istruction2Visible = false;
            this.moveSameList = false;
            this.copy = null;
        },
        selectElementforMove(n) {
            if (!this.moving) { return; }
            if (!this.todosStore.todos[n].category) {
                this.todosStore.todos[n].isMoving = !this.todosStore.todos[n].isMoving;
                this.istruction2Visible = this.todosStore.todos.some((t) => t.isMoving);
            }
        },
        applyMoving(n) {
            //in questo caso la modalità di spostamento è attiva, ma non è stato selezionato nessun elemento da spostare quindi non faccio nulla
            if (!this.istruction2Visible) { return; }

            this.moveSameList = false;
            const todosIsMovingFiltered = this.todosStore.todos.filter(t => t.isMoving);

            switch (n) {
                case 0: {
                    const todosParsed = JSON.parse(window.localStorage.getItem('todos')) || [];
                    window.localStorage.setItem('todos', JSON.stringify([...todosParsed, ...todosIsMovingFiltered]));
                    break;
                }
                case 1: {
                    const todosParsed2 = JSON.parse(window.localStorage.getItem('todos2')) || [];
                    window.localStorage.setItem('todos2', JSON.stringify([...todosParsed2, ...todosIsMovingFiltered]));
                    break;
                }
                case 2: {
                    const todosParsed3 = JSON.parse(window.localStorage.getItem('todos3')) || [];
                    window.localStorage.setItem('todos3', JSON.stringify([...todosParsed3, ...todosIsMovingFiltered]));
                    break;
                }
                case 3: {
                    const todosParsed4 = JSON.parse(window.localStorage.getItem('todos4')) || [];
                    window.localStorage.setItem('todos4', JSON.stringify([...todosParsed4, ...todosIsMovingFiltered]));
                    break;
                }
                case 4: {
                    const todosParsed5 = JSON.parse(window.localStorage.getItem('todos5')) || [];
                    window.localStorage.setItem('todos5', JSON.stringify([...todosParsed5, ...todosIsMovingFiltered]));
                    break;
                }
                case 5: {
                    const todosParsed6 = JSON.parse(window.localStorage.getItem('todos6')) || [];
                    window.localStorage.setItem('todos6', JSON.stringify([...todosParsed6, ...todosIsMovingFiltered]));
                    break;
                }
                case 6: {
                    const todosParsed7 = JSON.parse(window.localStorage.getItem('todos7')) || [];
                    window.localStorage.setItem('todos7', JSON.stringify([...todosParsed7, ...todosIsMovingFiltered]));
                    break;
                }
                case 7: {
                    const todosParsed8 = JSON.parse(window.localStorage.getItem('todos8')) || [];
                    window.localStorage.setItem('todos8', JSON.stringify([...todosParsed8, ...todosIsMovingFiltered]));
                    break;
                }
            }
            if (this.listButtons[n].selectedCondition()) {
                // in questo caso praticamente l'utente ha cliccato la lista dove sta scrivendo come lista di destinazione, e quindi che cazzo sposti un elemento dalla stessa lista?! Metto un messaggio
                this.moveSameList = true;
                return;
            }
            if (!this.copy) {
                this.todosStore.todos = this.todosStore.todos.filter(t => !t.isMoving);
            }
            this.todosStore.saveTodos();
            this.copy ? this.copied = true : this.moved = true;
            setTimeout(() => {
                this.copied = false;
                this.moved = false;
            }, 3000);
            setTimeout(() => {
                //brutto brutto lo so va sistemato. Lo faccio per evitare che in list-buttons-selection.vue venga triggerato selectList()
                this.hideMovingModeMessages();
                this.moving = false;
            }, 300);
        },
        showLoyaltyCards() {
            this.loyaltyCardsVisible = true;
        }
    }
});