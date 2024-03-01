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
    };
  },
  methods: {
    shareLink() {
      const playStoreUrl =
        'https://play.google.com/store/apps/details?id=io.kodular.caputoluca88.Shopping_List';
      navigator.clipboard.writeText(playStoreUrl);
      document.addEventListener('copy', function (e) {
        //copio negli appunti anche qui per sistemare su android (quello di sopra non funziona)
        e.clipboardData.setData('text/plain', playStoreUrl);
        e.preventDefault();
      });
      document.execCommand('copy');
      this.languages.share.visible = true;
      setTimeout(() => (this.languages.share.visible = false), 5000);
      this.openShareOptions();
    },
    async openShareOptions() {
      let shareData = {
        title: 'Shopping List',
        text: 'Share with whoever you want',
        url: 'https://play.google.com/store/apps/details?id=io.kodular.caputoluca88.Shopping_List',
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
  <div class="share-update helper-settings">
    <span class="settings-icon mr-1" @click="settings.highlightsForTutorial(5)">
      &#x2699;
    </span>
    <span :class="{ 'tutorial-highlights': settings.highlits === 5 }">
      {{ languages.shareText }}:
    </span>
    <button
      id="share"
      class="btn btn-light border-dark share-update-btn"
      @click="shareLink()"
    >
      <img src="@/img/icons/share.webp" alt="share" />
    </button>
    <p class="link-copied" v-if="languages.share.visible">
      {{ languages.share.text }}
    </p>
  </div>
</template>

<style scoped>
.link-copied {
  font-size: 13px;
  margin-left: 5px;
  color: rgb(197, 0, 0);
}
</style>
