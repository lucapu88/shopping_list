<script setup>
import { useTodoStore } from "@/store/TodoStore";
</script>

<script>
/* 	QUESTO COMPONENTE, PER IL MOMENTO, È ROBA MIA ED APPARE SOLO SU IPHONE (PERCHÈ USO QUELLO E SU IPHONE NON C'È QUESTA APP).
	PER IL MOMENTO LO TESTO E POI DECIDERO' SE METTERLO IN PRODUZIONE O MENO */
export default {
	data() {
		return {
			todosStore: useTodoStore(),
			textAreas: [
				{ index: 1, list: true, devNotes: "", localStorageItem: "devNotes" },
				{ index: 2, list: false, devNotes: "", localStorageItem: "devNotes2" },
				{ index: 3, list: false, devNotes: "", localStorageItem: "devNotes3" },
				{ index: 4, list: false, devNotes: "", localStorageItem: "devNotes4" },
				{ index: 5, list: false, devNotes: "", localStorageItem: "devNotes5" },
			],
		};
	},
	created() {
		this.textAreas.forEach((el) => {
			el.devNotes = window.localStorage.getItem(el.localStorageItem);
		});
	},
	mounted() {
		this.todosStore.categoryList = false;
	},
	methods: {
		saveNotes(el) {
			if (el.devNotes.length > 3) {
				window.localStorage.setItem(el.localStorageItem, el.devNotes);
			}
		},
		switchList(item) {
			this.textAreas.map((el) => (el.list = false));
			item.list = true;
		},
		addDash(event, item) {
			const textarea = event.target;
			const cursorPosition = textarea.selectionStart;
			const value = item.devNotes;
			// Trova il testo prima e dopo il cursore
			const beforeCursor = value.substring(0, cursorPosition);
			const afterCursor = value.substring(cursorPosition);
			// Trova il contenuto della riga corrente dopo il cursore
			const currentLineAfterCursor = afterCursor.split("\n")[0];

			// Aggiungi il dash solo se il testo dopo il cursore è vuoto o contiene solo spazi
			if (currentLineAfterCursor.trim() === "") {
				item.devNotes = beforeCursor + "\n- " + afterCursor;
				// Aggiorna il valore del textarea (se necessario)
				textarea.value = item.devNotes;
				// Sposta il cursore immediatamente dopo "- "
				const newCursorPosition = cursorPosition + 3; // Lunghezza di "\n- "
				textarea.setSelectionRange(newCursorPosition, newCursorPosition);
			}
		},
	},
};
</script>

<template>
	<div class="developer-notes-container">
		<div class="buttons-container">
			<template v-for="(button, i) in textAreas" :key="i">
				<button class="change-list-button" :class="{ 'change-list-button-selected': button.list }" @click="switchList(button)">{{ button.index }}</button>
			</template>
		</div>
		<template v-for="(item, i) in textAreas" :key="i">
			<textarea v-if="item.list" class="dev-notes" v-model="item.devNotes" name="dev-notes" rows="25" @input="saveNotes(item)" @keyup.enter="addDash($event, item)"></textarea>
		</template>
	</div>
</template>

<style scoped>
.developer-notes-container {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px 15px;
	display: flex;
	flex-direction: column;
}
.buttons-container {
	display: flex;
	gap: 15px;
	margin-bottom: 15px;
}
.buttons-container > button {
	width: 55px;
	height: 30px;
}
.dev-notes {
	width: 100%;
	font-family: monospace;
	background-color: #ffffffa1;
	border: 2px ridge; /* Forrester */
	border-radius: 5px;
	padding: 15px 20px;
	font-weight: bold;
}

.change-list-button {
	font-family: "Open Sans", sans-serif;
	font-size: 16px;
	letter-spacing: 2px;
	text-decoration: none;
	text-transform: uppercase;
	color: #000;
	cursor: pointer;
	border: 3px solid;
	padding: 0.25em 0.5em;
	box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
	position: relative;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
}

.change-list-button-selected {
	box-shadow: 0px 0px 0px 0px;
	background-color: rgb(151, 209, 186);
	top: 5px;
	left: 5px;
	font-weight: bold;
}

@media (min-width: 768px) {
	.change-list-button {
		padding: 0.25em 0.75em;
	}
}
</style>
