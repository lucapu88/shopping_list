<script setup>
import { ref } from "vue";
import { usePreloadStore } from "../../store/PreloadStore";
import { useSettingsStore } from "../../store/SettingsStore";
import { useThemeStore } from "../../store/ThemeStore";
import { useLanguageStore } from "../../store/LanguageStore";
import tamago from "../../img/ads/banner-tamago.webp";
import pupu from "../../img/ads/banner-pupu.webp";
import pupuIcon from "../../img/ads/pupu-icon.webp";
import tamagoIcon from "../../img/ads/tamago-icon.webp";

const preload = usePreloadStore();
const settings = useSettingsStore();
const theme = useThemeStore();

preload.preloadImage(tamago);
preload.preloadImage(pupu);
preload.preloadImage(pupuIcon);

const language = useLanguageStore();
const tamagoLogo = ref(preload.preloadImage(tamagoIcon));
const logo = ref(tamagoLogo);
const imagesSrc = ref(tamago);
const openModal = ref(false);
const copied = ref(false);
const pupuUrl = "https://play.google.com/store/apps/details?id=com.lc.scappadallacacca";
const tamagoUrl = "https://play.google.com/store/apps/details?id=com.virtualpet.tamago";
const bannerUrl = ref(tamagoUrl);
const currentIndex = ref(0);
const currentImage = ref();
const currentUrl = ref();
const appName = ref("Tamago");

setInterval(changeUrl, 3000);

function changeUrl() {
	const urls = [tamagoUrl, pupuUrl];
	bannerUrl.value = urls[currentIndex.value];
	currentIndex.value = (currentIndex.value + 1) % urls.length;
	imagesSrc.value = bannerUrl.value === tamagoUrl ? tamago : pupu;
}

function openBannerUrl(imagesSrc) {
	if (settings.isAndroid) {
		openModal.value = true;
		currentImage.value = imagesSrc;
		imagesSrc === tamago ? (appName.value = "Tamago") : (appName.value = "Scappa da pupu");
		imagesSrc === tamago ? (logo.value = tamagoIcon) : (logo.value = pupuIcon);
		currentUrl.value = imagesSrc === tamago ? tamagoUrl : pupuUrl;
		return;
	}

	window.open(bannerUrl.value, "_system");
}

function copylink() {
	navigator.clipboard.writeText(currentUrl.value);
	copied.value = true;
	setTimeout(() => {
		copied.value = false;
	}, 2500);
}	
</script>

<template>
	<div class="ads-container">
		<div class="banner" @click="openBannerUrl(imagesSrc)">
			<img class="banner-img" :src="imagesSrc" alt="Ads" />
		</div>
	</div>

	<div class="modal" v-if="openModal">
		<div class="empty-div" @click="openModal = false"></div>

		<div class="container" :class="{
			light: theme.lightTheme,
			dark: theme.darkTheme,
			minimal: theme.minimalTheme,
			retro: theme.retroTheme,
			summer: theme.summerTheme,
			winter: theme.winterTheme,
			elegant: theme.elegantTheme,
			pink: theme.pinkTheme,
			panter: theme.panterTheme,
			lemon: theme.lemonTheme,
			jeans: theme.jeansTheme,
		}">
			<button class="close-btn" @click="openModal = false">✕</button>
			<img :src="currentImage" alt="app_img" class="app-image mt-5" />

			<h2 class="text-center mt-3">
				{{ language.playStoreText.part1 }}
				<br />
				<br />
				<span class="boldi-cipollino">
					{{ appName }}
					<img :src="logo" alt="logo" class="logo" />
				</span>
			</h2>

			<h3 class="text-center" @click="copylink()">{{ language.playStoreText.part2 }} </h3>

			<p v-if="copied" class="copied-text text-center text-success bg-light">{{ language.share.text }}</p>
		</div>
	</div>
</template>

<style scoped>
.ads-container {
	padding: 0 10px;
	max-width: 500px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
}

.banner {
	width: 95%;
}

.banner-img {
	width: 100%;
	height: 100px;
}

.modal {
	padding-left: 10px;
	padding-right: 10px;
}

.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	border-radius: 5px;
	border: 1px solid;
}

.close-btn {
	border-radius: 50%;
	padding: 3px 8px;
	width: 35px;
	position: absolute;
	top: 5px;
	right: 5px;
}

.app-image {
	width: 90%;
	height: auto;
}

.logo {
	width: 50px;
	height: 50px;
	border-radius: 5px;
	margin-left: 10px;
}
</style>
