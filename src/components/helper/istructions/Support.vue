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
      support: 'support',
      isAndroid: false,
    };
  },
  created() {
    this.isAndroid = navigator.userAgentData.platform === 'Android';
  },
  methods: {
    async openLink() {
      let shareData = {
        title: 'Github project',
        text: '',
        url: 'https://github.com/lucapu88/shopping_list',
      };
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <ListIstructionAccordion
    show-list-instructions-input="support"
    :istructions-text="languages.helperDescription.support"
    :select-deselect-arrow="settings.support && settings.section === support"
  />
  <ul
    class="helper-list"
    v-if="settings.support && settings.section === support"
  >
    <li>
      {{ languages.helperDescription.supportText }}
      <a href="mailto:shoppinglist.service@outlook.com">
        shoppinglist.service@outlook.com
      </a>
    </li>
    <li>
      {{ languages.helperDescription.twitterText }}
      <a href="https://twitter.com/shoppList231023" target="_blank">
        <img src="@/img/icons/x.webp" alt="social_twitter" class="social" />
      </a>
    </li>
    <li>
      {{ languages.helperDescription.githubText }}
      <!-- lo faccio perchè ho anche un iphone e questa cosa qui sotto non funziona per android -->
      <span v-if="!isAndroid" @click="openLink()">
        <img src="@/img/icons/github.webp" alt="github" class="social" />
      </span>

      <a
        v-if="isAndroid"
        href="https://github.com/lucapu88/shopping_list"
        target="_blank"
      >
        <img src="@/img/icons/github.webp" alt="github" class="social" />
      </a>
    </li>
  </ul>
</template>

<style scoped>
.social {
  width: 35px;
  height: 30px;
}
</style>
