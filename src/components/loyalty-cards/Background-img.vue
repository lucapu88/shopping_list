<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";

const theme = useThemeStore();
const isChristmas = useChristmasStore();
const props = defineProps({
	addHeight: Boolean,
});
</script>

<template>
	<div
		class="background-head-img"
		:class="{
			'add-height': addHeight,
			'willy-lorbo': theme.lightTheme,
			waves: theme.summerTheme,
			snow: theme.winterTheme,
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
	background-image: url("@/img/goonies-map.webp");
}
.waves {
	background-image: url("@/img/onde-mare.webp");
}
.snow {
	background-image: url("@/img/snowman.webp");
}
.limonissimo {
	background-image: url("@/img/limoncello.webp");
}
.jeans-zip {
	background-image: url("@/img/jeans-zip.webp");
}
.strawberries {
	background-size: auto;
	background-image: url("@/img/strawberries.webp");
}

.santa-claus {
	background-image: url("@/img/festivities/santa-claus.webp");
}

.add-height {
	height: 220px;
}
</style>
