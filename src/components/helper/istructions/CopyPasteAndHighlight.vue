<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useLanguageStore } from "@/store/LanguageStore";
import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
import Tutorial from "../tutorials/Tutorial.vue";
import ToggleTutorialButton from "../tutorials/ToggleTutorialButton.vue";
import CustomButton from "../../common/Custom-button.vue";
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
			<CustomButton extra-classes="show-pop-up-panel-btn">
				<span class="arrow"> ^ </span>
			</CustomButton>
			{{ languages.helperDescription.openSecondPanelText }}
		</li>
		<li>
			<button
				class="btn pop-up-btn"
				:class="{
					'minimal-btn': theme.minimalTheme,
					'retro-teme-btns': theme.retroTheme,
					'summer-header-btn': theme.summerTheme,
					'winter-btn': theme.winterTheme,
					'elegant-btn': theme.elegantTheme,
					'pink-theme-btn': theme.pinkTheme,
					'panter-btn': theme.panterTheme,
					'lemon-other-btn': theme.lemonTheme,
					'jeans-other-btn': theme.jeansTheme,
				}"
			>
				<img v-if="!theme.elegantTheme && !theme.panterTheme" class="copy" src="@/img/icons/copy.webp" alt="copy" />
				<img v-if="theme.elegantTheme && !theme.panterTheme" class="copy" src="@/img/icons/copy-elegant.webp" alt="copy" />
				<img v-if="!theme.elegantTheme && theme.panterTheme" class="copy" src="@/img/icons/copy-panter.webp" alt="copy" />

				<span>{{ languages.copyListBtnText }}</span>
			</button>
			{{ languages.helperDescription.copyListText }}
		</li>
		<li>
			{{ languages.helperDescription.highlightImportant.part1 }}
			<span class="active"> {{ languages.helperDescription.highlightImportant.part2 }}, </span>
			{{ languages.helperDescription.highlightImportant.part3 }}
		</li>
		<li>
			{{ languages.importantTodos.text.part1 }}:
			<button
				class="btn pop-up-btn"
				:class="{
					'minimal-btn': theme.minimalTheme,
					'retro-teme-btns': theme.retroTheme,
					'summer-header-btn': theme.summerTheme,
					'winter-btn': theme.winterTheme,
					'elegant-btn': theme.elegantTheme,
					'pink-theme-btn': theme.pinkTheme,
					'panter-btn': theme.panterTheme,
					'lemon-other-btn': theme.lemonTheme,
					'jeans-other-btn': theme.jeansTheme,
				}"
			>
				<img v-if="!theme.elegantTheme && !theme.panterTheme" class="important" src="@/img/icons/important.webp" alt="important" />
				<img v-if="theme.elegantTheme && !theme.panterTheme" class="important" src="@/img/icons/important-elegant.webp" alt="important" />
				<img v-if="!theme.elegantTheme && theme.panterTheme" class="important" src="@/img/icons/important-panter.webp" alt="important" />

				<span>{{ languages.importantBtnText }}</span>
			</button>
			{{ languages.importantTodos.text.part2 }}
		</li>

		<ToggleTutorialButton :features="copyPaste" :margin="true" />
		<Tutorial v-if="settings.video && settings.feature === copyPaste" :features="copyPaste" />
	</ul>
</template>
