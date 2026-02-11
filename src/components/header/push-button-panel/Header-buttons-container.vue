<script setup>
import CategoriesPanel from "../../panels-and-modals/Categories-panel.vue";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import ListsButtonsSelection from "../change-list/Lists-buttons-selection.vue";
import PopUpPanel from "./Pop-up-panel.vue";
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
			isPopUpPanelVisible: false,
		};
	},
	methods: {
		togglePopUpPanel() {
			this.isPopUpPanelVisible = !this.isPopUpPanelVisible;
			this.todosStore.showOnlyImportantTodos = false;
			this.todosStore.setOrResetImportantTodos();
		},
	},
};
</script>

<template>
	<!-- TOFIX: Creare un componente unico per questi button uguali -->
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
			@click="
				secondTodos.toggleChangeList();
				isPopUpPanelVisible = false;
			"
		>
			<img
				v-if="!theme.elegantTheme && !theme.panterTheme"
				class="show-lists-img"
				src="@/img/icons/show-lists.webp"
				alt="show_lists"
				:fetchpriority="!theme.elegantTheme && !theme.panterTheme ? 'high' : 'auto'"
				:loading="!theme.elegantTheme && !theme.panterTheme ? 'eager' : 'lazy'"
			/>
			<img
				v-if="theme.elegantTheme && !theme.panterTheme"
				class="show-lists-img"
				src="@/img/icons/show-lists-elegant.webp"
				alt="show_lists"
				:fetchpriority="theme.elegantTheme && !theme.panterTheme ? 'high' : 'auto'"
				:loading="theme.elegantTheme && !theme.panterTheme ? 'eager' : 'lazy'"
			/>
			<img
				v-if="!theme.elegantTheme && theme.panterTheme"
				class="show-lists-img"
				src="@/img/icons/show-lists-panter.webp"
				alt="show_lists"
				:fetchpriority="!theme.elegantTheme && theme.panterTheme ? 'high' : 'auto'"
				:loading="!theme.elegantTheme && theme.panterTheme ? 'eager' : 'lazy'"
			/>
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
			@click="
				todosStore.toggleDragDrop();
				isPopUpPanelVisible = false;
			"
		>
			<img
				v-if="!theme.elegantTheme && !theme.panterTheme"
				class="drag-n-drop-img"
				src="@/img/icons/drag-and-drop.webp"
				alt="move"
				:fetchpriority="!theme.elegantTheme && !theme.panterTheme ? 'high' : 'auto'"
				:loading="!theme.elegantTheme && !theme.panterTheme ? 'eager' : 'lazy'"
			/>
			<img
				v-if="theme.elegantTheme && !theme.panterTheme"
				class="drag-n-drop-img"
				src="@/img/icons/drag-and-drop-elegant.webp"
				alt="move"
				:fetchpriority="theme.elegantTheme && !theme.panterTheme ? 'high' : 'auto'"
				:loading="theme.elegantTheme && !theme.panterTheme ? 'eager' : 'lazy'"
			/>
			<img
				v-if="!theme.elegantTheme && theme.panterTheme"
				class="drag-n-drop-img"
				src="@/img/icons/drag-and-drop-panter.webp"
				alt="move"
				:fetchpriority="!theme.elegantTheme && theme.panterTheme ? 'high' : 'auto'"
				:loading="!theme.elegantTheme && theme.panterTheme ? 'eager' : 'lazy'"
			/>
		</button>
		<!-- PULSANTE MOSTRA PULSANTIERA SECONDARIA -->
		<button
			class="btn custom-show-listbtn show-pop-up-panel-btn"
			:class="{
				'btn-selected': isPopUpPanelVisible,
				'minimal-btn': theme.minimalTheme,
				'retro-teme-btns': theme.retroTheme,
				'summer-header-btn': theme.summerTheme,
				'winter-header-btn': theme.winterTheme,
				'elegant-btn': theme.elegantTheme,
				'pink-theme-btn': theme.pinkTheme,
				'panter-btn': theme.panterTheme,
				'lemon-other-btn': theme.lemonTheme,
				'jeans-other-btn': theme.jeansTheme,
				'minimal-selected-btn': theme.minimalTheme && isPopUpPanelVisible,
				'retro-selected-btn': theme.retroTheme && isPopUpPanelVisible,
				'summer-header-btn-selected': theme.summerTheme && isPopUpPanelVisible,
				'winter-header-selected-btn': theme.winterTheme && isPopUpPanelVisible,
				'elegant-selected-btn': theme.elegantTheme && isPopUpPanelVisible,
				'pink-theme-selected-btn': theme.pinkTheme && isPopUpPanelVisible,
				'panter-theme-selected-btn': theme.panterTheme && isPopUpPanelVisible,
				'lemon-theme-selected-btn': theme.lemonTheme && isPopUpPanelVisible,
				'jeans-theme-selected-btn': theme.jeansTheme && isPopUpPanelVisible,
			}"
			:disabled="!todosStore.todos.length"
			@click="togglePopUpPanel()"
		>
			<span
				class="arrow"
				:class="{
					'arrow-selected': isPopUpPanelVisible,
					'arrow-deselected': !isPopUpPanelVisible,
				}"
			>
				^
			</span>
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
			@click="
				todosStore.showCategoryList();
				isPopUpPanelVisible = false;
			"
		>
			<strong class="toggle-category-icon" v-if="!todosStore.categoryList">+</strong>
			<strong class="toggle-category-icon" v-else>-</strong>
		</button>

		<!-- PULSANTE CHE MOSTRA LA SCHERMATA DELLE CARTE FEDELTÀ -->
		<button class="btn loyalty-cards-btn p-0" @click="secondTodos.showLoyaltyCards()">
			<img class="loyalty-card-icon" src="@/img/icons/loy-card.webp" alt="loyalty_card_icon" fetchpriority="high" loading="eager" />
		</button>
	</div>

	<!-- SECONDA PULSANTIERA -->
	<PopUpPanel v-if="isPopUpPanelVisible" />

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

	<!-- PULSANTIERA CATEGORIE -->
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

.show-pop-up-panel-btn {
	display: flex;
	justify-content: center;
	align-items: center;
}
.arrow {
	width: 1.688rem;
	height: 1.688rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Lucida Console", "Courier New", monospace;
	font-weight: bold;
	font-size: 1.563rem;
	padding-top: 0.625rem;
}
.arrow-selected {
	-webkit-animation: spin 0.5s linear;
	-moz-animation: spin 0.5s linear;
	animation: spin 0.5s linear;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
}
@keyframes spin {
	100% {
		-webkit-transform: rotate(-180deg);
		transform: rotate(-180deg);
	}
}
.arrow-deselected {
	-webkit-animation: reverseSpin 0.5s linear;
	-moz-animation: reverseSpin 0.5s linear;
	animation: reverseSpin 0.5s linear;
}
@keyframes reverseSpin {
	from {
		-webkit-transform: rotate(-180deg);
		transform: rotate(-180deg);
	}
	to {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}
</style>
