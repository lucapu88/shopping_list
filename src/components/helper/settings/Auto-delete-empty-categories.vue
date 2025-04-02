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
			autoDeleteEmptyCategories: "autoDeleteEmptyCategories",
		};
	},
};
</script>

<template>
	<div class="helper-settings">
		<ListIstructionAccordion
			show-list-instructions-input="autoDeleteEmptyCategories"
			:istructions-text="languages.autoDeleteEmptyCategoriesText.title"
			:select-deselect-arrow="settings.autoDeleteEmptyCategories && settings.section === autoDeleteEmptyCategories"
			:isSettings="true"
		/>
		<template v-if="settings.autoDeleteEmptyCategories && settings.section === autoDeleteEmptyCategories">
			<div class="auto-delete-container mb-3">
				<li class="ms-3">
					<small>{{ languages.autoDeleteEmptyCategoriesText.description }}</small>
					<ToggleTutorialButton :features="autoDeleteEmptyCategories" />
				</li>
				<li class="toggle-delete-confirm-container" id="auto-delete" @click="settings.toggleAutomaticDeleteEmptyCategories()">
					<div class="hand-pointing">&#x1F449;</div>
					<u>{{ languages.autoDeleteEmptyCategoriesText.function }}</u>
					<span class="text-primary ms-2">
						{{ settings.canDeleteEmptyCategoriesText }}
					</span>
				</li>

				<Tutorial v-if="settings.video && settings.feature === autoDeleteEmptyCategories" :features="autoDeleteEmptyCategories" />
			</div>
		</template>
	</div>
</template>
