<script setup>
import Title from "./Title.vue";
import HeaderButtonsContainer from "./Header-buttons-container.vue";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useOthersFestivitiesStore } from "@/store/festivities/OthersFestivitiesStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
import { useSuggestionsStore } from "@/store/suggestions/SuggestionsStore";
import SuggestionsButton from "./SuggestionsButton.vue";
import ListsButtonsSelection from "./Lists-buttons-selection.vue";
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
		};
	},
	created() {
		this.addTodo.changeTodoAdded(this.addTodo.todos);
		this.settings.checkDevice();
	},
	methods: {
		showHelper() {
			this.settings.openHelper();
			if (this.settings.helper) {
				window.scrollTo(0, 0);
				document.documentElement.style.overflow = "hidden";
				this.addTodo.focusIn = false;
			} else {
				document.documentElement.style.overflow = "auto";
			}
		},
		addNewTodo() {
			if (this.addTodo.showOnlyImportantTodos) {
				this.addTodo.showOnlyImportant();
			}
			this.addTodo.addTodo();
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
	},
};
</script>

<template>
	<!-- TOFIX non so se è una cosa brutta da fare ma per il momento è l'unica soluzione trovata. Avendo il componente Todo-list che al click su una categoria aziona un metodo nello store, questo metodo dovrebbe scatenare il focus in in questo componente nell'input. -->
	{{ addTodo.focusIn ? focusOnInput() : null }}
	<img v-if="isChristmas.christmasTheme" class="christmas-garland" src="@/img/festivities/ghirlanda.webp" alt="merry-christmas" />
	<div class="header-container" :class="{ christmas: isChristmas.christmasTheme }">
		<img v-if="festivities.halloweenTheme" class="halloween-witch-hat" src="@/img/festivities/cappello-strega.webp" alt="halloween" />
		<img v-if="festivities.halloweenTheme" class="halloween-bat bat-1" src="@/img/festivities/pipistrello-1.webp" alt="halloween_bat" />
		<img v-if="festivities.halloweenTheme" class="halloween-bat bat-2" src="@/img/festivities/pipistrello-2.webp" alt="halloween_bat" />
		<img v-if="festivities.halloweenTheme" class="halloween-bat bat-3" src="@/img/festivities/pipistrello-3.webp" alt="halloween_bat" />

		<!-- TITOLO APPLICATIVO -->
		<Title />

		<!-- PULSANTE TOGGLE HELPER -->
		<span
			class="helper"
			:class="{
				'helper-selected': settings.helper,
				'helper-deselected': settings.helperInClosing,
				'helper-btn-dark': theme.darkTheme,
			}"
			@click="showHelper()"
		>
			<img class="settings" src="@/img/icons/settings.webp" alt="settings" />
		</span>

		<!-- ------------------------------------CONTENITORE DELL'INPUT PER AGGIUNGERE PRODOTTI -->
		<div class="input-btns-container" v-if="!addTodo.devNotes">
			<span v-if="addTodo.inModification" class="remove-selected-cat" @click="addTodo.removeSelectedCategoryToAddItem()"> X </span>
			<input
				class="inputText border border-primary rounded"
				:class="{
					'placeholder-selected': languages.placeholder != languages.defaultPlaceholderText && !theme.elegantTheme,
					'elegant-placeholder': theme.elegantTheme,
					'boldi-cipollino': theme.jeansTheme,
				}"
				ref="myInput"
				v-model="addTodo.newTodo"
				@keypress.enter="addNewTodo()"
				:placeholder="languages.placeholder"
			/>
			<button class="btn btn-info" :disabled="addTodo.newTodo && !addTodo.newTodo.trim()" :class="{ 'elegant-btn': theme.elegantTheme }" @click="addNewTodo()">
				<img v-if="!theme.lemonTheme" class="plane" src="@/img/icons/paper-plane.webp" alt="paper-plane" />
				<img v-if="theme.lemonTheme" id="lemon-img" class="plane" src="@/img/lemon-send.webp" alt="lemon" />
			</button>
		</div>

		<!-- PULSANTE MOSTRA SUGGERIMENTI -->
		<SuggestionsButton />

		<!-- PULSANTIERA -->
		<HeaderButtonsContainer />

		<!-- SELEZIONE LISTE -->
		<ListsButtonsSelection v-if="!addTodo.devNotes" />
	</div>
</template>

<style scoped>
.header-container {
	width: 100vw;
	min-width: 345px;
	max-width: 600px;
	position: relative;
	margin: 0 auto;
}
.christmas {
	margin-top: 40px;
}

.halloween-witch-hat {
	width: 60px;
	position: absolute;
	top: 0;
	left: 0;
}
.halloween-bat {
	width: 30px;
	position: absolute;
	opacity: 0;
	animation: batAppear 3s infinite;
	/* animation-fill-mode: forwards; */
	/* animation-iteration-count: 2; */
	z-index: 5;
}
.bat-1 {
	top: -10px;
	left: 12%;
	animation-delay: 4s;
	z-index: 5;
}
.bat-2 {
	top: 8%;
	left: 15%;
	animation-delay: 6.5s;
	z-index: 5;
}
.bat-3 {
	top: 0;
	left: 23%;
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

.placeholder-selected {
	background-color: #a6cef8;
}
.btn-info {
	padding: 10px;
}

.helper-selected {
	-webkit-animation: spin 2s linear;
	-moz-animation: spin 2s linear;
	animation: spin 2s linear;
}
@-moz-keyframes spin {
	100% {
		-moz-transform: rotate(360deg);
	}
}
@-webkit-keyframes spin {
	100% {
		-webkit-transform: rotate(360deg);
	}
}
@keyframes spin {
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

.helper-deselected {
	-webkit-animation: reverseSpin 1.5s linear;
	-moz-animation: reverseSpin 1.5s linear;
	animation: reverseSpin 1.5s linear;
}
@-moz-keyframes reverseSpin {
	100% {
		-moz-transform: rotate(-360deg);
	}
}
@-webkit-keyframes reverseSpin {
	100% {
		-webkit-transform: rotate(-360deg);
	}
}
@keyframes reverseSpin {
	100% {
		-webkit-transform: rotate(-360deg);
		transform: rotate(-360deg);
	}
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
	padding: 10px;
	width: 70%;
	text-align: center;
}

.helper {
	position: absolute;
	top: 0;
	right: 10px;
	border-radius: 50%;
	z-index: 300;
	margin-right: 2%;
}

.helper:hover {
	cursor: pointer;
}
.settings {
	width: 33px;
	z-index: 300;
}
</style>
