<script setup>
import { useSettingsStore } from "@/store/SettingsStore";
import { useThemeStore } from "@/store/ThemeStore";
</script>

<script>
export default {
	props: {
		features: String,
		margin: Boolean,
	},
	data() {
		return {
			settings: useSettingsStore(),
			theme: useThemeStore(),
		};
	},
};
</script>
<template>
	<div class="align-right">
		<button
			class="tutorial-btn"
			:class="{
				'retro-tutorial-btn': theme.retroTheme,
				'tutorial-selected': settings.video && features === settings.feature,
				'mb-3': margin,
			}"
			@click="settings.toggleTutorial(features)"
		>
			<small>Tutorial </small>
			<img src="@/img/icons/video-logo.webp" alt="video_tutorial" />
		</button>
	</div>
</template>

<style scoped>
.block {
	display: inline-block;
}
.tutorial-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	color: #000000 !important;
	font-weight: bold;
	margin-left: 0.3125rem;
	margin-bottom: 0.3125rem;
	padding: 3px 8px 3px 8px;
}

.align-right {
	display: flex;
	justify-content: flex-end;
}
.tutorial-btn > img {
	width: 25px;
}

.tutorial-selected {
	background-color: #a9a9a9;
}
</style>
