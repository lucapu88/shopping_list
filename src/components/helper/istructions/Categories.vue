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
      categories: 'categories',
      categoriesInfo: 'categoriesInfo',
    };
  },
};
</script>

<template>
  <ListIstructionAccordion
    show-list-istructions-input="categoriesInfo"
    :istructions-text="languages.helperDescription.categories"
    :select-deselect-arrow="
      settings.categoriesInfo && settings.section === categoriesInfo
    "
  />
  <ul
    class="helper-list"
    v-if="settings.categoriesInfo && settings.section === categoriesInfo"
  >
    <li>
      {{ languages.helperDescription.addCategory.part1 }}
      <img
        class="btn btn-info helper-icon"
        :class="{ 'elegant-btn elegant-border': theme.elegantTheme }"
        src="@/img/icons/paper-plane.webp"
        alt="paper-plane"
      />
      {{ languages.helperDescription.addCategory.part2 }}
      <span
        style="border: none"
        class="custom-show-listbtn helper-icon pl-2 pr-2"
        :class="{
          'minimal-helper-btn': theme.minimalTheme,
          'retro-teme-btns': theme.retroTheme,
          'elegant-helper-btn': theme.elegantTheme,
          'pink-theme-btn': theme.pinkTheme,
          'summer-header-btn': theme.summerTheme,
          'winter-header-btn': theme.winterTheme,
        }"
      >
        +
      </span>
      . {{ languages.helperDescription.addCategory.part3 }}
      <span
        class="p-1"
        :class="{
          category: theme.lightTheme,
          'category-retro': theme.retroTheme,
          'category-minimal': theme.minimalTheme,
          'category-elegant': theme.elegantTheme,
          'category-dark': theme.darkTheme,
          'category-summer': theme.summerTheme,
          'category-winter': theme.winterTheme,
          'category-pink': theme.pinkTheme,
        }"
      >
        {{ languages.helperDescription.addCategory.part4 }}
      </span>
      {{ languages.helperDescription.addCategory.part5 }}
      <span :class="theme.elegantTheme ? 'elegant-selected' : 'selected'">
        {{ languages.helperDescription.addCategory.part6 }}.
      </span>
      {{ languages.helperDescription.addCategory.part7 }}
    </li>
    <li>
      {{ languages.helperDescription.addAllCat }}
      <button
        :class="{
          'light-btn': theme.lightTheme,
          'dark-btn': theme.darkTheme,
          'minimal-helper-btn': theme.minimalTheme,
          'retro-insert-all-btn': theme.retroTheme,
          'summer-btn': theme.summerTheme,
          'winter-btn': theme.winterTheme,
          'elegant-helper-btn': theme.elegantTheme,
        }"
      >
        <span>{{ languages.insertAll }}</span></button
      >.
    </li>
    <li>
      {{ languages.helperDescription.removeEmptyCat }}
      <button
        :class="{
          'light-btn': theme.lightTheme,
          'dark-btn': theme.darkTheme,
          'minimal-helper-btn': theme.minimalTheme,
          'retro-insert-all-btn': theme.retroTheme,
          'summer-btn': theme.summerTheme,
          'winter-btn': theme.winterTheme,
          'elegant-helper-btn': theme.elegantTheme,
        }"
      >
        <span>{{ languages.removeEmpty }}</span></button
      >.
    </li>
    <ToggleTutorialButton :features="categories" :margin="true" />
    <Tutorial
      v-if="settings.video && settings.feature === categories"
      :features="categories"
    />
  </ul>
</template>
