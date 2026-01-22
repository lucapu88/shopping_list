<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";

const languages = useLanguageStore();
const theme = useThemeStore();
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
	<div
		class="order-container mt-3"
		:class="{
			light: theme.lightTheme,
			dark: theme.darkTheme,
			minimal: theme.minimalTheme,
			retro: theme.retroTheme,
			summer: theme.summerTheme,
			winter: theme.winterTheme,
			elegant: theme.elegantTheme,
			pink: theme.pinkTheme,
			panter: theme.panterTheme,
			lemon: theme.lemonTheme,
			jeans: theme.jeansTheme,
		}"
	>
		<span>{{ languages.loyalityCards.orderText }}: </span>
		<button class="ms-2" @click="changeOrder">
			{{ !azOrder ? "A - Z" : "Z - A" }}
		</button>
	</div>
</template>

<style scoped></style>
