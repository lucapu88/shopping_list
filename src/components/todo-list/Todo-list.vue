<script setup>
import { useChristmasStore } from "@/store/ChristmasStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import TodoRow from "./Todo-row.vue";
import EmptyList from "./Empty-list.vue";
</script>

<script>
export default {
	data() {
		return {
			isChristmas: useChristmasStore(),
			theme: useThemeStore(),
			todosStore: useTodoStore(),
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
			category: todo.category,
			'category-dark': todo.category && theme.darkTheme,
			'category-retro': todo.category && theme.retroTheme,
			'category-minimal': todo.category && theme.minimalTheme,
			'category-summer': todo.category && theme.summerTheme,
			'category-winter': todo.category && theme.winterTheme,
			'category-elegant': todo.category && theme.elegantTheme,
			'category-pink': todo.category && theme.pinkTheme,
			'panter-category-btn': todo.category && theme.panterTheme,
			'lemon-other-btn': todo.category && theme.lemonTheme,
			'todo-added': todo.todoAdded,
		}"
	>
		<TodoRow :todo="todo" :index="n" />
	</div>
</template>

<style scoped></style>
