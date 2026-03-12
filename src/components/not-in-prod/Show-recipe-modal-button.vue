<script setup>
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { usePreloadStore } from "../../store/PreloadStore";

const secondTodosStore = useSecondTodoStore();
const languages = useLanguageStore();
const preload = usePreloadStore();

preload.urls.forEach((url) => {
	preload.preloadImage(url);
});
</script>

<template>
	<button @click="secondTodosStore.showRecipeModal = true">
		<span>{{ String.fromCodePoint(secondTodosStore.recipe.emoji) }}</span>
		<small>{{ languages.recipes.recipeGeneratedText }}</small>
	</button>
</template>

<style scoped>
button {
	display: flex;
	align-items: center;
	padding: 0 10px !important;
	cursor: pointer;
	max-width: 120px;
}
span {
	font-size: 30px;
}
</style>
