<script setup>
import { useTodoStore } from "@/store/TodoStore";
</script>

<script>
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
			const cursorPosition = event.target.selectionStart;
			const value = item.devNotes;
			// Trova il testo prima e dopo il cursore
			const beforeCursor = value.substring(0, cursorPosition);
			const afterCursor = value.substring(cursorPosition);
			// Aggiungi "- " dopo il ritorno a capo
			item.devNotes = beforeCursor + "- " + afterCursor;
		},
	},
};
</script>

<template>
	<div class="developer-notes-container">
		<div class="buttons-container">
			<template v-for="(button, i) in textAreas" :key="i">
				<button :class="{ 'btn-selected': button.list }" @click="switchList(button)">{{ button.index }}</button>
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
	padding: 15px;
	display: flex;
	flex-direction: column;
}
.buttons-container {
	display: flex;
}
.buttons-container > button {
	width: 50px;
	margin-left: 5px;
	margin-right: 5px;
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
</style>
