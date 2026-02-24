<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
const theme = useThemeStore();
const languages = useLanguageStore();
const secondTodos = useSecondTodoStore();
</script>

<template>
	<div class="alert-container">
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
	box-shadow: 1px 1px 29px 5px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: 1px 1px 29px 5px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 1px 1px 29px 5px rgba(0, 0, 0, 0.75);
	background-color: #e1e1e1;
	color: #e70000;
}

.close-x-container {
	top: -5px;
	right: -5px;
}
</style>
