<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useLanguageStore } from '@/store/LanguageStore';
import ListIstructionAccordion from '../../panels-and-modals/List-istruction-accordion.vue';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      isChristmas: useChristmasStore(),
      settings: useSettingsStore(),
      languages: useLanguageStore(),
      deleteAllInfo: 'deleteAllInfo',
    };
  },
};
</script>

<template>
  <ListIstructionAccordion
    show-list-istructions-input="deleteAllInfo"
    :istructions-text="languages.helperDescription.deleteAllTitle"
    :select-deselect-arrow="
      settings.deleteAllInfo && settings.section === deleteAllInfo
    "
  />
  <ul
    class="helper-list"
    v-if="settings.deleteAllInfo && settings.section === deleteAllInfo"
  >
    <li>
      {{ languages.helperDescription.deleteAllText.part1 }}
      <span
        class="delete-all-description p-2"
        :class="{
          'elegant-delete-all-btn elegant-border': theme.elegantTheme,
        }"
      >
        {{ languages.deleteAll }}
        <img class="skull" src="@/img/icons/skull.webp" alt="skull" />
      </span>
      {{ languages.helperDescription.deleteAllText.part2 }}
    </li>
  </ul>
</template>

<style scoped>
.delete-all-description {
  background-color: #000000;
  color: #ffffff;
  padding: 5px;
}
</style>
