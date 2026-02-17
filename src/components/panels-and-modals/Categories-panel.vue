<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useCategoriesStore } from "@/store/CategoriesStore";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			todosStore: useTodoStore(),
			categoriesStore: useCategoriesStore(),
		};
	},
};
</script>

<template>
	<!--ho usato categoryList === false invece che !categoryList perchè all'inizio è null e deve avere un comportamento solo se è false-->
	<div
		class="category-list-container"
		:class="{
			'waterfall-descent': todosStore.categoryList,
			'waterfall-ascent': !todosStore.categoryList,
			'retro-theme-confirm': theme.retroTheme,
			'light-theme-confirm': theme.lightTheme,
			'category-dark-container': theme.darkTheme,
			'category-summer-container': theme.summerTheme,
			'category-winter-container': theme.winterTheme,
			'category-elegant-container': theme.elegantTheme,
			'category-pink-container': theme.pinkTheme,
			'category-panther-container': theme.panterTheme,
			'category-lemon-container': theme.lemonTheme,
			'category-jeans-container': theme.jeansTheme,
		}"
	>
		<p
			class="category-list-description"
			:class="{
				'blue-text': !theme.retroTheme && !theme.minimalTheme,
				'retro-helper-settings-title': theme.retroTheme,
				'jeans-category-modal-title': theme.jeansTheme,
			}"
		>
			<span>
				{{ languages.choseCategoryText }}
			</span>
		</p>
		<div v-if="todosStore.categoryListChildren" class="categories">
			<template v-for="(category, i) in categoriesStore.categories" :key="i">
				<p
					class="category-list"
					:class="{
						'retro-category-list': theme.retroTheme,
						'category-pink-btn': theme.pinkTheme,
						'category-padding-btn': theme.elegantTheme || theme.panterTheme || theme.jeansTheme,
						'jeans-theme-btn': theme.jeansTheme,
						'christmas-category': category.name === 'regalos de navidad' || category.name === 'regali di natale' || category.name === 'christmas gifts',
					}"
					v-if="category.active"
				>
					<span
						:class="{
							'animation-no-retro': !theme.retroTheme,
							'winter-category-list': theme.winterTheme,
							'boldi-cipollino': theme.jeansTheme,
						}"
						@click="todosStore.selectCategoryName(category.name)"
					>
						{{ theme.minimalTheme || theme.retroTheme ? category.name : category.emojy + " " + category.name }}
					</span>
				</p>
			</template>
		</div>
		<div v-if="todosStore.categoryListChildren" class="add-remove-empty">
			<button
				class="insert-all-btn"
				:class="{
					'spanish-size': languages.langSpanish,
					'light-btn': theme.lightTheme,
					'dark-btn': theme.darkTheme,
					'minimal-btn': theme.minimalTheme,
					'retro-btn-border': theme.retroTheme,
					'summer-btn': theme.summerTheme,
					'winter-btn': theme.winterTheme,
					'elegant-btn': theme.elegantTheme,
					'category-pink-btn': theme.pinkTheme,
					'panter-other-btn': theme.panterTheme,
					'lemon-theme-btn': theme.lemonTheme,
					'jeans-theme-btn': theme.jeansTheme,
				}"
				@click="categoriesStore.insertAllCategories()"
			>
				<span :class="{ 'boldi-cipollino': theme.jeansTheme }">{{ languages.insertAll }}</span>
			</button>
			<button
				class="insert-all-btn"
				:class="{
					'spanish-size': languages.langSpanish,
					'light-btn': theme.lightTheme,
					'dark-btn': theme.darkTheme,
					'minimal-btn': theme.minimalTheme,
					'retro-btn-border': theme.retroTheme,
					'summer-btn': theme.summerTheme,
					'winter-btn': theme.winterTheme,
					'elegant-btn': theme.elegantTheme,
					'category-pink-btn': theme.pinkTheme,
					'panter-other-btn': theme.panterTheme,
					'lemon-theme-btn': theme.lemonTheme,
					'jeans-theme-btn': theme.jeansTheme,
				}"
				@click="todosStore.removeOnlyEmpty()"
			>
				<span :class="{ 'boldi-cipollino': theme.jeansTheme }">{{ languages.removeEmpty }}</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
.category-list-container {
	display: none;
	text-align: center;
	border: 1px solid;
	border-radius: 5px;
	position: relative;
	z-index: 200;
}

.categories {
	opacity: 1;
	-webkit-animation: fadeIn 1s;
	animation: fadeIn 1s;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
}
@-webkit-keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.category-list-container.waterfall-descent {
	display: block;
	animation-name: waterfallDescent;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.5s;
}

@keyframes waterfallDescent {
	0% {
		height: 0;
		border-top: none;
		border-radius: 0 0 5px 5px;
	}
	100% {
		height: 197px;
		border-top: none;
		border-radius: 0 0 5px 5px;
	}
}

.category-list-container.waterfall-ascent {
	display: block;
	height: 0;
	border: none !important;
	animation-name: waterfallAscent;
	animation-iteration-count: 1;
	animation-timing-function: ease-out;
	animation-duration: 0.5s;
}
.category-list-container.waterfall-ascent > * {
	display: none;
}
@keyframes waterfallAscent {
	0% {
		height: 197px;
	}
	50% {
		height: 0;
	}
	100% {
		display: none;
	}
}

.animation-no-retro {
	animation-name: zoom;
	animation-iteration-count: 2;
	animation-timing-function: ease-in;
	animation-delay: 0.7s;
	animation-duration: 0.6s;
}
@keyframes zoom {
	0% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1.1, 1.1);
		text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.55);
	}
	100% {
		transform: scale(1, 1);
	}
}

.category {
	background: rgba(192, 224, 133, 0.75);
	border-radius: 15px;
}
.category-emoji-selected {
	animation: zoominoutsinglefeatured 1.5s infinite;
}
@keyframes zoominoutsinglefeatured {
	0% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1.3, 1.3);
	}
	100% {
		transform: scale(1, 1);
	}
}
.category-list {
	display: inline-block;
	font-weight: bold;
	text-transform: capitalize;
	border: 1px solid;
	border-radius: 5px;
	padding: 3px 5px;
	margin: 0.3125rem;
	font-size: 0.938rem;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 50px;
}

.category-list:hover {
	cursor: pointer;
}
.category-list-description {
	font-size: 0.938rem;
	margin: 0;
}

.insert-all-btn {
	margin: 15px 10px;
	font-size: 1.125rem;
}
.add-remove-empty {
	display: flex;
	justify-content: center;
}
.christmas-category {
	border: 2px solid red;
	box-shadow: 0px 0px 10px 0px #ff0000;
}

@media (min-width: 350px) {
	.category-list-container.waterfall-descent {
		margin: 0 5px 35px;
	}
}
</style>
