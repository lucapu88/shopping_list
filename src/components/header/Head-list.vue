<script setup>
import Title from "./Title.vue";
import HeaderButtonsContainer from "./push-button-panel/Header-buttons-container.vue";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useOthersFestivitiesStore } from "@/store/festivities/OthersFestivitiesStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
import { useSuggestionsStore } from "@/store/suggestions/SuggestionsStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import SuggestionsButton from "./SuggestionsButton.vue";
import GeneralTutorialBtn from "../helper/tutorials/General-tutorial-btn.vue";
import CategoriesPrimaryPanel from "../panels-and-modals/categories-primary-panel/Categories-primary-panel.vue";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			isChristmas: useChristmasStore(),
			festivities: useOthersFestivitiesStore(),
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			addTodo: useTodoStore(),
			suggestionsStore: useSuggestionsStore(),
			secondTodos: useSecondTodoStore(),
			apikey: null,
			firebaseUrl: null,
			showPrompt: false,
			showFirebasePrompt: false,
			selectedList: null,
		};
	},
	created() {
		this.addTodo.changeTodoAdded(this.addTodo.todos);
		this.settings.checkDevice();
		this.selectedList = this.secondTodos.listButtons.find((b) => b.selectedCondition()).name;
	},
	methods: {
		addNewTodo() {
			if (this.addTodo.showOnlyImportantTodos) {
				this.addTodo.showOnlyImportant();
			}
			//Se è un iphone (quindi solo il mio smartphone) utilizzo il sistema di classificazione dei prodotti altrimenti il sistema normale
			//Dovrei implementare un sistema sicuro per non pubblicare la mia API key, ma dato che questa funzionalità è per uso personale e non la metterò mai al servizio del cliente, per il momento lascio così, ovvero con un prompt salvo la chiave in locale.
			const openAIKey = window.localStorage.getItem("apikey");
			if (this.settings.isIphone && (!openAIKey || openAIKey === null)) {
				this.showPrompt = true;
			}
			if (this.settings.isIphone && !this.addTodo.addingToCategoryInProgress && this.settings.enableAI) {
				this.secondTodos.classificaProdotto(this.addTodo.newTodo);
			} else {
				this.addTodo.addTodo();
				this.focusOnInput();
			}
			// Stessa cosa per firebase, è solo roba mia personale per salvare le MIE spese nel cloud
			const firebase = window.localStorage.getItem("firebase");
			if (this.settings.isIphone && (!firebase || firebase === null)) {
				this.showFirebasePrompt = true;
			}
		},
		saveApiKey() {
			//serve solo per salvare la API key in locale
			if (this.apikey !== null) {
				window.localStorage.setItem("apikey", this.apikey);
				this.showPrompt = false;
			}
		},
		saveFirebaseUrl() {
			//serve solo per salvare la API key di firebase in locale
			if (this.firebaseUrl !== null) {
				window.localStorage.setItem("firebase", this.firebaseUrl);
				this.showFirebasePrompt = false;
			}
		},
		scrollToBottom() {
			const list = document.getElementById("todo-list");
			const container = document.getElementById("container-list");
			const listIsLong = list.offsetHeight > container.offsetHeight - 130;
			/*se la lista è lunga al punto che diventa scrollabile e se non è stata selezionata nessuna categoria,
              si suppone che l'elemento aggiunto sia in fondo alla lista e quindi scrollo direttamente verso il fondo per farlo notare*/
			const todoSelected = this.todos.find((t) => t.isSelected === true);
			if (listIsLong && !todoSelected) {
				document.getElementById("container-list").scrollTo(0, document.body.scrollHeight);
			}
		},
		focusOnInput() {
			this.$nextTick(function () {
				this.$refs.myInput.focus();
			});
		},
		openDevPanel() {
			if (this.settings.isAndroid) {
				return;
			}
			if (this.settings.isIphone && !this.settings.isAndroid) {
				this.addTodo.devNotes = !this.addTodo.devNotes;
			}
		},
		toggleCategoriesPrimaryPanel(event) {
			if (this.addTodo.inModification) return;
			this.addTodo.showCategoriesPrimaryPanel = event;
		},
		handleBlur() {
			const next = event.relatedTarget;

			// Se il focus va dentro il container non chiudere.
			/* 	Bastava un @pointerdown.prevent sul button che inserisce il todo, ma purtroppo android merda e chrome non lo supportano, 
				quindi devo fare questo cinema del cazzo inserendo anche tabindex="0" sul button e il focusOnInput dopo l'addTodo() */
			if (next && this.$refs.inputContainer.contains(next)) {
				return;
			}

			setTimeout(() => {
				this.toggleCategoriesPrimaryPanel(false);
			}, 150);
		},
		closeElement() {
			if (this.addTodo.inModification) {
				this.addTodo.removeSelectedCategoryToAddItem();
			}

			if (this.addTodo.showCategoriesPrimaryPanel) {
				this.$nextTick(function () {
					this.$refs.myInput.blur();
				});
			}
		},
	},
};
</script>

<template>
	<!-- TOFIX non so se è una cosa brutta da fare ma per il momento è l'unica soluzione trovata. Avendo il componente Todo-list che al click su una categoria aziona un metodo nello store, questo metodo dovrebbe scatenare il focus in in questo componente nell'input. -->
	{{ addTodo.focusIn ? focusOnInput() : null }}
	<img v-if="isChristmas.christmasTheme && !isChristmas.hideElementForTest" class="christmas-garland" src="@/img/festivities/ghirlanda.webp" alt="merry-christmas" fetchpriority="high" loading="eager" />
	<div class="header-container" :class="{ christmas: isChristmas.christmasTheme }">
		<!-- DECORAZIONI HALLOWEEN -->
		<template v-if="settings.isVisibleOnScroll">
			<img v-if="festivities.halloweenTheme" class="halloween-witch-hat" src="@/img/festivities/cappello-strega.webp" alt="halloween" />
			<img v-if="festivities.halloweenTheme" class="halloween-bat bat-1" src="@/img/festivities/pipistrello-1.webp" alt="halloween_bat" />
			<img v-if="festivities.halloweenTheme" class="halloween-bat bat-2" src="@/img/festivities/pipistrello-2.webp" alt="halloween_bat" />
			<img v-if="festivities.halloweenTheme" class="halloween-bat bat-3" src="@/img/festivities/pipistrello-3.webp" alt="halloween_bat" />
		</template>
		<!-- TITOLO APPLICATIVO -->
		<Title />
		<!-- PULSANTE TUTORIAL -->
		<GeneralTutorialBtn :read-only="false" />

		<div class="selected-list-name">
			<span>
				{{ languages.selectedListText }}<small class="text-danger">{{ selectedList }}</small>
			</span>
		</div>
		<!-- ------------------------------------CONTENITORE DELL'INPUT PER AGGIUNGERE PRODOTTI -->
		<div class="input-btns-container" ref="inputContainer" v-if="!addTodo.devNotes">
			<!-- X DI CHIUSURA CATEGORIA -->
			<span v-if="addTodo.inModification || addTodo.showCategoriesPrimaryPanel" class="remove-selected-cat" @click="closeElement()"> X </span>

			<input
				class="inputText border border-primary rounded"
				:class="{
					'placeholder-selected': languages.placeholder != languages.defaultPlaceholderText && !theme.elegantTheme,
					'elegant-placeholder': theme.elegantTheme,
					'boldi-cipollino': theme.jeansTheme,
				}"
				ref="myInput"
				@focus="toggleCategoriesPrimaryPanel(true)"
				@blur="handleBlur()"
				v-model="addTodo.newTodo"
				:disabled="secondTodos.loadingOpenAIRes"
				@keypress.enter="addNewTodo()"
				:placeholder="languages.placeholder"
			/>
			<button class="btn btn-info" :class="{ 'elegant-btn': theme.elegantTheme }" tabindex="0" @click="addNewTodo()">
				<img v-if="!theme.lemonTheme" class="plane" src="@/img/icons/paper-plane.webp" alt="paper-plane" />
				<img v-if="theme.lemonTheme" id="lemon-img" class="plane" src="@/img/lemon-send.webp" alt="lemon" />
			</button>
		</div>
		<div class="inputs" v-if="showPrompt || showFirebasePrompt">
			<!-- QUESTO INPUT MI SERVE SOLO PER INSERIRE LA API KEY PER L'INTELLIGENZA ARTIFICIALE -->
			<input v-if="showPrompt" placeholder="chatGPT" v-model="apikey" @keypress.enter="saveApiKey()" />
			<!-- QUESTO INPUT MI SERVE SOLO PER INSERIRE LA API KEY PER FIREBASE -->
			<input v-if="showFirebasePrompt" placeholder="fireBase" v-model="firebaseUrl" @keypress.enter="saveFirebaseUrl()" />
		</div>

		<!-- PANNELLO DELLE CATEGORIE QUANDO SI STA INSERENDO UN PRODOTTO -->
		<CategoriesPrimaryPanel v-if="addTodo.showCategoriesPrimaryPanel" />

		<!-- PULSANTE MOSTRA SUGGERIMENTI -->
		<SuggestionsButton />

		<!-- PULSANTIERA -->
		<HeaderButtonsContainer />

		<p class="text-center mt-2 p-1 pb-0 mb-0" v-if="addTodo.showOnlyImportantTodos">
			<span class="important-info-text">{{ languages.importantInfoText }}</span>
		</p>
	</div>
</template>

<style scoped>
.header-container {
	max-width: 600px;
	position: relative;
	margin: 0 auto;
}

.christmas {
	margin-top: 2.5rem;
}

.halloween-witch-hat {
	width: 60px;
	height: 55px;
	position: absolute;
	top: 0;
	left: 0;
}
.halloween-bat {
	width: 30px;
	height: 15px;
	position: absolute;
	opacity: 0;
	animation: batAppear 3s infinite;
	/* animation-fill-mode: forwards; */
	/* animation-iteration-count: 2; */
	z-index: 5;
}
.bat-1 {
	top: 0px;
	left: 20%;
	animation-delay: 4s;
	z-index: 5;
}
.bat-2 {
	top: 18%;
	left: 17%;
	animation-delay: 6.5s;
	z-index: 5;
}
.bat-3 {
	top: 0;
	left: 30%;
	animation-delay: 8s;
	z-index: 5;
}
@keyframes batAppear {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.selected-list-name {
	margin-left: 10%;
}
.selected-list-name > span {
	font-size: 0.875rem;
}

.placeholder-selected {
	background-color: #a6cef8;
}
.btn-info {
	padding: 0.625rem;
}

.remove-selected-cat {
	color: #d00000;
	font-size: larger;
}
.input-btns-container {
	display: flex;
	align-items: baseline;
	gap: 10px;
	justify-content: center;
}
.inputText {
	padding: 0.625rem;
	width: 70%;
	text-align: center;
}

.inputs {
	display: flex;
	justify-content: center;
	flex-direction: column;
	gap: 10px;
	padding: 0.625rem;
}

.important-info-text {
	font-size: 0.813rem;
}
</style>
