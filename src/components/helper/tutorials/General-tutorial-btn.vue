<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
</script>

<script>
export default {
	props: {
		readOnly: Boolean,
	},
	data() {
		return {
			theme: useThemeStore(),
			settings: useSettingsStore(),
			languages: useLanguageStore(),
		};
	},
	methods: {
		showGeneralTutorialModal() {
			if (!this.readOnly) {
				this.settings.isTutorialVisible = true;
			}
		},
	},
};
</script>

<template>
	<div
		class="gt-btn-container"
		:class="{
			'read-only': readOnly,
			'ita-right': languages.langIta,
			'right-10': theme.jeansTheme,
		}"
		@click="showGeneralTutorialModal()"
	>
		<span
			:class="{
				light: theme.lightTheme,
				dark: theme.darkTheme,
				minimal: theme.minimalTheme,
				retro: theme.retroTheme,
				elegant: theme.elegantTheme,
				pink: theme.pinkTheme,
				panter: theme.panterTheme,
				lemon: theme.lemonTheme,
				jeans: theme.jeansTheme,
			}"
			>?</span
		>
	</div>
</template>

<style scoped>
.gt-btn-container {
	position: absolute;
	top: 3px;
	right: 13%;
	width: 70px;
	text-align: center;
	color: #d20000;
}

.gt-btn-container > span {
	border: 2px solid;
	border-radius: 50%;
	padding: 3px 5px 1px;
	font-family: "Lucida Console", "Courier New", monospace;
	font-weight: bold;
	font-size: 1.125rem;
}

.read-only {
	position: relative;
	width: 25px;
	display: inline;
	right: 0 !important;
}

.right-10 {
	right: 10%;
}
</style>
