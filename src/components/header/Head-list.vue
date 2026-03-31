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
			selectedList: null,
			isListening: false,
			recognition: null,
			_visibilityHandler: null,
		};
	},
	created() {
		this.addTodo.changeTodoAdded(this.addTodo.todos);
		this.settings.checkMyPersonalConf();
		this.selectedList = this.secondTodos.listButtons.find((b) => b.selectedCondition()).name;
	},
	beforeUnmount() {
		this._stopDictation();
	},
	methods: {
		addNewTodo() {
			this.setMyPersonalConfiguration();
			if (this.addTodo.showOnlyImportantTodos) {
				this.addTodo.showOnlyImportant();
			}

			const enableAI = JSON.parse(window.localStorage.getItem("enableAI"));
			if (this.settings.customSettings && !this.addTodo.addingToCategoryInProgress && enableAI) {
				this.secondTodos.classificaProdotto(this.addTodo.newTodo);
			} else {
				this.addTodo.addTodo();
				this.focusOnInput();
			}
		},
		setMyPersonalConfiguration() {
			const todo = this.addTodo.newTodo;
			if (!todo) {
				return;
			}
			/* Cosa cazzo sto facendo? Allora, stiamo calmi: mi serve salvare l'Api key di openAi, dovrei sviluppare tutto un sistema di backend a parte, lo so ma non mi va per questa stronzata quindi faccio questa cosa:
			   Se inserisco l'apikey nell'input lo salvo, e in questo modo sono sicurissimo al 100% che nessuno potrà replicarlo per sbaglio, 
			   perchè l'utente dovrebbe inserire una stringa che inizia in un determinato modo e che sia lunga 164 o 75 caratteri. */
			const apikey = window.localStorage.getItem("apikey");
			if (todo.length === 164 && todo.startsWith("sk-proj-") && apikey === null) {
				window.localStorage.setItem("apikey", todo);
				this.addTodo.newTodo = "";
			}

			const url = window.localStorage.getItem("firebase");
			if (todo.length === 75 && todo.startsWith("https://shopping") && url === null) {
				window.localStorage.setItem("firebase", todo);
				this.addTodo.newTodo = "";
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
			if (this.settings.customSettings && !this.settings.isAndroid) {
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
		startDictation() {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

			if (!SpeechRecognition) {
				alert("Your browser does not support speech recognition.");
				return;
			}

			// Se già in ascolto, ferma il riconoscimento esplicitamente
			if (this.isListening) {
				this._stopDictation();
				return;
			}

			this.isListening = true;
			this.addTodo.showCategoriesPrimaryPanel = true;
			this._avviaSessioneRiconoscimento();

			// Su mobile, se l'utente riduce a icona o cambia app, stoppa la dettatura.
			// L'utente dovrà ricliccare manualmente per riprendere.
			this._visibilityHandler = () => {
				if (document.visibilityState === "hidden") {
					this._stopDictation();
				}
			};
			document.addEventListener("visibilitychange", this._visibilityHandler);
		},
		_avviaSessioneRiconoscimento() {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			const recognition = new SpeechRecognition();
			recognition.lang = navigator.language;
			recognition.interimResults = false;
			recognition.continuous = true;
			this.recognition = recognition;

			recognition.onresult = (event) => {
				// Con continuous=true i risultati si accumulano: prendiamo sempre l'ultimo
				const transcript = event.results[event.results.length - 1][0].transcript;
				this.addTodo.newTodo = this.addTodo.newTodo ? this.addTodo.newTodo + " " + transcript : transcript;
			};

			recognition.onerror = (event) => {
				if (event.error === "not-allowed") {
					alert(this.languages.microphoneRec.permissionDeniedText);
					this._stopDictation();
				}
			};

			recognition.onend = () => {
				// Riavvia solo se la pagina è visibile e l'utente non ha fermato esplicitamente
				if (this.isListening && document.visibilityState !== "hidden") {
					recognition.start();
				}
			};

			recognition.start();
		},
		_stopDictation() {
			this.isListening = false;
			this.addTodo.showCategoriesPrimaryPanel = false;
			this.recognition?.stop();
			if (this._visibilityHandler) {
				document.removeEventListener("visibilitychange", this._visibilityHandler);
				this._visibilityHandler = null;
			}
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

			<div class="input-wrapper">
				<input
					class="inputText border border-primary rounded"
					:class="{
						'minimal-input': theme.minimalTheme,
						'placeholder-selected': languages.placeholder != languages.defaultPlaceholderText && !theme.elegantTheme,
						'elegant-placeholder': theme.elegantTheme,
						'boldi-cipollino': theme.jeansTheme,
					}"
					ref="myInput"
					@focus="toggleCategoriesPrimaryPanel(true)"
					@blur="handleBlur()"
					v-model="addTodo.newTodo"
					:disabled="secondTodos.loadingOpenAIRes"
					@keypress.enter="
						addNewTodo();
						setMyPersonalConfiguration();
					"
					:placeholder="languages.placeholder"
				/>
				<!-- Purtroppo, la WebView con kodular continua a bloccare, quindi da app non si può usare...Per ora lo metto solo per gli iPhone perchè io lo voglio usare -->
				<button v-if="settings.isIphone || !settings.isAndroid" class="mic-btn" :class="{ 'mic-btn--listening': isListening }" type="button" @click="startDictation()" :title="isListening ? 'Ferma dettatura' : 'Avvia dettatura'">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
						<path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
					</svg>
				</button>
			</div>
			<button class="btn btn-info" :class="{ 'elegant-btn': theme.elegantTheme, 'minimal-send-btn': theme.minimalTheme }" tabindex="0" @click="addNewTodo()">
				<img v-if="!theme.lemonTheme && !theme.minimalTheme" class="plane" src="@/img/icons/paper-plane.webp" alt="paper-plane" />
				<img v-if="theme.minimalTheme" class="plane" src="@/img/icons/paper-plane-minimal.webp" alt="paper-plane" />
				<img v-if="theme.lemonTheme" id="lemon-img" class="plane" src="@/img/lemon-send.webp" alt="lemon" />
			</button>
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
.input-wrapper {
	position: relative;
	width: 70%;
}

.inputText {
	padding: 0.625rem;
	padding-right: 2.2rem;
	width: 100%;
	text-align: center;
}

.mic-btn {
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	cursor: pointer;
	color: #6c757d;
	padding: 0px;
	padding-right: 0px;
	line-height: 1;
	transition: color 0.2s;
	height: 100%;
	width: 30px;
}

/* .mic-btn:hover {
	color: #0d6efd;
} */

.mic-btn--listening {
	color: #dc3545;
	font-weight: bold;
	animation: micPulse 1s ease-in-out infinite;
}

@keyframes micPulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.4;
	}
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
