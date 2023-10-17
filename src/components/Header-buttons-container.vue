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
        'retro-teme-btns': theme.retroTheme,
      }"
      @click="todosStore.toggleDragDrop()"
    >
      <img src="@/img/icons/drag-and-drop.webp" alt="move" />
    </button>
    <!--PULSANTE COPIA LISTA-->
    <button
      class="btn custom-show-listbtn"
      :class="{
        'minimal-btn': theme.minimalTheme,
        'retro-teme-btns': theme.retroTheme,
      }"
      @click="copy()"
    >
      <img class="copy" src="@/img/icons/copy.webp" alt="copy" />
    </button>
    <!--PULSANTE MOSTRA CATEGORIE -->
    <button
      class="btn custom-show-listbtn"
      :class="{
        'btn-selected': todosStore.categoryList,
        'minimal-btn': theme.minimalTheme,
        'minimal-selected-btn': theme.minimalTheme && todosStore.categoryList,
        'retro-teme-btns': theme.retroTheme,
      }"
      @click="todosStore.showCategoryList()"
    >
      <span v-if="!todosStore.categoryList">+</span>
      <span v-else>-</span>
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
  margin: 0 20%;
  color: #28a745;
}
</style>
