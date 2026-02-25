<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useCategoriesStore } from "@/store/CategoriesStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { ref, defineExpose } from "vue";

const props = defineProps({
	extraClass: Boolean,
	customBtn: Boolean,
});

const box = ref(null);
const theme = useThemeStore();
const christmas = useChristmasStore();
const todosStore = useTodoStore();
const categoriesStore = useCategoriesStore();
defineExpose({
	box,
});
</script>

<template>
	<div class="categories mt-2 mb-2" id="categories" ref="box">
		<template v-for="(category, i) in categoriesStore.categories" :key="i">
			<p
				v-if="category.active"
				class="category-list"
				:class="{
					'custom-font-size': extraClass && !theme.jeansTheme,
					'christmas-bg': extraClass && christmas.christmasTheme,
					'retro-category-list': theme.retroTheme && !customBtn,
					'retro-btn': theme.retroTheme && customBtn,
					'category-pink-btn': theme.pinkTheme,
					'category-padding-btn': theme.elegantTheme || theme.panterTheme || theme.jeansTheme,
					'jeans-theme-btn jeans-font-size-small': theme.jeansTheme,
					'christmas-category': category.name === 'regalos de navidad' || category.name === 'regali di natale' || category.name === 'christmas gifts',
					'btn-selected': category.selectedCat,
					'christmas-bg-selected': extraClass && christmas.christmasTheme && category.selectedCat,
					'minimal-selected-btn': theme.minimalTheme && category.selectedCat,
					'retro-selected-button': theme.retroTheme && category.selectedCat && !customBtn,
					'retro-other-selected-btn': theme.retroTheme && category.selectedCat && customBtn,
					'summer-header-btn-selected': theme.summerTheme && category.selectedCat,
					'winter-selected-button': theme.winterTheme && category.selectedCat,
					'elegant-selected-button': theme.elegantTheme && category.selectedCat && !customBtn,
					'elegant-periodic-selected': theme.elegantTheme && category.selectedCat && customBtn,
					'pink-theme-selected-btn': theme.pinkTheme && category.selectedCat && !customBtn,
					'pink-other-selected': theme.pinkTheme && category.selectedCat && customBtn,
					'panter-theme-selected-button': theme.panterTheme && category.selectedCat,
					'lemon-theme-selected-btn': theme.lemonTheme && category.selectedCat && !customBtn,
					'lemon-periodic-selected': theme.lemonTheme && category.selectedCat && customBtn,
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
</template>

<style scoped>
.categories {
	opacity: 1;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	overflow: auto;
	max-height: 220px;
}

.category-list {
	display: inline-block;
	font-weight: bold;
	text-transform: capitalize;
	border: 1px solid;
	border-radius: 5px;
	margin: 0.3125rem;
	font-size: 0.875rem;
	display: flex;
	align-items: center;
	justify-content: center;
}

.category-list:hover {
	cursor: pointer;
}

.christmas-category {
	border: 2px solid red;
	box-shadow: 0px 0px 10px 0px #ff0000;
}

.christmas-bg {
	background-color: #ffffff !important;
	color: #ff0000 !important;
}

.christmas-bg-selected {
	background-color: #ff0000 !important;
	color: #ffd000 !important;
}

.custom-font-size {
	font-size: 0.813rem;
}

@media (max-width: 364px) {
	.category-list {
		font-size: 0.813rem;
	}
}
</style>
