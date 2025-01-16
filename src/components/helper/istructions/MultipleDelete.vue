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
			multipleDelete: "multipleDelete",
			selectAndDelete: "selectAndDelete",
		};
	},
};
</script>

<template>
	<ListIstructionAccordion show-list-instructions-input="selectAndDelete" :istructions-text="languages.helperDescription.multipleDeleteTitle" :select-deselect-arrow="settings.selectAndDelete && settings.section === selectAndDelete" />
	<ul class="helper-list" v-if="settings.selectAndDelete && settings.section === selectAndDelete">
		<li>
			{{ languages.helperDescription.multipleDeleteText.part1 }}
			<span class="cart">
				<strong class="galeazzi" v-if="theme.elegantTheme"> > </strong>
			</span>
			<div
				class="checkbox mettiti-in-riga-cazzo"
				:class="{
					'light-checkbox': theme.lightTheme,
					'retro-checkbox': theme.retroTheme,
					'summer-checked': theme.summerTheme,
					'pink-checkbox pink-theme-btn': theme.pinkTheme,
				}"
				v-if="!theme.elegantTheme"
			>
				<img class="checkbox-img" src="@/img/icons/checked.webp" alt="checked" />
			</div>
			{{ languages.helperDescription.multipleDeleteText.part2 }}
			<button class="text-danger border-danger rounded" :class="{ 'elegant-btn': theme.elegantTheme }">
				<img class="trash" src="@/img/icons/trash-red.webp" alt="delete" />
			</button>
			{{ languages.helperDescription.multipleDeleteText.part3 }}
		</li>

		<li>
			{{ languages.helperDescription.multipleDeleteText.deselectAllText }}
			<button class="text-danger border-danger deselect-all p-2" :class="{ 'elegant-btn': theme.elegantTheme }">
				{{ languages.deselectAllText }}
			</button>
			{{ languages.helperDescription.multipleDeleteText.confirmDeselectAllText }}
			<div
				style="width: 110px"
				class="confirm-deselect-all-container deselect-all p-2"
				:class="{
					'multiple-delete': multipleDelete,
					light: theme.lightTheme,
					dark: theme.darkTheme,
					minimal: theme.minimalTheme,
					retro: theme.retroTheme,
					summer: theme.summerTheme,
					winter: theme.winterTheme,
					elegant: theme.elegantTheme,
					pink: theme.pinkTheme,
					panter: theme.panterTheme,
				}"
			>
				<button class="btn btn-success rounded btn-sm confirm-undo-button">
					<img class="confirm-deselect-all" src="@/img/icons/ok.webp" alt="ok" />
				</button>

				<button class="btn btn-danger rounded btn-sm confirm-undo-button">
					<img class="undo" src="@/img/icons/close.webp" alt="X" />
				</button>
			</div>
		</li>

		<ToggleTutorialButton :features="multipleDelete" :margin="true" />
		<Tutorial v-if="settings.video && settings.feature === multipleDelete" :features="multipleDelete" />
	</ul>
</template>

<style scoped>
.cart {
	width: 28px;
	height: 24px;
}
</style>
