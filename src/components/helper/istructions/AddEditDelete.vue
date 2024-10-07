<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useLanguageStore } from '@/store/LanguageStore';
import ListIstructionAccordion from '../../panels-and-modals/List-istruction-accordion.vue';
import Tutorial from '../tutorials/Tutorial.vue';
import ToggleTutorialButton from '../tutorials/ToggleTutorialButton.vue';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      isChristmas: useChristmasStore(),
      settings: useSettingsStore(),
      languages: useLanguageStore(),
      addEditDelete: 'addEditDelete',
    };
  },
};
</script>

<template>
  <ListIstructionAccordion
    show-list-instructions-input="addEditDelete"
    :istructions-text="languages.helperDescription.addEditDelete"
    :select-deselect-arrow="
      settings.addEditDelete && settings.section === addEditDelete
    "
  />
  <ul
    class="helper-list"
    v-if="settings.addEditDelete && settings.section === addEditDelete"
  >
    <li>
      <img
        class="btn btn-info helper-icon"
        :class="{ 'elegant-btn elegant-border': theme.elegantTheme }"
        src="@/img/icons/paper-plane.webp"
        alt="paper-plane"
      />
      {{ languages.helperDescription.add }}
    </li>
    <li>
      {{ languages.priceText }}
    </li>
    <li>
      <img
        class="btn-primary rounded-circle btn-sm helper-icon"
        :class="{
          'minimal-helper-btn': theme.minimalTheme,
          'retro-btn-button': theme.retroTheme,
          'elegant-helper-btn': theme.elegantTheme,
          'pink-theme-btn': theme.pinkTheme,
        }"
        src="@/img/icons/pencil.webp"
        alt="pencil"
      />
      {{ languages.helperDescription.edit }}
      <img
        class="btn-success rounded-circle btn-sm helper-icon"
        :class="{
          'minimal-helper-btn': theme.minimalTheme,
          'retro-btn-button': theme.retroTheme,
          'elegant-helper-btn': theme.elegantTheme,
        }"
        src="@/img/icons/floppy.webp"
        alt="floppy"
      />.
    </li>
    <li>
      <img
        class="btn-primary rounded-circle btn-sm helper-icon"
        :class="{
          'minimal-helper-btn': theme.minimalTheme,
          'retro-btn-button': theme.retroTheme,
          'elegant-helper-btn': theme.elegantTheme,
          'pink-theme-btn': theme.pinkTheme,
        }"
        src="@/img/icons/trash.webp"
        alt="trash"
      />
      {{ languages.helperDescription.delete }}
    </li>
    <li>
      <button
        class="btn btn-back-to-top p-1 mr-1"
        :class="{
          'btn-outline-info': theme.lightTheme || theme.darkTheme,
          'minimal-theme-back-top': theme.minimalTheme,
          'dark-theme-back-top': theme.darkTheme,
          'retro-theme-back-top': theme.retroTheme,
          'summer-theme-back-top': theme.summerTheme,
          'winter-theme-back-top': theme.winterTheme,
          'elegant-theme-back-top': theme.elegantTheme,
          'pink-theme-btn': theme.pinkTheme,
        }"
      >
        <span> >> </span>
      </button>
      {{ languages.helperDescription.backToTop }}
    </li>

    <ToggleTutorialButton :features="addEditDelete" :margin="true" />
    <Tutorial
      v-if="settings.video && settings.feature === addEditDelete"
      :features="addEditDelete"
    />
  </ul>
</template>
