<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { usePreloadStore } from "@/store/PreloadStore";
import { ref } from "vue";
import gooniesMap from "@/img/loyalty-cards/goonies-map.webp";
import ondeMare from "@/img/loyalty-cards/onde-mare.webp";
import snowman from "@/img/loyalty-cards/snowman.webp";
import limoncello from "@/img/loyalty-cards/limoncello.webp";
import strawberries from "@/img/loyalty-cards/strawberries.webp";
import pantherEyes from "@/img/loyalty-cards/panther-eyes.webp";
import santaClaus from "@/img/festivities/santa-claus.webp";

const preload = usePreloadStore();
const theme = useThemeStore();
const isChristmas = useChristmasStore();
const srcImg = ref(null);
const themeMap = {
	lightTheme: gooniesMap,
	summerTheme: ondeMare,
	winterTheme: snowman,
	lemonTheme: limoncello,
	pinkTheme: strawberries,
	panterTheme: pantherEyes,
};

setImgSrc();
if (srcImg.value) {
	preload.preloadImage(srcImg.value);
}

const props = defineProps({
	addHeight: Boolean,
});

function setImgSrc() {
	if (isChristmas.christmasTheme) {
		srcImg.value = santaClaus;
		return;
	}

	const activeThemeKey = Object.keys(themeMap).find((key) => theme[key]);

	if (themeMap[activeThemeKey]) {
		srcImg.value = themeMap[activeThemeKey];
	}
}
</script>

<template>
	<div
		class="background-head-img"
		:class="{
			'add-height': addHeight,
			'willy-lorbo': theme.lightTheme,
			waves: theme.summerTheme,
			snow: theme.winterTheme,
			panther: theme.panterTheme,
			strawberries: theme.pinkTheme,
			limonissimo: theme.lemonTheme,
			'jeans-zip': theme.jeansTheme,
			'santa-claus': isChristmas.christmasTheme,
		}"
	></div>
</template>

<style scoped>
.background-head-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 155px;
	background-repeat: no-repeat;
	background-size: cover;
}
.willy-lorbo {
	background-image: url("@/img/loyalty-cards/goonies-map.webp");
}
.waves {
	background-image: url("@/img/loyalty-cards/onde-mare.webp");
}
.snow {
	background-image: url("@/img/loyalty-cards/snowman.webp");
}
.limonissimo {
	background-image: url("@/img/loyalty-cards/limoncello.webp");
}
.jeans-zip {
	background-image: url("@/img/jeans-zip.webp");
}
.strawberries {
	background-size: auto;
	background-image: url("@/img/loyalty-cards/strawberries.webp");
}

.panther {
	background-image: url("@/img/loyalty-cards/panther-eyes.webp");
}

.add-height {
	height: 220px;
}

.santa-claus {
	background-image: url("@/img/festivities/santa-claus.webp");
}
</style>
