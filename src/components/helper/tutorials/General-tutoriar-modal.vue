<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import GeneralTutorialBtn from "./General-tutorial-btn.vue";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			showVideo: false,
		};
	},
	methods: {
		playTutorial() {
			this.showVideo = true;

			this.$nextTick(() => {
				const videoPlayer = this.$refs.videoRef;
				videoPlayer.play();
			});
			window.localStorage.setItem("tutorialWatched", true);
		},
		closeTutorial() {
			this.settings.isTutorialVisible = false;
			window.localStorage.setItem("tutorialWatched", true);
		},
	},
};
</script>

<template>
	<div class="modal">
		<div class="empty-div" @click="closeTutorial()"></div>
		<div
			class="modal-content"
			:class="{
				'container-light': theme.lightTheme,
				'container-dark': theme.darkTheme,
				'container-minimal': theme.minimalTheme,
				'container-retro': theme.retroTheme,
				'container-summer': theme.summerTheme,
				'container-winter': theme.winterTheme,
				'container-elegant': theme.elegantTheme,
				'container-pink': theme.pinkTheme,
				'container-panter': theme.panterTheme,
				'container-lemon': theme.lemonTheme,
				'container-jeans': theme.jeansTheme,
				video: showVideo,
			}"
		>
			<h2 v-if="showVideo" class="close-tutorial" @click="settings.isTutorialVisible = false">X</h2>

			<video v-if="showVideo" ref="videoRef" class="video-container" poster="@/img/favicon.png" controls>
				<source src="@/video/general-tutorial.mp4" type="video/mp4" />
			</video>

			<div v-if="!showVideo" class="confirm-alert">
				<p>{{ languages.generalTutorial.title }}</p>
				<p>{{ languages.generalTutorial.subtitle }} <GeneralTutorialBtn :read-only="true" /></p>

				<button class="btn btn-primary me-4" :class="{ 'pink-theme-btn': theme.pinkTheme }" @click="playTutorial()">
					<span v-if="languages.langIta || languages.langSpanish">SI</span>
					<span v-if="languages.langEnglish">YES</span>
				</button>
				<button class="btn btn-secondary" :class="{ 'pink-theme-btn-secondary': theme.pinkTheme }" @click="closeTutorial()">NO</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.empty-div {
	height: 100%;
	position: absolute;
	top: 0;
	width: 100%;
}
.modal-content {
	position: absolute;
	padding: 10px;
	border-radius: 10px;
	width: 96%;
	min-height: 230px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow-y: auto;
	overflow-x: hidden;
	animation: modalEnter 0.8s ease forwards;
	left: 2%;
	top: 25%;
}
.video {
	top: 5%;
	height: 90%;
}
.close-tutorial {
	align-self: end;
}
.video-container {
	position: relative;
	width: 100%;
	height: 100%;
}
.confirm-alert {
	position: absolute;
	border: none !important;
}

.btn {
	width: 50px;
}
</style>
