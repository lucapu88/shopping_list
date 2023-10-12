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
    }"
    v-if="!todosStore.visible"
  >
    <p v-if="languages.langIta">
      <i
        class="fas fa-trash-alt"
        :class="{
          'text-danger': !theme.retroTheme,
          'text-warning': theme.retroTheme,
        }"
      ></i>
      Sei sicuro di voler eliminare <br />
      tutta la lista?
    </p>
    <p v-else>
      <!--TOFIX-->
      <i class="fas fa-trash-alt text-danger"></i>
      Are you sure you want <br />
      delete the whole list?
    </p>
    <button
      class="btn btn-primary"
      v-on:click="todosStore.visible = true"
      @click="todosStore.removeAllTodo()"
    >
      <span v-if="languages.langIta">SI</span>
      <span v-else>YES</span>
    </button>
    <button class="btn btn-secondary" v-on:click="todosStore.visible = true">
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
  font-weight: bold;
  max-width: 25ch;
}
.confirm > button {
  margin-right: 15px;
}

.confirm-light {
  background-image: url('@/img/carta-stropicciata.webp') !important;
  background-size: contain;
  border: 2px solid rgb(0, 172, 252);
}
</style>
