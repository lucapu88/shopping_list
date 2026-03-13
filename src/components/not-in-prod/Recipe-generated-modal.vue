<script setup>
import { ref } from "vue";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useLanguageStore } from "../../store/LanguageStore";
import { useThemeStore } from "../../store/ThemeStore";
import { usePreloadStore } from "../../store/PreloadStore";

const secondTodosStore = useSecondTodoStore();
const languages = useLanguageStore();
const theme = useThemeStore();
const preload = usePreloadStore();

const imageSrc = ref(preload.urls[0]);

changeImage();

function changeImage() {
	const randomIndex = Math.floor(Math.random() * preload.urls.length);
	imageSrc.value = preload.urls[randomIndex];
}
</script>

<template>
	<div class="modal">
		<div
			class="recipe-container"
			:class="{
				'arrotonda-sto-bordo': !theme.retroTheme,
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
				<h2 :class="{ 'text-danger text-center': !theme.pinkTheme }">{{ secondTodosStore.recipe.titolo }}</h2>
				<p class="m-0 f-size text-center">{{ languages.recipes.recipesDisclaimer }}</p>
				<p class="f-size text-center">{{ languages.recipes.recipesSubDisclaimer }}</p>

				<p v-if="secondTodosStore.recipe.ingredienti && secondTodosStore.recipe.ingredienti.length">
					<span class="under-pressure" :class="{ 'text-danger': !theme.pinkTheme }">{{ languages.recipes.ingredients }}:</span>
					{{ secondTodosStore.recipe.ingredienti.join(", ") }}
				</p>
				<p v-if="secondTodosStore.recipe.preparazione">
					<span class="under-pressure" :class="{ 'text-danger': !theme.pinkTheme }">{{ languages.recipes.preparation }}:</span>
					{{ secondTodosStore.recipe.preparazione }}
				</p>
				<p v-if="secondTodosStore.recipe.tempo">
					<span class="under-pressure" :class="{ 'text-danger': !theme.pinkTheme }">{{ languages.recipes.time }}:</span>
					{{ secondTodosStore.recipe.tempo }}
				</p>
				<p v-if="secondTodosStore.recipe.difficolta">
					<span class="under-pressure" :class="{ 'text-danger': !theme.pinkTheme }">{{ languages.recipes.difficulty }}:</span>
					{{ secondTodosStore.recipe.difficolta }}
					<img class="ma-che-vu" :src="imageSrc" alt="cheffone" />
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

.ma-che-vu {
	width: 105px; /* one nation one station */
	height: 120px;
	float: right;
}

.f-size {
	font-size: 0.813rem;
}
</style>
