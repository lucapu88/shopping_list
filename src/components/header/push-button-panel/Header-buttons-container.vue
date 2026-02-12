<script setup>
import CategoriesPanel from "../../panels-and-modals/Categories-panel.vue";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import ListsButtonsSelection from "../change-list/Lists-buttons-selection.vue";
import PopUpPanel from "./Pop-up-panel.vue";
import CustomButton from "../../common/Custom-button.vue";

import showListImg from "@/img/icons/show-lists.webp";
import showListImgElegant from "@/img/icons/show-lists-elegant.webp";
import showListImgPanter from "@/img/icons/show-lists-panter.webp";
import dragDropImg from "@/img/icons/drag-and-drop.webp";
import dragDropImgElegant from "@/img/icons/drag-and-drop-elegant.webp";
import dragDropImgPanter from "@/img/icons/drag-and-drop-panter.webp";
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
			showListsSrc: showListImg,
			dragDropSrc: dragDropImg,
		};
	},
	created() {
		this.showListsSrc = this.theme.elegantTheme ? showListImgElegant : this.theme.panterTheme ? showListImgPanter : showListImg;
		this.dragDropSrc = this.theme.elegantTheme ? dragDropImgElegant : this.theme.panterTheme ? dragDropImgPanter : dragDropImg;
	},
	methods: {
		togglePopUpPanel() {
			this.isPopUpPanelVisible = !this.isPopUpPanelVisible;
			this.todosStore.showOnlyImportantTodos = false;
			this.todosStore.categoryList = false;
			this.todosStore.setOrResetImportantTodos();
		},
	},
};
</script>

<template>
	<div class="pushbutton-container" :class="{ 'dark-style-pushbutton-container': theme.darkTheme }" v-if="!todosStore.devNotes">
		<!-- TOGGLE CAMBIO LISTE -->
		<CustomButton
			:selected="secondTodos.showChangeList"
			@click="
				secondTodos.toggleChangeList();
				isPopUpPanelVisible = false;
			"
		>
			<img class="show-lists-img" :src="showListsSrc" alt="show_lists" fetchpriority="high" loading="eager" />
		</CustomButton>

		<!-- DRAG N DROP -->
		<CustomButton
			:selected="todosStore.isDraggable"
			:disabled="todosStore.showOnlyImportantTodos || !todosStore.todos.length || secondTodos.showChangeList"
			@click="
				todosStore.toggleDragDrop();
				isPopUpPanelVisible = false;
			"
		>
			<img class="drag-n-drop-img" :src="dragDropSrc" alt="drag_drop" fetchpriority="high" loading="eager" />
		</CustomButton>

		<!-- MOSTRA PULSANTIERA SECONDARIA -->
		<CustomButton :selected="isPopUpPanelVisible" :disabled="!todosStore.todos.length" extra-classes="show-pop-up-panel-btn" @click="togglePopUpPanel()">
			<span
				class="arrow"
				:class="{
					'arrow-selected': isPopUpPanelVisible,
					'arrow-deselected': !isPopUpPanelVisible,
				}"
			>
				^
			</span>
		</CustomButton>

		<!--PULSANTE MOSTRA CATEGORIE -->
		<CustomButton
			:selected="todosStore.categoryList"
			:disabled="todosStore.showOnlyImportantTodos || secondTodos.moving"
			@click="
				todosStore.showCategoryList();
				isPopUpPanelVisible = false;
			"
		>
			<strong class="toggle-category-icon">
				{{ todosStore.categoryList ? "-" : "+" }}
			</strong>
		</CustomButton>

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

.loyalty-cards-btn {
	min-width: 30px;
	height: 40px;
	max-width: 65px;
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
