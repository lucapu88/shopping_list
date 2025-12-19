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
			generalTutorial: {
				title: "Do you want to see a short video tutorial?",
				subtitle: "You can always review it \n whenever you want by clicking on =>",
				istruction: "To change the language for the entire app, click (top right) on >",
			},
			selectedEng: false,
			selectedSpa: false,
			selectedIta: false,
		};
	},
	created() {
		if (this.languages.langIta) {
			this.italian();
		} else if (this.languages.langSpanish) {
			this.spanish();
		} else {
			this.english();
		}
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
		english() {
			this.selectedEng = true;
			this.selectedSpa = false;
			this.selectedIta = false;

			this.generalTutorial.title = "Do you want to see a short video tutorial?";
			this.generalTutorial.subtitle = "You can always review it \n whenever you want by clicking on =>";
			this.generalTutorial.istruction = "To change the language for the entire app, click (top right) on >";
		},
		italian() {
			this.selectedEng = false;
			this.selectedSpa = false;
			this.selectedIta = true;

			this.generalTutorial.title = "vuoi vedere un breve video tutorial?";
			this.generalTutorial.subtitle = "puoi sempre rivederlo \n quando vuoi cliccando su =>";
			this.generalTutorial.istruction = "Per cambiare lingua a tutta l'app clicca (in alto a destra) su >";
		},
		spanish() {
			this.selectedEng = false;
			this.selectedSpa = true;
			this.selectedIta = false;

			this.generalTutorial.title = "¿Quieres ver un breve vídeo tutorial?";
			this.generalTutorial.subtitle = "Siempre puedes revisarlo cuando quieras \n haciendo clic en =>";
			this.generalTutorial.istruction = "Para cambiar el idioma de toda la aplicación, haga clic (arriba a la derecha) en >";
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
				<div class="welcome-container mb-3">
					<p class="welcome-text text-danger m-1">
						<small>Thank you for downloading Shopping List, and welcome!</small>
					</p>
					<p class="welcome-text text-danger m-1">
						<small>Gracias por descargar Lista de Compras, ¡y bienvenido!</small>
					</p>
					<p class="welcome-text text-danger m-1">
						<small>Grazie per aver scaricato Shopping List, e benvenuto!</small>
					</p>
				</div>
				<div class="languages-selection">
					<span @click="english()"><img class="flag" :class="{ 'selected-flag': selectedEng }" src="@/img/flags/inglese.webp" alt="english_flag" /></span>

					<span @click="spanish()"><img class="flag" :class="{ 'selected-flag': selectedSpa }" src="@/img/flags/spagnolo.webp" alt="spanish_flag" /></span>

					<span @click="italian()"><img class="flag" :class="{ 'selected-flag': selectedIta }" src="@/img/flags/italiano.webp" alt="italian_flag" /></span>
				</div>
				<div>
					<p>
						{{ generalTutorial.istruction }} <span><img class="settings" src="@/img/icons/settings.webp" alt="settings" /></span>
					</p>
				</div>
				<p class="boldi-cipollino">{{ generalTutorial.title }}</p>
				<p>{{ generalTutorial.subtitle }} <GeneralTutorialBtn :read-only="true" /></p>

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
.modal {
	background-color: #5252527c;
}
.modal-content {
	position: absolute;
	padding: 0.625rem;
	border-radius: 10px;
	width: 96%;
	min-height: 450px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow-y: auto;
	overflow-x: hidden;
	animation: modalEnter 0.8s ease forwards;
	left: 2%;
	top: 20%;
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

.settings {
	width: 25px;
}

.languages-selection {
	margin-top: 25%;
	margin-bottom: 0.9375rem;
}
.flag {
	width: 40px;
	margin-right: 0.9375rem;
}

.bb {
	border-bottom: 2px solid;
}

.welcome-container {
	position: relative;
}

.welcome-text {
	opacity: 0;
	position: absolute;
	top: 0;
	animation: show 9s infinite;
}

.welcome-text:nth-child(1) {
	animation-delay: 0s;
}
.welcome-text:nth-child(2) {
	animation-delay: 3s;
}
.welcome-text:nth-child(3) {
	animation-delay: 6s;
}

@keyframes show {
	0% {
		opacity: 0;
	}
	5% {
		opacity: 1;
	}
	33% {
		opacity: 1;
	}
	38% {
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
}

.selected-flag {
	border-radius: 50%;
	box-shadow: 1px 1px 7px 8px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: 1px 1px 7px 8px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 1px 1px 7px 8px rgba(0, 0, 0, 0.75);
}
</style>
