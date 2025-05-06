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
            window.localStorage.setItem('secondList', true);
            window.localStorage.setItem('listNumber', `${this.languages.list.toUpperCase()} 2 `);
            this.todosSettings();
        },
        selectThirdList() {
            this.resetAllLists();
            this.thirdList = true;
            window.localStorage.setItem('thirdList', true);
            window.localStorage.setItem('listNumber', `${this.languages.list.toUpperCase()} 3 `);
            this.todosSettings();
        },
        selectFourthList() {
            this.resetAllLists();
            this.fourthList = true;
            window.localStorage.setItem('fourthList', true);
            window.localStorage.setItem('listNumber', `${this.languages.list.toUpperCase()} 4 `);
            this.todosSettings();
        },
        selectFirstList() {
            window.localStorage.setItem('listNumber', `${this.languages.list.toUpperCase()} 1 `);
            this.resetAllLists();
            this.todosSettings();
        },
        setSelectedLists() {
            this.secondList = window.localStorage.getItem('secondList');
            this.thirdList = window.localStorage.getItem('thirdList');
            this.fourthList = window.localStorage.getItem('fourthList');
        }
    }
});