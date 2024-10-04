<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useLanguageStore } from '@/store/LanguageStore';
import ListIstructionAccordion from './settings/List-istruction-accordion.vue';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      settings: useSettingsStore(),
      languages: useLanguageStore(),
      troubleshooting: 'troubleshooting',
    };
  },
};
</script>

<template>
  <ListIstructionAccordion
    show-list-istructions-input="troubleshooting"
    :istructions-text="languages.helperDescription.troubleshooting"
    :select-deselect-arrow="
      settings.troubleshooting && settings.section === 'troubleshooting'
    "
  />
  <template
    v-if="settings.troubleshooting && settings.section === 'troubleshooting'"
  >
    <p class="troubleshooting">
      <small>
        {{ languages.helperDescription.troubleshootingText.part1 }}
      </small>
    </p>

    <p class="troubleshooting">
      <small>
        {{ languages.helperDescription.troubleshootingText.part2 }}
        <button class="example-backup-btn">
          <img class="cloud" src="@/img/icons/cloud.webp" alt="backup" />
        </button>
      </small>
      <br />
      <small>
        {{ languages.helperDescription.troubleshootingText.part3 }}
      </small>
    </p>

    <p class="troubleshooting">
      <small>
        {{ languages.helperDescription.troubleshootingText.part4 }}
      </small>
      <br />
      <small>
        {{ languages.helperDescription.troubleshootingText.part5 }}
      </small>
    </p>
  </template>
</template>

<style scoped>
.troubleshooting {
  text-align: center;
  border-bottom: 2px solid;
}
.example-backup-btn {
  width: 45px;
  height: 25px;
}
.example-backup-btn > .cloud {
  width: 25px;
}
</style>
