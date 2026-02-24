<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { ref, onMounted } from "vue";
import CategoriesContainer from "../panels-and-modals/categories-primary-panel/Categories-container.vue";
import CustomButton from "../common/Custom-button.vue";
import ConfirmPanel from "../common/Confirm-panel.vue";

const theme = useThemeStore();
const languages = useLanguageStore();
const secondTodos = useSecondTodoStore();
const showInfo = ref(false);
const indexToDelete = ref(null);
const confirmPanelVisible = ref(false);
const confirmText = ref("Do you confirm the removal?");

function showConfirmPanel(index) {
	confirmPanelVisible.value = !confirmPanelVisible.value;
	indexToDelete.value = index;
}

function confirmRemoveTodoFromPeriodicList() {
	secondTodos.removeTodoFromPeriodicList(indexToDelete.value);
	confirmPanelVisible.value = false;
}

confirmText.value = languages.langIta ? "Confermi la rimozione?" : languages.langSpanish ? "¿Confirma la eliminación?" : languages.langFrench ? "Confirmez-vous la suppression?" : "Do you confirm the removal?";

onMounted(() => {
	secondTodos.setDefaultOptions();
});
</script>

<template>
	<div
		class="periodic-list-container"
		:class="{
			light: theme.lightTheme,
			dark: theme.darkTheme,
			minimal: theme.minimalTheme,
			retro: theme.retroTheme,
			summer: theme.summerTheme,
			winter: theme.winterTheme,
			elegant: theme.elegantTheme,
			pink: theme.pinkTheme,
			panter: theme.panterTheme,
			lemon: theme.lemonTheme,
			jeans: theme.jeansTheme,
		}"
	>
		<div class="title">
			<div>
				<p>{{ languages.periodicList.periodicListTitle }} <span class="info-btn" @click="showInfo = !showInfo"> i </span></p>
			</div>

			<button
				:class="{
					'minimal-btn': theme.minimalTheme,
					'retro-teme-btns': theme.retroTheme,
					'summer-header-btn': theme.summerTheme,
					'winter-btn': theme.winterTheme,
					'elegant-btn': theme.elegantTheme,
					'pink-theme-btn': theme.pinkTheme,
					'panter-btn': theme.panterTheme,
					'lemon-btn': theme.lemonTheme,
					'jeans-other-btn': theme.jeansTheme,
				}"
				@click="secondTodos.periodicListContainerVisible = false"
			>
				{{ languages.close }}
			</button>
		</div>

		<div class="info-container mb-2" v-if="showInfo">
			<small>&#9679; {{ languages.periodicList.info.part1 }}</small>
			<small>&#9679; {{ languages.periodicList.info.part2 }}</small>
			<small>&#9679; {{ languages.periodicList.info.part3 }}</small>
		</div>

		<CategoriesContainer :extra-class="true" />

		<div class="confirm-container">
			<CustomButton v-if="!confirmPanelVisible" extra-classes="confirm-selected-periodic-element" :disabled="secondTodos.periodicList.every((todo) => !todo.periodicSelected)" @click="secondTodos.insertSelectedTodoFromPeriodicList()">
				<span> {{ languages.send }}</span>
			</CustomButton>

			<span v-if="confirmPanelVisible">{{ confirmText }}</span>

			<ConfirmPanel extra-classes="custom-class" v-if="confirmPanelVisible" @ok="confirmRemoveTodoFromPeriodicList()" @no="confirmPanelVisible = false" />
		</div>

		<div class="periodic-list-todo-container">
			<ul>
				<li
					v-for="(todo, index) in secondTodos.periodicList"
					:key="index"
					class="periodic-list-todo mt-2"
					:class="{
						'light-periodic-todo': theme.lightTheme,
						'btn-selected': todo.periodicSelected,
						'minimal-selected-btn': theme.minimalTheme && todo.periodicSelected,
						'retro-selected-button': theme.retroTheme && todo.periodicSelected,
						'summer-header-btn-selected': theme.summerTheme && todo.periodicSelected,
						'winter-selected-button': theme.winterTheme && todo.periodicSelected,
						'elegant-selected-button': theme.elegantTheme && todo.periodicSelected,
						'pink-theme-selected-btn': theme.pinkTheme && category.selectedCat,
						'panter-theme-selected-button': theme.panterTheme && todo.periodicSelected,
						'lemon-theme-selected-btn': theme.lemonTheme && todo.periodicSelected,
						'jeans-theme-selected-btn': theme.jeansTheme && todo.periodicSelected,
					}"
				>
					<span class="periodic-todo-name" @click="secondTodos.selectTodoFromPeriodicList(todo)">&gt; {{ todo.name }}</span>
					<button class="btn btn-outline-danger bg-light rounded-circle btn-sm btn-remove-periodic-list" @click="showConfirmPanel(index)">
						<span>-</span>
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.periodic-list-container {
	width: 100%;
	height: 100%;
	border-radius: 0%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 400;
}

.title {
	display: flex;
	justify-content: space-between;
	padding: 10px 10px 0;
	align-items: baseline;
}

.info-btn {
	font-family: Arial;
	border: 2px solid;
	border-radius: 50%;
	padding: 0 6px;
	font-weight: bold;
}
.info-container {
	display: flex;
	flex-direction: column;
	padding: 0 20px;
}

.confirm-container {
	padding: 0.625rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

.periodic-list-todo-container {
	height: 100%;
	overflow-y: auto;
	background-image: url("@/img/io-e-ile.webp");
	background-size: cover;
	max-height: 420px;
	background-repeat: no-repeat;
	background-position: top;
}

ul {
	width: 95%;
}

.periodic-list-todo {
	border-radius: 5px;
	padding: 0 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.btn-remove-periodic-list {
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.btn-remove-periodic-list > span {
	font-weight: bold;
	font-family: Arial;
}

.periodic-todo-name {
	width: 95%;
}

.custom-class {
	gap: 10px;
	margin-left: 0.5rem;
}
</style>
