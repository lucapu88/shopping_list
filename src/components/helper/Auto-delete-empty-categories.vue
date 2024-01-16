<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useThemeStore } from '@/store/ThemeStore';
import Tutorial from './tutorials/Tutorial.vue';
import ToggleTutorialButton from './tutorials/ToggleTutorialButton.vue';
</script>

<script>
export default {
  data() {
    return {
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      theme: useThemeStore(),
      autoDeleteEmptyCategoriesInfo: false,
      autoDeleteEmptyCategories: 'autoDeleteEmptyCategories',
    };
  },
};
</script>

<template>
  <div class="helper-settings">
    <span class="settings-icon mr-1" @click="settings.highlightsForTutorial(3)">
      &#x2699;
    </span>
    <span
      :class="{
        'tutorial-highlights': settings.highlits === 3,
        'spanish-size': languages.langSpanish,
      }"
      >{{ languages.autoDeleteEmptyCategoriesText.title }}:
    </span>
    <span
      class="info-icon"
      @click="autoDeleteEmptyCategoriesInfo = !autoDeleteEmptyCategoriesInfo"
      >i</span
    >
    <br />
    <li class="ml-4" v-if="autoDeleteEmptyCategoriesInfo">
      ({{ languages.autoDeleteEmptyCategoriesText.description }})
    </li>
    <li class="toggle-delete-confirm-container" id="auto-delete">
      <div
        class="toggle-delete-confirm"
        @click="settings.toggleAutomaticDeleteEmptyCategories()"
      >
        &#x1F449;
      </div>
      <u class="mr-2" @click="settings.toggleAutomaticDeleteEmptyCategories()">
        {{ languages.autoDeleteEmptyCategoriesText.function }}
      </u>
      <span class="text-primary">
        {{ settings.canDeleteEmptyCategoriesText }}
      </span>
    </li>

    <ToggleTutorialButton :features="autoDeleteEmptyCategories" />
    <Tutorial
      v-if="settings.video && settings.feature === autoDeleteEmptyCategories"
      :features="autoDeleteEmptyCategories"
    />
  </div>
</template>
