<script setup>
// QUESTO COMPONENTE NON VA IN PRODUZIONE, SERVE SOLO PER ESERCITARSI CON LANGCHAIN E LO USO SOLO IO SUL MIO IPHONE
// Sto usando anche le Composition API perchè ormai il futuro è quello, anche se a me piace com'era con Options API, ma amen pian piano porterò tutto il codice al nuovo stato
import { ref } from "vue";
import { useTodoStore } from "@/store/TodoStore";
import { storeToRefs } from "pinia";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import ShowModalButton from "./Show-modal-button.vue";

/* openaiApiKey: Non va fatto assolutamente così, ho implementato nell'altro progetto backend a parte la soluzione con la chiave presa dal file .env
	Il progetto backend è deployato su Render.com e li ho impostato la variabile d'ambiente con la mia API key di OpenAI.
	Ma non voglio che qualsiasi persona che scopre il progetto possa poi utilizzarlo per fare richieste a OpenAI a mie spese. Perciò uso questa soluzione solo per esercitarmi io sul mio iPhone.
*/
const openaiApiKey = window.localStorage.getItem("apikey");

const secondTodosStore = useSecondTodoStore();

const readyRecipe = ref(false);
const errorRecipe = ref(false);

const todoStore = useTodoStore();
const productionUrl = "https://shopping-list-backend-uxr0.onrender.com";
const localUrl = "http://localhost:3000";

async function generateRecipe() {
	const { todos } = storeToRefs(todoStore);
	if (!todos.value.length) {
		return;
	}
	errorRecipe.value = false;
	secondTodosStore.loadingRecipes = true;

	const ingredients = todos.value
		.filter((el) => !el.category)
		.map((item) => item.name)
		.join(", ");

	try {
		const response = await fetch(`${productionUrl}/generate-recipe `, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				ingredients: ingredients,
				apiKey: openaiApiKey,
			}),
		});
		if (!response.ok) {
			ifError();
			const text = await response.text();
			console.error("Errore server:", text);
			throw new Error(`Server error: ${response.status} - ${text}`);
		}
		const data = await response.json();
		console.log("Ricetta generata:", data);
		secondTodosStore.recipe = data;
		readyRecipe.value = true;
		secondTodosStore.loadingRecipes = false;
	} catch (error) {
		ifError();
		console.error("Si è verificato un errore durante la richiesta:", error);
	}
}

function ifError() {
	readyRecipe.value = false;
	secondTodosStore.loadingRecipes = false;
	errorRecipe.value = true;
}
</script>

<template>
	<div class="recipe-generator">
		<button :class="{ error: errorRecipe, disabled: !todoStore.todos.length || secondTodosStore.loadingRecipes }" :disabled="!todoStore.todos.length || secondTodosStore.loadingRecipes" @click="generateRecipe">
			{{ secondTodosStore.loadingRecipes ? "Loading..." : "Genera Ricetta" }}
		</button>
		<ShowModalButton v-if="readyRecipe && !secondTodosStore.loadingRecipes" />
	</div>
</template>

<style scoped>
.recipe-generator {
	margin-top: 20px;
	display: flex;
	justify-content: center;
	gap: 25px;
}
button {
	width: 160px;
	padding: 10px 20px;
	background-color: #4caf50;
	color: #ffffff;
	border: none;
	border-radius: 6px;
	cursor: pointer;
}

button:hover {
	background-color: #45a049;
}
.error {
	background-color: #ff0000;
}
.disabled {
	background-color: #a1a1a1;
	color: #575757;
}
</style>
