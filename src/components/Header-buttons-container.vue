<script setup>
import CategoriesPanel from './panels-and-modals/Categories-panel.vue';
import { useLanguageStore } from '@/store/LanguageStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      languages: useLanguageStore(),
      todosStore: useAddModifyDeleteTodosStore(),
    };
  },
  methods: {
    copy() {
      const myList = this.todosStore.todos.map((todo) =>
        todo.class ? `${todo.name.toUpperCase()}\n` : ` ${todo.name}\n`
      );
      const arrayNoCommas = myList.join(' ');

      this.todosStore.categoryList = false;
      navigator.clipboard.writeText(arrayNoCommas); //copio negli appunti una lista della spesa per poterla condividere
      document.addEventListener('copy', function (e) {
        //copio negli appunti anche qui per sistemare su android (quello di sopra non funziona)
        e.clipboardData.setData('text/plain', arrayNoCommas);
        e.preventDefault();
      });
      document.execCommand('copy'); //riprovo/ricopio negli appunti anche qui per sistemare su android (per essere sicuri)
      this.languages.copyList.visible = true;
      this.todosStore.removeSelectedCategoryToAddItem();
      setTimeout(() => (this.languages.copyList.visible = false), 3000); //cambio il testo del pulsante copia
      navigator.vibrate(400);
    },
  },
};
</script>

<template>
  <div class="pushbutton-container">
    <!-- DRAG N DROP -->
    <button
      class="btn custom-show-listbtn"
      :class="{
        'btn-selected': todosStore.isDraggable,
        'minimal-btn': theme.minimalTheme,
        'minimal-selected-btn': theme.minimalTheme && todosStore.isDraggable,
        'elegant-selected-btn': theme.elegantTheme && todosStore.isDraggable,
        'retro-selected-btn': theme.retroTheme && todosStore.isDraggable,
        'retro-teme-btns': theme.retroTheme,
        'elegant-btn': theme.elegantTheme,
      }"
      :disabled="todosStore.showOnlyImportantTodos"
      @click="todosStore.toggleDragDrop()"
    >
      <img
        v-if="!theme.elegantTheme"
        src="@/img/icons/drag-and-drop.webp"
        alt="move"
      />
      <img
        v-if="theme.elegantTheme"
        src="@/img/icons/drag-and-drop-elegant.webp"
        alt="move"
      />
    </button>
    <!--PULSANTE COPIA LISTA-->
    <button
      class="btn custom-show-listbtn"
      :class="{
        'minimal-btn': theme.minimalTheme,
        'retro-teme-btns': theme.retroTheme,
        'elegant-btn': theme.elegantTheme,
      }"
      @click="copy()"
    >
      <img
        v-if="!theme.elegantTheme"
        class="copy"
        src="@/img/icons/copy.webp"
        alt="copy"
      />
      <img
        v-if="theme.elegantTheme"
        class="copy"
        src="@/img/icons/copy-elegant.webp"
        alt="copy"
      />
    </button>
    <!--PULSANTE MOSTRA CATEGORIE -->
    <button
      class="btn custom-show-listbtn"
      :class="{
        'btn-selected': todosStore.categoryList,
        'minimal-btn': theme.minimalTheme,
        'minimal-selected-btn': theme.minimalTheme && todosStore.categoryList,
        'elegant-selected-btn': theme.elegantTheme && todosStore.categoryList,
        'retro-selected-btn': theme.retroTheme && todosStore.categoryList,
        'retro-teme-btns': theme.retroTheme,
        'elegant-btn': theme.elegantTheme,
      }"
      :disabled="todosStore.showOnlyImportantTodos"
      @click="todosStore.showCategoryList()"
    >
      <strong v-if="!todosStore.categoryList">+</strong>
      <strong v-else>-</strong>
    </button>
    <!-- PULSANTE MOSTRA SOLO GLI ELEMENTI EVIDENZIATI COME IMPORTANTI -->
    <button
      class="btn custom-show-listbtn"
      :class="{
        'btn-selected': todosStore.showOnlyImportantTodos,
        'btn-important-selected':
          todosStore.showOnlyImportantTodos && !theme.retroTheme,
        'minimal-btn': theme.minimalTheme,
        'minimal-selected-btn':
          theme.minimalTheme && todosStore.showOnlyImportantTodos,
        'elegant-selected-btn':
          theme.elegantTheme && todosStore.showOnlyImportantTodos,
        'retro-selected-btn':
          theme.retroTheme && todosStore.showOnlyImportantTodos,
        'retro-teme-btns': theme.retroTheme,
        'elegant-btn': theme.elegantTheme,
      }"
      @click="todosStore.showOnlyImportant()"
    >
      <img
        v-if="!theme.elegantTheme"
        class="important"
        src="@/img/icons/important.webp"
        alt="important"
      />
      <img
        v-if="theme.elegantTheme"
        class="important"
        src="@/img/icons/important-elegant.webp"
        alt="important"
      />
    </button>
  </div>
  <div class="drag-n-drop-text">
    <small v-if="todosStore.isDraggable">
      {{ languages.helperDescription.dragNdropText.dragginText }}
    </small>
  </div>
  <p class="list-copied" v-if="languages.copyList.visible">
    {{ languages.copyList.text }}
  </p>
  <p class="no-important-todos-alert" v-if="languages.importantTodos.visible">
    {{ languages.importantTodos.alert }}
  </p>

  <CategoriesPanel />
</template>

<style scoped>
.pushbutton-container {
  display: flex;
  gap: 25px;
  height: 30px;
  align-items: center;
  margin: 10px;
  justify-content: center;
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

.list-copied {
  font-size: 13px;
  color: #28a745;
  text-align: center;
}

.btn-important-selected {
  animation: zoominout 1.5s infinite;
}
@keyframes zoominout {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}

.no-important-todos-alert {
  font-size: 15px;
  text-align: center;
  color: #c30000;
}
</style>
