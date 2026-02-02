<script setup>
import CategoriesPanel from "../panels-and-modals/Categories-panel.vue";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import ListsButtonsSelection from "./change-list/Lists-buttons-selection.vue";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			todosStore: useTodoStore(),
			settings: useSettingsStore(),
			secondTodos: useSecondTodoStore(),
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
		<!-- TOGGLE CAMBIO LISTE -->
		<button
			class="btn custom-show-listbtn"
			:class="{
				'btn-selected': secondTodos.showChangeList,
				'minimal-btn': theme.minimalTheme,
				'minimal-selected-btn': theme.minimalTheme && secondTodos.showChangeList,
				'retro-teme-btns': theme.retroTheme,
				'retro-selected-btn': theme.retroTheme && secondTodos.showChangeList,
				'summer-header-btn': theme.summerTheme,
				'summer-header-btn-selected': theme.summerTheme && secondTodos.showChangeList,
				'winter-header-btn': theme.winterTheme,
				'winter-header-selected-btn': theme.winterTheme && secondTodos.showChangeList,
				'elegant-btn': theme.elegantTheme,
				'elegant-selected-btn': theme.elegantTheme && secondTodos.showChangeList,
				'pink-theme-btn': theme.pinkTheme,
				'pink-theme-selected-btn': theme.pinkTheme && secondTodos.showChangeList,
				'panter-other-btn': theme.panterTheme,
				'panter-theme-selected-btn': theme.panterTheme && secondTodos.showChangeList,
				'lemon-other-btn': theme.lemonTheme,
				'lemon-theme-selected-btn': theme.lemonTheme && secondTodos.showChangeList,
				'jeans-other-btn': theme.jeansTheme,
				'jeans-theme-selected-btn': theme.jeansTheme && secondTodos.showChangeList,
			}"
			@click="secondTodos.toggleChangeList()"
		>
			<img v-if="!theme.elegantTheme && !theme.panterTheme" class="show-lists-img" src="@/img/icons/show-lists.webp" alt="show_lists" />
			<img v-if="theme.elegantTheme && !theme.panterTheme" class="show-lists-img" src="@/img/icons/show-lists-elegant.webp" alt="show_lists" />
			<img v-if="!theme.elegantTheme && theme.panterTheme" class="show-lists-img" src="@/img/icons/show-lists-panter.webp" alt="show_lists" />
		</button>
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
				'panter-other-btn': theme.panterTheme,
				'panter-theme-selected-btn': theme.panterTheme && todosStore.isDraggable,
				'lemon-other-btn': theme.lemonTheme,
				'lemon-theme-selected-btn': theme.lemonTheme && todosStore.isDraggable,
				'jeans-other-btn': theme.jeansTheme,
				'jeans-theme-selected-btn': theme.jeansTheme && todosStore.isDraggable,
			}"
			:disabled="todosStore.showOnlyImportantTodos || !todosStore.todos.length || secondTodos.showChangeList"
			@click="todosStore.toggleDragDrop()"
		>
			<img v-if="!theme.elegantTheme && !theme.panterTheme" class="drag-n-drop-img" src="@/img/icons/drag-and-drop.webp" alt="move" />
			<img v-if="theme.elegantTheme && !theme.panterTheme" class="drag-n-drop-img" src="@/img/icons/drag-and-drop-elegant.webp" alt="move" />
			<img v-if="!theme.elegantTheme && theme.panterTheme" class="drag-n-drop-img" src="@/img/icons/drag-and-drop-panter.webp" alt="move" />
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
				'panter-other-btn': theme.panterTheme,
				'lemon-other-btn': theme.lemonTheme,
				'jeans-other-btn': theme.jeansTheme,
			}"
			:disabled="!todosStore.todos.length || secondTodos.moving"
			@click="copy()"
		>
			<img v-if="!theme.elegantTheme && !theme.panterTheme" class="copy" src="@/img/icons/copy.webp" alt="copy" />
			<img v-if="theme.elegantTheme && !theme.panterTheme" class="copy" src="@/img/icons/copy-elegant.webp" alt="copy" />
			<img v-if="!theme.elegantTheme && theme.panterTheme" class="copy" src="@/img/icons/copy-panter.webp" alt="copy" />
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
				'panter-category-btn': theme.panterTheme,
				'panter-theme-selected-btn': theme.panterTheme && todosStore.categoryList,
				'lemon-other-btn': theme.lemonTheme,
				'lemon-theme-selected-btn': theme.lemonTheme && todosStore.categoryList,
				'jeans-other-btn': theme.jeansTheme,
				'jeans-theme-selected-btn': theme.jeansTheme && todosStore.categoryList,
			}"
			:disabled="todosStore.showOnlyImportantTodos || secondTodos.moving"
			@click="todosStore.showCategoryList()"
		>
			<strong class="toggle-category-icon" v-if="!todosStore.categoryList">+</strong>
			<strong class="toggle-category-icon" v-else>-</strong>
		</button>
		<!-- PULSANTE MOSTRA SOLO GLI ELEMENTI EVIDENZIATI COME IMPORTANTI -->
		<!-- TODO: ho tolto il pulsante per inserire quello dell'aggiunta carte fedeltà. Il pulsante forse in futuro lo inserirò da qualch altra parte -->

		<!-- <button
			v-if="!settings.isIphone"
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
		</button> -->

		<!-- PULSANTE CHE MOSTRA LA SCHERMATA DELLE CARTE FEDELTÀ (PER IL MOMENTO NON IN PRODUZIONE) -->
		<button class="btn loyalty-cards-btn p-0" @click="secondTodos.showLoyaltyCards()">
			<img class="loyalty-card-icon" src="@/img/icons/loy-card.webp" alt="loyalty_card_icon" />
		</button>
	</div>

	<template v-if="!todosStore.devNotes">
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

	<!-- SELEZIONE LISTE -->
	<ListsButtonsSelection v-if="!todosStore.devNotes" />
</template>

<style scoped>
p {
	margin: 0;
}

.pushbutton-container {
	display: flex;
	gap: 20px;
	height: 30px;
	align-items: center;
	margin: 0.9375rem;
	justify-content: center;
}

.custom-show-listbtn,
.loyalty-cards-btn {
	min-width: 30px;
	height: 40px;
	max-width: 65px;
}

.custom-show-listbtn {
	background-color: rgba(192, 224, 133, 0.883);
	border: 2px solid rgb(180, 230, 89);
	border-radius: 10%;
	padding: 2px;
}

.custom-show-listbtn > img {
	width: 25px;
}

.drag-n-drop-img {
	width: 22px !important;
	height: 22px !important;
}
.show-lists-img {
	width: 35px !important;
	height: 26px !important;
}
.alerts-container {
	min-height: 21px;
}
.toggle-category-icon {
	font-size: 1.375rem;
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

.loyalty-cards-btn {
	border: 2px solid #000000;
	animation: zoominout 1.5s ease-in-out;
	background-color: #ffffff;
}

.loyalty-card-icon {
	width: 100%;
	height: 100%;
	object-fit: contain;
	border-radius: 5px;
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
</style>
