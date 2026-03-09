<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTodoStore } from "@/store/TodoStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useLanguageStore } from "@/store/LanguageStore";
import ShowRecipeModalButton from "./Show-recipe-modal-button.vue";
import { useGenerazioni } from "@/server/composables/useGenerazioni";

const { generazioni, fetchGenerazioni, consumaGenerazione } = useGenerazioni();

const secondTodosStore = useSecondTodoStore();
const settings = useSettingsStore();
const languages = useLanguageStore();
const todoStore = useTodoStore();
const productionUrl = "https://shopping-list-backend-uxr0.onrender.com";
const localUrl = "http://localhost:3000";
const errorRecipe = ref(false);
const enableAI = ref(JSON.parse(localStorage.getItem("enableAI")) ?? false);

watch(enableAI, (val) => {
	localStorage.setItem("enableAI", JSON.stringify(val));
});

onMounted(() => {
	fetchGenerazioni();
	const ricettaGenerata = window.localStorage.getItem("ricetta-generata");
	const ricettaGenerataParsed = JSON.parse(ricettaGenerata);
	secondTodosStore.recipe = ricettaGenerataParsed;
});

async function generateRecipe() {
	const ok = await consumaGenerazione("Ricetta da lista spesa");
	console.log("aaa", secondTodosStore.totalRecipes);
	console.log("aaa", ok);
	if (!ok || !secondTodosStore.totalRecipes || secondTodosStore.totalRecipes == 0) {
		settings.showPaymentModal = true;
		return;
	}

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

		window.localStorage.setItem("ricetta-generata", JSON.stringify(data));
		secondTodosStore.recipe = data;
		secondTodosStore.loadingRecipes = false;
	} catch (error) {
		ifError();
		console.error("Si è verificato un errore durante la richiesta:", error);
	}
}

function ifError() {
	secondTodosStore.loadingRecipes = false;
	errorRecipe.value = true;
}
</script>

<template>
	<div class="text-center">
		<p v-if="secondTodosStore.totalRecipes && secondTodosStore.totalRecipes > 0">{{ languages.totalRecipesText }} {{ secondTodosStore.totalRecipes }}</p>
		<p v-if="secondTodosStore.loadingRecipes">{{ languages.alertRecepiesText }}</p>
	</div>
	<div class="recipe-generator">
		<!-- SWITCH PER DISATTIVARE L'INTELLIGENZA ARTIFICIALE  -->
		<!-- <div class="form-check form-switch">
			<label>AI</label>
			<input class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" v-model="enableAI" />
		</div> -->
		<!-- PULSANBTE GENERA RICETTA -->
		<button :class="{ error: errorRecipe, disabled: !todoStore.todos.length || secondTodosStore.loadingRecipes }" :disabled="!todoStore.todos.length || secondTodosStore.loadingRecipes" @click="generateRecipe">
			{{ secondTodosStore.loadingRecipes ? "Loading..." : "Genera Ricetta" }}
		</button>
		<!-- PULSANBTE MOSTRA MODALE RICETTA -->
		<ShowRecipeModalButton v-if="secondTodosStore.recipe && !secondTodosStore.loadingRecipes && secondTodosStore.recipe" />
	</div>
</template>

<style scoped>
.recipe-generator {
	display: flex;
	justify-content: space-around;
	align-items: center;
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

.form-check > label {
	margin-left: 0.3125rem;
	line-height: 2;
}
.form-check-input {
	width: 3em;
	height: 1.5em;
}
</style>
