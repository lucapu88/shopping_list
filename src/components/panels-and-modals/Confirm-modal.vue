<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { useChristmasStore } from "@/store/ChristmasStore";
import postit from "@/img/postit.webp";
import maldive from "@/img/maldive.webp";
import forest from "@/img/winter-forest.webp";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			todosStore: useTodoStore(),
			isChristmas: useChristmasStore(),
			multipleTodos: [],
		};
	},
	created() {
		this.multipleTodos = this.todosStore.todos.filter((todo) => todo.multipleDelete).map((t) => t.name);
	},
};
</script>

<template>
	<link v-if="theme.lightTheme" rel="preload" as="image" :href="postit" />
	<link v-if="theme.summerTheme" rel="preload" as="image" :href="maldive" />
	<link v-if="theme.winterTheme" rel="preload" as="image" :href="forest" />

	<div
		class="modal"
		:class="{
			'multiple-delete': multipleTodos.length > 10 && todosStore.multiple,
			'multiple-jeans': theme.jeansTheme,
		}"
	>
		<div
			class="confirm-delete-modal-content"
			:class="{
				'confirm-light': theme.lightTheme,
				'confirm-dark': theme.darkTheme,
				'confirm-minimal': theme.minimalTheme,
				'confirm-retro': theme.retroTheme,
				'confirm-summer': theme.summerTheme,
				'confirm-winter': theme.winterTheme,
				'confirm-elegant': theme.elegantTheme,
				'confirm-pink': theme.pinkTheme,
				'confirm-panter': theme.panterTheme,
				'confirm-lemon': theme.lemonTheme,
				'confirm-jeans': theme.jeansTheme,
			}"
		>
			<img v-if="isChristmas.christmasTheme" class="christmas-bells" src="@/img/festivities/christmas-bells.webp" alt="christmas_bells" />
			<p
				class="mt-4 mb-1"
				:class="{
					'delete-selected': todosStore.deleteSelected && !theme.pinkTheme,
				}"
			>
				{{ languages.completeConfirmText }}
			</p>
			<span style="display: none">{{ todosStore.index }} </span>
			<ul v-if="todosStore.deleteSelected">
				<li v-for="(todo, n) in multipleTodos" :key="n">
					{{ todo }}
				</li>
			</ul>

			<div class="confirm-buttons-container">
				<button id="yes-delete" :class="{ 'pink-theme-btn': theme.pinkTheme }" v-if="todosStore.confirmRemove" @click="todosStore.confirmedRemoveTodo(todosStore.index)">
					<div>
						<!-- questo div è per lo stile bottoni del tema jeans -->
						<span v-if="languages.langIta || languages.langSpanish">SI</span>
						<span v-if="languages.langEnglish">YES</span>
					</div>
				</button>
				<button id="yes-delete-selected" v-if="todosStore.deleteSelected" @click="todosStore.deleteSelectedTodos()">
					<div>
						<!-- questo div è per lo stile bottoni del tema jeans -->
						<span v-if="languages.langIta || languages.langSpanish">SI</span>
						<span v-if="languages.langEnglish">YES</span>
					</div>
				</button>
				<button id="no-delete" :class="{ 'pink-theme-btn-secondary': theme.pinkTheme }" @click="todosStore.confirmDeleteModal = false">
					<div>
						<!-- questo div è per lo stile bottoni del tema jeans -->
						NO
					</div>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.multiple-delete {
	padding-top: 5%;
}

.confirm-delete-modal-content {
	position: relative;
	margin: auto;
	padding: 25px;
	border-radius: 10px;
	width: 90%;
	max-width: 700px;
	overflow: auto;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	animation: wideningAppearance 1s ease;
}
@keyframes wideningAppearance {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}

.confirm-delete-modal-content > * {
	animation: opacity 2s ease;
}
@keyframes opacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.confirm-delete-modal-content > button {
	border-radius: 5px;
	width: 40px;
	padding: 5px;
}

.christmas-bells {
	position: absolute;
	top: 3px;
	right: 5px;
	width: 70px;
	height: 70px;
	animation: ringingBells 3s infinite;
}

@keyframes ringingBells {
	0%,
	100% {
		transform: rotate(45deg);
	}
	50% {
		transform: rotate(-45deg);
	}
}
.delete-selected {
	color: rgb(215, 0, 0) !important;
	/* font-weight: bold; */
}

.confirm-light {
	background-color: #ffffff;
	background-image: url("@/img/postit.webp");
	background-size: cover;
	background-repeat: no-repeat;
}
.confirm-light > p {
	max-width: 24ch;
}

.confirm-dark,
.confirm-dark > button {
	background-color: #333333;
	color: #ffff;
	border: 2px solid #ffff;
}

.confirm-minimal,
.confirm-minimal > button {
	background-color: #a5becc;
	color: #7c3e66;
}

.confirm-retro,
.confirm-retro > button {
	background-color: #000000;
	color: #35c50d;
	border: 1px solid #35c50d;
	border-radius: 0 !important;
}

.confirm-summer {
	background-color: #12a1df;
	border: 2px solid #12a1df;
	background-image: url("@/img/maldive.webp");
	background-size: cover;
	background-repeat: no-repeat;
	color: #ffffff;
}

.confirm-winter {
	background-color: #ffff;
	border: 2px solid #ffff;
	background-image: url("@/img/winter-forest.webp");
	background-size: cover;
	background-repeat: no-repeat;
}
.confirm-winter > p,
.confirm-winter > ul,
.confirm-summer > p,
.confirm-summer > ul {
	background-color: #afd2d2ac;
	border-radius: 5px;
}

.confirm-elegant {
	background-color: #1d2731;
	border: 1px solid #d98410;
	color: #d98410;
}
.confirm-elegant > p {
	font-weight: bold;
}
.confirm-elegant > button {
	background-color: #045687;
	border-color: #d98410;
	color: #d98410;
}

button {
	margin-right: 15px;
}
ul {
	max-height: 90%;
	overflow: auto;
	padding: 0;
	width: 90%;
}
li {
	display: block;
}
</style>
