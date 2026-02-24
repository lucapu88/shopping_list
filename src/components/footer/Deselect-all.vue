<script setup>
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
import ConfirmPanel from "../common/Confirm-panel.vue";
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
			'left-25': !settings.isIphone,
			'left-35': settings.isIphone,
			active: importantTodo && !theme.elegantTheme,
			christmas: isChristmas.christmasTheme,
			'elegant-btn': theme.elegantTheme,
			'jeans-font-size': theme.jeansTheme,
		}"
		@click="todosStore.confirmDeselectAll = true"
	>
		{{ languages.deselectAllText }}
	</button>
	<!-- CONTENITORE CONFERMA DESELEZIONA TUTTI -->
	<ConfirmPanel
		v-if="(multipleDelete && todosStore.canDeleteMultipleTodo && todosStore.confirmDeselectAll) || (importantTodo && todosStore.showOnlyImportantTodos && todosStore.confirmDeselectAll)"
		extra-classes="deselect-all"
		:multipleDelete="multipleDelete"
		@ok="deselectAll()"
		@no="todosStore.confirmDeselectAll = false"
	/>
</template>

<style scoped>
.multiple-delete {
	-webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	-moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
}

.left-25 {
	left: 25%;
}
.left-35 {
	left: 35%;
}
.deselect-all {
	min-width: 160px;
	height: 45px;
	z-index: 150;
}
</style>
