<script setup>
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
</script>

<script>
export default {
	data() {
		return {
			secondTodos: useSecondTodoStore(),
			languages: useLanguageStore(),
			theme: useThemeStore(),
		};
	},
	created() {
		this.secondTodos.createListsButtons();
	},
};
</script>

<template>
	<div
		v-if="secondTodos.showChangeList"
		class="buttons-container"
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
	>
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

		<h4
			class="title"
			:class="{
				'title-elegant': theme.elegantTheme,
				'title-minimal': theme.minimalTheme,
				'title-pink': theme.pinkTheme,
				'title-lemon': theme.lemonTheme,
				'title-jeans': theme.jeansTheme,
			}"
		>
			{{ languages.listSelectionTitle }}
		</h4>

		<template v-for="(btn, n) in secondTodos.listButtons" :key="n">
			<button
				:class="{
					'selected-btn': btn.selectedCondition(),
					'light-button-color': theme.lightTheme,
					'dark-btn': theme.darkTheme,
					'minimal-btn': theme.minimalTheme,
					'retro-teme-btns': theme.retroTheme,
					'summer-header-btn': theme.summerTheme,
					'winter-header-btn': theme.winterTheme,
					'elegant-btn': theme.elegantTheme,
					'pink-theme-btn': theme.pinkTheme,
					'panter-other-btn': theme.panterTheme,
					'list-button-panther-size': theme.panterTheme,
					'lemon-other-btn': theme.lemonTheme,
					'jeans-other-btn': theme.jeansTheme,
				}"
				@click="btn.function"
			>
				<span class="btn-name">{{ btn.name }}</span>
			</button>
		</template>
	</div>
</template>

<style scoped>
.buttons-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 10px;
	margin: auto;
	margin-bottom: 20px;
	margin-top: 20px;
	padding: 15px;
	padding-top: 35px;
	position: relative;
	border-radius: 10px;
	box-shadow: 1px 19px 35px -2px rgba(0, 0, 0, 0.6);
	-webkit-box-shadow: 1px 19px 35px -2px rgba(0, 0, 0, 0.6);
	-moz-box-shadow: 1px 19px 35px -2px rgba(0, 0, 0, 0.6);
}

.title {
	position: absolute;
	left: 10%;
	z-index: 10;
}

.title-elegant,
.title-jeans {
	left: 2%;
}
.title-minimal,
.title-pink,
.title-lemon {
	left: 20%;
}

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

.buttons-container > button {
	display: flex;
	justify-content: center;
	align-items: center;
}

.btn-name {
	max-width: 9ch;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.selected-btn {
	box-shadow: inset 2px 2px 90px -50px rgba(0, 0, 0, 0.85);
	color: red !important;
	font-weight: bold !important;
}

@media (max-width: 375px) {
	.title {
		font-size: 1.1875rem;
	}
	.btn-name {
		max-width: 7ch;
	}
}
</style>
