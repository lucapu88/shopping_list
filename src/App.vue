<script setup>
import HeadList from './components/Head-list.vue';
import ConfirmModal from './components/panels-and-modals/Confirm-modal.vue';
import Helper from './components/helper/Helper.vue';
import MainList from './components/Main-list.vue';
import DeleteAllPanel from './components/panels-and-modals/Delete-all-panel.vue';
import FooterButtonsContainer from './components/Footer-buttons-container.vue';
import PreloadImages from './components/Preload-images.vue';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useOthersFestivitiesStore } from '@/store/OthersFestivitiesStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
</script>

<script>
export default {
  data() {
    return {
      checkChristmas: useChristmasStore(),
      checkFestivities: useOthersFestivitiesStore(),
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      theme: useThemeStore(),
      todosStore: useAddModifyDeleteTodosStore(),
    };
  },
  created() {
    this.settings.checkingUpdates(); //controllo "aggiornamenti"
    this.settings.canDeleteCheck(); //setto le impostazioni scelte dall'utente sulla conferma di cancellazione
    this.checkChristmas.merryChristmasTheme(); //controllo se è natale imposto gli addobbi
    this.checkFestivities.checkFestivities(); //controllo se ci sono altre festività
    this.todosStore.createTodosList(); //creo la lista se ci sono elementi
    this.languages.checkAndSetLanguage(); //setto la lingua in base a quella scelta dall'utente nel suo locale
    this.theme.setThemeOnLoad(); //imposto il tema in base a quello scelto dall'utente
  },
  mounted() {
    this.todosStore.toggleButtonDeleteSelectedTodo();
  },
  methods: {
    scrollTop() {
      document
        .getElementById('container-list')
        .scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
    scrollBottom() {
      setTimeout(() => {
        /*Aggiunto il set timeout poichè senza non avviene nulla, 
        mentre così aspetta che appare il div per poi avere la reale grandezza e scrollare.
        Non funziona con un if(this.visible). */
        const containerList = document.getElementById('container-list');
        containerList.scrollTo({
          top: containerList.scrollHeight,
          behavior: 'smooth',
        });
      }, 200);
    },
  },
};
</script>

<template>
  <!-- -------------------------------------------------------Preload delle immagini  -->
  <PreloadImages />

  <div
    class="app-container"
    :class="{
      light: theme.lightTheme,
      dark: theme.darkTheme,
      minimal: theme.minimalTheme,
      retro: theme.retroTheme,
      summer: theme.summerTheme,
      winter: theme.winterTheme,
      pink: theme.pinkTheme,
    }"
  >
    <div id="app">
      <div id="container-list" class="row">
        <div
          class="mt-3 mx-auto padding-bottom-custom"
          :class="{ 'dark-sub-container': theme.darkTheme }"
        >
          <header>
            <HeadList />
            <ConfirmModal />
          </header>

          <main>
            <MainList />
            <Helper v-if="settings.helper" />
          </main>

          <footer>
            <DeleteAllPanel />
            <FooterButtonsContainer
              @scrollToTop="scrollTop"
              @scrollToBottom="scrollBottom"
            />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
}

@media (min-width: 370px) {
  .dark-sub-container {
    overflow-x: hidden;
  }
}
.light {
  background-image: url('@/img/foglio_righe.webp');
}

.dark,
.minimal,
.retro {
  background-image: none;
}
.summer {
  background-image: url('@/img/mare.webp');
  background-repeat: repeat-x;
}
.winter {
  background-image: url('@/img/montagne.webp');
  background-repeat: repeat-x;
}
.row {
  height: 97vh;
  overflow: auto;
}

.padding-bottom-custom {
  padding-bottom: 10%;
}

@media (min-width: 500px) {
  .summer {
    background-image: url('@/img/mare-tablet.webp');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
@media (min-width: 650px) {
  .winter {
    background-image: url('@/img/montagne-tablet.webp');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
