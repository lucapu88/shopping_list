<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
import ListIstructionAccordion from '../../panels-and-modals/List-istruction-accordion.vue';
</script>

<script>
export default {
  emits: ['chageLanguageEmit'],
  data() {
    return {
      theme: useThemeStore(),
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      changeLanguage: 'changeLanguage',
    };
  },
  methods: {
    onChageLanguageEmit(value) {
      this.$emit('chageLanguageEmit', value);
      setTimeout(() => {
        location.reload();
      }, 1150);
    },
  },
};
</script>

<template>
  <div class="helper-settings">
    <ListIstructionAccordion
      show-list-instructions-input="changeLanguage"
      :istructions-text="languages.changeLanguage"
      :select-deselect-arrow="
        settings.changeLanguage && settings.section === changeLanguage
      "
      :isSettings="true"
    />
    <div
      class="languages-btns-container mb-3"
      v-if="settings.changeLanguage && settings.section === changeLanguage"
    >
      <div
        class="btns-language-container"
        :class="{
          christmas: theme.christmasTheme,
          'minimal-btn': theme.minimalTheme,
          'elegant-btn': theme.elegantTheme,
        }"
      >
        <button
          class="btn-lang-left"
          :class="{
            'language-selected': languages.langEnglish && !theme.retroTheme,
            'retro-helper-btn-selected':
              languages.langEnglish && theme.retroTheme,
            'retro-helper-btn': theme.retroTheme,
            'pink-theme-btn': theme.pinkTheme,
          }"
          @click="
            languages.setEnglishLanguage();
            onChageLanguageEmit('english');
          "
        >
          {{ languages.languagesBtns.english }}
        </button>
        <button
          class="btn-lang-center"
          :class="{
            'language-selected': languages.langSpanish && !theme.retroTheme,
            'retro-helper-btn-selected':
              languages.langSpanish && theme.retroTheme,
            'retro-helper-btn': theme.retroTheme,
            'pink-theme-btn': theme.pinkTheme,
          }"
          @click="
            languages.setSpanishLanguage();
            onChageLanguageEmit('spanish');
          "
        >
          {{ languages.languagesBtns.spanish }}
        </button>
        <button
          class="btn-lang-right"
          :class="{
            'language-selected': languages.langIta && !theme.retroTheme,
            'retro-helper-btn-selected': languages.langIta && theme.retroTheme,
            'retro-helper-btn': theme.retroTheme,
            'pink-theme-btn': theme.pinkTheme,
          }"
          @click="
            languages.setItalianoLanguage();
            onChageLanguageEmit('italian');
          "
        >
          {{ languages.languagesBtns.italian }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.languages-btns-container {
  display: flex;
  justify-content: center;
}

.btns-language-container {
  display: flex;
}

.btn-lang-left {
  padding: 0px 5px;
  border-radius: 10px 0 0 10px;
  color: rgb(0, 172, 252);
  border-color: rgb(0, 172, 252);
}
.btn-lang-center {
  padding: 0px 5px;
  border-radius: 0;
  color: rgb(0, 172, 252);
  border-color: rgb(0, 172, 252);
}
.btn-lang-right {
  padding: 0px 5px;
  border-radius: 0 10px 10px 0;
  color: rgb(0, 172, 252);
  border-color: rgb(0, 172, 252);
}

.language-selected {
  background-color: rgb(0, 172, 252);
  color: rgb(255, 255, 255) !important;
}
</style>
