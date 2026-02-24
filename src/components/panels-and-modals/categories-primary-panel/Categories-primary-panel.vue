<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useCategoriesStore } from "@/store/CategoriesStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useSettingsStore } from "@/store/SettingsStore";
import CustomButton from "../../common/Custom-button.vue";
import CategoriesContainer from "./Categories-container.vue";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			todosStore: useTodoStore(),
			settings: useSettingsStore(),
			secondTodos: useSecondTodoStore(),
			categoriesStore: useCategoriesStore(),
			hasVerticalScroll: false,
			scrollBottom: false,
			whiteText: false,
		};
	},
	mounted() {
		this.whiteText = this.theme.darkTheme || this.theme.retroTheme || this.theme.winterTheme || this.theme.elegantTheme || this.theme.panterTheme;
		this.todosStore.defaultOptionsForCategorizing();
		this.categoriesStore.resetSelectedCat();
		this.checkScroll();
	},
	unmounted() {
		this.todosStore.defaultOptionsForCategorizing();
	},
	methods: {
		checkScroll() {
			const el = this.$refs.boxRef.$refs.box;
			this.hasVerticalScroll = el.scrollHeight > el.clientHeight;
		},
		scroll() {
			const box = this.$refs.boxRef.$refs.box;
			this.scrollBottom = !this.scrollBottom;
			!this.scrollBottom ? document.getElementById("categories").scrollTo({ top: 0, left: 0, behavior: "smooth" }) : document.getElementById("categories").scrollTo({ top: box.scrollHeight, left: 0, behavior: "smooth" });
		},
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
			class="category-list-description p-1"
			:class="{
				'white-text': whiteText,
				'black-text': !whiteText,
				'retro-helper-settings-title': theme.retroTheme,
				'jeans-category-modal-title': theme.jeansTheme,
			}"
		>
			<small>
				{{ languages.selectCategoryText }}
			</small>
		</p>

		<CategoriesContainer ref="boxRef" />

		<div class="category-footer">
			<CustomButton v-if="settings.isIphone" extra-classes="show-periodic-list-button" :otherBtnStyle="true" @click="secondTodos.periodicListContainerVisible = true">
				<span> {{ languages.periodicList.periodicListButtonText }} </span>
			</CustomButton>

			<CustomButton v-if="hasVerticalScroll" extra-classes="scroll-button" :otherBtnStyle="true" @touchstart.prevent="scroll()" @mousedown.prevent="scroll()">
				<span
					class="arrow"
					:class="{
						'arrow-selected': !scrollBottom,
						'arrow-deselected': scrollBottom,
					}"
				>
					^
				</span>
			</CustomButton>
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

.category {
	background: rgba(192, 224, 133, 0.75);
	border-radius: 15px;
}

.category-list-description {
	font-size: 0.938rem;
	margin: 0;
	border-bottom: 1px solid;
}

.category-footer {
	display: flex;
	justify-content: flex-end;
	padding: 5px;
	border-top: 1px solid;
}

.scroll-button,
.show-periodic-list-button {
	width: 50px;
	height: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.show-periodic-list-button {
	margin-right: 30%;
	width: 150px;
	border-radius: 5px;
}

.arrow {
	font-size: 1.125rem;
}
</style>
