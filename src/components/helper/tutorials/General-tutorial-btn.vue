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
			themes: useThemeStore(),
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
		class="btn-container"
		:class="{
			'read-only': readOnly,
			'ita-right': languages.langIta,
			'right-10': themes.jeansTheme,
		}"
		@click="showGeneralTutorialModal()"
	>
		<span>?</span>
	</div>
</template>

<style scoped>
.btn-container {
	position: absolute;
	top: 2%;
	right: 13%;
	width: 70px;
	text-align: center;
	color: #d20000;
}

.btn-container > span {
	border: 2px solid;
	border-radius: 50%;
	padding: 0px 5px;
	font-weight: bold;
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
