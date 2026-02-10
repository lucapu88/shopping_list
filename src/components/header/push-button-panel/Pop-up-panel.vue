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
	methods: {
		copy() {
			const myList = this.todosStore.todos.map((todo) => (todo.category ? `${todo.name.toUpperCase()}:\n` : ` ${todo.name}\n`));
			const arrayNoCommas = myList.join(" ");

			this.todosStore.categoryList = false;
			navigator.clipboard.writeText(arrayNoCommas); //copio negli appunti una lista della spesa per poterla condividere
			document.addEventListener("copy", function (e) {
				//copio negli appunti anche qui per sistemare su android (quello di sopra non funziona)
				e.clipboardData.setData("text/plain", arrayNoCommas);
				e.preventDefault();
			});
			document.execCommand("copy"); //riprovo/ricopio negli appunti anche qui per sistemare su android (per essere sicuri)
			this.languages.copyList.visible = true;
			this.todosStore.removeSelectedCategoryToAddItem();
			setTimeout(() => (this.languages.copyList.visible = false), 3000); //cambio il testo del pulsante copia
			// navigator.vibrate(400); TOFIX vedere come mai non funziona su mobile e vedere se tenerlo o meno
		},
	},
};
</script>

<template>
	<div class="pushbutton-container" :class="{ 'dark-style-pushbutton-container': theme.darkTheme }" v-if="!todosStore.devNotes">
		<!--PULSANTE COPIA LISTA-->
		<button
			class="btn pup-up-btn"
			:class="{
				'minimal-btn': theme.minimalTheme,
				'retro-teme-btns': theme.retroTheme,
				'summer-header-btn': theme.summerTheme,
				'winter-header-btn': theme.winterTheme,
				'elegant-btn': theme.elegantTheme,
				'pink-theme-btn': theme.pinkTheme,
				'panter-other-btn': theme.panterTheme,
				'lemon-other-btn': theme.lemonTheme,
				'jeans-other-btn': theme.jeansTheme,
			}"
			:disabled="!todosStore.todos.length"
			@click="copy()"
		>
			<img v-if="!theme.elegantTheme && !theme.panterTheme" class="copy" src="@/img/icons/copy.webp" alt="copy" />
			<img v-if="theme.elegantTheme && !theme.panterTheme" class="copy" src="@/img/icons/copy-elegant.webp" alt="copy" />
			<img v-if="!theme.elegantTheme && theme.panterTheme" class="copy" src="@/img/icons/copy-panter.webp" alt="copy" />

			<span>{{ languages.copyListBtnText }}</span>
		</button>
		<!-- PULSANTE MOSTRA SOLO GLI ELEMENTI EVIDENZIATI COME IMPORTANTI -->
		<button
			class="btn pup-up-btn"
			:class="{
				'btn-selected': todosStore.showOnlyImportantTodos,
				'btn-important-temporary': todosStore.addedImportant,
				'btn-important-selected': todosStore.showOnlyImportantTodos && !theme.retroTheme,
				'minimal-btn': theme.minimalTheme,
				'minimal-selected-btn': theme.minimalTheme && todosStore.showOnlyImportantTodos,
				'retro-teme-btns': theme.retroTheme,
				'retro-selected-btn': theme.retroTheme && todosStore.showOnlyImportantTodos,
				'summer-header-btn-selected': theme.summerTheme && todosStore.showOnlyImportantTodos,
				'summer-header-btn': theme.summerTheme,
				'winter-header-selected-btn': theme.winterTheme && todosStore.showOnlyImportantTodos,
				'winter-header-btn': theme.winterTheme,
				'elegant-btn': theme.elegantTheme,
				'elegant-selected-btn': theme.elegantTheme && todosStore.showOnlyImportantTodos,
				'pink-theme-btn': theme.pinkTheme,
				'pink-theme-selected-btn': theme.pinkTheme && todosStore.showOnlyImportantTodos,
				'panter-other-btn': theme.panterTheme,
				'panter-theme-selected-btn': theme.panterTheme && todosStore.showOnlyImportantTodos,
				'lemon-other-btn': theme.lemonTheme,
				'lemon-theme-selected-btn': theme.lemonTheme && todosStore.showOnlyImportantTodos,
				'jeans-other-btn': theme.jeansTheme,
				'jeans-theme-selected-btn': theme.jeansTheme && todosStore.showOnlyImportantTodos,
			}"
			@click="todosStore.showOnlyImportant()"
		>
			<img v-if="!theme.elegantTheme && !theme.panterTheme" class="important" src="@/img/icons/important.webp" alt="important" />
			<img v-if="theme.elegantTheme && !theme.panterTheme" class="important" src="@/img/icons/important-elegant.webp" alt="important" />
			<img v-if="!theme.elegantTheme && theme.panterTheme" class="important" src="@/img/icons/important-panter.webp" alt="important" />

			<span>{{ languages.importantBtnText }}</span>
		</button>
	</div>
</template>

<style scoped>
.pushbutton-container {
	margin-top: 0.938rem !important;
	margin-bottom: 0.625rem !important;
	height: 2.5rem !important;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.5s;
	border-radius: 10px;
	box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
	-webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
	-moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
}

.pup-up-btn {
	height: 35px;
	display: flex;
	align-items: center;
	gap: 5px;
}

.pup-up-btn {
	background-color: rgba(192, 224, 133, 0.883);
	border: 2px solid rgb(180, 230, 89);
	border-radius: 8px;
	padding: 0 10px;
	font-size: 0.813rem;
}

.pup-up-btn > img {
	width: 20px;
	height: 20px;
}

.btn-important-selected {
	/* animation: zoominout 1.5s infinite; */
	background-color: #6da505e1;
}

.btn-important-temporary {
	animation: mark 3s;
}
@keyframes mark {
	0% {
		transform: scale(1, 1);
		background-color: #6da505e1;
	}
	50% {
		transform: scale(1.1, 1.1);
		background-color: #6da505e1;
	}
	100% {
		transform: scale(1, 1);
		background-color: #6da505e1;
	}
}
</style>
