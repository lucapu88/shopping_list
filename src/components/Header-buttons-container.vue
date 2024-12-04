<script setup>
import CategoriesPanel from "./panels-and-modals/Categories-panel.vue";
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
			isAndroid: false,
			isIphone: false,
		};
	},
	created() {
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			this.isAndroid = false;
			this.isIphone = true;
		}
		if (/android/i.test(userAgent)) {
			this.isIphone = false;
			this.isAndroid = true;
		}
	},
	methods: {
		copy() {
			const myList = this.todosStore.todos.map((todo) => (todo.category ? `${todo.name.toUpperCase()}\n` : ` ${todo.name}\n`));
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
			navigator.vibrate(400);
		},
	},
};
</script>

<template>
	<div class="pushbutton-container">
		<h4 class="developer-panel-title" v-if="todosStore.secondList">Pannello Sviluppatore</h4>

		<template v-if="!todosStore.secondList">
			<!-- DRAG N DROP -->
			<button
				class="btn custom-show-listbtn"
				:class="{
					'btn-selected': todosStore.isDraggable,
					'minimal-btn': theme.minimalTheme,
					'minimal-selected-btn': theme.minimalTheme && todosStore.isDraggable,
					'retro-teme-btns': theme.retroTheme,
					'retro-selected-btn': theme.retroTheme && todosStore.isDraggable,
					'summer-header-btn': theme.summerTheme,
					'summer-header-btn-selected': theme.summerTheme && todosStore.isDraggable,
					'winter-header-btn': theme.winterTheme,
					'winter-header-selected-btn': theme.winterTheme && todosStore.isDraggable,
					'elegant-btn': theme.elegantTheme,
					'elegant-selected-btn': theme.elegantTheme && todosStore.isDraggable,
					'pink-theme-btn': theme.pinkTheme,
					'pink-theme-selected-btn': theme.pinkTheme && todosStore.isDraggable,
				}"
				:disabled="todosStore.showOnlyImportantTodos || !todosStore.todos.length"
				@click="todosStore.toggleDragDrop()"
			>
				<img v-if="!theme.elegantTheme" src="@/img/icons/drag-and-drop.webp" alt="move" />
				<img v-if="theme.elegantTheme" src="@/img/icons/drag-and-drop-elegant.webp" alt="move" />
			</button>
			<!--PULSANTE COPIA LISTA-->
			<button
				class="btn custom-show-listbtn"
				:class="{
					'minimal-btn': theme.minimalTheme,
					'retro-teme-btns': theme.retroTheme,
					'summer-header-btn': theme.summerTheme,
					'winter-header-btn': theme.winterTheme,
					'elegant-btn': theme.elegantTheme,
					'pink-theme-btn': theme.pinkTheme,
				}"
				:disabled="!todosStore.todos.length"
				@click="copy()"
			>
				<img v-if="!theme.elegantTheme" class="copy" src="@/img/icons/copy.webp" alt="copy" />
				<img v-if="theme.elegantTheme" class="copy" src="@/img/icons/copy-elegant.webp" alt="copy" />
			</button>
			<!--PULSANTE MOSTRA CATEGORIE -->
			<button
				class="btn custom-show-listbtn"
				:class="{
					'btn-selected': todosStore.categoryList,
					'minimal-btn': theme.minimalTheme,
					'minimal-selected-btn': theme.minimalTheme && todosStore.categoryList,
					'retro-teme-btns': theme.retroTheme,
					'retro-selected-btn': theme.retroTheme && todosStore.categoryList,
					'summer-header-btn': theme.summerTheme,
					'summer-header-btn-selected': theme.summerTheme && todosStore.categoryList,
					'winter-header-btn': theme.winterTheme,
					'winter-header-selected-btn': theme.winterTheme && todosStore.categoryList,
					'elegant-btn': theme.elegantTheme,
					'elegant-selected-btn': theme.elegantTheme && todosStore.categoryList,
					'pink-theme-btn': theme.pinkTheme,
					'pink-theme-selected-btn': theme.pinkTheme && todosStore.categoryList,
				}"
				:disabled="todosStore.showOnlyImportantTodos"
				@click="todosStore.showCategoryList()"
			>
				<strong v-if="!todosStore.categoryList">+</strong>
				<strong v-else>-</strong>
			</button>
			<!-- PULSANTE MOSTRA SOLO GLI ELEMENTI EVIDENZIATI COME IMPORTANTI -->
			<button
				class="btn custom-show-listbtn"
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
				}"
				@click="todosStore.showOnlyImportant()"
			>
				<img v-if="!theme.elegantTheme" class="important" src="@/img/icons/important.webp" alt="important" />
				<img v-if="theme.elegantTheme" class="important" src="@/img/icons/important-elegant.webp" alt="important" />
			</button>
		</template>
	</div>

	<div v-if="!isAndroid && isIphone" class="shitch-lists-buttons">
		<!-- CONTENITORE CAMBIO LISTA -->
		<button
			class="btn custom-show-listbtn"
			:class="{
				'btn-selected': !todosStore.secondList,
				'minimal-btn': theme.minimalTheme,
				'minimal-selected-btn': theme.minimalTheme && todosStore.categoryList,
				'retro-teme-btns': theme.retroTheme,
				'retro-selected-btn': theme.retroTheme && todosStore.categoryList,
				'summer-header-btn': theme.summerTheme,
				'summer-header-btn-selected': theme.summerTheme && todosStore.categoryList,
				'winter-header-btn': theme.winterTheme,
				'winter-header-selected-btn': theme.winterTheme && todosStore.categoryList,
				'elegant-btn': theme.elegantTheme,
				'elegant-selected-btn': theme.elegantTheme && todosStore.categoryList,
				'pink-theme-btn': theme.pinkTheme,
				'pink-theme-selected-btn': theme.pinkTheme && todosStore.categoryList,
			}"
			@click="todosStore.secondList = false"
		></button>
		<button
			class="btn custom-show-listbtn"
			:class="{
				'btn-selected': todosStore.secondList,
				'minimal-btn': theme.minimalTheme,
				'minimal-selected-btn': theme.minimalTheme && todosStore.categoryList,
				'retro-teme-btns': theme.retroTheme,
				'retro-selected-btn': theme.retroTheme && todosStore.categoryList,
				'summer-header-btn': theme.summerTheme,
				'summer-header-btn-selected': theme.summerTheme && todosStore.categoryList,
				'winter-header-btn': theme.winterTheme,
				'winter-header-selected-btn': theme.winterTheme && todosStore.categoryList,
				'elegant-btn': theme.elegantTheme,
				'elegant-selected-btn': theme.elegantTheme && todosStore.categoryList,
				'pink-theme-btn': theme.pinkTheme,
				'pink-theme-selected-btn': theme.pinkTheme && todosStore.categoryList,
			}"
			@click="todosStore.secondList = true"
		></button>
	</div>

	<template v-if="!todosStore.secondList">
		<div class="alerts-container" v-if="todosStore.isDraggable || languages.copyList.visible || languages.importantTodos.visible || todosStore.addedImportant || todosStore.categoryAdded">
			<!-- CONTENITORE DEGLI AVVISI -->
			<div class="drag-n-drop-text">
				<small v-if="todosStore.isDraggable">
					{{ languages.helperDescription.dragNdropText.dragginText }}
				</small>
			</div>
			<p class="list-copied" v-if="languages.copyList.visible">
				{{ languages.copyList.text }}
			</p>
			<p class="no-important-todos-alert" v-if="languages.importantTodos.visible">
				{{ languages.importantTodos.alert }}
			</p>
			<p class="no-important-todos-alert" v-if="todosStore.addedImportant">
				{{ languages.importantTodos.addedImportantText }}
			</p>
			<p class="category-tip" v-if="todosStore.categoryAdded">
				{{ languages.categoryTipText }}
			</p>
		</div>
	</template>

	<CategoriesPanel />
</template>

<style scoped>
p {
	margin: 0;
}

.pushbutton-container {
	display: flex;
	gap: 25px;
	height: 30px;
	align-items: center;
	margin: 10px;
	justify-content: center;
}

.custom-show-listbtn {
	background-color: rgba(192, 224, 133, 0.883);
	border: 2px solid rgb(180, 230, 89);
	border-radius: 10%;
	padding: 2px;
	min-width: 30px;
	width: 60px;
}
.custom-show-listbtn > img {
	width: 20px;
}

.alerts-container {
	min-height: 21px;
}

.list-copied {
	font-size: 0.875rem;
	color: #28a745;
	text-align: center;
	background-color: #ffffff;
}

.btn-important-selected {
	animation: zoominout 1.5s infinite;
}
@keyframes zoominout {
	0% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1.2, 1.2);
	}
	100% {
		transform: scale(1, 1);
	}
}

.no-important-todos-alert {
	font-size: 0.875rem;
	text-align: center;
	color: #c30000;
	background-color: #ffffff;
}

.category-tip {
	font-size: 0.813rem;
	text-align: center;
	margin-bottom: 0;
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
		transform: scale(1.2, 1.2);
		background-color: #6da505e1;
	}
	100% {
		transform: scale(1, 1);
		background-color: #6da505e1;
	}
}

.developer-panel-title {
	font-family: monospace;
	background-color: #80808076;
	border-radius: 5px;
	padding: 5px 10px;
}
.shitch-lists-buttons {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
}
.shitch-lists-buttons > button {
	width: 150px;
	height: 17px;
	padding: 0;
	border-radius: 3px;
}
</style>
