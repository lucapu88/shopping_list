<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";

import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
import ToggleTutorialButton from "../tutorials/ToggleTutorialButton.vue";
import Tutorial from "../tutorials/Tutorial.vue";
</script>
<script>
export default {
	data() {
		return {
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			todosStore: useTodoStore(),
			secondTodosStore: useSecondTodoStore(),
			theme: useThemeStore(),
			showDelete: false,
			showDeleteText: null,
			showOnlyLatestDeleted: "showOnlyLatestDeleted",
		};
	},
	created() {
		this.todosStore.getOnlyDeletedTodos();
		this.secondTodosStore.createListsButtons();
	},
};
</script>

<template>
	<div class="helper-settings">
		<ListIstructionAccordion
			show-list-instructions-input="showOnlyLatestDeleted"
			:istructions-text="languages.showOnlyLatestDeletedText.title"
			:select-deselect-arrow="settings.showOnlyLatestDeleted && settings.section === showOnlyLatestDeleted"
			:isSettings="true"
		/>
		<template v-if="settings.showOnlyLatestDeleted && settings.section === showOnlyLatestDeleted">
			<div class="auto-delete-container mb-3">
				<li class="ms-3">
					<small>{{ languages.showOnlyLatestDeletedText.description }}.</small>
					<ToggleTutorialButton :features="showOnlyLatestDeleted" />
				</li>
				<div class="show-hide-deleted-list-container">
					<div class="show-hide-deleted-container">
						<!-- TODO SINGOLO -->
						<span class="show-last-deleted-title" :class="{ 'animate-charcter': !theme.retroTheme }"> {{ languages.showOnlyLatestDeletedText.singleTodoText }}: </span>
						<div v-if="todosStore.deletedSingleTodo && todosStore.deletedSingleTodo.length" class="todo-deleted-container" :class="{ 'retro-border': theme.retroTheme }">
							<section class="top">
								<ul>
									<strong style="color: green">{{ secondTodosStore.listButtons[0].name }}</strong>
									<li class="todo-deleted" v-for="(todo, index) in todosStore.deletedSingleTodo[0]" :key="index">
										<!-- sull'ultimo elemento non voglio nulla perchè è la data -->
										<span v-if="index < todosStore.deletedSingleTodo[0].length - 1 && index !== 0">></span>
										{{ todo }}
									</li>
								</ul>
								<ul>
									<strong style="color: green">{{ secondTodosStore.listButtons[1].name }}</strong>
									<li class="todo-deleted" v-for="(todo, index) in todosStore.deletedSingleTodo[1]" :key="index">
										<!-- sull'ultimo elemento non voglio nulla perchè è la data -->
										<span v-if="index < todosStore.deletedSingleTodo[1].length - 1 && index !== 0">></span>
										{{ todo }}
									</li>
								</ul>
							</section>

							<section class="bottom">
								<ul>
									<strong style="color: green">{{ secondTodosStore.listButtons[2].name }}</strong>
									<li class="todo-deleted" v-for="(todo, index) in todosStore.deletedSingleTodo[2]" :key="index">
										<!-- sull'ultimo elemento non voglio nulla perchè è la data -->
										<span v-if="index < todosStore.deletedSingleTodo[2].length - 1 && index !== 0">></span>
										{{ todo }}
									</li>
								</ul>
								<ul>
									<strong style="color: green">{{ secondTodosStore.listButtons[3].name }}</strong>
									<li class="todo-deleted" v-for="(todo, index) in todosStore.deletedSingleTodo[3]" :key="index">
										<!-- sull'ultimo elemento non voglio nulla perchè è la data -->
										<span v-if="index < todosStore.deletedSingleTodo[3].length - 1 && index !== 0">></span>
										{{ todo }}
									</li>
								</ul>
							</section>
						</div>
						<!-- TODO MULTIPLI -->
						<span class="show-last-deleted-title" :class="{ 'animate-charcter': !theme.retroTheme }"> {{ languages.showOnlyLatestDeletedText.multipleTodosText }}: </span>
						<div class="multiple-deleted-container" :class="{ 'retro-border': theme.retroTheme }">
							<section class="top">
								<ul>
									<strong style="color: green">{{ secondTodosStore.listButtons[0].name }}</strong>
									<li class="todo-deleted" v-for="(todo, index) in todosStore.deletedTodos[0]" :key="index">
										<!-- sull'ultimo elemento non voglio nulla perchè è la data -->
										<span v-if="index < todosStore.deletedTodos[0].length - 1">></span>
										{{ todo }}
									</li>
								</ul>

								<ul>
									<strong style="color: green">{{ secondTodosStore.listButtons[1].name }}</strong>
									<li class="todo-deleted" v-for="(todo, index) in todosStore.deletedTodos[1]" :key="index">
										<!-- sull'ultimo elemento non voglio nulla perchè è la data -->
										<span v-if="index < todosStore.deletedTodos[1].length - 1">></span>
										{{ todo }}
									</li>
								</ul>
							</section>

							<section class="bottom">
								<ul>
									<strong style="color: green">{{ secondTodosStore.listButtons[2].name }}</strong>
									<li class="todo-deleted" v-for="(todo, index) in todosStore.deletedTodos[2]" :key="index">
										<!-- sull'ultimo elemento non voglio nulla perchè è la data -->
										<span v-if="index < todosStore.deletedTodos[2].length - 1">></span>
										{{ todo }}
									</li>
								</ul>

								<ul>
									<strong style="color: green">{{ secondTodosStore.listButtons[3].name }}</strong>
									<li class="todo-deleted" v-for="(todo, index) in todosStore.deletedTodos[3]" :key="index">
										<!-- sull'ultimo elemento non voglio nulla perchè è la data -->
										<span v-if="index < todosStore.deletedTodos[3].length - 1">></span>
										{{ todo }}
									</li>
								</ul>
							</section>
						</div>
					</div>
				</div>

				<Tutorial v-if="settings.video && settings.feature === showOnlyLatestDeleted" :features="showOnlyLatestDeleted" />
			</div>
		</template>
	</div>
</template>

<style scoped>
.show-hide-btn {
	border: none;
	background-color: transparent;
	margin-left: 20px;
	margin-bottom: 10px;
}
.animate-charcter {
	background-image: linear-gradient(-225deg, #e30000 67%, #44107a 29%, #153557 0%, #fff800 100%);
	background-size: auto auto;
	background-clip: border-box;
	background-size: 200% auto;
	color: #fff;
	background-clip: text;
	text-fill-color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: textclip 2.5s linear;
	/* animation-delay: 0.8s; */
	/* animation-iteration-count: 2; */
	display: inline-block;
}

@keyframes textclip {
	to {
		background-position: 200% center;
	}
}
.show-hide-deleted-container {
	display: flex;
	flex-direction: column;
	animation: bounce 0.8s ease;
}
@keyframes bounce {
	70% {
		transform: translateY(2%);
	}
	80% {
		transform: translateY(-15%);
	}
	90% {
		transform: translateY(0%);
	}
	95% {
		transform: translateY(-7%);
	}
	97% {
		transform: translateY(0%);
	}
	99% {
		transform: translateY(-3%);
	}
	100% {
		transform: translateY(0);
	}
}
.show-last-deleted-title {
	color: #d00000;
	font-weight: bold;
	font-size: large;
}
.multiple-deleted-container {
	margin-bottom: 10px;
}
.todo-deleted {
	margin: 0;
	display: block;
}

.todo-deleted-container,
.multiple-deleted-container {
	border: 2px solid;
	border-radius: 10px;
}

ul {
	padding: 0;
	padding-left: 10px;
}

.top,
.bottom {
	display: flex;
}
/* section > ul {
	width: 50%;
} */
</style>
