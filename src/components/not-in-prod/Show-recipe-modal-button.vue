<script setup>
import RecipeGeneratedModal from "./Recipe-generated-modal.vue";
import { useSecondTodoStore } from "@/store/SecondTodoStore";

const secondTodosStore = useSecondTodoStore();
</script>

<template>
	<button @click="secondTodosStore.showRecipeModal = true">{{ String.fromCodePoint(secondTodosStore.recipe.emoji) }}</button>
	<RecipeGeneratedModal v-if="secondTodosStore.showRecipeModal" />
</template>

<style scoped>
button {
	font-size: 30px;
	padding: 0 10px;
	cursor: pointer;
}
</style>
