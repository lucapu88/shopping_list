<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useLanguageStore } from "@/store/LanguageStore";

const theme = useThemeStore();
const languages = useLanguageStore();
const props = defineProps({
	showInfo: Boolean,
});
</script>

<template>
	<template v-if="showInfo">
		<div
			class="info-container p-3 text-center"
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
			<small>{{ languages.loyalityCards.infoText }}</small>
			<br />
			<small>{{ languages.loyalityCards.infoSubText }}</small>
		</div>
	</template>
</template>

<style scoped>
.info-container {
	border: 1px solid;
}
</style>
