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
      safeModeInfo: false,
    };
  },
  //    created() { //TOFIX era nel vecchio componente, verificare se serve, secondo me non serve
  //     this.safeModeInfo = false;
  //   },
};
</script>

<template>
  <div class="helper-settings">
    <span class="settings-icon mr-1" @click="settings.highlightsForTutorial(1)">
      &#x2699;
    </span>
    <span :class="{ 'tutorial-highlights': settings.highlits === 1 }">
      {{ languages.safeModeText.title }}:
    </span>
    <span class="info-icon" @click="safeModeInfo = !safeModeInfo">i</span><br />
    <li class="ml-4" v-if="safeModeInfo">
      ({{ languages.safeModeText.description }})
    </li>
    <div class="toggle-delete-confirm-container">
      <span
        class="toggle-delete-confirm"
        @click="settings.toggleDeleteConfirm()"
      >
        &#x1F449;
      </span>
      <u class="mr-2" @click="settings.toggleDeleteConfirm()">
        {{ languages.safeModeText.function }}
      </u>
      <span class="text-primary">{{ settings.canDeleteText }}</span>
    </div>
  </div>
</template>
