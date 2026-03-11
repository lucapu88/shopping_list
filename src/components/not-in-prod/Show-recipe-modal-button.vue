<script setup>
import { useSecondTodoStore } from "@/store/SecondTodoStore";

const secondTodosStore = useSecondTodoStore();
</script>

<template>
	<button @click="secondTodosStore.showRecipeModal = true">{{ String.fromCodePoint(secondTodosStore.recipe.emoji) }}</button>
</template>

<style scoped>
button {
	font-size: 30px;
	padding: 0 10px !important;
	cursor: pointer;
}
</style>
