<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
</script>

<script>
export default {
  emits: ['updatingAppEmit'],
  data() {
    return {
      languages: useLanguageStore(),
      settings: useSettingsStore(),
    };
  },
  methods: {
    updateApp() {
      /*dato che per aggiornare l'app basta riavviare la pagina, essendo un app la rendo più carina,
        e faccio si che ogni mese l'utente può farlo, in modo da avere sempre l'app aggiornata.*/
      const d = new Date();
      const month = d.getMonth();
      const year = d.getFullYear();
      window.localStorage.setItem('lastMonth', month);
      window.localStorage.setItem('lastYear', year);
      this.$emit('updatingAppEmit', true);
      // const range = Math.random() * (1500 - 3500) + 1500;
      setTimeout(() => {
        location.reload();
      }, 3700);
    },
  },
};
</script>

<template>
  <div class="share-update helper-settings">
    <span class="settings-icon mr-1" @click="settings.highlightsForTutorial(6)">
      &#x2699;
    </span>
    <span :class="{ 'tutorial-highlights': settings.highlits === 6 }"
      >{{ languages.updateText.description }}:</span
    >
    <div class="update-container">
      <button
        :disabled="languages.updateText.readyForUpdate"
        :class="{
          'ready-for-update': !languages.updateText.readyForUpdate,
        }"
        class="btn btn-light border-dark mr-3 share-update-btn"
        @click="updateApp()"
      >
        <img src="@/img/icons/update.webp" alt="update" />
      </button>
      <small v-if="!languages.updateText.readyForUpdate">
        {{ languages.updateText.available }}
      </small>
      <small v-if="languages.updateText.readyForUpdate">
        {{ languages.updateText.unavailable }}
      </small>
    </div>
  </div>
</template>

<style scoped>
.update-container {
  text-align: center;
}

.ready-for-update {
  background-color: #28a745 !important;
}
</style>
