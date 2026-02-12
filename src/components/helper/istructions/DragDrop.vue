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
			dragNdrop: "dragNdrop",
		};
	},
};
</script>

<template>
	<ListIstructionAccordion show-list-instructions-input="dragNdrop" :istructions-text="languages.helperDescription.dragNdropTitle" :select-deselect-arrow="settings.dragNdrop && settings.section === dragNdrop" />
	<ul class="helper-list" v-if="settings.dragNdrop && settings.section === dragNdrop">
		<li>
			{{ languages.helperDescription.dragNdropText.part1 }}
			<CustomButton>
				<img v-if="!theme.elegantTheme && !theme.panterTheme" src="@/img/icons/drag-and-drop.webp" alt="move" />
				<img v-if="theme.elegantTheme && !theme.panterTheme" src="@/img/icons/drag-and-drop-elegant.webp" alt="move" />
				<img v-if="!theme.elegantTheme && theme.panterTheme" src="@/img/icons/drag-and-drop-panter.webp" alt="move" />
			</CustomButton>
			{{ languages.helperDescription.dragNdropText.part2 }} <br />
		</li>

		<ToggleTutorialButton :features="dragNdrop" :margin="true" />
		<Tutorial v-if="settings.video && settings.feature === dragNdrop" :features="dragNdrop" />
	</ul>
</template>
