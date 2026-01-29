<script setup>
import { useThemeStore } from "@/store/ThemeStore";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
		};
	},
};
</script>

<template>
	<div
		class="left"
		:class="{
			'container-light': theme.lightTheme,
			'container-dark': theme.darkTheme,
			'container-minimal': theme.minimalTheme,
			'container-retro': theme.retroTheme,
			'container-summer': theme.summerTheme,
			'container-winter': theme.winterTheme,
			'container-elegant': theme.elegantTheme,
			'confirm-pink': theme.pinkTheme,
			'container-panter': theme.panterTheme,
			'container-lemon': theme.lemonTheme,
			'container-jeans': theme.jeansTheme,
			'border-radius-nooo-hai-rotto-il-cazzo': theme.retroTheme,
		}"
	></div>
	<div
		class="right"
		:class="{
			'container-light': theme.lightTheme,
			'container-dark': theme.darkTheme,
			'container-minimal': theme.minimalTheme,
			'container-retro': theme.retroTheme,
			'container-summer': theme.summerTheme,
			'container-winter': theme.winterTheme,
			'container-elegant': theme.elegantTheme,
			'confirm-pink': theme.pinkTheme,
			'container-panter': theme.panterTheme,
			'container-lemon': theme.lemonTheme,
			'container-jeans': theme.jeansTheme,
			'border-radius-nooo-hai-rotto-il-cazzo': theme.retroTheme,
		}"
	></div>
</template>

<style scoped>
.left {
	position: absolute;
	top: 0;
	left: 0;
	width: 50%;
	height: 100%;
	border: none;
	border-radius: 10px 0 0 10px;
	border-right: 1px solid;
	animation: slideLeft 1.5s ease-out forwards;
	z-index: 20;
}
@keyframes slideLeft {
	from {
		transform: translateX(0%);
	}
	to {
		transform: translateX(-100%);
		border-radius: 5px;
	}
}
.right {
	position: absolute;
	top: 0;
	right: 0;
	width: 50%;
	height: 100%;
	border: none;
	border-radius: 0 10px 10px 0;
	border-left: 1px solid;
	animation: slideRight 1.5s ease-out forwards;
	z-index: 20;
}
@keyframes slideRight {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(100%);
		border-radius: 5px;
	}
}
</style>
