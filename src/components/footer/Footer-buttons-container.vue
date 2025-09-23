<script setup>
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
import MultipleSelection from "./Multiple-selection.vue";
import GenerateRecipesButton from "../not-in-prod/Generate-recipes-button.vue";
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
		<MultipleSelection />

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
	<GenerateRecipesButton v-if="settings.isIphone" />
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
</style>
