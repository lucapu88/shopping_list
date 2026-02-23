<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
const theme = useThemeStore();
const languages = useLanguageStore();
const secondTodos = useSecondTodoStore();
</script>

<template>
	<button class="btn btn-outline-success bg-light rounded-circle btn-sm btn-add-periodic-list">
		<span>+</span>
	</button>
</template>

<style scoped>
.btn-add-periodic-list {
	width: 25px;
	height: 25px;
	padding: 0px 2px 0px 2px;
}
.btn-add-periodic-list > span {
	font-weight: bold;
	font-family: Arial;
}
</style>
