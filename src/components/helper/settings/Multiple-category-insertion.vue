<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useThemeStore } from "@/store/ThemeStore";
import Tutorial from "../tutorials/Tutorial.vue";
import ToggleTutorialButton from "../tutorials/ToggleTutorialButton.vue";
import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
</script>

<script>
export default {
	data() {
		return {
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			theme: useThemeStore(),
			multipleCategoryInsertion: "multipleCategoryInsertion",
		};
	},
};
</script>

<template>
	<div class="helper-settings">
		<ListIstructionAccordion
			show-list-instructions-input="multipleCategoryInsertion"
			:istructions-text="languages.multipleCategoryInsertionText.title"
			:select-deselect-arrow="settings.multipleCategoryInsertion && settings.section === multipleCategoryInsertion"
			:isSettings="true"
		/>
		<template v-if="settings.multipleCategoryInsertion && settings.section === multipleCategoryInsertion">
			<div class="auto-delete-container mb-3">
				<li class="ms-3">
					<small>{{ languages.multipleCategoryInsertionText.description }}</small>
					<br />
					<small>{{ languages.multipleCategoryInsertionText.momentaryAlert }}</small>
					<ToggleTutorialButton :features="multipleCategoryInsertion" />
				</li>
				<li class="toggle-delete-confirm-container" id="auto-delete" @click="settings.toggleMultipleCategoryInsertion()">
					<div class="hand-pointing">&#x1F449;</div>
					<u>{{ languages.multipleCategoryInsertionText.function }}</u>
					<span class="text-primary ms-2">
						{{ settings.canMultipleCategoryInsertionText }}
					</span>
				</li>

				<Tutorial v-if="settings.video && settings.feature === multipleCategoryInsertion" :features="multipleCategoryInsertion" />
			</div>
		</template>
	</div>
</template>
