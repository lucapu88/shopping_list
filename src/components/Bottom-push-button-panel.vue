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
  methods: {
    emitScrollTop() {
      this.$emit('scrollTo', true);
    },
  },
};
</script>

<template>
  <div class="footer-btns-container pb-3">
    <!-- PULSANTE ELIMINA SOLO I SELEZIONATI -->
    <button
      v-if="todosStore.canDeleteMultipleTodo"
      class="text-danger border-danger rounded multiple-delete p-2"
      :class="{ christmas: isChristmas.christmasTheme }"
      @click="todosStore.openModalFordeleteSelectedTodos()"
    >
      <i class="fas fa-trash-alt"> </i>
    </button>
    <!-- PULSANTE ELIMINA TUTTO-->
    <button
      class="delete-all btn btn-dark"
      :class="{ christmas: isChristmas.christmasTheme }"
      @click="todosStore.openDeleteAllModal()"
    >
      <span v-if="languages.langIta">Cancella tutto </span>
      <span v-else>Delete ALL </span>
      <i class="fas fa-skull-crossbones"></i>
    </button>
    <!-- PULSANTE TORNA IN CIMA -->
    <button
      class="btn btn-outline-info btn-back-to-top"
      :class="{
        christmas: isChristmas.christmasTheme,
        'minimal-theme-back-top': theme.minimalTheme,
        'dark-theme-back-top': theme.darkTheme,
        'retro-theme-back-top': theme.retroTheme,
        'summer-theme-back-top': theme.summerTheme,
        'winter-theme-back-top': theme.winterTheme,
      }"
      @click="emitScrollTop()"
    >
      <span> >> </span>
    </button>

    <!-- CAMBIO LINGUA -->
    <div
      class="btns-language-container"
      :class="{
        christmas: theme.christmasTheme,
        'minimal-btn': theme.minimalTheme,
        'retro-btn': theme.retroTheme,
      }"
    >
      <button
        class="btn-lang-left"
        :class="{ 'language-selected': !languages.langIta }"
        @click="languages.setEnglishLanguage()"
      >
        Eng
      </button>
      <button
        class="btn-lang-right"
        :class="{ 'language-selected': languages.langIta }"
        @click="languages.setItalianoLanguage()"
      >
        Ita
      </button>
    </div>
  </div>
</template>

<style scoped>
.btns-language-container {
  display: flex;
}
.footer-btns-container {
  display: flex;
  justify-content: space-around;
}

.btn-back-to-top {
  /* rotate: 270deg; */
  transform: rotate(270deg);
  -moz-transform: rotate(270deg);
  -webkit-transform: rotate(270deg);
  padding: 0 5px 5px;
  font-weight: bold;
  background-color: #efefef;
}

.multiple-delete {
  position: fixed;
  bottom: 3%;
  left: 3%;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
}

.language-selected {
  background-color: rgb(0, 172, 252);
  color: rgb(255, 255, 255) !important;
}
.btn-lang-left {
  padding: 0px 5px;
  border-radius: 10px 0 0 10px;
  color: rgb(0, 172, 252);
  border-color: rgb(0, 172, 252);
}
.btn-lang-right {
  padding: 0px 5px;
  border-radius: 0 10px 10px 0;
  color: rgb(0, 172, 252);
  border-color: rgb(0, 172, 252);
}
</style>
