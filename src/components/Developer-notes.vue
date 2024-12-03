<script setup>
import { useTodoStore } from "@/store/TodoStore";
</script>

<script>
export default {
	data() {
		return {
			todosStore: useTodoStore(),
			devNotes: "",
		};
	},
	created() {
		this.devNotes = window.localStorage.getItem("devNotes");
	},
	mounted() {
		this.todosStore.categoryList = false;
	},
	methods: {
		saveNotes() {
			if (this.devNotes.length > 3) {
				window.localStorage.setItem("devNotes", this.devNotes);
			}
		},
	},
};
</script>

<template>
	<div class="developer-notes-container">
		<textarea class="dev-notes" v-model="devNotes" name="dev-notes" rows="25" @input="saveNotes()"></textarea>
	</div>
</template>

<style scoped>
.developer-notes-container {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
}
.dev-notes {
	width: 100%;
	font-family: monospace;
	background-color: #ffffffa1;
	border: 2px ridge; /* Forrester */
	border-radius: 5px;
	padding: 15px 20px;
}
</style>
