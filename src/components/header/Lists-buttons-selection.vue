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
			buttons: [],
		};
	},
	created() {
		this.buttons = [
			{
				name: "first",
				number: 1,
				selectedCondition: () => !this.secondTodos.secondList && !this.secondTodos.thirdList && !this.secondTodos.fourthList,
				function: this.secondTodos.selectFirstList,
			},
			{
				name: "second",
				number: 2,
				selectedCondition: () => this.secondTodos.secondList,
				function: this.secondTodos.selectSecondList,
			},
			{
				name: "third",
				number: 3,
				selectedCondition: () => this.secondTodos.thirdList,
				function: this.secondTodos.selectThirdList,
			},
			{
				name: "fourth",
				number: 4,
				selectedCondition: () => this.secondTodos.fourthList,
				function: this.secondTodos.selectFourthList,
			},
		];
	},
};
</script>

<template>
	<div class="buttons-container">
		<template v-for="(btn, n) in buttons" :key="n">
			<button
				:class="{
					first: btn.name === 'first',
					second: btn.name === 'second',
					third: btn.name === 'third',
					fourth: btn.name === 'fourth',
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
				<span>{{ languages.list }} {{ btn.number }}</span>
			</button>
		</template>
	</div>
</template>

<style scoped>
.buttons-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	width: 90%;
	margin: auto;
	margin-bottom: 20px;
	margin-top: -10px;
}
.buttons-container > button {
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: small;
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
</style>
