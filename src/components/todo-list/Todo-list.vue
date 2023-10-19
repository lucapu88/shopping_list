<script setup>
import { useChristmasStore } from '@/store/ChristmasStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
</script>

<script>
export default {
  data() {
    return {
      isChristmas: useChristmasStore(),
      theme: useThemeStore(),
      todosStore: useAddModifyDeleteTodosStore(),
    };
  },
};
</script>

<template>
  <div
    v-for="(todo, n) in todosStore.todos"
    :key="n"
    :index="n"
    id="draggable-children"
    class="todo-n"
    :class="{
      category: todo.class,
      'category-retro': todo.class && theme.retroTheme,
      'category-minimal': todo.class && theme.minimalTheme,
      'todo-added': todo.todoAdded,
    }"
  >
    <div v-if="todo.class && theme.minimalTheme" class="category-emoji-minimal">
      &#x2022;
    </div>
    <div
      v-if="todo.class && !theme.minimalTheme"
      class="category-emoji"
      :class="{ 'category-emoji-selected': todo.isSelected }"
      @click="todosStore.selectCategoryToAddItem(n, todo)"
    >
      {{ todo.emojy }}
    </div>
    <span
      alt="cart"
      v-if="!todo.class && !theme.minimalTheme && !todo.modify"
      class="cart"
      :class="{
        'hide-minimal-icon': theme.minimalTheme,
      }"
      @click="todosStore.selectTodoForDelete(n)"
    >
      <img v-if="todo.multipleDelete" src="@/img/icons/cart-red.webp" />
      <img
        v-if="!todo.multipleDelete && (theme.darkTheme || theme.retroTheme)"
        src="@/img/icons/cart-white.webp"
      />
      <img
        v-if="
          !todo.multipleDelete &&
          (theme.lightTheme || theme.summerTheme || theme.winterTheme)
        "
        src="@/img/icons/cart-black.webp"
      />
    </span>
    <span
      v-if="theme.minimalTheme && !todo.class && !todo.modify"
      class="mr-4 ml-1"
      @click="todosStore.selectTodoForDelete(n)"
    >
      -
    </span>
    <li
      v-if="!todo.modify"
      class="todo"
      id="todo"
      @click="
        todosStore.myFilter(n);
        todosStore.selectCategoryToAddItem(n, todo);
      "
      :class="{
        active: todo.isActive,
        selected: todo.isSelected,
        'line-through':
          todo.multipleDelete && !theme.retroTheme && !theme.lightTheme,
        'retro-multiple-delete': todo.multipleDelete && theme.retroTheme,
        'winter-todo': theme.winterTheme,
      }"
    >
      {{ todo.name }}
      <img
        v-if="todo.multipleDelete && theme.lightTheme"
        class="scrawl"
        src="@/img/cancella.webp"
        alt="line-through"
      />
    </li>
    <!--CONTENITORE PULSANTI (edit, delete, modify)-->
    <li
      class="button-container bg-light"
      :class="{
        'minimal-btn': theme.minimalTheme,
        'retro-btn': theme.retroTheme,
        categoryActive: todo.class,
        modify: todo.modify,
      }"
    >
      <!-- PULSANTE MODIFICA-->
      <button
        class="btn btn-primary rounded-circle btn-sm"
        @click="todosStore.modifyTodo(n)"
        v-if="!todo.modify && !todo.class"
        :class="todo.isDisabled ? 'disabled' : ''"
        :disabled="!!todo.isDisabled || todo.multipleDelete"
      >
        <img class="pencil" src="@/img/icons/pencil.webp" alt="modify" />
      </button>
      <!--PULSANTE ELIMINA -->
      <button
        class="btn btn-primary rounded-circle btn-sm"
        v-if="!todo.modify"
        @click="todosStore.removeTodo(n, todo)"
        :class="todo.isDisabled ? 'disabled' : ''"
        :disabled="!!todo.isDisabled"
      >
        <img class="trash" src="@/img/icons/trash.webp" alt="delete" />
      </button>
      <!-- INPUT MODIFICA -->
      <input
        class="modify-input border border-primary rounded"
        v-if="todo.modify"
        v-model.trim="todo.name"
      />
      <!--PULSANTE SALVA MODIFICHE -->
      <button
        class="btn btn-success rounded-circle btn-sm"
        v-if="todo.modify"
        :disabled="todo.name.length === 0"
        @click="todosStore.saveModifiedTodo(n, todo, todo.name)"
      >
        <img class="floppy" src="@/img/icons/floppy.webp" alt="save" />
      </button>
      <!--PULSANTE ANNULLA MODIFICHE -->
      <button
        class="btn btn-danger rounded-circle btn-sm"
        v-if="todo.modify"
        @click="todosStore.undoChanges(n)"
      >
        <img class="undo" src="@/img/icons/close.webp" alt="close" />
      </button>
    </li>
  </div>
</template>

<style scoped></style>
