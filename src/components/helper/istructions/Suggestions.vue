<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useChristmasStore } from "@/store/ChristmasStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useLanguageStore } from "@/store/LanguageStore";
import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
import Tutorial from "../tutorials/Tutorial.vue";
import ToggleTutorialButton from "../tutorials/ToggleTutorialButton.vue";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			isChristmas: useChristmasStore(),
			settings: useSettingsStore(),
			languages: useLanguageStore(),
			suggestions: "suggestions",
		};
	},
};
</script>

<template>
	<ListIstructionAccordion show-list-instructions-input="suggestions" :istructions-text="languages.helperDescription.suggestionsTitle" :select-deselect-arrow="settings.suggestions && settings.section === suggestions" />
	<ul class="helper-list" v-if="settings.suggestions && settings.section === suggestions">
		<li>
			{{ languages.helperDescription.suggestions.part1 }}:
			<button
				class="tips-btn"
				:class="{
					'tips-btn-light': theme.lightTheme,
					'tips-btn-dark': theme.darkTheme,
					'tips-btn-minimal': theme.minimalTheme,
					'tips-btn-retro': theme.retroTheme,
					'tips-btn-summer': theme.summerTheme,
					'tips-btn-winter': theme.winterTheme,
					'tips-btn-elegant': theme.elegantTheme,
					'tips-btn-pink': theme.pinkTheme,
					'tips-btn-lemon': theme.lemonTheme,
				}"
			>
				<span class="tips-text">
					{{ languages.suggestions.tipsBtnText }}
				</span>
			</button>
			<br />
			{{ languages.helperDescription.suggestions.part2 }}
		</li>
		<ToggleTutorialButton :features="suggestions" :margin="true" />
		<Tutorial v-if="settings.video && settings.feature === suggestions" :features="suggestions" />
	</ul>
</template>
