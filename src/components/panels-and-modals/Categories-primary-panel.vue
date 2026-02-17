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
	mounted() {
		this.categoriesStore.resetSelectedCat();
	},
};
</script>

<template>
	<div
		id="category-list-container"
		class="category-list-container"
		:class="{
			'retro-theme-confirm': theme.retroTheme,
			'light-theme-confirm': theme.lightTheme,
			'category-dark-bg': theme.darkTheme,
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
			<small>
				{{ languages.selectCategoryText }}
			</small>
		</p>
		<div class="categories">
			<template v-for="(category, i) in categoriesStore.categories" :key="i">
				<p
					v-if="category.active"
					class="category-list"
					:class="{
						'retro-category-list': theme.retroTheme,
						'category-pink-btn': theme.pinkTheme,
						'category-padding-btn': theme.elegantTheme || theme.panterTheme || theme.jeansTheme,
						'jeans-theme-btn': theme.jeansTheme,
						'christmas-category': category.name === 'regalos de navidad' || category.name === 'regali di natale' || category.name === 'christmas gifts',
						'btn-selected': category.selectedCat,
						'minimal-selected-btn': theme.minimalTheme && category.selectedCat,
						'retro-selected-btn': theme.retroTheme && category.selectedCat,
						'summer-header-btn-selected': theme.summerTheme && category.selectedCat,
						'winter-header-selected-btn': theme.winterTheme && category.selectedCat,
						'elegant-selected-btn': theme.elegantTheme && category.selectedCat,
						'pink-theme-selected-btn': theme.pinkTheme && category.selectedCat,
						'panter-theme-selected-btn': theme.panterTheme && category.selectedCat,
						'lemon-theme-selected-btn': theme.lemonTheme && category.selectedCat,
						'jeans-theme-selected-btn': theme.jeansTheme && category.selectedCat,
					}"
					@touchstart.prevent="todosStore.selectCategoryForInsertion(category)"
					@mousedown.prevent="todosStore.selectCategoryForInsertion(category)"
				>
					<span
						:class="{
							'winter-category-list': theme.winterTheme,
							'boldi-cipollino': theme.jeansTheme,
						}"
					>
						{{ category.emojy + " " + category.name }}
					</span>
				</p>
			</template>
		</div>
	</div>
</template>

<style scoped>
.category-list-container {
	text-align: center;
	border: 1px solid;
	border-radius: 5px;
	position: relative;
	z-index: 200;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.3s;
}

.categories {
	opacity: 1;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	overflow: auto;
	max-height: 200px;
}

.category {
	background: rgba(192, 224, 133, 0.75);
	border-radius: 15px;
}

.category-list {
	display: inline-block;
	font-weight: bold;
	text-transform: capitalize;
	border: 1px solid;
	border-radius: 5px;
	margin: 0.3125rem;
	font-size: 0.813rem;
	display: flex;
	align-items: center;
	justify-content: center;
}

.category-list:hover {
	cursor: pointer;
}
.category-list-description {
	font-size: 0.938rem;
	margin: 0;
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

@media (max-width: 364px) {
	.category-list {
		font-size: 0.75rem;
	}
}
</style>
