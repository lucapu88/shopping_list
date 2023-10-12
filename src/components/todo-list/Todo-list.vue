<script setup>
import { useChristmasStore } from '@/store/ChristmasStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
</script>

<script>
export default {
  data() {
    return {
      isChristmas: useChristmasStore(),
      theme: useThemeStore(),
      todosStore: useAddModifyDeleteTodosStore(),
    };
  },
};
</script>

<template>
  <div
    v-for="(todo, n) in todosStore.todos"
    :key="n"
    id="draggable-children"
    class="todo-n"
    :class="{
      category: todo.class,
      'category-retro': todo.class && theme.retroTheme,
      'category-minimal': todo.class && theme.minimalTheme,
      'todo-added': todo.todoAdded,
    }"
  >
    <div v-if="todo.class && theme.minimalTheme" class="category-emoji-minimal">
      &#x2022;
    </div>
    <div
      v-if="todo.class && !theme.minimalTheme"
      class="category-emoji"
      :class="{ 'category-emoji-selected': todo.isSelected }"
      @click="todosStore.selectCategoryToAddItem(n, todo)"
    >
      {{ todo.emojy }}
    </div>
    <i
      v-if="!todo.class && !theme.minimalTheme && !todo.modify"
      class="fas fa-cart-arrow-down mr-3 ml-1"
      :class="{
        'hide-minimal-icon': theme.minimalTheme,
        'selected-for-delete': todo.multipleDelete,
      }"
      @click="todosStore.selectTodoForDelete(n)"
    ></i>
    <span
      v-if="theme.minimalTheme && !todo.class && !todo.modify"
      class="mr-4 ml-1"
      @click="todosStore.selectTodoForDelete(n)"
    >
      -
    </span>
    <li
      v-if="!todo.modify"
      class="todo"
      id="todo"
      @click="
        todosStore.myFilter(n);
        todosStore.selectCategoryToAddItem(n, todo);
      "
      :class="{
        active: todo.isActive,
        selected: todo.isSelected,
        'line-through':
          todo.multipleDelete && !theme.retroTheme && !theme.lightTheme,
        'retro-multiple-delete': todo.multipleDelete && theme.retroTheme,
      }"
    >
      {{ todo.name }}
      <img
        v-if="todo.multipleDelete && theme.lightTheme"
        class="scrawl"
        src="@/img/cancella.webp"
        alt="line-through"
      />
    </li>
    <!--CONTENITORE PULSANTI (edit, delete, modify)-->
    <li
      class="button-container bg-light"
      :class="{
        'minimal-btn': theme.minimalTheme,
        'retro-btn': theme.retroTheme,
        categoryActive: todo.class,
        modify: todo.modify,
      }"
    >
      <!-- PULSANTE MODIFICA-->
      <button
        class="btn btn-primary rounded-circle btn-sm"
        @click="todosStore.modifyTodo(n)"
        v-if="!todo.modify && !todo.class"
        :class="todo.isDisabled ? 'disabled' : ''"
        :disabled="!!todo.isDisabled || todo.multipleDelete"
      >
        <img class="pencil" src="@/img/icons/pencil.webp" alt="modify" />
      </button>
      <!--PULSANTE ELIMINA -->
      <button
        class="btn btn-primary rounded-circle btn-sm"
        v-if="!todo.modify"
        @click="todosStore.removeTodo(n, todo)"
        :class="todo.isDisabled ? 'disabled' : ''"
        :disabled="!!todo.isDisabled"
      >
        <img class="trash" src="@/img/icons/trash.webp" alt="delete" />
      </button>
      <!-- INPUT MODIFICA -->
      <input
        class="modify-input border border-primary rounded"
        v-if="todo.modify"
        v-model.trim="todo.name"
      />
      <!--PULSANTE SALVA MODIFICHE -->
      <button
        class="btn btn-success rounded-circle btn-sm"
        v-if="todo.modify"
        :disabled="todo.name.length === 0"
        @click="todosStore.saveModifiedTodo(n, todo, todo.name)"
      >
        <img class="floppy" src="@/img/icons/floppy.webp" alt="save" />
      </button>
      <!--PULSANTE ANNULLA MODIFICHE -->
      <button
        class="btn btn-danger rounded-circle btn-sm"
        v-if="todo.modify"
        @click="todosStore.undoChanges(n)"
      >
        <img class="undo" src="@/img/icons/close.webp" alt="close" />
      </button>
    </li>
  </div>
</template>

<style scoped>
.todo {
  text-transform: uppercase;
  font-size: 20px;
  width: 190px;
  line-height: 1;
  overflow-x: auto;
  overflow-y: hidden;
}
.todo-n {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 5px;
  position: relative;
}
.todo-added {
  border-radius: 7px;
  box-shadow: 0px 0px 20px 0px #138496;
  -webkit-box-shadow: 0px 0px 20px 0px #138496;
  -moz-box-shadow: 0px 0px 20px 0px #138496;
}
.todo:hover {
  cursor: pointer;
}
.button-container {
  display: flex;
  gap: 12px;
  justify-content: end;
  border: 2px solid rgb(0, 172, 252);
  border-radius: 5px;
  padding: 2px;
}
.button-container > button {
  width: 32px;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
  z-index: 100;
  padding: 5px;
}
@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.pencil,
.trash,
.floppy {
  height: 20px;
  width: 20px;
}
.selected-for-delete {
  color: #d70a0a;
}

.modify {
  width: 20.938rem;
  animation: enlarge 0.8s ease-out;
}
@-moz-keyframes enlarge {
  0% {
    width: 85px;
    margin-left: auto;
  }
  100% {
    width: 300px;
    margin-left: auto;
  }
}
@-webkit-keyframes enlarge {
  0% {
    width: 85px;
    margin-left: auto;
  }
  100% {
    width: 300px;
    margin-left: auto;
  }
}
@keyframes enlarge {
  0% {
    width: 85px;
    margin-left: auto;
  }
  100% {
    width: 300px;
    margin-left: auto;
  }
}
.modify-input {
  width: 85%;
  margin-left: 5px;
  animation: enlargeInput 0.8s ease-out;
}
@keyframes enlargeInput {
  0% {
    width: 0;
  }
  100% {
    width: 200px;
  }
}
@-moz-keyframes enlargeInput {
  0% {
    width: 0;
  }
  100% {
    width: 200px;
  }
}
@-webkit-keyframes enlargeInput {
  0% {
    width: 0;
  }
  100% {
    width: 200px;
  }
}
.undo {
  width: 15px;
}
.line-through {
  text-decoration: line-through 4px;
  -webkit-text-decoration-line: line-through 4px;
  color: #d70a0a;
}
#todo {
  position: relative;
}
.scrawl {
  position: absolute;
  top: -3px;
  left: -17px;
  width: 100%;
  height: 100%;
}

.category-list-container {
  width: 365px;
  display: none;
  text-align: center;
  border: 1px solid;
  border-radius: 5px;
  margin-bottom: 10px;
}

.category {
  background: rgba(192, 224, 133, 0.75);
  border-radius: 15px;
}
.category-emoji {
  font-size: 25px;
  display: inline-block;
}
.category-emoji-selected {
  animation: zoominoutsinglefeatured 1.5s infinite;
}
@keyframes zoominoutsinglefeatured {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.3, 1.3);
  }
  100% {
    transform: scale(1, 1);
  }
}
.category-list {
  display: inline-block;
  margin: 2px;
  font-weight: bold;
  text-transform: capitalize;
  border: 1px solid;
  border-radius: 5px;
  padding: 0 3px;
}
.category-list:hover {
  cursor: pointer;
}
.category-list-description {
  font-size: small;
  margin: 0;
}
.selected {
  text-align: center;
  background-color: #0169d9 !important;
  color: #ffffff;
  border-radius: 5px;
  padding-left: 3px;
  animation: underline 0.8s ease-out;
}
@keyframes underline {
  0% {
    width: 0;
  }
  100% {
    width: 200px;
  }
}

.categoryActive {
  padding-right: 0.625rem !important;
  margin: 5px !important;
  background-color: transparent !important;
  border: none !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.custom-show-listbtn {
  background-color: rgba(192, 224, 133, 0.883);
  border: 2px solid rgb(180, 230, 89);
  border-radius: 10%;
  padding: 2px;
  min-width: 30px;
  width: 60px;
}
.custom-show-listbtn > img {
  width: 20px;
}
</style>
