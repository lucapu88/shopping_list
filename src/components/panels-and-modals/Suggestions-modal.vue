<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useCategoriesStore } from "@/store/CategoriesStore";
import { useSuggestionsStore } from "@/store/suggestions/SuggestionsStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
</script>

<script>
export default {
	data() {
		return {
			languages: useLanguageStore(),
			categoriesStore: useCategoriesStore(),
			themes: useThemeStore(),
			todosStore: useTodoStore(),
			suggestionsStore: useSuggestionsStore(),
			isChristmas: useChristmasStore(),
			noSuggestions: false,
		};
	},
	created() {
		const christmasEmojy = this.categoriesStore.engCategories.find((cat) => cat.name === "christmas gifts").emojy;
		const onlineEmojy = this.categoriesStore.engCategories.find((cat) => cat.name === "online shopping").emojy;
		//se l'emoticon della categoria scelta è uguale ad una delle emoticon per le quali NON ci sono suggerimenti
		this.noSuggestions = this.todosStore.categoryEmo == christmasEmojy || this.todosStore.categoryEmo == onlineEmojy;
	},
};
</script>

<template>
	<div class="modal suggestions">
		<div
			class="suggestions-modal-container"
			:class="{
				'sugg-modal-light': themes.lightTheme,
				'sugg-modal-dark': themes.darkTheme,
				'sugg-modal-minimal': themes.minimalTheme,
				'sugg-modal-retro': themes.retroTheme,
				'sugg-modal-summer': themes.summerTheme,
				'sugg-modal-winter': themes.winterTheme,
				'sugg-modal-elegant': themes.elegantTheme,
				'sugg-modal-pink': themes.pinkTheme,
				'sugg-modal-panter': themes.panterTheme,
				'sugg-modal-lemon': themes.lemonTheme,
				'sugg-modal-jeans': themes.jeansTheme,
			}"
		>
			<header>
				<img v-if="isChristmas.christmasTheme" class="santa-claus" src="@/img/festivities/babbo-natale.webp" loading="lazy" alt="OH-OH-OOOOH-Merry-Christmas" />
				<div class="title-close-container">
					<h4>
						{{ todosStore.categoryName }}
						<span v-if="!isChristmas.christmasTheme">
							{{ todosStore.categoryEmo }}
						</span>
					</h4>
					<span class="close-sugg-modal" @click="suggestionsStore.toggleSuggestionsModal()">
						X
						<img v-if="isChristmas.christmasTheme" class="ghirlanda-tonda" src="@/img/festivities/ghirlanda-tonda.webp" loading="lazy" alt="merry-christmas" />
					</span>
				</div>
				<div class="header-info">
					<small v-if="!noSuggestions" :class="{ 'christmas-subtitle': isChristmas.christmasTheme }">
						{{ languages.suggestions.headerInfo }}
					</small>
				</div>
			</header>
			<main>
				<p
					class="tip"
					:class="{
						'boldi-cipollino': themes.elegantTheme,
						'under-pressure': themes.lightTheme,
					}"
					v-for="(tip, n) in suggestionsStore.suggestionsList"
					:key="n"
					@click="suggestionsStore.addTip(tip, noSuggestions)"
				>
					<strong v-if="!noSuggestions"> + </strong>
					{{ tip }}
				</p>
			</main>
			<footer v-if="isChristmas.christmasTheme">
				<img :class="{ 'arrotonda-sto-bordo': !themes.retroTheme }" class="decorations" src="@/img/festivities/christmas-decorations-sinistra.webp" loading="lazy" alt="Merry-Christmas" />
				<img :class="{ 'arrotonda-sto-bordo': !themes.retroTheme }" class="decorations" src="@/img/festivities/christmas-decorations-destra.webp" loading="lazy" alt="Merry-Christmas" />
			</footer>
		</div>
	</div>
</template>

<style scoped>
.modal {
	padding-top: 0;
	z-index: 400;
}
.suggestions {
	display: flex;
	justify-content: center;
	align-items: center;
}
.suggestions-modal-container {
	position: relative;
	width: 90%;
	height: 90%;
}
.suggestions-modal-container > header {
	text-align: center;
	margin-top: 0.625rem;
	display: flex;
	flex-direction: column;
	position: relative;
}
.santa-claus {
	position: absolute;
	top: -8px;
	left: 3px;
	height: 65px;
	width: 55px;
	z-index: 10;
}
.title-close-container {
	z-index: 11;
}
.header-info {
	line-height: 1;
	min-height: 20px;
	z-index: 20;
}
.suggestions-modal-container > main {
	height: 88%;
	padding: 0 15px;
	overflow: auto;
	text-align: center;
	font-size: 1.25rem;
	position: relative;
	z-index: 5;
}
.close-sugg-modal {
	position: absolute;
	top: -20px;
	right: -10px;
	width: 35px;
	height: 36px;
	text-align: center;
	font-weight: bold;
	padding-top: 5px;
	background-color: white;
	border-radius: 50%;
	border: 1px solid;
}
.ghirlanda-tonda {
	position: absolute;
	top: 0;
	right: -1px;
	width: 35px;
	height: 40px;
}
.tip {
	margin-bottom: 0.313rem;
}
.suggestions-modal-container > footer {
	display: flex;
	justify-content: space-between;
	position: absolute;
	bottom: 0px;
	width: 100%;
	z-index: 0;
}
.decorations {
	width: 100px;
	height: 108px;
}
.christmas-subtitle {
	background-color: #dfbf5d;
	color: #ff0000;
}
</style>
