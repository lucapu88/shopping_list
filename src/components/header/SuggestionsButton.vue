<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useSuggestionsStore } from "@/store/suggestions/SuggestionsStore";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			addTodo: useTodoStore(),
			suggestionsStore: useSuggestionsStore(),
		};
	},
};
</script>

<template>
	<div
		v-if="!addTodo.devNotes"
		class="tips-container"
		:class="{
			'waterfall-descent': addTodo.inModification,
			'waterfall-ascent': !addTodo.inModification,
		}"
	>
		<button
			class="tips-btn"
			:class="{
				'tips-btn-light': theme.lightTheme,
				'tips-btn-dark': theme.darkTheme,
				'tips-btn-minimal': theme.minimalTheme,
				'tips-btn-retro': theme.retroTheme,
				'tips-btn-summer': theme.summerTheme,
				'tips-btn-winter': theme.winterTheme,
				'tips-btn-elegant': theme.elegantTheme,
				'tips-btn-pink': theme.pinkTheme,
				'tips-btn-panter': theme.panterTheme,
				'tips-btn-lemon': theme.lemonTheme,
				'tips-btn-jeans': theme.jeansTheme,
			}"
			@click="suggestionsStore.toggleSuggestionsModal()"
		>
			<span
				class="tips-text"
				:class="{
					block: addTodo.inModification,
					'boldi-cipollino': theme.jeansTheme,
				}"
			>
				{{ languages.suggestions.tipsBtnText }}
			</span>
		</button>
	</div>
</template>

<style scoped>
.tips-container {
	display: none;
}

.tips-container.waterfall-descent {
	display: flex;
	justify-content: center;
	animation-name: waterfallDescent;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.5s;
}

@keyframes waterfallDescent {
	0% {
		height: 0;
	}
	100% {
		height: 36px;
	}
}

.tips-container.waterfall-ascent {
	display: flex;
	justify-content: center;
	height: 0;
	animation-name: waterfallAscent;
	animation-iteration-count: 1;
	animation-timing-function: ease-out;
	animation-duration: 0.5s;
}
.tips-container.waterfall-ascent > * {
	display: none;
}
@keyframes waterfallAscent {
	0% {
		height: 36px;
	}
	50% {
		height: 0;
	}
	100% {
		display: none;
	}
}

.tips-text.block {
	animation-name: displayBlock;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 2s;
	animation-fill-mode: forwards;
}
@keyframes displayBlock {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
