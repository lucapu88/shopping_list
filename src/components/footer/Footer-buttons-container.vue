<script setup>
import { useChristmasStore } from "@/store/ChristmasStore";
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
	created() {
		this.todosStore.priceCalculator();
	},
	methods: {
		emitScrollTop() {
			this.$emit("scrollToTop", true);
		},
		openDeleteAllModal() {
			this.todosStore.openDeleteAllModal = true;
			this.$emit("scrollToBottom", true);
		},
	},
};
</script>

<template>
	<div class="footer-btns-container pb-3">
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

		<!-- PULSANTE ELIMINA TUTTO-->
		<button
			v-if="!todosStore.showOnlyImportantTodos"
			class="delete-all btn dark-button"
			:class="{
				christmas: isChristmas.christmasTheme,
				'delete-all-retro': theme.retroTheme,
				'elegant-delete-all-btn': theme.elegantTheme,
				'panter-border': theme.panterTheme,
			}"
			@click="openDeleteAllModal()"
		>
			<span>{{ languages.deleteAll }}</span>
			<img v-if="!isChristmas.christmasTheme" class="skull" src="@/img/icons/skull.webp" alt="delete_all" />
			<img v-if="isChristmas.christmasTheme" class="christmas-skull" src="@/img/icons/christmas-skull.webp" alt="delete_all_and_merry_christmas" />
		</button>
		<span v-if="todosStore.totalPrice > 0" style="line-height: 2">{{ todosStore.totalPrice }}</span>

		<!-- PULSANTE TORNA IN CIMA -->
		<button
			class="btn btn-back-to-top"
			:class="{
				christmas: isChristmas.christmasTheme,
				'minimal-theme-back-top': theme.minimalTheme,
				'dark-theme-back-top': theme.darkTheme,
				'retro-theme-back-top': theme.retroTheme,
				'summer-theme-back-top': theme.summerTheme,
				'winter-theme-back-top': theme.winterTheme,
				'elegant-theme-back-top': theme.elegantTheme,
				'pink-theme-btn': theme.pinkTheme,
				'panter-theme-back-top': theme.panterTheme,
				'btn-outline-info': !theme.pinkTheme,
			}"
			@click="emitScrollTop()"
		>
			<span> >> </span>
		</button>
	</div>
	<div v-if="isChristmas.christmasTheme && todosStore.todos.length">
		<img class="christmas-footer" src="@/img/festivities/christmas.webp" alt=" Merry Christmas" />
		<small class="created-by-luca-caputo">By Luca Caputo</small>
	</div>
</template>

<style scoped>
.footer-btns-container {
	display: flex;
	justify-content: space-around;
}
.dark-button {
	background-color: #000000;
	color: #ffff;
	min-width: 180px;
}

.christmas-skull {
	width: 38px;
	height: 38px;
	margin-left: 7px;
}

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
