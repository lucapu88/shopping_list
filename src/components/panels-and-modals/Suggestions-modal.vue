<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
import { useSuggestionsStore } from '@/store/SuggestionsStore';
</script>

<script>
export default {
  data() {
    return {
      languages: useLanguageStore(),
      themes: useThemeStore(),
      todosStore: useAddModifyDeleteTodosStore(),
      suggestionsStore: useSuggestionsStore(),
    };
  },
};
</script>

<template>
  <div class="modal suggestions">
    <div
      class="suggestions-modal-container"
      :class="{
        'sugg-modal-light': themes.lightTheme,
        'sugg-modal-dark': themes.darkTheme,
        'sugg-modal-minimal': themes.minimalTheme,
        'sugg-modal-retro': themes.retroTheme,
        'sugg-modal-summer': themes.summerTheme,
        'sugg-modal-winter': themes.winterTheme,
        'sugg-modal-elegant': themes.elegantTheme,
        'sugg-modal-pink': themes.pinkTheme,
      }"
    >
      <header>
        <h4>{{ todosStore.categoryName }}</h4>
        <span
          class="close-sugg-modal"
          @click="suggestionsStore.toggleSuggestionsModal()"
        >
          X
        </span>
      </header>
      <main>
        <p
          class="tip"
          v-for="(tip, n) in suggestionsStore.suggestionsList"
          :key="n"
          @click="suggestionsStore.addTip(tip)"
        >
          {{ tip }}
        </p>
      </main>
    </div>
  </div>
</template>

<style scoped>
.modal {
  padding-top: 0;
  z-index: 400;
}
.suggestions {
  display: flex;
  justify-content: center;
  align-items: center;
}
.suggestions-modal-container {
  position: relative;
  width: 90%;
  height: 90%;
}
.suggestions-modal-container > header {
  text-align: center;
  margin-top: 10px;
}
.suggestions-modal-container > main {
  height: 95%;
  padding: 0 15px;
  overflow: auto;
}
.close-sugg-modal {
  position: absolute;
  top: 0%;
  right: 0%;
  width: 40px;
  height: 40px;
  text-align: center;
}
.tip {
  margin-bottom: 5px;
}
</style>
