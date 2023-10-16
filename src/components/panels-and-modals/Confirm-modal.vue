<script setup>
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
};
</script>

<template>
  <div v-if="todosStore.confirmDeleteModal" class="modal">
    <div
      class="confirm-delete-modal-content"
      :class="{
        'delete-selected': todosStore.deleteSelected,
        'confirm-light': theme.lightTheme,
        'confirm-dark': theme.darkTheme,
        'confirm-minimal': theme.minimalTheme,
        'confirm-retro': theme.retroTheme,
        'confirm-summer': theme.summerTheme,
        'confirm-winter': theme.winterTheme,
      }"
    >
      <p class="mt-5">{{ languages.completeConfirmText }}</p>
      <!--{{ todo }} TOFIX era nel vecchio codice dentro lo span qui sotto. C'è da capire se serve e a cosa serve.-->
      <span style="display: none">{{ todosStore.index }} </span>
      <button
        v-if="todosStore.confirmRemove"
        @click="todosStore.confirmedRemoveTodo(todosStore.index)"
      >
        <span v-if="languages.langIta">SI</span>
        <span v-else>YES</span>
      </button>
      <button
        v-if="todosStore.deleteSelected"
        @click="todosStore.deleteSelectedTodos()"
      >
        <span v-if="languages.langIta">SI</span>
        <span v-else>YES</span>
      </button>
      <button @click="todosStore.confirmDeleteModal = false">NO</button>
    </div>
  </div>
</template>

<style scoped>
.confirm-delete-modal-content {
  margin: auto;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 700px;
  overflow: auto;
  text-align: center;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.4s;
}
.confirm-delete-modal-content > button {
  border-radius: 5px;
  width: 40px;
  padding: 5px;
}
.delete-selected {
  color: rgb(215, 0, 0) !important;
  font-weight: bold;
}

.confirm-light {
  background-color: #ffffff;
  background-image: url('@/img/postit.webp');
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
  background-image: url('@/img/maldive.webp');
  background-size: cover;
  background-repeat: no-repeat;
}

.confirm-winter {
  background-color: #ffff;
  border: 2px solid #ffff;
  background-image: url('@/img/winter-forest.webp');
  background-size: cover;
  background-repeat: no-repeat;
}
.confirm-winter > p {
  background-color: #b7c3c390;
  border-radius: 5px;
}

button {
  margin-right: 15px;
}
</style>
