<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
</script>

<script>
export default {
  props: {
    todo: [Object, String],
    index: Number,
  },
  data() {
    return {
      theme: useThemeStore(),
      todosStore: useAddModifyDeleteTodosStore(),
    };
  },
};
</script>

<template>
  <div
    class="only-important-visible"
    v-if="todosStore.showOnlyImportantTodos"
  ></div>

  <div v-if="todo.class && theme.minimalTheme" class="category-emoji-minimal">
    &#x2022;
  </div>
  <div
    v-if="todo.class && !theme.minimalTheme"
    class="category-emoji"
    :class="{ 'category-emoji-selected': todo.isSelected }"
    @click="todosStore.selectCategoryToAddItem(index, todo)"
  >
    {{ todo.emojy }}
  </div>
  <!-- CARRELLO -->
  <span
    alt="cart"
    v-if="
      !todo.class && !theme.minimalTheme && !theme.pinkTheme && !todo.modify
    "
    class="cart"
    :class="{
      'hide-minimal-icon': theme.minimalTheme || theme.elegantTheme,
    }"
    @click="todosStore.selectTodoForDelete(index)"
  >
    <img v-if="todo.multipleDelete" src="@/img/icons/cart-red.webp" />
    <img
      v-if="!todo.multipleDelete && (theme.darkTheme || theme.retroTheme)"
      src="@/img/icons/cart-white.webp"
    />
    <img
      v-if="
        !todo.multipleDelete &&
        (theme.lightTheme || theme.summerTheme || theme.winterTheme)
      "
      src="@/img/icons/cart-black.webp"
    />
  </span>
  <!-- NO CARRELLO PER MINIMAL -->
  <span
    v-if="theme.minimalTheme && !todo.class && !todo.modify"
    class="mr-3 ml-1 boldi-cipollino"
    @click="todosStore.selectTodoForDelete(index)"
  >
    -
  </span>
  <!-- NO CARRELLO PER ELEGANT -->
  <span
    v-if="theme.elegantTheme && !todo.class && !todo.modify"
    class="mr-3 ml-1 boldi-cipollino"
    @click="todosStore.selectTodoForDelete(index)"
  >
    <template v-if="todo.multipleDelete"> / </template>
    <template v-else> > </template>
  </span>
  <!-- CHECKBOX PER PINK -->
  <div
    v-if="theme.pinkTheme && !todo.class && !todo.modify"
    class="pink-checkbox pink-theme-btn"
    :class="{ checked: todo.multipleDelete }"
    @click="todosStore.selectTodoForDelete(index)"
  >
    <img
      v-if="todo.multipleDelete"
      class="checkbox"
      src="@/img/icons/checked.webp"
      alt="checked"
    />
  </div>

  <!-- CONTENITORE DEL TODO -->
  <li
    v-if="!todo.modify"
    class="todo"
    id="todo"
    @click="
      todosStore.myFilter(index);
      todosStore.selectCategoryToAddItem(index, todo);
    "
    :class="{
      active: todo.isActive,
      selected: todo.isSelected && !theme.elegantTheme,
      'elegant-selected': todo.isSelected && theme.elegantTheme,
      'line-through':
        todo.multipleDelete &&
        !theme.retroTheme &&
        !theme.lightTheme &&
        !theme.elegantTheme,
      'retro-multiple-delete': todo.multipleDelete && theme.retroTheme,
      'elegant-line-through': todo.multipleDelete && theme.elegantTheme,
      'boldi-cipollino': theme.elegantTheme,
      'winter-todo': theme.winterTheme,
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
      'elegant-btn': theme.elegantTheme,
      'pink-theme-btn': theme.pinkTheme && !todo.class,
      transparent: theme.elegantTheme && todo.class,
      categoryActive: todo.class,
      modify: todo.modify,
    }"
  >
    <!-- PULSANTE MODIFICA-->
    <button
      class="btn btn-primary rounded-circle btn-sm"
      @click="todosStore.modifyTodo(index)"
      v-if="!todo.modify && !todo.class"
      :class="{
        disabled: todo.isDisabled,
        'pink-theme-btn-secondary': theme.pinkTheme,
      }"
      :disabled="!!todo.isDisabled || todo.multipleDelete"
    >
      <img class="pencil" src="@/img/icons/pencil.webp" alt="modify" />
    </button>
    <!--PULSANTE ELIMINA -->
    <button
      class="btn btn-primary rounded-circle btn-sm"
      v-if="!todo.modify"
      @click="todosStore.removeTodo(index, todo)"
      :class="{
        disabled: todo.isDisabled,
        'pink-theme-btn-secondary': theme.pinkTheme,
      }"
      :disabled="!!todo.isDisabled"
    >
      <img class="trash" src="@/img/icons/trash.webp" alt="delete" />
    </button>
    <!-- INPUT MODIFICA -->
    <!--Qui mi sengala un errore del compilatore perchè non posso modificare proprietà che mi arrivano in input. 
        Ma in questo caso io la modifica vera e propria la faccio nello store quindi non penso debba necessariamente fare un emit,
        perchè la proprietà modificata non viene passata da figlio al padre ma viene modificata nello store e dallo store passa al padre. -->
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
      @click="todosStore.saveModifiedTodo(index, todo, todo.name)"
    >
      <img class="floppy" src="@/img/icons/floppy.webp" alt="save" />
    </button>
    <!--PULSANTE ANNULLA MODIFICHE -->
    <button
      class="btn btn-danger rounded-circle btn-sm"
      v-if="todo.modify"
      @click="todosStore.undoChanges(index)"
    >
      <img class="undo" src="@/img/icons/close.webp" alt="close" />
    </button>
  </li>
</template>

<style scoped>
.transparent {
  background-color: transparent !important;
}
.only-important-visible {
  position: absolute;
  top: 0;
  background-color: #66666669;
  border-radius: 10px;
  width: 98vw;
  height: 100%;
  z-index: 200;
}

.checked {
  background-color: #ffffff !important;
}
</style>
