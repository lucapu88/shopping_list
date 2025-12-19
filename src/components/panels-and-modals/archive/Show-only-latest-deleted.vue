<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
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
		};
	},
	created() {
		this.todosStore.getOnlyDeletedTodos();
	},
};
</script>

<template>
	<div class="latest-deleted-container">
		<div class="auto-delete-container mb-3">
			<li class="title-info ms-3">
				<span>{{ languages.showOnlyLatestDeletedText.description }}.</span>
			</li>
			<div class="show-hide-deleted-list-container">
				<div class="show-hide-deleted-container">
					<!-- TODO SINGOLO -->
					<span class="show-last-deleted-title" :class="{ 'animate-charcter': !theme.retroTheme }"> {{ languages.showOnlyLatestDeletedText.singleTodoText }}: </span>
					<div v-if="todosStore.deletedSingleTodo && todosStore.deletedSingleTodo.length" class="todo-deleted-container" :class="{ 'retro-terminal-border': theme.retroTheme }">
						<section class="top">
							<div v-for="(inner, i) in todosStore.deletedSingleTodo" :key="i">
								<ul>
									<div class="list-canceled-title">{{ secondTodosStore.listButtons[i].name }}</div>
									<template v-if="inner && inner.length">
										<li v-for="(value, j) in inner" :key="j">
											{{ value }}
										</li>
									</template>
									<template v-else>
										<li class="empty-list-text">{{ languages.showOnlyLatestDeletedText.emptyListText }}</li>
									</template>
								</ul>
							</div>
						</section>
					</div>
					<!-- TODO MULTIPLI -->
					<span class="show-last-deleted-title" :class="{ 'animate-charcter': !theme.retroTheme }"> {{ languages.showOnlyLatestDeletedText.multipleTodosText }}: </span>
					<div class="multiple-deleted-container" :class="{ 'retro-terminal-border': theme.retroTheme }">
						<section class="top">
							<div v-for="(inner, i) in todosStore.deletedTodos" :key="i">
								<ul>
									<div class="list-canceled-title">{{ secondTodosStore.listButtons[i].name }}</div>
									<template v-if="inner && inner.length">
										<li v-for="(value, j) in inner" :key="j">
											{{ value }}
										</li>
									</template>
									<template v-else>
										<li class="empty-list-text">{{ languages.showOnlyLatestDeletedText.emptyListText }}</li>
									</template>
								</ul>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.latest-deleted-container {
	overflow: auto;
}

.show-hide-btn {
	border: none;
	background-color: transparent;
	margin-left: 1.25rem;
	margin-bottom: 0.625rem;
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
.title-info {
	font-size: 0.9375rem;
}
.show-hide-deleted-container {
	display: flex;
	flex-direction: column;
}
.show-last-deleted-title {
	color: #d00000;
	font-weight: bold;
	font-size: large;
}
.multiple-deleted-container {
	margin-bottom: 0.625rem;
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
	padding: 0.313rem;
	padding-left: 10px;
}

li {
	display: block;
}

.top,
.bottom {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.list-canceled-title {
	color: green;
	padding: 0.313rem;
	font-weight: bold;
}

.date {
	font-size: 0.6875rem;
}

.todo-deleted:last-child {
	margin-top: 0.625rem;
}

.empty-list-text {
	font-size: 0.8125rem;
	color: #bc0000;
}
</style>
