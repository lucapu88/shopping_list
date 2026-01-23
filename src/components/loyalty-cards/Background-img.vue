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
