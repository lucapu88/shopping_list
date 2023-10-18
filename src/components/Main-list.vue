<script setup>
import TodoListDraggable from './todo-list/Todo-list-draggable.vue';
import TodoList from './todo-list/Todo-list.vue';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
</script>

<script>
export default {
  data() {
    return {
      isChristmas: useChristmasStore(),
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      theme: useThemeStore(),
      todos: useAddModifyDeleteTodosStore(),
    };
  },
};
</script>

<template>
  <ul
    id="todo-list"
    class="col-12"
    :class="{
      christmas: isChristmas.christmasTheme,
    }"
  >
    <TodoListDraggable v-if="todos.isDraggable" />
    <TodoList v-if="!todos.isDraggable" />
  </ul>
</template>

<style scoped></style>
