<script setup>
import { ref } from "vue";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { usePreloadStore } from "../../store/PreloadStore";
import { auth, onAuthStateChanged } from "@/firebase.js";

const secondTodosStore = useSecondTodoStore();
const languages = useLanguageStore();
const preload = usePreloadStore();

preload.urls.forEach((url) => {
	preload.preloadImage(url);
});

const userEmail = ref(auth.currentUser?.email ?? null);
const isLoggedIn = ref(!!auth.currentUser);

onAuthStateChanged(auth, (user) => {
	userEmail.value = user?.email ?? null;
	isLoggedIn.value = !!user;
});
</script>

<template>
	<button @click="secondTodosStore.showRecipeModal = true">
		<span>
			{{ isLoggedIn && userEmail ? String.fromCodePoint(secondTodosStore.recipe.emoji) :
				String.fromCodePoint(0x1f37d) }}
		</span>
		<small v-if="isLoggedIn">{{ languages.recipes.recipeGeneratedText }}</small>
	</button>
</template>

<style scoped>
button {
	display: flex;
	align-items: center;
	padding: 0 10px !important;
	cursor: pointer;
	max-width: 120px;
}

span {
	font-size: 30px;
}
</style>
