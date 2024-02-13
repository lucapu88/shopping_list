<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
</script>

<script>
export default {
  props: {
    showListIstructionsInput: String,
    istructionsText: [Object, String],
    selectDeselectArrow: Boolean,
  },
  data() {
    return {
      theme: useThemeStore(),
      languages: useLanguageStore(),
      settings: useSettingsStore(),
    };
  },
};
</script>

<template>
  <div
    class="list-title"
    :class="{
      'list-title-color':
        theme.lightTheme || theme.winterTheme || theme.darkTheme,
      'list-title-summer': theme.summerTheme,
      'list-title-retro': theme.retroTheme,
    }"
    @click="settings.showListIstructions(showListIstructionsInput)"
  >
    {{ istructionsText }}
    <img
      class="arrow"
      :class="{
        'arrow-selected': selectDeselectArrow,
        'arrow-deselected': !selectDeselectArrow,
      }"
      src="@/img/icons/arrow-down.webp"
      alt="arrow"
    />
  </div>
</template>

<style scoped>
.list-title {
  padding: 5px;
  border: 1px solid;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-left: -15px;
  display: flex;
  justify-content: space-between;
}
.list-title-color {
  background-color: #ededed;
  color: #000000;
}
.list-title-summer {
  background-color: #efcb8f;
}
.list-title-retro {
  border-radius: 0 !important;
  border: 2px outset;
}
.arrow {
  width: 1.5625rem;
  height: 1.5625rem;
}
.arrow-selected {
  -webkit-animation: spin 0.5s linear;
  -moz-animation: spin 0.5s linear;
  animation: spin 0.5s linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }
}

.arrow-deselected {
  -webkit-animation: reverseSpin 0.5s linear;
  -moz-animation: reverseSpin 0.5s linear;
  animation: reverseSpin 0.5s linear;
}
@keyframes reverseSpin {
  from {
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }
  to {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}
</style>
