<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
</script>

<script>
export default {
  data() {
    return {
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      autoDeleteEmptyCategoriesInfo: false,
    };
  },
  //   created() { //TOFIX era nel vecchio componente, verificare se serve, secondo me non serve
  //     this.autoDeleteEmptyCategoriesInfo = false;
  //   },
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
    <li class="toggle-delete-confirm-container">
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
  </div>
</template>
