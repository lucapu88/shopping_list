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
			addEditDelete: "addEditDelete",
		};
	},
};
</script>

<template>
	<ListIstructionAccordion show-list-instructions-input="addEditDelete" :istructions-text="languages.helperDescription.addEditDelete" :select-deselect-arrow="settings.addEditDelete && settings.section === addEditDelete" />
	<ul class="helper-list" v-if="settings.addEditDelete && settings.section === addEditDelete">
		<li>
			<img v-if="!theme.lemonTheme && !theme.minimalTheme" class="btn btn-info helper-icon" :class="{ 'elegant-btn elegant-border': theme.elegantTheme }" src="@/img/icons/paper-plane.webp" alt="paper-plane" />
			<img v-if="theme.lemonTheme" class="btn btn-info helper-icon" :class="{ 'elegant-btn elegant-border': theme.elegantTheme }" src="@/img/lemon-send.webp" alt="paper-plane" />
			<button class="btn btn-info minimal-send-btn" v-if="theme.minimalTheme">
				<img v-if="theme.minimalTheme" class="plane" src="@/img/icons/paper-plane-minimal.webp" alt="paper-plane" />
			</button>
			{{ languages.helperDescription.add }}
		</li>
		<li>
			{{ languages.priceText }}
		</li>
		<li>
			<div
				class="d-inline"
				:class="{
					'minimal-btn': theme.minimalTheme,
					'retro-btn': theme.retroTheme,
					'elegant-btn': theme.elegantTheme,
					transparent: theme.elegantTheme,
				}"
			>
				<button
					class="btn btn-primary rounded-circle btn-sm"
					:class="{
						'dark-btn-secondary': theme.darkTheme,
						'pink-theme-btn-secondary': theme.pinkTheme,
						'panter-btn-dark': theme.panterTheme,
						'panter-border': theme.panterTheme,
					}"
				>
					<img v-if="theme.minimalTheme" class="pencil" src="@/img/icons/pencil-minimal.webp" alt="modify" />
					<img v-else class="pencil" src="@/img/icons/pencil.webp" alt="modify" />
				</button>
			</div>
			{{ languages.helperDescription.edit }}
			<div
				class="d-inline"
				:class="{
					'minimal-btn': theme.minimalTheme,
					'retro-btn': theme.retroTheme,
					'elegant-btn': theme.elegantTheme,
					transparent: theme.elegantTheme,
				}"
			>
				<button class="btn btn-success rounded-circle btn-sm" :class="{ 'dark-btn-secondary': theme.darkTheme }">
					<img v-if="theme.minimalTheme" class="floppy" src="@/img/icons/floppy-minimal.webp" alt="save" />
					<img v-else class="floppy" src="@/img/icons/floppy.webp" alt="save" />
				</button>
			</div>
			.
		</li>
		<li>
			<div
				class="d-inline"
				:class="{
					'minimal-btn': theme.minimalTheme,
					'retro-btn': theme.retroTheme,
					'elegant-btn': theme.elegantTheme,
					transparent: theme.elegantTheme,
				}"
			>
				<button
					class="btn btn-primary rounded-circle btn-sm"
					:class="{
						'dark-btn-secondary': theme.darkTheme,
						'pink-theme-btn-secondary': theme.pinkTheme,
						'panter-btn-dark': theme.panterTheme,
						'panter-border': theme.panterTheme,
					}"
				>
					<img v-if="theme.minimalTheme" class="trash" src="@/img/icons/trash-minimal.webp" alt="delete" />
					<img v-else class="trash" src="@/img/icons/trash.webp" alt="delete" />
				</button>
			</div>
			{{ languages.helperDescription.delete }}
		</li>
		<li>
			<button
				class="btn btn-back-to-top p-1 me-1"
				:class="{
					'btn-outline-info': theme.lightTheme,
					'dark-btn-secondary': theme.darkTheme,
					'minimal-theme-back-top': theme.minimalTheme,
					'dark-theme-back-top': theme.darkTheme,
					'retro-theme-back-top': theme.retroTheme,
					'summer-theme-back-top': theme.summerTheme,
					'winter-theme-back-top': theme.winterTheme,
					'elegant-theme-back-top': theme.elegantTheme,
					'pink-theme-btn': theme.pinkTheme,
					'panter-theme-back-top': theme.panterTheme,
				}"
			>
				<span> >> </span>
			</button>
			{{ languages.helperDescription.backToTop }}
		</li>

		<ToggleTutorialButton :features="addEditDelete" :margin="true" />
		<Tutorial v-if="settings.video && settings.feature === addEditDelete" :features="addEditDelete" />
	</ul>
</template>
