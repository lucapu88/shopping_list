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
			toggleCategoriesModal: "toggleCategoriesModal",
		};
	},
};
</script>

<template>
	<div class="helper-settings">
		<ListIstructionAccordion
			show-list-instructions-input="toggleCategoriesModal"
			:istructions-text="languages.toggleCategoriesModalText.title"
			:select-deselect-arrow="settings.toggleCategoriesModal && settings.section === toggleCategoriesModal"
			:isSettings="true"
		/>
		<template v-if="settings.toggleCategoriesModal && settings.section === toggleCategoriesModal">
			<div class="auto-delete-container mb-3">
				<li class="ms-3">
					<small>{{ languages.toggleCategoriesModalText.description }}</small>
					<ToggleTutorialButton :features="toggleCategoriesModal" />
				</li>
				<li class="toggle-delete-confirm-container" id="auto-delete" @click="settings.setShowHideCategoriesModal()">
					<div class="hand-pointing">&#x1F449;</div>
					<u>{{ languages.autoDeleteEmptyCategoriesText.function }}</u>
					<span class="text-primary ms-2">
						{{ settings.canShowCategoriesModalText }}
					</span>
				</li>

				<Tutorial v-if="settings.video && settings.feature === toggleCategoriesModal" :features="toggleCategoriesModal" />
			</div>
		</template>
	</div>
</template>
