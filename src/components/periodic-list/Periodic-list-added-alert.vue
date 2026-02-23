<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
const theme = useThemeStore();
const languages = useLanguageStore();
const secondTodos = useSecondTodoStore();
</script>

<template>
	<div
		class="alert-container"
		:class="{
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
			jeans: theme.jeansTheme,
		}"
	>
		<div class="close-x-container" @click="secondTodos.addedToPeriodicList = false">
			<p class="close-x-btn" :class="{ 'close-retro-theme-helper': theme.retroTheme }">X</p>
		</div>
		<p class="mt-3 mb-0">{{ languages.periodicList.periodicListAddedText }}</p>
	</div>
</template>

<style scoped>
.alert-container {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 10%;
	left: 15%;
	width: 70%;
	height: 70px;
	z-index: 200;
	border: 2px solid;
	border-radius: 10px;
}

.close-x-container {
	top: -5px;
	right: -5px;
}
</style>
