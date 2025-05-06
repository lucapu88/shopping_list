<script setup>
import FestivitiesAndOccurrences from "./components/Festivities-and-occurrences.vue";
import HeadList from "./components/header/Head-list.vue";
import ConfirmModal from "./components/panels-and-modals/Confirm-modal.vue";
import Helper from "./components/helper/Helper.vue";
import MainList from "./components/Main-list.vue";
import DeleteAllPanel from "./components/panels-and-modals/Delete-all-panel.vue";
import FooterButtonsContainer from "./components/footer/Footer-buttons-container.vue";
import PreloadImages from "./components/Preload-images.vue";
import SuggestionsModal from "./components/panels-and-modals/Suggestions-modal.vue";
import DuplicateTodoAlert from "./components/panels-and-modals/Duplicate-todo-alert.vue";
import LoadingOrUpdating from "./components/Loading-or-updating.vue";

import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useOthersFestivitiesStore } from "@/store/festivities/OthersFestivitiesStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useSuggestionsStore } from "@/store/suggestions/SuggestionsStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
</script>

<script>
export default {
	data() {
		return {
			checkChristmas: useChristmasStore(),
			otherFestivities: useOthersFestivitiesStore(),
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			theme: useThemeStore(),
			todosStore: useTodoStore(),
			suggestionsStore: useSuggestionsStore(),
			secondTodosStore: useSecondTodoStore(),
			isVisibleOnScroll: true,
		};
	},
	created() {
		this.settings.checkingUpdates(); //controllo "aggiornamenti"
		this.settings.canDeleteCheck(); //setto le impostazioni scelte dall'utente sulla conferma di cancellazione
		this.checkChristmas.merryChristmasTheme(); //controllo se è natale imposto gli addobbi
		this.otherFestivities.checkFestivities(); //controllo se ci sono altre festività
		this.todosStore.createTodosList(); //creo la lista se ci sono elementi
		this.languages.checkAndSetLanguage(); //setto la lingua in base a quella scelta dall'utente nel suo locale
		this.theme.setThemeOnLoad(); //imposto il tema in base a quello scelto dall'utente
	},
	mounted() {
		this.todosStore.toggleButtonDeleteSelectedTodo();
	},
	methods: {
		scrollTop() {
			document.getElementById("container-list").scrollTo({ top: 0, left: 0, behavior: "smooth" });
		},
		scrollBottom() {
			setTimeout(() => {
				/*Aggiunto il set timeout poichè senza non avviene nulla, 
        mentre così aspetta che appare il div per poi avere la reale grandezza e scrollare.
        Non funziona con un if(this.visible). */
				const containerList = document.getElementById("container-list");
				containerList.scrollTo({
					top: containerList.scrollHeight,
					behavior: "smooth",
				});
			}, 200);
		},
		scrollHandler(e) {
			this.isVisibleOnScroll = e.target.scrollTop < 80;
		},
	},
};
</script>

<template>
	<!-- ------------------------------------- Preload di immagini e font  -->
	<PreloadImages />

	<div
		class="app-container"
		:class="{
			'light-container': theme.lightTheme,
			'dark-container': theme.darkTheme,
			'minimal-container': theme.minimalTheme,
			'retro-container': theme.retroTheme,
			'summer-container': theme.summerTheme,
			'winter-container': theme.winterTheme,
			'pink-container': theme.pinkTheme,
		}"
	>
		<div id="app">
			<div id="container-list" class="row" @scroll="scrollHandler">
				<div class="mt-3 mx-auto padding-bottom-custom" :class="{ 'dark-sub-container': theme.darkTheme }">
					<!-- overflow hidden: l'ho messo perchè il carrellino della spesa che va insieme al titolo, va sui 1000px e crea lo scroll-x -->
					<LoadingOrUpdating :listChanged="secondTodosStore.loading" />

					<header style="overflow: hidden">
						<FestivitiesAndOccurrences :is-visible-on-scroll="isVisibleOnScroll" />
						<HeadList />
						<ConfirmModal v-if="todosStore.confirmDeleteModal" />
						<SuggestionsModal v-if="suggestionsStore.suggestionsModal" />
						<DuplicateTodoAlert v-if="todosStore.duplicateFound" />
					</header>

					<main>
						<MainList />
						<Helper v-if="settings.helper" />
					</main>

					<footer>
						<DeleteAllPanel />
						<FooterButtonsContainer v-if="!todosStore.devNotes" @scrollToTop="scrollTop" @scrollToBottom="scrollBottom" />
					</footer>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.app-container {
	height: 100vh;
	overflow-x: hidden;
}

@media (min-width: 370px) {
	.dark-sub-container {
		overflow-x: hidden;
	}
}
.light-container {
	/* repeating-linear-gradient:
			#575757a6 0 2px → Disegna una riga orizzontale colorata di 2px di altezza.
			transparent 2px 100% → Il resto è trasparente fino al 100% dell'elemento.
		background-size: 100% 30px;, quindi: Ogni 30px viene creata una nuova riga orizzontale di 2px.
		linear-gradient:
			transparent 0 20px → Lo sfondo è trasparente nei primi 20px.
			#494949bb 20px 22px → Disegna una riga verticale di 2px di larghezza con colore #494949bb.
			transparent 22px 100% → Il resto dell'elemento torna trasparente. */
	background-image: repeating-linear-gradient(#575757a6 0 2px, transparent 2px 100%), linear-gradient(90deg, transparent 0 20px, #494949bb 20px 22px, transparent 22px 100%);
	background-size: 100% 30px;
}

.dark-container,
.minimal-container,
.retro-container {
	background-image: none;
}
.summer-container {
	background-image: url("@/img/mare.webp");
	background-repeat: repeat-x;
}
.winter-container {
	background-image: url("@/img/montagne.webp");
	background-repeat: repeat-x;
}
.row {
	height: 97vh;
	overflow: auto;
}

.padding-bottom-custom {
	padding-bottom: 10%;
}

@media (min-width: 500px) {
	.summer-container {
		background-image: url("@/img/mare-tablet.webp");
		background-repeat: no-repeat;
		background-size: cover;
	}
}
@media (min-width: 650px) {
	.winter-container {
		background-image: url("@/img/montagne-tablet.webp");
		background-repeat: no-repeat;
		background-size: cover;
	}
}
</style>
