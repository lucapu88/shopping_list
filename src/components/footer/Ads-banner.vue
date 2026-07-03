<script setup>
import { ref } from "vue";
import { usePreloadStore } from "../../store/PreloadStore";
import tamago from "../../img/ads/banner-tamago.webp";
import pupu from "../../img/ads/banner-pupu.webp";

const preload = usePreloadStore();

const imageTamago = ref(preload.preloadImage(tamago));
const imagePupu = ref(preload.preloadImage(pupu));
const imagesSrc = ref(tamago);
const currentIndex = ref(0);
const pupuUrl = "https://play.google.com/store/apps/details?id=com.lc.scappadallacacca";
const tamagoUrl = "https://play.google.com/store/apps/details?id=com.virtualpet.tamago";
const bannerUrl = ref(tamagoUrl);

setInterval(changeUrl, 3000);

function changeUrl() {
	const urls = [tamagoUrl, pupuUrl];
	bannerUrl.value = urls[currentIndex.value];
	currentIndex.value = (currentIndex.value + 1) % urls.length;
	imagesSrc.value = bannerUrl.value === tamagoUrl ? tamago : pupu;
}

function openBannerUrl() {
	window.open(bannerUrl.value, "_blank");
}
</script>

<template>
	<div class="ads-container">
		<div @click="openBannerUrl">
			<img :src="imagesSrc" alt="Ads" class="ads-banner" />
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

a {
	width: 95%;
}

img {
	width: 100%;
	height: 100px;
}
</style>
