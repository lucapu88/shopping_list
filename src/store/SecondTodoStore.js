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
            this.secondList = false;
            window.localStorage.removeItem('secondList');
            this.thirdList = false;
            window.localStorage.removeItem('thirdList');
            this.fourthList = false;
            window.localStorage.removeItem('fourthList');
        },
        todosSettings() {
            this.loading = true;
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
            this.todosSettings();
        },
        selectThirdList() {
            this.resetAllLists();
            this.thirdList = true;
            window.localStorage.setItem('thirdList', true);
            this.todosSettings();
        },
        selectFourthList() {
            this.resetAllLists();
            this.fourthList = true;
            window.localStorage.setItem('fourthList', true);
            this.todosSettings();
        },
        selectFirstList() {
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