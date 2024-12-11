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
	computed: {
		todoSecondList() {
			return this.todosStore.todoSecondList;
		},
	},
	watch: {
		/*        
          _______ ____       ______ _______   __
         |__   __/ __ \     |  ____|_   _\ \ / /
            | | | |  | |    | |__    | |  \ V / 
            | | | |  | |    |  __|   | |   > <  
            | | | |__| |    | |     _| |_ / . \ 
            |_|  \____/     |_|    |_____/_/ \_\
        
        CI SONO DA GESTIRE LE PARTI:
         - IMPORT DA ALTRE APP
         - MOSTRA GLI ULTIMI CANCELLATI
         - BACKUP LISTA
         - MODALITA' ELIMINAZIONE SICURA
         - AUTOELIMINAZIONE CATEGORIE VUOTE
         - FARE TUTTA LA PARTE GRAFICA DELLO STILE */

		"todosStore.todoSecondList"(newVal, oldVal) {
			console.log(`todoSecondList cambiato da ${oldVal} a ${newVal}`);
			this.todosStore.createTodosList();
			this.todosStore.toggleButtonDeleteSelectedTodo();
			this.todosStore.showOnlyImportantTodos = false;
			this.todosStore.isDraggable = false;
			this.todosStore.resetModify();
			this.todosStore.inModification = false;
			this.todosStore.todos.map((t) => (t.isSelected = false));
			this.languages.placeholder = this.languages.defaultPlaceholderText;
		},
	},
	methods: {},
};
</script>
<template>
	<div class="switch-list-buttons-container">
		<button @click="todosStore.todoSecondList = false">List 1</button>
		<button @click="todosStore.todoSecondList = true">List 2</button>
	</div>
</template>

<style scoped>
.switch-list-buttons-container {
	display: flex;
	justify-content: center;
	gap: 30px;
}
</style>
