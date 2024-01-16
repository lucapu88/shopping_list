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
      safeModeInfo: false,
      safeDelete: 'safeDelete',
    };
  },
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
    <div class="toggle-delete-confirm-container" id="safe-delete">
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

    <ToggleTutorialButton :features="safeDelete" />
    <Tutorial
      v-if="settings.video && settings.feature === safeDelete"
      :features="safeDelete"
    />
  </div>
</template>
