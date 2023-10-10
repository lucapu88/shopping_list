<script setup>
import HeadList from './components/Head-list.vue';
import Helper from './components/Helper.vue';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useThemeStore } from '@/store/ThemeStore';
</script>

<script>
export default {
  data() {
    return {
      checkChristmas: useChristmasStore(),
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      theme: useThemeStore(),
    };
  },
  created() {
    this.settings.checkingUpdates(); //controllo "aggiornamenti"
    this.languages.checkAndSetLanguage(); //setto la lingua in base a quella scelta dall'utente nel suo locale
    this.settings.canDeleteCheck(); //setto le impostazioni scelte dall'utente sulla conferma di cancellazione
    this.languages.setCategories(); //setto le categorie di default
    this.checkChristmas.merryChristmasTheme(); //controllo se è natale imposto gli addobbi
    this.theme.setThemeOnLoad(); //imposto il tema in base a quello scelto dall'utente
  },
};
</script>

<template>
  <header>
    <div class="container">
      <div id="app">
        <div id="container-list" class="row">
          <div class="mt-3 mx-auto padding-bottom-custom">
            <HeadList />
            <Helper v-if="settings.helper" />
          </div>
        </div>
      </div>
    </div>
  </header>

  <main></main>
</template>

<style scoped>
.row {
  height: 97vh;
  overflow: auto;
}

.padding-bottom-custom {
  padding-bottom: 10%;
}
</style>
