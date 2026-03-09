<script setup>
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useLanguageStore } from "../../store/LanguageStore";
import { useThemeStore } from "../../store/ThemeStore";

const secondTodosStore = useSecondTodoStore();
const languages = useLanguageStore();
const theme = useThemeStore();
</script>

<template>
	<div class="modal">
		<div
			class="recipe-container"
			:class="{
				'container-light': theme.lightTheme,
				'container-dark': theme.darkTheme,
				'container-minimal': theme.minimalTheme,
				'container-retro': theme.retroTheme,
				'container-summer': theme.summerTheme,
				'container-winter': theme.winterTheme,
				'container-elegant': theme.elegantTheme,
				'container-pink': theme.pinkTheme,
				'container-panter': theme.panterTheme,
				'container-lemon': theme.lemonTheme,
				'container-jeans': theme.jeansTheme,
			}"
		>
			<button class="close-modal" @click="secondTodosStore.showRecipeModal = false">X</button>
			<div class="pt-2 pb-2">
				<h2 class="text-danger text-center">{{ secondTodosStore.recipe.titolo }}</h2>
				<p class="m-0 f-size text-center">{{ languages.recipesDisclaimer }}</p>
				<p class="f-size text-center">{{ languages.recipesSubDisclaimer }}</p>

				<p v-if="secondTodosStore.recipe.ingredienti && secondTodosStore.recipe.ingredienti.length">
					<span style="color: red">Ingredienti:</span>
					{{ secondTodosStore.recipe.ingredienti.join(", ") }}
				</p>
				<p v-if="secondTodosStore.recipe.preparazione">
					<span style="color: red">Preparazione:</span>
					{{ secondTodosStore.recipe.preparazione }}
				</p>
				<p v-if="secondTodosStore.recipe.tempo">
					<span style="color: red">Tempo:</span>
					{{ secondTodosStore.recipe.tempo }}
				</p>
				<p v-if="secondTodosStore.recipe.difficolta">
					<span style="color: red">Difficoltà:</span>
					{{ secondTodosStore.recipe.difficolta }}
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal {
	padding-top: 10%;
}
.recipe-container {
	position: relative;
	background-color: white;
	margin: 0 20px;
	padding: 0.625rem;
	max-height: 95vh;
}
.recipe-container > div {
	overflow: auto;
	max-height: 90vh;
}
.close-modal {
	position: absolute;
	right: -7px;
	top: -13px;
	border-radius: 50%;
	font-size: 20px;
	cursor: pointer;
	padding: 0 10px;
}

.f-size {
	font-size: 0.813rem;
}
</style>
