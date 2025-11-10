<script setup>
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
</script>

<script>
export default {
	emits: ["scrollToTop", "scrollToBottom"],
	data() {
		return {
			settings: useSettingsStore(),
			todosStore: useTodoStore(),
		};
	},
};
</script>

<template>
	<div>
		<button v-if="todosStore.canDeleteMultipleTodo" class="opacity-90 text-danger border-success rounded multiple-delete left p-2" @click="todosStore.openModalForDeleteSelectedTodos('multiple', true)">
			{{ String.fromCodePoint(0x1f6d2) }}
		</button>
	</div>
</template>

<style scoped>
.multiple-delete {
	position: fixed;
	bottom: 3%;
	-webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	-moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
	z-index: 150;
	font-size: 1.0625rem;
}

.left {
	left: 3%;
}

.opacity-90 {
	opacity: 0.9;
}
</style>
