<script setup>
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
</script>

<script>
export default {
	data() {
		return {
			themes: useThemeStore(),
			isChristmas: useChristmasStore(),
			languages: useLanguageStore(),
			todosStore: useTodoStore(),
		};
	},
};
</script>

<template>
	<div class="duplicate-modal-background">
		<div
			class="duplicate-container"
			:class="{
				'duplicate-container-light': themes.lightTheme,
				'duplicate-container-dark': themes.darkTheme,
				'duplicate-container-minimal': themes.minimalTheme,
				'duplicate-container-retro': themes.retroTheme,
				'duplicate-container-summer': themes.summerTheme,
				'duplicate-container-winter': themes.winterTheme,
				'duplicate-container-elegant': themes.elegantTheme,
				'duplicate-container-pink': themes.pinkTheme,
				'duplicate-container-panter': themes.panterTheme,
				lemon: themes.lemonTheme,
				'duplicate-container-jeans': themes.jeansTheme,
			}"
		>
			<p class="title">{{ languages.duplicateText.title }}</p>
			<div class="body">
				<p>{{ languages.duplicateText.body }}</p>
				<button class="btn btn-yes" :class="{ 'pink-theme-btn': themes.pinkTheme }" @click="todosStore.addTodoAfterDuplicateCheck(true)">
					<span v-if="languages.langIta || languages.langSpanish">SI</span>
					<span v-if="languages.langEnglish">YES</span>
				</button>
				<button class="btn btn-no" :class="{ 'pink-theme-btn-secondary': themes.pinkTheme }" @click="todosStore.addTodoAfterDuplicateCheck(false)">NO</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.duplicate-modal-background {
	width: 100%;
	height: 100%;
	background-color: rgba(69, 69, 69, 0.616);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1000;
}
.duplicate-container {
	width: 88%;
	position: absolute;
	top: 3%;
	left: 6%;
	background: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 135px;
	padding: 0.625rem;
	box-shadow: 0px 5px 30px 5px;
	animation: fadeInOpacity 0.8s ease;
}

.body {
	display: flex;
	align-items: center;
	gap: 15px;
}
.body > p {
	margin: 0;
	margin-right: 0.9375rem;
}

.btn-yes {
	background-color: lightgreen;
	width: 45px;
}
.btn-no {
	background-color: lightcoral;
	width: 45px;
}
</style>
