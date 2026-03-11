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
const isGenerating = ref(false);
const recipesReady = ref(false);
const waitingPhrase = ref("");

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
	if (isGenerating.value) return; //blocca click multipli
	isGenerating.value = true;

	if (!secondTodosStore.totalRecipes || +secondTodosStore.totalRecipes == 0) {
		settings.showPaymentModal = true;
		isGenerating.value = false;
		return;
	}

	const myInterval = setInterval(showRandomSentences, 5000);

	try {
		await consumaGenerazione("Ricetta da lista spesa");

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
			const language = languages.langIta ? "italiano" : languages.langSpanish ? "spagnolo" : languages.langFrench ? "francese" : "inglese";
			const response = await fetch(`${productionUrl}/generate-recipe `, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					ingredients: ingredients,
					language: language,
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
			// faccio vedere uno chef che indica il pulsante stile khaby lame XD
			recipesReady.value = true;
			setTimeout(() => {
				recipesReady.value = false;
			}, 5000);

			stopRandomPhrases(myInterval);
		} catch (error) {
			ifError();
			console.error("Si è verificato un errore durante la richiesta:", error);
			stopRandomPhrases(myInterval);
		}
	} finally {
		isGenerating.value = false;
	}
}
function showRandomSentences() {
	const phrases = languages.randomPhrases;
	const randomIndex = Math.floor(Math.random() * phrases.length);

	waitingPhrase.value = phrases[randomIndex];
}
function stopRandomPhrases(myInterval) {
	clearInterval(myInterval);
	waitingPhrase.value = "";
}
function ifError() {
	secondTodosStore.loadingRecipes = false;
	errorRecipe.value = true;
}
</script>

<template>
	<div class="text-center">
		<p v-if="secondTodosStore.totalRecipes && +secondTodosStore.totalRecipes > 0">{{ languages.recipes.totalRecipesText }} {{ secondTodosStore.totalRecipes }}</p>
		<p v-if="isGenerating">{{ languages.recipes.alertRecepiesText }}</p>
		<p>{{ waitingPhrase }}</p>
	</div>
	<div class="recipe-generator">
		<!-- SWITCH PER DISATTIVARE L'INTELLIGENZA ARTIFICIALE  -->
		<!-- <div class="form-check form-switch">
			<label>AI</label>
			<input class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" v-model="enableAI" />
		</div> -->
		<!-- PULSANBTE GENERA RICETTA -->
		<button
			:class="{
				'btn btn-warning': !secondTodosStore.totalRecipes,
				'btn btn-success': secondTodosStore.totalRecipes && +secondTodosStore.totalRecipes > 0,
				error: errorRecipe,
				disabled: !todoStore.todos.length || isGenerating,
			}"
			:disabled="!todoStore.todos.length || isGenerating"
			@click="generateRecipe"
		>
			{{ isGenerating ? "Loading..." : languages.recipes.recipesBtnText }}
		</button>
		<!-- PULSANBTE MOSTRA MODALE RICETTA -->
		<img v-if="recipesReady" class="chef" src="@/img/recipes/chef-khaby.webp" alt="chef" />

		<ShowRecipeModalButton v-if="secondTodosStore.recipe && !secondTodosStore.loadingRecipes && secondTodosStore.recipe" />
	</div>
</template>

<style scoped>
.recipe-generator {
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: relative;
}

button {
	padding: 10px 20px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
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
.chef {
	width: 130px;
	height: 120px;
	position: absolute;
	right: 10px;
	bottom: 65px;
	z-index: 500;
}
</style>
