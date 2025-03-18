<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
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
			copyPaste: "copyPaste",
			copyHighlights: "copyHighlights",
		};
	},
};
</script>

<template>
	<ListIstructionAccordion show-list-instructions-input="copyHighlights" :istructions-text="languages.helperDescription.copyListTitle" :select-deselect-arrow="settings.copyHighlights && settings.section === copyHighlights" />
	<ul class="helper-list" v-if="settings.copyHighlights && settings.section === copyHighlights">
		<li>
			<span
				class="btn helper-btn-size"
				:class="{
					'custom-show-listbtn': theme.lightTheme || theme.darkTheme,
					'minimal-helper-btn': theme.minimalTheme,
					'retro-teme-btns': theme.retroTheme,
					'elegant-helper-btn': theme.elegantTheme,
					'category-summer': theme.summerTheme,
					'category-winter': theme.winterTheme,
					'category-pink': theme.pinkTheme,
					'panter-other-btn': theme.panterTheme,
					'lemon-other-btn': theme.lemonTheme,
				}"
			>
				<img v-if="!theme.elegantTheme" class="copy" src="@/img/icons/copy.webp" alt="copy" />
				<img v-if="theme.elegantTheme" class="copy" src="@/img/icons/copy-elegant.webp" alt="copy" />
			</span>
			{{ languages.helperDescription.copyListText }}
		</li>
		<li>
			{{ languages.helperDescription.highlightImportant.part1 }}
			<span class="active"> {{ languages.helperDescription.highlightImportant.part2 }}, </span>
			{{ languages.helperDescription.highlightImportant.part3 }}
		</li>
		<li>
			{{ languages.importantTodos.text.part1 }}
			<button
				class="btn helper-btn-size"
				:class="{
					'custom-show-listbtn': theme.lightTheme || theme.darkTheme,
					'minimal-helper-btn': theme.minimalTheme,
					'retro-teme-btns': theme.retroTheme,
					'elegant-helper-btn': theme.elegantTheme,
					'category-summer': theme.summerTheme,
					'category-winter': theme.winterTheme,
					'category-pink': theme.pinkTheme,
					'panter-other-btn': theme.panterTheme,
					'lemon-other-btn': theme.lemonTheme,
				}"
			>
				<img v-if="!theme.elegantTheme" class="important" src="@/img/icons/important.webp" alt="important" />
				<img v-if="theme.elegantTheme" class="important" src="@/img/icons/important-elegant.webp" alt="important" />
			</button>
			{{ languages.importantTodos.text.part2 }}
		</li>

		<ToggleTutorialButton :features="copyPaste" :margin="true" />
		<Tutorial v-if="settings.video && settings.feature === copyPaste" :features="copyPaste" />
	</ul>
</template>
