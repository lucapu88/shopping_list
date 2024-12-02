<script setup>
import { useChristmasStore } from "@/store/ChristmasStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useTodoStore } from "@/store/TodoStore";
import { Container, Draggable } from "../../../node_modules/vue3-smooth-dnd"; //DOCUMENTAZIONE: https://github.com/gilnd/vue3-smooth-dnd
// import draggable from 'vuedraggable';
import TodoRow from "./Todo-row.vue";
import EmptyList from "./Empty-list.vue";
</script>

<script>
export default {
	components: { Container, Draggable },
	data() {
		return {
			isChristmas: useChristmasStore(),
			theme: useThemeStore(),
			todosStore: useTodoStore(),
		};
	},
	methods: {
		onDrop(dropResult) {
			this.todosStore.todos = this.applyDrag(this.todosStore.todos, dropResult);
		},
		applyDrag(arr, dragResult) {
			const { removedIndex, addedIndex, payload } = dragResult;

			if (removedIndex === null && addedIndex === null) return arr;
			const result = [...arr];
			let itemToAdd = payload;

			if (removedIndex !== null) {
				itemToAdd = result.splice(removedIndex, 1)[0];
			}
			if (addedIndex !== null) {
				result.splice(addedIndex, 0, itemToAdd);
			}
			this.todosStore.removeSelectedCategoryToAddItem();
			this.todosStore.saveTodos(result);
			return result;
		},
	},
};
</script>

<template>
	<EmptyList v-if="!todosStore.todos.length" />
	<!-- TOFIX questa parte è commentata poichè la libreria in questione è buggata,
     ma siccome mi piace più di quella che uso, vorrei utilizzarla nel caso risolvono il problema che ho segnalato: 
    https://github.com/SortableJS/Vue.Draggable/issues/1227-->

	<!-- <Container @drop="onDrop">
    <Draggable v-for="item in items" :key="item.id">
      <div class="draggable-item">
        {{ item.data }}
      </div>
    </Draggable>
  </Container> -->
	<!-- <template v-for="(todo, n) in todosStore.todos" :key="n">
    <draggable
      class="drag-n-drop"
      id="draggable"
      v-model="todosStore.todos"
      @start="
        drag = true;
        todosStore.removeSelectedCategoryToAddItem();
      "
      @end="
        drag = false;
        todosStore.saveTodos();
      "
    >
      <template #item="{ todo }"> -->
	<Container orientation="vertical" @drop="onDrop">
		<Draggable v-for="(todo, n) in todosStore.todos" :key="n" :index="n" class="drag-n-drop" id="draggable">
			<div
				id="draggable-children"
				class="todo-n draggable-item"
				:class="{
					category: todo.category,
					'category-retro': todo.category && theme.retroTheme,
					'category-minimal': todo.category && theme.minimalTheme,
					'category-elegant': todo.category && theme.elegantTheme && !todosStore.isDraggable,
					'draggable-children': todosStore.isDraggable && !theme.elegantTheme,
					'draggable-children-category': todosStore.isDraggable && todo.category && !theme.elegantTheme,
					'elegant-todo-draggable': todosStore.isDraggable && theme.elegantTheme,
					'todo-added': todo.todoAdded,
				}"
			>
				<TodoRow :todo="todo" :index="n" />
			</div>
		</Draggable>
	</Container>
	<!-- </template>
    </draggable>
  </template> -->
</template>

<style scoped>
.drag-n-drop-text {
	text-align: center;
}
.draggable-children {
	border: 2px solid rgb(106, 161, 3) !important;
	background-color: rgba(162, 162, 162, 0.36) !important;
	border-radius: 10px !important;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.5s;
}
.draggable-children-category {
	background-color: rgba(109, 168, 0, 0.36) !important;
}
</style>
