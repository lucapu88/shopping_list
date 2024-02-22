<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
</script>

<script>
export default {
  emits: ['themeLoadingEmit'],
  data() {
    return {
      theme: useThemeStore(),
      languages: useLanguageStore(),
      settings: useSettingsStore(),
    };
  },
  methods: {
    changeTheme(theme) {
      this.theme.resetAllThemes();
      this.$emit('themeLoadingEmit', true);
      switch (theme) {
        case 'light':
          this.theme.lightTheme = true;
          window.localStorage.setItem('lightTheme', true);
          break;
        case 'dark':
          this.theme.darkTheme = true;
          window.localStorage.setItem('darkTheme', true);
          break;
        case 'minimal':
          this.theme.minimalTheme = true;
          window.localStorage.setItem('minimalTheme', true);
          break;
        case 'retro':
          this.theme.retroTheme = true;
          window.localStorage.setItem('retroTheme', true);
          break;
        case 'summer':
          this.theme.summerTheme = true;
          window.localStorage.setItem('summerTheme', true);
          break;
        case 'winter':
          this.theme.winterTheme = true;
          window.localStorage.setItem('winterTheme', true);
          break;
        case 'elegant':
          this.theme.elegantTheme = true;
          window.localStorage.setItem('elegantTheme', true);
          break;
        case 'pink':
          this.theme.pinkTheme = true;
          window.localStorage.setItem('pinkTheme', true);
          break;

        default:
          this.theme.lightTheme = true;
          window.localStorage.setItem('lightTheme', true);
          break;
      }
      setTimeout(() => {
        location.reload();
      }, 1150);
    },
  },
};
</script>

<template>
  <div class="helper-settings">
    <span class="settings-icon mr-1" @click="settings.highlightsForTutorial(2)">
      &#x2699;
    </span>
    <span :class="{ 'tutorial-highlights': settings.highlits === 2 }"
      >{{ languages.chosenThemeText }}:
    </span>
    <span class="text-primary">{{ theme.themeName }}</span
    ><br />
    <li class="ml-4">{{ languages.changeThemeText }}</li>
    <br />
    <div class="btns-container">
      <div class="top">
        <button
          type="button"
          class="btn btn-light p-1 border border-dark"
          @click="changeTheme('light')"
        >
          Light
        </button>
        <button
          type="button"
          class="btn btn-dark p-1"
          @click="changeTheme('dark')"
        >
          Dark
        </button>
        <button
          type="button"
          class="btn minimal-theme p-1"
          @click="changeTheme('minimal')"
        >
          Minimal
        </button>
        <button
          type="button"
          class="btn retro-theme p-1"
          @click="changeTheme('retro')"
        >
          Dos
        </button>
      </div>

      <div class="bottom">
        <button
          type="button"
          class="btn summer-theme p-1"
          @click="changeTheme('summer')"
        >
          Summer
        </button>
        <button
          type="button"
          class="btn winter-theme p-1"
          @click="changeTheme('winter')"
        >
          Winter
        </button>
        <button
          type="button"
          class="btn elegant-theme elegant-border p-1"
          @click="changeTheme('elegant')"
        >
          Elegant
        </button>
        <button
          type="button"
          class="btn pink-theme-btn p-1"
          @click="changeTheme('pink')"
        >
          Mr.Pink
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btns-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  margin: 4px 8px;
  width: 75px;
}

.top,
.bottom {
  display: flex;
  align-items: center;
}
</style>
