<script setup>
// QUESTO COMPONENTE NON VA IN PRODUZIONE, SERVE SOLO PER ESERCITARSI CON LANGCHAIN E LO USO SOLO IO SUL MIO IPHONE
import { ref } from "vue";
import { useTodoStore } from "@/store/TodoStore";
import { storeToRefs } from "pinia";
import RecipeGeneratedModal from "./Recipe-generated-modal.vue";
import { useSecondTodoStore } from "@/store/SecondTodoStore";

const openaiApiKey = window.localStorage.getItem("apikey");

const secondTodosStore = useSecondTodoStore();

const openModal = ref(false);

const todoStore = useTodoStore();

async function generateRecipe() {
	const { todos } = storeToRefs(todoStore);
	if (!todos.value.length) {
		return;
	}
	secondTodosStore.loadingRecipes = true;

	const ingredients = todos.value
		.filter((el) => !el.category)
		.map((item) => item.name)
		.join(", ");

	const response = await fetch("https://shopping-list-backend-uxr0.onrender.com/generate-recipe", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			ingredients: ingredients,
			apiKey: openaiApiKey,
		}),
	});
	const data = await response.json();

	console.log("Ricetta generata:", data);
	secondTodosStore.recipe = data;
	openModal.value = true;
	secondTodosStore.loadingRecipes = false;
}
</script>

<template>
	<div class="recipe-generator">
		<button :disabled="!todoStore.todos.length" @click="generateRecipe">
			{{ secondTodosStore.loadingRecipes ? "Loading..." : "Genera Ricetta" }}
		</button>
		<RecipeGeneratedModal v-if="openModal" v-model:open-modal="openModal" />
	</div>
</template>

<style scoped>
.recipe-generator {
	margin-top: 20px;
	text-align: center;
}
button {
	padding: 10px 20px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
}

button:hover {
	background-color: #45a049;
}
</style>
