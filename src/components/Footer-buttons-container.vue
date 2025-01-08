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
			this.todosStore.openDeleteAllModal;
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
			class="text-danger border-danger rounded multiple-delete p-2"
			:class="{
				christmas: isChristmas.christmasTheme,
				'elegant-btn': theme.elegantTheme,
			}"
			@click="todosStore.openModalForDeleteSelectedTodos()"
		>
			<img class="trash" src="@/img/icons/trash-red.webp" alt="delete" />
		</button>

		<!-- PULSANTE DESELEZIONA TUTTI GLI ELEMENTI SELEZIONATI -->
		<DeselectAll :multiple-delete="true" :important-todo="false" />

		<!-- PULSANTE DESELEZIONA TUTTI I SELEZIONATI COME IMPORTANTI -->
		<DeselectAll :important-todo="true" :multiple-delete="false" />

		<!-- PULSANTE ELIMINA TUTTO-->
		<button
			v-if="!todosStore.showOnlyImportantTodos"
			class="delete-all btn dark"
			:class="{
				christmas: isChristmas.christmasTheme,
				'delete-all-retro': theme.retroTheme,
				'elegant-delete-all-btn': theme.elegantTheme,
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
				'btn-outline-info': !theme.pinkTheme,
				'is-dragginn': todosStore.isDraggable && todosStore.todos.length > 8,
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
.dark {
	background-color: #000000;
	color: #ffff;
	min-width: 180px;
}

.christmas-skull {
	width: 38px;
	height: 38px;
	margin-left: 7px;
}

.is-dragginn {
	position: fixed;
	bottom: 30px;
	right: 30px;
	z-index: 200;
}

.multiple-delete {
	position: fixed;
	bottom: 3%;
	left: 3%;
	-webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	-moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	z-index: 150;
}
.multiple-delete > img {
	width: 25px;
	height: 25px;
}
</style>
