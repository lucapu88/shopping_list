<script setup>
import { useChristmasStore } from '@/store/ChristmasStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      isChristmas: useChristmasStore(),
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      todosStore: useAddModifyDeleteTodosStore(),
    };
  },
};
</script>

<template>
  <div
    class="confirm col-10 mx-auto rounded text-center mb-3"
    :class="{
      christmas: isChristmas.christmasTheme,
      'confirm-light': theme.lightTheme,
      'dark-theme-confirm': theme.darkTheme,
      'minimal-theme-confirm': theme.minimalTheme,
      'retro-theme-confirm-delete': theme.retroTheme,
      'summer-confirm': theme.summerTheme,
      'winter-confirm': theme.winterTheme,
      'elegant-theme-confirm': theme.elegantTheme,
      'pink-theme-confirm': theme.pinkTheme,
    }"
    v-if="!todosStore.visible"
  >
    <p>
      <img class="trash" src="@/img/icons/trash-red.webp" alt="delete" />
      {{ languages.deleteAllConfirmText }}
    </p>
    <button
      class="btn btn-primary"
      :class="{ 'pink-theme-btn': theme.pinkTheme }"
      v-on:click="todosStore.visible = true"
      @click="todosStore.removeAllTodo()"
    >
      <span v-if="languages.langIta || languages.langSpanish">SI</span>
      <span v-if="languages.langEnglish">YES</span>
    </button>
    <button
      class="btn btn-secondary"
      :class="{ 'pink-theme-btn-secondary': theme.pinkTheme }"
      v-on:click="todosStore.visible = true"
    >
      NO
    </button>
  </div>
</template>

<style scoped>
.confirm {
  padding: 10px 5px;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
  z-index: 100;
}
@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.confirm > p {
  font-size: 18px;
  margin: 0 auto;
  padding-bottom: 10px;
  font-weight: bold;
  max-width: 25ch;
}
.confirm > button {
  margin-right: 15px;
  width: 2.8125rem;
}

.confirm-light {
  background-image: url('@/img/carta-stropicciata.webp') !important;
  background-size: contain;
  border: 2px solid rgb(0, 172, 252);
}
</style>
