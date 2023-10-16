<script setup>
import HeadList from './components/Head-list.vue';
import ConfirmModal from './components/panels-and-modals/Confirm-modal.vue';
import Helper from './components/Helper.vue';
import MainList from './components/Main-list.vue';
import DeleteAllPanel from './components/panels-and-modals/Delete-all-panel.vue';
import FooterButtonsContainer from './components/Footer-buttons-container.vue';
import { useChristmasStore } from '@/store/ChristmasStore';
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
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      theme: useThemeStore(),
      todosStore: useAddModifyDeleteTodosStore(),
    };
  },
  created() {
    this.settings.checkingUpdates(); //controllo "aggiornamenti"
    this.languages.checkAndSetLanguage(); //setto la lingua in base a quella scelta dall'utente nel suo locale
    this.settings.canDeleteCheck(); //setto le impostazioni scelte dall'utente sulla conferma di cancellazione
    this.checkChristmas.merryChristmasTheme(); //controllo se è natale imposto gli addobbi
    this.theme.setThemeOnLoad(); //imposto il tema in base a quello scelto dall'utente
    this.todosStore.createTodosList();
    this.todosStore.changeTodoAdded(this.todosStore.todos);
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
        Non funziona con un if(this.visible). DA APPROFONDIRE */

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
  <div
    class="container"
    :class="{
      light: theme.lightTheme,
      dark: theme.darkTheme,
      minimal: theme.minimalTheme,
      retro: theme.retroTheme,
      summer: theme.summerTheme,
      winter: theme.winterTheme,
    }"
  >
    <div id="app">
      <div id="container-list" class="row">
        <!--  ------------------------------------------------------  -->
        <div class="mt-3 mx-auto padding-bottom-custom">
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
        <!--  ------------------------------------------------------  -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
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
</style>
