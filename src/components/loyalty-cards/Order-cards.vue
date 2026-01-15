<script setup>
import { useLanguageStore } from "@/store/LanguageStore";

const languages = useLanguageStore();
const props = defineProps({
	azOrder: Boolean,
});
const emit = defineEmits(["changeOrder"]);

function changeOrder() {
	emit("changeOrder");
}
</script>

<template>
	<!-- TODO idee future: aggiungi anche ordinamento crescente/decrescente in base all'ordine di salvataggio -->
	<div class="order-container mt-3">
		<span>{{ languages.loyalityCards.orderText }}: </span>
		<button class="ms-2" @click="changeOrder">
			{{ !azOrder ? "A - Z" : "Z - A" }}
		</button>
	</div>
</template>

<style scoped></style>
