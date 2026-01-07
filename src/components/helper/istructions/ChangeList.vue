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
			changeList: "changeList",
		};
	},
};
</script>

<template>
	<ListIstructionAccordion show-list-instructions-input="changeList" :istructions-text="languages.helperDescription.changeList.changeListTitle" :select-deselect-arrow="settings.changeList && settings.section === changeList" />
	<ul class="helper-list" v-if="settings.changeList && settings.section === changeList">
		<li>
			{{ languages.helperDescription.changeList.part1 }}:
			<button
				class="btn custom-show-listbtn"
				:class="{
					'minimal-btn': theme.minimalTheme,
					'retro-teme-btns': theme.retroTheme,
					'summer-header-btn': theme.summerTheme,
					'winter-header-btn': theme.winterTheme,
					'elegant-btn': theme.elegantTheme,
					'pink-theme-btn': theme.pinkTheme,
					'panter-other-btn': theme.panterTheme,
					'lemon-other-btn': theme.lemonTheme,
					'jeans-other-btn': theme.jeansTheme,
				}"
			>
				<img v-if="!theme.elegantTheme && !theme.panterTheme" class="show-lists-img" src="@/img/icons/show-lists.webp" alt="show_lists" />
				<img v-if="theme.elegantTheme && !theme.panterTheme" class="show-lists-img" src="@/img/icons/show-lists-elegant.webp" alt="show_lists" />
				<img v-if="!theme.elegantTheme && theme.panterTheme" class="show-lists-img" src="@/img/icons/show-lists-panter.webp" alt="show_lists" />
			</button>
			<br />
			{{ languages.helperDescription.changeList.part2 }}:
			<img class="img-list" src="@/img/lists-container.webp" alt="lists_container" />
		</li>
		<li>
			{{ languages.helperDescription.changeList.moveText }}:
			<button class="move-elements-btn">
				<img class="move-img" src="@/img/icons/move.webp" alt="move" />
				{{ languages.moveMode.moveElementText }}
			</button>

			{{ languages.helperDescription.changeList.copyText }}:
			<button class="copy-elements-btn">
				<img class="copy-img" src="@/img/icons/copy-el.webp" alt="copy" />
				{{ languages.moveMode.copyElementText }}
			</button>
			<br />
			{{ languages.helperDescription.changeList.final }}
		</li>

		<ToggleTutorialButton :features="changeList" :margin="true" />
		<Tutorial v-if="settings.video && settings.feature === changeList" :features="changeList" />
	</ul>
</template>

<style scoped>
.custom-show-listbtn {
	background-color: rgba(192, 224, 133, 0.883);
	border: 2px solid rgb(180, 230, 89);
	border-radius: 10%;
	padding: 2px;
	min-width: 30px;
	width: 40px;
}
.custom-show-listbtn > img {
	width: 25px;
}

.img-list {
	width: 90%;
	display: block;
}
</style>
