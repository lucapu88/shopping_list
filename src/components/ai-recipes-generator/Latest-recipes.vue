<script setup>
import { ref, onMounted } from "vue";
import { auth } from "@/firebase.js";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useLanguageStore } from "../../store/LanguageStore";

const API_URL = import.meta.env.VITE_API_URL;
const secondTodosStore = useSecondTodoStore();
const languages = useLanguageStore();
const ricette = ref([]);
const loading = ref(false);
const isLoggedIn = ref(!!auth.currentUser);

async function fetchStorico() {
	if (!auth.currentUser) return;
	loading.value = true;
	try {
		const res = await fetch(`${API_URL}/storico-ricette?token=${auth.currentUser.uid}`);
		const data = await res.json();
		ricette.value = data.ricette ?? [];
	} catch (err) {
		console.error("Errore fetch storico:", err);
	} finally {
		loading.value = false;
	}
}

function apriRicetta(ricetta) {
	secondTodosStore.recipe = ricetta;
	secondTodosStore.showRecipeModal = true;
}

onMounted(() => {
	auth.onAuthStateChanged((user) => {
		isLoggedIn.value = !!user;
		if (user) fetchStorico();
	});
});

defineExpose({ fetchStorico });
</script>

<template>
	<div class="storico-container" v-if="isLoggedIn">
		<h3 class="storico-title mb-3">📋 5 {{ languages.recipes.latestText }}</h3>

		<div v-if="loading" class="storico-loading">Loading...</div>

		<div v-else-if="ricette.length === 0" class="storico-empty">Nessuna ricetta salvata ancora</div>

		<div v-else class="ricette-list">
			<div v-for="(ricetta, index) in ricette" :key="ricetta.id" class="ricetta-card" @click="apriRicetta(ricetta)">
				<div class="ricetta-info">
					<p class="index">{{ index + 1 }}</p>
					<p class="ricetta-titolo text-danger">{{ ricetta.titolo }}</p>
					<p class="ricetta-titolo">
						<span class="under-pressure text-danger">{{ languages.recipes.ingredients }}:</span>
						{{ ricetta.ingredienti.join(", ") }}
					</p>
					<p class="ricetta-titolo">
						<span class="under-pressure text-danger">{{ languages.recipes.preparation }}:</span>
						{{ ricetta.preparazione }}
					</p>
					<p class="ricetta-meta">{{ ricetta.tempo }} · {{ ricetta.difficolta }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.storico-container {
	padding: 16px;
	margin-top: 12px;
}

.storico-loading,
.storico-empty {
	font-size: 13px;
	color: #9e8e78;
	text-align: center;
	padding: 12px;
}
.ricette-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.ricetta-card {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px;
	background: white;
	border: 1.5px solid #e8e0d0;
	border-radius: 12px;
	cursor: pointer;
	transition: all 0.2s;
}
.ricetta-card:hover {
	border-color: #c8a96e;
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.ricetta-emoji {
	font-size: 28px;
	flex-shrink: 0;
}
.ricetta-info {
	flex: 1;
	min-width: 0;
}
.ricetta-titolo {
	font-size: 13px;
	font-weight: 500;
	color: #1a1208;
	margin: 0 0 4px;
}
.ricetta-meta {
	font-size: 11px;
	color: #9e8e78;
	margin: 0;
}

.index {
	color: #000000;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: bold;
}
</style>
