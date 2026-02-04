// tests/unit/stores/TodoStore.spec.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTodoStore } from '@/store/TodoStore';
import { useSettingsStore } from '@/store/SettingsStore';

describe('TodoStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('State', () => {
        it('should initialize with empty todos array', () => {
            const store = useTodoStore();

            expect(Array.isArray(store.todos)).toBe(true);
            expect(store.todos.length).toBe(0);
        });

        it('should have correct initial state properties', () => {
            const store = useTodoStore();

            expect(store.newTodo).toBeNull();
            expect(store.visible).toBe(true);
            expect(store.isDraggable).toBe(false);
            expect(store.multiple).toBe(false);
            expect(store.totalPrice).toBe(0);
        });
    });

    describe('resetTodoProperty', () => {
        it('should reset all todo input properties', () => {
            const store = useTodoStore();
            store.newTodo = 'test item';
            store.isCategory = true;
            store.categoryEmoji = '🍎';
            store.categoryList = true;
            store.isDraggable = true;

            store.resetTodoProperty();

            expect(store.newTodo).toBe('');
            expect(store.isCategory).toBe(false);
            expect(store.categoryEmoji).toBe('');
            expect(store.categoryList).toBe(false);
            expect(store.isDraggable).toBe(false);
        });
    });

    describe('createTodosList', () => {
        it('should load default todos from localStorage', () => {
            const mockTodos = [
                { name: 'milk', isActive: false, category: false }
            ];
            localStorage.setItem('todos', JSON.stringify(mockTodos));

            const store = useTodoStore();
            store.createTodosList();

            expect(store.todos.length).toBe(1);
            expect(store.todos[0].name).toBe('milk');
        });

        it('should load todos2 when secondList is selected', () => {
            const mockTodos = [
                { name: 'bread', isActive: false, category: false }
            ];
            localStorage.setItem('todos2', JSON.stringify(mockTodos));
            localStorage.setItem('secondList', 'true');

            const store = useTodoStore();
            store.createTodosList();

            expect(store.todos[0].name).toBe('bread');
        });

        it('should handle corrupted localStorage data gracefully', () => {
            localStorage.setItem('todos', '{invalid json}');

            const store = useTodoStore();
            store.createTodosList();

            expect(store.todos).toEqual([]);
            expect(localStorage.getItem('todos')).toBeNull();
        });
    });

    describe('checkDuplicates', () => {
        it('should detect duplicate items', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk', isActive: false },
            ];

            const newTodo = { name: 'milk', isActive: false };
            store.checkDuplicates(newTodo);

            expect(store.duplicateFound).toBe(true);
        });

        it('should be case-insensitive for duplicates', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'Milk', isActive: false },
            ];

            const newTodo = { name: 'milk', isActive: false };
            store.checkDuplicates(newTodo);

            expect(store.duplicateFound).toBe(true);
        });

        it('should not flag similar items as duplicates', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk', isActive: false },
            ];

            const newTodo = { name: 'milked', isActive: false };
            store.checkDuplicates(newTodo);

            expect(store.duplicateFound).toBe(false);
        });
    });

    describe('addTodo', () => {
        it('should add a new todo to the list', () => {
            const store = useTodoStore();
            store.newTodo = 'milk';

            store.addTodo();

            expect(store.todos.length).toBe(1);
            expect(store.todos[0].name).toBe('milk');
            expect(store.todos[0].isActive).toBe(false);
            expect(store.todos[0].isSelected).toBe(false);
        });

        it('should not add empty todos', () => {
            const store = useTodoStore();
            store.newTodo = '';

            store.addTodo();

            expect(store.todos.length).toBe(0);
        });

        it('should trim whitespace from todo names', () => {
            const store = useTodoStore();
            store.newTodo = '  milk  ';

            store.addTodo();

            expect(store.todos[0].name).toBe('milk');
        });

        it('should mark todos with price calculation', () => {
            const store = useTodoStore();
            store.newTodo = 'bread €2.99';

            store.addTodo();

            expect(store.todos[0].name).toBe('bread €2.99');
        });
    });

    describe('modifyTodo', () => {
        it('should toggle modify flag for todo', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk', modify: false }
            ];

            store.modifyTodo(0);

            expect(store.todos[0].modify).toBe(true);
            expect(store.copiedTodo).toEqual({ name: 'milk', modify: true });
        });

        it('should copy todo state before modifying', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk', modify: false }
            ];

            store.modifyTodo(0);
            const originalTodo = store.copiedTodo;

            store.todos[0].name = 'changed';
            expect(originalTodo.name).toBe('milk');
        });
    });

    describe('resetModify', () => {
        it('should reset all todos modify flag', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk', modify: true },
                { name: 'bread', modify: true },
            ];

            store.resetModify();

            expect(store.todos[0].modify).toBe(false);
            expect(store.todos[1].modify).toBe(false);
        });

        it('should restore original name if modification was abandoned', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'changed', modify: true }
            ];
            const original = { name: 'milk', modify: true };

            store.resetModify(original);

            expect(store.todos[0].name).toBe('milk');
        });
    });

    describe('removeTodo', () => {
        it('should remove a todo from the list', () => {
            const store = useSettingsStore();
            store.canDelete = false;

            const todoStore = useTodoStore();
            todoStore.todos = [
                { name: 'milk', category: false }
            ];

            todoStore.removeTodo(0, { name: 'milk' });

            expect(todoStore.todos.length).toBe(0);
        });

        it('should show confirmation modal if canDelete is true', async () => {
            vi.useFakeTimers();

            const store = useTodoStore();
            store.settings.canDelete = true;
            vi.spyOn(store.preloads, 'loadConfirmBackgoundImg').mockResolvedValue();

            store.todos = [
                { name: 'milk', category: false }
            ];

            store.removeTodo(0, { name: 'milk' });
            await vi.runAllTimersAsync();

            expect(store.confirmDeleteModal).toBe(true);
            expect(store.index).toBe(0);

            vi.useRealTimers();
        });
    });

    describe('priceCalculator', () => {
        it('should calculate total price with € symbol', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk €2.50' },
                { name: 'bread €1.50' },
            ];

            store.priceCalculator();

            expect(store.totalPrice).toBe('4.00');
        });

        it('should calculate with $ symbol', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk $2.50' },
                { name: 'bread $1.50' },
            ];

            store.priceCalculator();

            expect(store.totalPrice).toBe('4.00');
        });

        it('should calculate with £ symbol', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk £2.50' },
                { name: 'bread £1.50' },
            ];

            store.priceCalculator();

            expect(store.totalPrice).toBe('4.00');
        });

        it('should handle comma as decimal separator', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk €2,50' },
            ];

            store.priceCalculator();

            expect(store.totalPrice).toBe('2.50');
        });

        it('should return 0 when no prices are present', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk' },
                { name: 'bread' },
            ];

            store.priceCalculator();

            expect(store.totalPrice).toBe('0.00');
        });
    });

    describe('toggleDragDrop', () => {
        it('should toggle drag and drop mode', () => {
            const store = useTodoStore();
            store.isDraggable = false;

            store.toggleDragDrop();

            expect(store.isDraggable).toBe(true);
            expect(store.selectedByHolding).toBe(false);
        });

        it('should reset related state when toggling', () => {
            const store = useTodoStore();
            store.isDraggable = false;
            store.categoryList = true;

            store.toggleDragDrop();

            expect(store.categoryList).toBe(false);
        });
    });

    describe('showCategoryList', () => {
        it('should toggle category list visibility', () => {
            const store = useTodoStore();
            store.categoryList = false;

            store.showCategoryList();

            expect(store.categoryList).toBe(true);
        });

        it('should set categoryListChildren after delay', async () => {
            const store = useTodoStore();
            store.categoryList = false;

            store.showCategoryList();

            expect(store.categoryList).toBe(true);
            await new Promise(resolve => setTimeout(resolve, 450));
            expect(store.categoryListChildren).toBe(true);
        });
    });

    describe('removeOnlyEmpty', () => {
        it('should remove empty categories', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'cat1', category: true },
                { name: 'cat2', category: true },
                { name: 'milk', category: false },
            ];

            store.removeOnlyEmpty();

            expect(store.todos.length).toBe(2);
            expect(store.todos[0].name).toBe('cat2');
        });

        it('should keep categories with items', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'vegetables', category: true },
                { name: 'carrot', category: false },
                { name: 'meat', category: true },
            ];

            store.removeOnlyEmpty();

            expect(store.todos.length).toBe(2);
        });
    });

    describe('saveTodos', () => {
        it('should save todos to localStorage', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk', isActive: false }
            ];

            store.saveTodos();

            const saved = JSON.parse(localStorage.getItem('todos'));
            expect(saved[0].name).toBe('milk');
        });
    });

    describe('deleteSelectedTodos', () => {
        it('should delete all selected todos', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk', multipleDelete: true },
                { name: 'bread', multipleDelete: false },
            ];

            store.deleteSelectedTodos();

            expect(store.todos.length).toBe(1);
            expect(store.todos[0].name).toBe('bread');
        });

        it('should reset modify state after deletion', () => {
            const store = useTodoStore();
            store.todos = [
                { name: 'milk', multipleDelete: true, modify: true },
            ];

            store.deleteSelectedTodos();

            expect(store.todos.length).toBe(0);
        });
    });
});