<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useCategoriesStore } from "@/store/CategoriesStore";
import { ref, defineExpose } from "vue";

const props = defineProps({
	extraClass: Boolean,
});

const box = ref(null);
const theme = useThemeStore();
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
					'custom-font-size': extraClass,
					'retro-category-list': theme.retroTheme,
					'category-pink-btn': theme.pinkTheme,
					'category-padding-btn': theme.elegantTheme || theme.panterTheme || theme.jeansTheme,
					'jeans-theme-btn': theme.jeansTheme,
					'christmas-category': category.name === 'regalos de navidad' || category.name === 'regali di natale' || category.name === 'christmas gifts',
					'btn-selected': category.selectedCat,
					'minimal-selected-btn': theme.minimalTheme && category.selectedCat,
					'retro-selected-button': theme.retroTheme && category.selectedCat,
					'summer-header-btn-selected': theme.summerTheme && category.selectedCat,
					'winter-selected-button': theme.winterTheme && category.selectedCat,
					'elegant-selected-button': theme.elegantTheme && category.selectedCat,
					'pink-theme-selected-btn': theme.pinkTheme && category.selectedCat,
					'panter-theme-selected-button': theme.panterTheme && category.selectedCat,
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

.custom-font-size {
	font-size: 0.813rem;
}

@media (max-width: 364px) {
	.category-list {
		font-size: 0.813rem;
	}
}
</style>
