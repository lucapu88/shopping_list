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
		<div
			class="error-message-container"
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
			<p class="text-center text-danger bg-light">{{ languages.loyalityCards.errorMessage }}</p>
			<button class="refresh-btn" :class="{ 'arrotonda-sto-bordo': !theme.retroTheme }" @click="refresh">
				<!-- <span>{{ String.fromCodePoint(0x1f504) }}</span> -->
				{{ languages.refreshText }}
			</button>
		</div>
	</template>
</template>

<style scoped>
.error-message-container {
	background-image: url("@/img/loyalty-cards/oh-no.webp");
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 100;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	background-repeat: no-repeat;
	background-size: contain;
}
.refresh-btn {
	font-size: 1.875rem;
	padding: 0 15px;
}
p {
	margin-top: 25%;
}
</style>
