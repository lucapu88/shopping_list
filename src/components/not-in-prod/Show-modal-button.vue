<script setup>
// QUESTO COMPONENTE NON VA IN PRODUZIONE, SERVE SOLO PER ESERCITARSI CON LANGCHAIN E LO USO SOLO IO SUL MIO IPHONE
import RecipeGeneratedModal from "./Recipe-generated-modal.vue";
import { useSecondTodoStore } from "@/store/SecondTodoStore";

const secondTodosStore = useSecondTodoStore();
</script>

<template>
	<button @click="secondTodosStore.showRecipeModal = true">{{ String.fromCodePoint(0x1f37d) }}</button>
	<RecipeGeneratedModal v-if="secondTodosStore.showRecipeModal" />
</template>

<style scoped>
button {
	font-size: 30px;
	padding: 0 10px;
	cursor: pointer;
}
</style>
