<script setup>
import { useChristmasStore } from '@/store/ChristmasStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
import TodoRow from './Todo-row.vue';
import EmptyList from './Empty-list.vue';
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
  <EmptyList v-if="!todosStore.todos.length" />
  <div
    v-for="(todo, n) in todosStore.todos"
    :key="n"
    :index="n"
    id="draggable-children"
    class="todo-n"
    :class="{
      category: todo.class,
      'category-dark': todo.class && theme.darkTheme,
      'category-retro': todo.class && theme.retroTheme,
      'category-minimal': todo.class && theme.minimalTheme,
      'category-summer': todo.class && theme.summerTheme,
      'category-winter': todo.class && theme.winterTheme,
      'category-elegant': todo.class && theme.elegantTheme,
      'category-pink': todo.class && theme.pinkTheme,
      'todo-added': todo.todoAdded,
    }"
  >
    <TodoRow :todo="todo" :index="n" />
  </div>
</template>

<style scoped></style>
