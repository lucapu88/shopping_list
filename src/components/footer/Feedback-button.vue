<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import FeedbackForm from "../panels-and-modals/Feedback-form.vue";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			secondTodosStore: useSecondTodoStore(),
		};
	},
	methods: {},
};
</script>

<template>
	<button @click="secondTodosStore.showFeedbackForm = true">
		<img class="feedback-icon" src="@/img/icons/feedback.webp" alt="feedback" fetchpriority="high" loading="eager" />
	</button>

	<FeedbackForm v-if="secondTodosStore.showFeedbackForm" />
</template>

<style scoped>
button {
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
}
.feedback-icon {
	width: 45px;
	height: 47px;
}
</style>
