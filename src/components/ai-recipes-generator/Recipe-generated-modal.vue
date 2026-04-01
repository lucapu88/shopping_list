<script setup>
import { ref } from "vue";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useLanguageStore } from "../../store/LanguageStore";
import { useThemeStore } from "../../store/ThemeStore";
import { usePreloadStore } from "../../store/PreloadStore";
import { auth, logout, onAuthStateChanged } from "@/firebase.js";
import LatestRecipes from "./Latest-recipes.vue";

const secondTodosStore = useSecondTodoStore();
const languages = useLanguageStore();
const theme = useThemeStore();
const preload = usePreloadStore();
const showLatestRecipes = ref(false);

const imageSrc = ref(preload.urls[0]);

changeImage();

const userEmail = ref(auth.currentUser?.email ?? null);
const isLoggedIn = ref(!!auth.currentUser);

onAuthStateChanged(auth, (user) => {
	userEmail.value = user?.email ?? null;
	isLoggedIn.value = !!user;
});

async function handleLogout() {
	await logout();
	secondTodosStore.totalRecipes = 0;
	secondTodosStore.showRecipeModal = false;
}

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
				<div class="user-info mb-3" v-if="isLoggedIn">
					<p class="logged-info m-0">✅ {{ userEmail }}</p>
					<button class="btn btn-outline-success" @click="handleLogout">Logout</button>
				</div>

				<LatestRecipes v-if="showLatestRecipes && isLoggedIn" />
				<template v-if="!showLatestRecipes">
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
				</template>
				<button v-if="isLoggedIn" class="text-success toggle-latest-recipes-btn mt-4" @click="showLatestRecipes = !showLatestRecipes">{{ !showLatestRecipes ? languages.show : languages.hide }} {{ languages.recipes.latestText }}</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.recipe-container {
	position: relative;
	margin: 0 auto;
	padding: 0.625rem;
	max-height: 95vh;
}
.recipe-container > div {
	overflow-y: auto;
	max-height: 85vh;
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

.user-info {
	display: flex;
	align-items: center;
	gap: 8px;
}
.logout-btn {
	font-size: 11px;
	padding: 2px 8px;
	border-radius: 20px;
	border: 1px solid #9b6a2f;
	background: white;
	color: #9b6a2f;
	cursor: pointer;
}

.ma-che-vu {
	width: 105px; /* one nation one station */
	height: 120px;
	float: right;
}

.f-size {
	font-size: 0.813rem;
}

.toggle-latest-recipes-btn {
	background: transparent;
	border: 1px solid;
}

@media (max-width: 650px) {
	.modal {
		padding-top: 10%;
	}
	.recipe-container {
		margin: 0 20px;
	}
}
</style>
