<script setup>
import HelperIstructions from "./Helper-istructions.vue";
import PrivacyPolicyModal from "../panels-and-modals/privacy-policy/Privacy-policy-modal.vue";
import { useThemeStore } from "@/store/ThemeStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useOthersFestivitiesStore } from "@/store/festivities/OthersFestivitiesStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
import LoadingOrUpdating from "../Loading-or-updating.vue";
import ChangeLanguages from "./settings/Change-languages.vue";
import ChangeThemes from "./settings/Change-themes.vue";
import SafeDeleteMode from "./settings/Safe-delete-mode.vue";
import AutoDeleteEmptyCategories from "./settings/Auto-delete-empty-categories.vue";
import MultipleCategoryInsertion from "./settings/Multiple-category-insertion.vue";
import BackupList from "./settings/Backup-list.vue";
import ImportList from "./settings/Import-list.vue";
import Share from "./settings/Share.vue";
import UpdateApp from "./settings/Update-app.vue";
import ReloadApp from "./settings/Reload-app.vue";
import RenameList from "./settings/Rename-list.vue";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			isChristmas: useChristmasStore(),
			festivities: useOthersFestivitiesStore(),
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			todosStore: useTodoStore(),
			themeLoading: false,
			updating: false,
			backup: false,
			languageChanged: null,
			listImported: false,
			copyrightText: "",
		};
	},
	created() {
		this.isChristmas.merryChristmasTheme();
		this.festivities.checkFestivities();
		this.settings.checkingUpdates(); // Non va tolto!!! altrimenti la data dell'ultimo aggiornamento resta in inglese.
		this.copyright();
		if (this.todosStore.showOnlyImportantTodos) {
			this.todosStore.showOnlyImportant();
		}
		this.settings.logLocalStorageSize();
	},
	mounted() {
		document.getElementById("helper-description").scrollTo(0, 0);
	},
	methods: {
		themeLoadingEmitted(value) {
			this.themeLoading = value;
		},
		updatingAppEmited(value) {
			this.updating = value;
		},
		backupLoadingEmitted(value) {
			this.backup = value;
		},
		changeLanguageEmitted(value) {
			this.languageChanged = value;
		},
		importListEmitted(value) {
			this.listImported = value;
		},
		closeHelper() {
			this.settings.closeHelper();
		},
		copyright() {
			let copyright = new Date();
			const update = copyright.getFullYear();
			this.copyrightText = `Copyright© 2022 - ${update} Caputo Luca - All right reserved.`;
		},
	},
};
</script>

<template>
	<div>
		<LoadingOrUpdating :themeLoading="themeLoading" :updating="updating" :backup="backup" :languageChanged="languageChanged" :listImportedOrDeleted="listImported" />
		<div
			v-if="!themeLoading && !updating && !backup && !languageChanged && !listImported"
			id="helper-description-container"
			class="helper-description"
			:class="{
				slideUp: settings.helper,
				slideDown: settings.helperInClosing,
				'dark-theme-helper': theme.darkTheme,
				'minimal-theme-helper': theme.minimalTheme,
				'retro-theme-helper': theme.retroTheme,
				'winter-theme-helper': theme.winterTheme,
				'summer-theme-helper': theme.summerTheme,
				'helper-light': theme.lightTheme,
				'elegant-theme-helper': theme.elegantTheme,
				'pink-helper': theme.pinkTheme,
				'panter-helper': theme.panterTheme,
				'lemon-helper': theme.lemonTheme,
				'jeans-helper': theme.jeansTheme,
			}"
		>
			<!-- PULSANTE DI CHIUSURA -->
			<div class="close-helper-container" @click="closeHelper()">
				<p class="close-helper" :class="{ 'close-retro-theme-helper': theme.retroTheme }">X</p>
			</div>

			<img v-if="festivities.halloweenTheme" class="halloween-pumpkin" src="@/img/festivities/zucca.webp" alt="halloween" />
			<img v-if="isChristmas.christmasTheme" class="left-christmas-info" src="@/img/festivities/gingerman-icon.webp" loading="lazy" alt="Buon Natale!" />
			<p
				class="helper-settings-title"
				:class="{
					'christmas-red': isChristmas.christmasTheme,
					'retro-helper-settings-title': theme.retroTheme,
				}"
			>
				{{ languages.settingsTextTitle }}
			</p>
			<img v-if="isChristmas.christmasTheme" class="right-christmas-info" src="@/img/festivities/balls.webp" loading="lazy" alt="E felice anno nuovo!" />
			<img v-if="festivities.halloweenTheme" class="halloween-cobweb" src="@/img/festivities/ragnatele.webp" alt="halloween" />

			<div id="helper-description">
				<UpdateApp @updatingAppEmit="updatingAppEmited" />

				<ReloadApp />

				<ChangeLanguages @chageLanguageEmit="changeLanguageEmitted" />

				<RenameList />

				<ChangeThemes @themeLoadingEmit="themeLoadingEmitted" />

				<SafeDeleteMode />

				<AutoDeleteEmptyCategories />

				<MultipleCategoryInsertion />

				<BackupList @backupLoadingEmit="backupLoadingEmitted" />

				<ImportList @importListEmitted="importListEmitted" />

				<Share />

				<div id="helper-istructions">
					<HelperIstructions />
				</div>

				<button id="privacy-policy-btn" class="privacy-policy-btn" @click="settings.showPrivacyPolicy()">
					<small>Privacy policy</small>
				</button>
				<div class="copyright">
					<small>{{ copyrightText }}</small>
				</div>
			</div>

			<PrivacyPolicyModal v-if="settings.privacyPolicy" />
		</div>
	</div>
</template>

<style scoped>
.halloween-pumpkin {
	width: 75px;
	height: 50px;
	position: absolute;
	top: 3px;
	left: 10px;
}
.halloween-cobweb {
	width: 60px;
	height: 60px;
	position: absolute;
	top: 0;
	right: 50px;
}
.settings {
	width: 33px;
}

.helper-description {
	position: absolute;
	left: 0;
	top: -100%;
	width: 100%;
	height: 100%;
	padding: 0.625rem;
	background-size: contain;
	z-index: 500;
	background-color: #ffffff;
}

.helper-light {
	background-image: repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
	background-size: 30px 30px;
	/* Primo repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%)
        Crea un gradiente lineare ripetuto verticale.
        Il colore #ccc (grigio chiaro) va da 0px a 1px.
		Da 1px in poi è trasparente fino a 100% del ripetuto.

    Secondo repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)
        Stessa logica ma ruotato di 90deg, quindi orizzontale.
        Crea delle linee orizzontali di 1px di spessore.

    background-size: 30px 30px;
        Imposta la dimensione della griglia a 30x30 pixel, quindi le linee verticali e orizzontali si ripetono ogni 30px. */
}

.helper-description.slideUp {
	display: block;
	animation-name: slideUp;
	animation-duration: 1s;
	animation-fill-mode: forwards;
}
@keyframes slideUp {
	from {
		top: 200%;
	}
	to {
		top: 0;
	}
}
.helper-description.slideDown {
	display: block;
	animation-name: slideDown;
	animation-duration: 1s;
	animation-fill-mode: none;
}
@keyframes slideDown {
	from {
		top: 55px;
	}
	to {
		top: 200%;
	}
}
.helper-description.slideDown > div:not(:first-child) {
	display: none;
}

.helper-description > span {
	font-size: 0.75rem;
}
.helper-description > div:not(:first-child) {
	width: 100%;
	height: 100%;
	overflow: auto;
	padding-bottom: 30%;
	overflow-x: hidden;
}
.helper-settings-title {
	margin-bottom: 0.9375rem;
	text-align: center;
}

.close-helper-container {
	width: 65px;
	height: 60px;
	position: absolute;
	top: 0;
	right: 0;
	padding: 0.313rem;
}
.close-helper {
	font-family: Arial, Helvetica, sans-serif;
	font-weight: bold;
	float: right;
	width: 30px;
	padding-left: 8px;
	color: #000000;
	background-color: #d3d3d3;
	border: 2px solid;
	border-radius: 50%;
}

.helper-footer {
	font-size: smaller;
}
.helper-footer-title {
	text-align: center;
	color: #ff0000;
	border-top: 1.5px solid #000000;
	margin-top: 0.9375rem;
	margin-bottom: 0;
}
.left-christmas-info {
	position: absolute;
	top: 5px;
	left: 5px;
	width: 50px;
	height: 50px;
}
.right-christmas-info {
	position: absolute;
	top: 5px;
	right: 10%;
	width: 50px;
	height: 50px;
}

.copyright {
	text-align: center;
	font-size: 15px;
	margin-top: 2.5rem;
}
</style>
