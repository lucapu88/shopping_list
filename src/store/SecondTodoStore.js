import { defineStore } from 'pinia';
import { useTodoStore } from '@/store/TodoStore';
import { useLanguageStore } from '@/store/LanguageStore';


export const useSecondTodoStore = defineStore('secondTodoStore', {
    state: () => ({
        todosStore: useTodoStore(),
        languages: useLanguageStore(),
        secondList: false,
        thirdList: false,
        fourthList: false,
        loading: false,
        listButtons: [],
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
            setTimeout(() => {
                location.reload();
            }, 700);
        },
        selectSecondList() {
            this.resetAllLists();
            this.secondList = true;
            const listName2 = window.localStorage.getItem('ListName2');

            window.localStorage.setItem('secondList', true);
            window.localStorage.setItem('listNumber', `${listName2 ? listName2.toString() : "LIST 2"}`);
            this.todosSettings();
        },
        selectThirdList() {
            this.resetAllLists();
            this.thirdList = true;
            const listName3 = window.localStorage.getItem('ListName3');

            window.localStorage.setItem('thirdList', true);
            window.localStorage.setItem('listNumber', `${listName3 ? listName3.toString() : "LIST 3"}`);
            this.todosSettings();
        },
        selectFourthList() {
            this.resetAllLists();
            this.fourthList = true;
            const listName4 = window.localStorage.getItem('ListName4');

            window.localStorage.setItem('fourthList', true);
            window.localStorage.setItem('listNumber', `${listName4 ? listName4.toString() : "LIST 4"}`);
            this.todosSettings();
        },
        selectFirstList() {
            const listName1 = window.localStorage.getItem('ListName1');

            window.localStorage.setItem('listNumber', `${listName1 ? listName1.toString() : "LIST 1"}`);
            this.resetAllLists();
            this.todosSettings();
        },
        setSelectedLists() {
            this.secondList = window.localStorage.getItem('secondList');
            this.thirdList = window.localStorage.getItem('thirdList');
            this.fourthList = window.localStorage.getItem('fourthList');
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

            this.listButtons = [
                {
                    class: "first",
                    name: `${listName1 ? listName1.toString() : "List 1"}`,
                    selectedCondition: () => !this.secondList && !this.thirdList && !this.fourthList,
                    function: this.selectFirstList,
                },
                {
                    class: "second",
                    name: `${listName2 ? listName2.toString() : "List 2"}`,
                    selectedCondition: () => this.secondList,
                    function: this.selectSecondList,
                },
                {
                    class: "third",
                    name: `${listName3 ? listName3.toString() : "List 3"}`,
                    selectedCondition: () => this.thirdList,
                    function: this.selectThirdList,
                },
                {
                    class: "fourth",
                    name: `${listName4 ? listName4.toString() : "List 4"}`,
                    selectedCondition: () => this.fourthList,
                    function: this.selectFourthList,
                },
            ];
        }
    }
});