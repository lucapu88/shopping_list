<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			todosStore: useTodoStore(),
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
			'waterfall-ascent': todosStore.categoryList === false,
			'retro-theme-confirm': theme.retroTheme,
			'light-theme-confirm': theme.lightTheme,
			'category-pink-container': theme.pinkTheme,
			'category-lemon-container': theme.lemonTheme,
			'category-jeans-container': theme.jeansTheme,
		}"
	>
		<div v-if="todosStore.categoryListChildren" class="categories">
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
			<template v-for="(category, i) in languages.categories" :key="i">
				<p
					class="category-list"
					:class="{
						'retro-category-list': theme.retroTheme,
						'category-pink-btn': theme.pinkTheme,
						'jeans-theme-btn': theme.jeansTheme,
						'christmas-category': category.name === 'regalos de navidad' || category.name === 'regali di natale' || category.name === 'christmas gifts',
					}"
					v-if="category.active"
				>
					<span
						:class="{
							'animation-no-retro': !theme.retroTheme,
							'winter-category-list': theme.winterTheme,
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
				@click="languages.insertAllCategories()"
			>
				<span>{{ languages.insertAll }}</span>
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
				<span>{{ languages.removeEmpty }}</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
.category-list-container {
	width: 365px;
	display: none;
	text-align: center;
	border: 1px solid;
	border-radius: 5px;
	margin: 0 auto;
	margin-bottom: 10px;
}

.categories {
	opacity: 1;
	/*TOFIX: Da valutare se mettere una dimensione fissa o meno...vediamo quando la modale sarà, se sarà, lunga */
	/* max-height: 450px;
	overflow: auto; */
	-webkit-animation: fadeIn 1s;
	animation: fadeIn 1s;
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
	z-index: 100;
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
	padding: 1px 3px;
	margin: 5px;
}
.category-list:hover {
	cursor: pointer;
}
.category-list-description {
	font-size: small;
	margin: 0;
}
.selected {
	text-align: center;
	background-color: #0169d9;
	color: #ffffff;
	border-radius: 5px;
	padding-left: 3px;
	animation: underline 0.8s ease-out;
}
@keyframes underline {
	0% {
		width: 0;
	}
	100% {
		width: 200px;
	}
}

.categoryActive {
	padding-right: 0.625rem !important;
	margin: 5px !important;
	background-color: transparent !important;
	border: none !important;
	padding-top: 0 !important;
	padding-bottom: 0 !important;
}

.custom-show-listbtn {
	background-color: rgba(192, 224, 133, 0.883);
	border: 2px solid rgb(180, 230, 89);
	border-radius: 10%;
	padding: 2px;
	min-width: 30px;
	width: 60px;
}
.custom-show-listbtn > img {
	width: 20px;
}
.insert-all-btn {
	margin: 15px 5px 10px;
}
.add-remove-empty {
	display: flex;
	justify-content: center;
}
.christmas-category {
	border: 2px solid red;
	box-shadow: 0px 0px 10px 0px #ff0000;
}
</style>
