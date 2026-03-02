<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import ConfirmButtonsContainer from "../common/Confirm-buttons-container.vue";

const theme = useThemeStore();
const languages = useLanguageStore();
const settings = useSettingsStore();

function goToDownload() {
	window.open("https://play.google.com/store/apps/details?id=io.kodular.caputoluca88.Shopping_List", "_blank");
}
</script>

<template>
	<div class="modal">
		<div
			class="modal-container text-center p-3 mx-auto"
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
			<h2 class="text-danger">{{ languages.downloadAppText }}:</h2>

			<ConfirmButtonsContainer @yesSelected="goToDownload()" @noSelected="settings.isAndroidBrowser = false" />
		</div>
	</div>
</template>

<style scoped>
.modal {
	z-index: 800;
	padding-top: 25%;
}

.modal-container {
	width: 90%;
	max-width: 600px;
}
</style>
