<script setup>
import TodoListDraggable from "./todo-list/Todo-list-draggable.vue";
import TodoList from "./todo-list/Todo-list.vue";
import { useChristmasStore } from "@/store/ChristmasStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import DeveloperNotes from "./Developer-notes.vue";
</script>

<script>
export default {
	data() {
		return {
			isChristmas: useChristmasStore(),
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			theme: useThemeStore(),
			todos: useTodoStore(),
		};
	},
};
</script>

<template>
	<ul
		v-if="!todos.secondList"
		id="todo-list"
		class="col-12 todo-list"
		:class="{
			'margin-t': isChristmas.christmasTheme,
		}"
	>
		<TodoListDraggable v-if="todos.isDraggable" />
		<TodoList v-if="!todos.isDraggable" />
	</ul>
	<DeveloperNotes v-else />
</template>

<style scoped>
.col-12 {
	padding-right: 15px;
	padding-left: 15px;
}

.todo-list {
	max-width: 100vw;
}

.margin-t {
	margin-top: 15px;
}
</style>
