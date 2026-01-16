<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useLanguageStore } from "@/store/LanguageStore";

const theme = useThemeStore();
const languages = useLanguageStore();
const props = defineProps({
	errorLoading: Boolean,
});

function refresh() {
	window.location.reload();
}
</script>

<template>
	<template v-if="errorLoading">
		<p class="text-center text-danger bg-light">{{ languages.loyalityCards.errorMessage }}</p>
		<button class="refresh-btn" :class="{ 'arrotonda-sto-bordo': !theme.retroTheme }" @click="refresh">
			<!-- <span>{{ String.fromCodePoint(0x1f504) }}</span> -->
			{{ languages.refreshText }}
		</button>
	</template>
</template>

<style scoped>
.refresh-btn {
	font-size: 1.875rem;
	padding: 0 15px;
}
</style>
