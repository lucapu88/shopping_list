<script setup>
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
import DeselectAll from "./Deselect-all.vue";
</script>

<script>
export default {
	emits: ["scrollToTop", "scrollToBottom"],
	data() {
		return {
			theme: useThemeStore(),
			isChristmas: useChristmasStore(),
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			todosStore: useTodoStore(),
		};
	},
};
</script>

<template>
	<div>
		<!-- PULSANTE ELIMINA SOLO I SELEZIONATI -->
		<button
			v-if="todosStore.canDeleteMultipleTodo"
			class="opacity-90 text-danger border-danger rounded multiple-delete left p-2"
			:class="{
				christmas: isChristmas.christmasTheme,
				'elegant-btn': theme.elegantTheme,
			}"
			@click="todosStore.openModalForDeleteSelectedTodos('multiple')"
		>
			<img class="trash" src="@/img/icons/trash-red.webp" alt="delete" />
		</button>

		<!-- PULSANTE DESELEZIONA TUTTI GLI ELEMENTI SELEZIONATI -->
		<DeselectAll :multiple-delete="true" :important-todo="false" />

		<!-- PULSANTE DESELEZIONA TUTTI I SELEZIONATI COME IMPORTANTI -->
		<DeselectAll :important-todo="true" :multiple-delete="false" />

		<!-- PULSANTE NASCONDI I SELEZIONATI -->
		<button
			v-if="todosStore.canDeleteMultipleTodo"
			class="opacity-80 text-danger border-danger rounded multiple-delete right p-2"
			:class="{
				christmas: isChristmas.christmasTheme,
				'elegant-btn': theme.elegantTheme,
			}"
			@click="todosStore.toggleSelectedTodosForDelete()"
		>
			<img v-if="todosStore.isVisible" class="eye" src="@/img/icons/eye-open.webp" alt="visible" />
			<img v-if="!todosStore.isVisible" class="eye" src="@/img/icons/eye-close.webp" alt="hidden" />
		</button>
	</div>
</template>

<style scoped>
.multiple-delete {
	position: fixed;
	bottom: 3%;
	-webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	-moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	z-index: 150;
}
.trash {
	width: 25px;
	height: 25px;
}

.left {
	left: 3%;
}
.right {
	right: 3%;
}

.eye {
	width: 35px;
	height: 25px;
}

.opacity-90 {
	opacity: 0.9;
}

.opacity-80 {
	opacity: 0.8;
}
</style>
