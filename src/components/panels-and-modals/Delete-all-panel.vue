<script setup>
import { useChristmasStore } from "@/store/ChristmasStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
import crumpPaper from "@/img/carta-stropicciata.webp";
import wave from "@/img/onda.webp";
import cincia from "@/img/cincia.webp";
</script>

<script>
export default {
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
	<link v-if="theme.lightTheme" rel="preload" as="image" :href="crumpPaper" />
	<link v-if="theme.summerTheme" rel="preload" as="image" :href="wave" />
	<link v-if="theme.winterTheme" rel="preload" as="image" :href="cincia" />

	<div
		class="confirm col-10 mx-auto rounded text-center mb-3"
		:class="{
			christmas: isChristmas.christmasTheme,
			'confirm-light': theme.lightTheme,
			'dark-theme-confirm': theme.darkTheme,
			'minimal-theme-confirm': theme.minimalTheme,
			'retro-theme-confirm-delete': theme.retroTheme,
			'summer-confirm': theme.summerTheme,
			'winter-confirm': theme.winterTheme,
			'elegant-theme-confirm': theme.elegantTheme,
			'pink-theme-confirm': theme.pinkTheme,
			'confirm-panter': theme.panterTheme,
			'lemon-confirm-delete-all': theme.lemonTheme,
		}"
		v-if="todosStore.openDeleteAllModal"
	>
		<p class="confirm-delete-all-text">
			<img class="trash" src="@/img/icons/trash-red.webp" alt="delete" />
			{{ languages.deleteAllConfirmText }}
		</p>
		<button class="btn btn-primary" :class="{ 'pink-theme-btn': theme.pinkTheme }" @click="todosStore.removeAllTodo()">
			<span v-if="languages.langIta || languages.langSpanish">SI</span>
			<span v-if="languages.langEnglish">YES</span>
		</button>
		<button class="btn btn-secondary" :class="{ 'pink-theme-btn-secondary': theme.pinkTheme }" @click="todosStore.openDeleteAllModal = false">NO</button>
	</div>
</template>

<style scoped>
.confirm {
	min-height: 155px;
	padding: 10px 5px;
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.5s;
	z-index: 100;
}
@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.confirm-delete-all-text {
	font-size: 1.125rem;
	margin: 0 auto;
	padding-bottom: 10px;
	font-weight: bold;
	max-width: 25ch;
	margin-top: 5%;
}
.confirm > button {
	margin-right: 15px;
	width: 2.8125rem;
}

.confirm-light {
	background-image: url("@/img/carta-stropicciata.webp") !important;
	background-size: contain;
	border: 2px solid rgb(0, 172, 252);
}
</style>
