<script setup>
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
</script>

<script>
export default {
	data() {
		return {
			secondTodos: useSecondTodoStore(),
			languages: useLanguageStore(),
			theme: useThemeStore(),
			todosStore: useTodoStore(),
			listSelectionAlertVisible: false,
		};
	},
	methods: {
		selectList(btn) {
			if (btn.selectedCondition()) {
				this.listSelectionAlertVisible = true;
				setTimeout(() => {
					this.listSelectionAlertVisible = false;
				}, 3000);
				return;
			}
			btn.function();
		},
	},
};
</script>

<template>
	<!-- CONTENITORE DELL'ANIMAZIONE -->
	<div
		v-if="secondTodos.showChangeList"
		class="container"
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

		<div class="title-container">
			<h4 class="title">{{ languages.listSelection.title }}</h4>
		</div>
		<!-- CONTENITORE DEI BOTTONI -->
		<div class="buttons-container">
			<template v-for="(btn, n) in secondTodos.listButtons" :key="n">
				<button
					id="list-btn"
					:class="{
						'selected-btn': btn.selectedCondition(),
						'btn-in-moving-mode': secondTodos.istruction2Visible,
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
					:disabled="secondTodos.moving && !secondTodos.istruction2Visible"
					@click="selectList(btn)"
				>
					<div class="apply-moving-wrapper" @click="secondTodos.applyMoving(n)">
						<span class="btn-name">{{ btn.name }}</span>
					</div>
				</button>
			</template>
		</div>
		<div class="bottom">
			<!-- MESSAGGI CHE SPIEGANO COSA FARE ALL'UTENTE -->
			<p v-if="secondTodos.moving">1- {{ languages.moveMode.istruction1 }}</p>
			<p v-if="secondTodos.istruction2Visible">2- {{ languages.moveMode.istruction2 }}</p>
			<p v-if="secondTodos.moveSameList" class="text-danger">
				<small>{{ languages.moveMode.istructionAlert }}</small>
			</p>
			<p v-if="listSelectionAlertVisible && !secondTodos.moveSameList" class="text-danger">{{ languages.listSelection.alert }}</p>

			<!-- PULSANTE CHE ATTIVA/DISATTIVA LA MODALITÀ -->
			<div class="move-container">
				<img v-if="secondTodos.moving" class="move-arrow" :class="{ 'zoom-animation': !secondTodos.istruction2Visible, rotate: secondTodos.istruction2Visible }" src="@/img/icons/arrow.webp" alt="arrow-down" />
				<button class="move-elements-btn" :class="{ 'is-moving': secondTodos.moving }" @click="secondTodos.moveElementMode()" :disabled="!todosStore.todos.length">
					<img class="move-img" src="@/img/icons/move.webp" alt="move" />
					{{ languages.moveMode.moveElementText }}
				</button>
				<img v-if="secondTodos.moving" class="move-arrow" :class="{ 'zoom-animation': !secondTodos.istruction2Visible, rotate: secondTodos.istruction2Visible }" src="@/img/icons/arrow.webp" alt="arrow-down" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin: auto;
	margin-bottom: 1.25rem;
	margin-top: 1.25rem;
	padding: 15px;
	padding-top: 35px;
	position: relative;
	border-radius: 10px;
	box-shadow: 1px 19px 35px -2px rgba(0, 0, 0, 0.6);
	-webkit-box-shadow: 1px 19px 35px -2px rgba(0, 0, 0, 0.6);
	-moz-box-shadow: 1px 19px 35px -2px rgba(0, 0, 0, 0.6);
}

.buttons-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 10px;
}

.title-container {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	text-align: center;
	width: 100%;
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

.bottom {
	margin-top: 0.9375rem;
	display: flex;
	text-align: center;
	flex-direction: column;
}

.bottom > p {
	font-size: small;
}

.move-container {
	display: flex;
	justify-content: center;
	gap: 10%;
}

.move-img,
.move-arrow {
	width: 25px;
}
.zoom-animation {
	animation: zoominoutSmallX 1s infinite;
}
@keyframes zoominoutSmallX {
	0% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1.1, 1.2);
	}
	100% {
		transform: scale(1, 1);
	}
}

.is-moving {
	border: 2px solid #4caf50;
	background-color: #a9a9a9;
}

.move-elements-btn {
	cursor: pointer;
	align-self: center;
}

.apply-moving-wrapper {
	width: 100%;
}

.btn-in-moving-mode {
	border: 2px dashed #ff9800 !important;
	background-color: #ffd592 !important;
	color: #ff6600 !important;
}

.rotate {
	animation: zoominoutSmallY 1s infinite;
}

@keyframes zoominoutSmallY {
	0% {
		transform: scaleY(-1) scale(1, 1);
	}
	50% {
		transform: scaleY(-1) scale(1.1, 1.2);
	}
	100% {
		transform: scaleY(-1) scale(1, 1);
	}
}
</style>
