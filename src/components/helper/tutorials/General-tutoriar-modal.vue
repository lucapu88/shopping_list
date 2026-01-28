<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import GeneralTutorialBtn from "./General-tutorial-btn.vue";
import ConfirmButtonsContainer from "../../common/Confirm-buttons-container.vue";
</script>

<script>
export default {
	emits: ["understand"],
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
			selectedFra: false,
		};
	},
	created() {
		if (this.languages.langIta) {
			this.italian();
		} else if (this.languages.langSpanish) {
			this.spanish();
		} else if (this.languages.langFrench) {
			this.french();
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
			// Questo serve perchè gli avvisi dei nuovi aggiornamenti servono solo all'utente che ha già scaricato l'app. L'utente nuovo che scarica l'app ora, vedrà già l'ultima versione.
			this.settings.readNewUpdates();
			this.$emit("understand", true);
		},
		english() {
			this.selectedEng = true;
			this.selectedSpa = false;
			this.selectedIta = false;
			this.selectedFra = false;

			this.generalTutorial.title = "Do you want to see a short video tutorial?";
			this.generalTutorial.subtitle = "You can always review it \n whenever you want by clicking on =>";
			this.generalTutorial.istruction = "To change the language for the entire app, click (top right) on >";
		},
		italian() {
			this.selectedEng = false;
			this.selectedSpa = false;
			this.selectedIta = true;
			this.selectedFra = false;

			this.generalTutorial.title = "vuoi vedere un breve video tutorial?";
			this.generalTutorial.subtitle = "puoi sempre rivederlo \n quando vuoi cliccando su =>";
			this.generalTutorial.istruction = "Per cambiare lingua a tutta l'app clicca (in alto a destra) su >";
		},
		spanish() {
			this.selectedEng = false;
			this.selectedSpa = true;
			this.selectedIta = false;
			this.selectedFra = false;

			this.generalTutorial.title = "¿Quieres ver un breve vídeo tutorial?";
			this.generalTutorial.subtitle = "Siempre puedes revisarlo \n cuando quieras  haciendo clic en =>";
			this.generalTutorial.istruction = "Para cambiar el idioma de toda la aplicación, haga clic (arriba a la derecha) en >";
		},
		french() {
			this.selectedEng = false;
			this.selectedSpa = false;
			this.selectedIta = false;
			this.selectedFra = true;

			this.generalTutorial.title = "Souhaitez-vous visionner un court tutoriel vidéo?";
			this.generalTutorial.subtitle = "Vous pouvez le revoir \n à tout moment en cliquant sur =>";
			this.generalTutorial.istruction = "Pour changer la langue de toute l'application, cliquez (en haut à droite) sur >";
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

			<div v-if="!showVideo" class="confirm-alert p-1">
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
					<p class="welcome-text text-danger m-1">
						<small>Merci d'avoir téléchargé Shopping List, et bienvenue !</small>
					</p>
				</div>
				<div class="languages-selection">
					<span @click="english()"><img class="flag" :class="{ 'selected-flag': selectedEng }" src="@/img/flags/inglese.webp" alt="english_flag" /></span>

					<span @click="spanish()"><img class="flag" :class="{ 'selected-flag': selectedSpa }" src="@/img/flags/spagnolo.webp" alt="spanish_flag" /></span>

					<span @click="italian()"><img class="flag" :class="{ 'selected-flag': selectedIta }" src="@/img/flags/italiano.webp" alt="italian_flag" /></span>

					<span @click="french()"><img class="flag" :class="{ 'selected-flag': selectedFra }" src="@/img/flags/francese.webp" alt="french_flag" /></span>
				</div>
				<div>
					<p>
						{{ generalTutorial.istruction }} <span><img class="settings" src="@/img/icons/settings.webp" alt="settings" /></span>
					</p>
				</div>
				<p class="boldi-cipollino">{{ generalTutorial.title }}</p>
				<p>{{ generalTutorial.subtitle }} <GeneralTutorialBtn :read-only="true" /></p>

				<ConfirmButtonsContainer @yesSelected="playTutorial()" @noSelected="closeTutorial()" />
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

/* .btn {
	width: 50px;
} */

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
	animation: show 12s infinite;
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
.welcome-text:nth-child(4) {
	animation-delay: 9s;
}

@keyframes show {
	0% {
		opacity: 0;
	}
	5% {
		opacity: 1;
	}
	25% {
		opacity: 1;
	}
	30% {
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
