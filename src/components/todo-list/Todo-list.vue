<script setup>
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
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
			'jeans-category-btn': todo.category && theme.jeansTheme,
			'todo-added': todo.todoAdded,
			hidden: todo.hidden,
			'todo-modify': todo.modify,
		}"
	>
		<TodoRow :todo="todo" :index="n" />
	</div>
</template>

<style scoped>
.hidden {
	display: none;
}
</style>
