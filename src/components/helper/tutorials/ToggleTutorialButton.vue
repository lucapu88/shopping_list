<script setup>
import { useSettingsStore } from '@/store/SettingsStore';
import { useThemeStore } from '@/store/ThemeStore';
</script>

<script>
export default {
  props: {
    features: String,
  },
  data() {
    return {
      settings: useSettingsStore(),
      theme: useThemeStore(),
    };
  },
};
</script>
<template>
  <button
    class="tutorial-btn"
    :class="{
      'retro-tutorial-btn': theme.retroTheme,
      'tutorial-selected': settings.video && features === settings.feature,
    }"
    @click="settings.toggleTutorial(features)"
  >
    <img src="@/img/icons/video-logo.webp" alt="video_tutorial" />
  </button>
</template>

<style scoped>
.tutorial-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 88%;
  border-radius: 25px;
  width: 40px;
  color: #000000 !important;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
  /* non so perchè se scrivo margin: 3px 0; non funziona! non dovrebbe essere la stessa cosa? */
}
.tutorial-btn > img {
  width: 25px;
}

.tutorial-selected {
  background-color: #a9a9a9;
}
</style>
