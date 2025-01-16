<script setup>
import { useChristmasStore } from "@/store/ChristmasStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
</script>

<script>
export default {
	props: {
		multipleDelete: Boolean,
		importantTodo: Boolean,
	},
	data() {
		return {
			theme: useThemeStore(),
			isChristmas: useChristmasStore(),
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			todosStore: useTodoStore(),
		};
	},
	methods: {
		deselectAll() {
			this.importantTodo ? this.todosStore.deselectAllImportant() : this.deselectAllSelected();
		},
		deselectAllSelected() {
			this.todosStore.todos.forEach((todo) => {
				todo.multipleDelete = false;
			});
			this.todosStore.toggleButtonDeleteSelectedTodo();
			this.todosStore.confirmDeselectAll = false;
			this.todosStore.saveTodos();
		},
	},
};
</script>

<template>
	<button
		v-if="(multipleDelete && todosStore.canDeleteMultipleTodo && !todosStore.confirmDeselectAll) || (importantTodo && todosStore.showOnlyImportantTodos && !todosStore.confirmDeselectAll)"
		class="border-danger deselect-all p-2"
		:class="{
			'text-danger multiple-delete opacity-75': multipleDelete,
			active: importantTodo && !theme.elegantTheme,
			christmas: isChristmas.christmasTheme,
			'elegant-btn': theme.elegantTheme,
		}"
		@click="todosStore.confirmDeselectAll = true"
	>
		{{ languages.deselectAllText }}
	</button>
	<!-- CONTENITORE CONFERMA DESELEZIONA TUTTI -->
	<div
		v-if="(multipleDelete && todosStore.canDeleteMultipleTodo && todosStore.confirmDeselectAll) || (importantTodo && todosStore.showOnlyImportantTodos && todosStore.confirmDeselectAll)"
		class="confirm-deselect-all-container deselect-all p-2"
		:class="{
			'multiple-delete': multipleDelete,
			light: theme.lightTheme,
			dark: theme.darkTheme,
			minimal: theme.minimalTheme,
			retro: theme.retroTheme,
			summer: theme.summerTheme,
			winter: theme.winterTheme,
			elegant: theme.elegantTheme,
			pink: theme.pinkTheme,
			panter: theme.panterTheme,
			lemon: theme.lemonTheme,
		}"
	>
		<button class="btn btn-success rounded btn-sm confirm-undo-button" @click="deselectAll()">
			<img class="confirm-deselect-all" src="@/img/icons/ok.webp" alt="ok" />
		</button>

		<button class="btn btn-danger rounded btn-sm confirm-undo-button" @click="todosStore.confirmDeselectAll = false">
			<img class="undo" src="@/img/icons/close.webp" alt="X" />
		</button>
	</div>
</template>

<style scoped>
.multiple-delete {
	position: fixed;
	bottom: 3%;
	left: 25%;
	-webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	-moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
}
.deselect-all {
	min-width: 160px;
	height: 45px;
	z-index: 150;
}
.confirm-deselect-all-container > button {
	width: 45px;
}
</style>
