<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
</script>

<script>
export default {
	props: {
		showListInstructionsInput: String,
		istructionsText: [Object, String],
		selectDeselectArrow: Boolean,
		isSettings: Boolean,
	},
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			troubleshooting: false,
		};
	},
	created() {
		this.troubleshooting = this.showListInstructionsInput === "troubleshooting";
	},
};
</script>

<template>
	<div
		class="list-title"
		:class="{
			'troubleshooting-title': troubleshooting,
			'list-title-selected': selectDeselectArrow,
			'list-title-deselected': !selectDeselectArrow,
			'list-title-color': theme.lightTheme || theme.winterTheme || theme.darkTheme,
			'list-title-summer': theme.summerTheme,
			'list-title-dark': theme.darkTheme,
			'list-title-retro': theme.retroTheme,
			'list-title-dark-selected': selectDeselectArrow && theme.darkTheme,
			'list-title-retro-selected': selectDeselectArrow && theme.retroTheme,
			'list-title-elegant-selected': selectDeselectArrow && theme.elegantTheme,
			'list-title-pink-selected': selectDeselectArrow && theme.pinkTheme,
		}"
		@click="settings.showListInstructions(showListInstructionsInput)"
	>
		<span v-if="isSettings" class="settings-icon me-1"> &#x2699; </span>
		<span v-if="troubleshooting" class="troubleshooting-icon me-1"> ? </span>
		{{ istructionsText }}
		<span
			class="arrow"
			:class="{
				'arrow-selected': selectDeselectArrow,
				'arrow-deselected': !selectDeselectArrow,
				'border-custom': theme.retroTheme,
			}"
		>
			^
		</span>
	</div>
</template>

<style scoped>
.list-title {
	padding: 5px;
	border: 1px solid;
	border-radius: 5px;
	margin-bottom: 5px;
	display: flex;
	justify-content: space-between;
}

.troubleshooting-title {
	color: #008000 !important;
	font-weight: bold !important;
	margin-top: 20px;
}
.troubleshooting-icon {
	border: 2px solid;
	border-radius: 50%;
	padding: 0 5px;
}

.list-title-selected {
	box-shadow: inset 2px 2px 90px -50px rgba(0, 0, 0, 0.85);
}
.list-title-deselected {
	box-shadow: none;
}
.list-title-color {
	background-color: #ededed;
	color: #000000;
}

.list-title-summer {
	background-color: var(--summer-primary-color);
}

.list-title-dark {
	background-color: var(--dark-white);
}
.list-title-dark-selected {
	color: var(--white);
}

.list-title-retro {
	border-radius: 0 !important;
	border: 2px outset;
}
.list-title-retro-selected {
	border: 2px inset;
}

.list-title-elegant-selected {
	color: var(--elegant-text-color);
}
.list-title-pink-selected {
	box-shadow: inset 2px 2px 90px -50px var(--pink-text-color);
}

.arrow {
	width: 1.688rem;
	height: 1.688rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Lucida Console", "Courier New", monospace;
	font-weight: bold;
	border: 2px solid;
	border-radius: 50%;
	font-size: 1.563rem;
	padding-top: 0.625rem;
}
/* .arrow:after {
  content: ' \0245';
} */
.arrow-selected {
	-webkit-animation: spin 0.5s linear;
	-moz-animation: spin 0.5s linear;
	animation: spin 0.5s linear;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
}
@keyframes spin {
	100% {
		-webkit-transform: rotate(-180deg);
		transform: rotate(-180deg);
	}
}

.arrow-deselected {
	-webkit-animation: reverseSpin 0.5s linear;
	-moz-animation: reverseSpin 0.5s linear;
	animation: reverseSpin 0.5s linear;
}
@keyframes reverseSpin {
	from {
		-webkit-transform: rotate(-180deg);
		transform: rotate(-180deg);
	}
	to {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}
.border-custom {
	border: 1px solid;
}
</style>
