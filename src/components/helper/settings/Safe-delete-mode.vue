<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useThemeStore } from "@/store/ThemeStore";
import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
import Tutorial from "../tutorials/Tutorial.vue";
import ToggleTutorialButton from "../tutorials/ToggleTutorialButton.vue";
</script>

<script>
export default {
	data() {
		return {
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			theme: useThemeStore(),
			safeDelete: "safeDelete",
			safeMode: "safeMode",
		};
	},
};
</script>

<template>
	<div class="helper-settings">
		<ListIstructionAccordion show-list-instructions-input="safeMode" :istructions-text="languages.safeModeText.title" :select-deselect-arrow="settings.safeMode && settings.section === safeMode" :isSettings="true" />
		<template v-if="settings.safeMode && settings.section === safeMode">
			<div class="safe-delete-container mb-3">
				<li class="ms-3">
					<small>{{ languages.safeModeText.description }}</small>
					<ToggleTutorialButton :features="safeDelete" />
				</li>
				<div class="toggle-delete-confirm-container" id="safe-delete" @click="settings.toggleDeleteConfirm()">
					<span class="hand-pointing"> &#x1F449; </span>
					<u>{{ languages.safeModeText.function }}</u>
					<span class="text-primary ms-2">{{ settings.canDeleteText }}</span>
				</div>

				<Tutorial v-if="settings.video && settings.feature === safeDelete" :features="safeDelete" />
			</div>
		</template>
	</div>
</template>
