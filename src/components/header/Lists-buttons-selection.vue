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
	<div class="buttons-container">
		<template v-for="(btn, n) in secondTodos.listButtons" :key="n">
			<button
				:class="{
					first: btn.class === 'first',
					second: btn.class === 'second',
					third: btn.class === 'third',
					fourth: btn.class === 'fourth',
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
	width: 100%;
	margin: auto;
	margin-bottom: 20px;
	margin-top: -10px;
	padding: 0 15px;
}
.buttons-container > button {
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: small;
}
.btn-name {
	max-width: 8ch;
	overflow: hidden;
	text-overflow: ellipsis;
}
.selected-btn {
	box-shadow: inset 2px 2px 90px -50px rgba(0, 0, 0, 0.85);
	color: red !important;
	font-weight: bold !important;
}

.first {
	border-radius: 7px 0px 0px 7px;
}
.second,
.third {
	border-radius: 0px;
}
.fourth {
	border-radius: 0px 7px 7px 0px;
}

@media (max-width: 450px) {
	.buttons-container > button {
		max-width: 90px;
	}
}
@media (max-width: 345px) {
	.buttons-container {
		width: 95%;
		margin-top: 20px;
		padding: 0;
	}
	.btn-name {
		max-width: 7ch;
	}
}
</style>
