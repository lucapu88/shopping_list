<script setup>
// QUESTO COMPONENTE NON VA IN PRODUZIONE, SERVE SOLO PER ESERCITARSI CON LANGCHAIN E LO USO SOLO IO SUL MIO IPHONE
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { defineProps } from "vue";

const props = defineProps({
	openModal: {
		type: Boolean,
		// required: true,
	},
});
const emit = defineEmits(["update:openModal"]);

const secondTodosStore = useSecondTodoStore();

function closeModal() {
	emit("update:openModal", false);
}
</script>

<template>
	<div class="modal">
		<div class="recipe-container">
			<button class="close-modal" @click="closeModal">X</button>
			<h2>{{ secondTodosStore.recipe.titolo }}</h2>
			<p v-if="secondTodosStore.recipe.ingredienti && secondTodosStore.recipe.ingredienti.length"><span style="color: red">Ingredienti:</span> {{ secondTodosStore.recipe.ingredienti.join(", ") }}</p>
			<p v-if="secondTodosStore.recipe.preparazione"><span style="color: red">Preparazione:</span> {{ secondTodosStore.recipe.preparazione }}</p>
			<p v-if="secondTodosStore.recipe.tempo"><span style="color: red">Tempo:</span> {{ secondTodosStore.recipe.tempo }}</p>
			<p v-if="secondTodosStore.recipe.difficoltà"><span style="color: red">Difficoltà:</span> {{ secondTodosStore.recipe.difficoltà }}</p>
		</div>
	</div>
</template>

<style scoped>
.modal {
	padding-top: 20%;
}
.recipe-container {
	background-color: white;
	margin: 0 20px;
	padding: 10px;
}
.close-modal {
	float: right;
	background: none;
	border: none;
	font-size: 20px;
	cursor: pointer;
}
</style>
