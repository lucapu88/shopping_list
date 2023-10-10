<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useChristmasStore } from '@/store/ChristmasStore';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      isChristmas: useChristmasStore(),
      addEditDelete: false,
      categoriesInfo: false,
      dragNdrop: false,
      selectAndDelete: false,
      copyHighlights: false,
      deleteAllInfo: false,
      tutorial: false,
      support: false,
      highlits: null,
    };
  },
  methods: {
    highlightsForTutorial(num) {
      console.log(num);
      /*Mi serve solo quando creo i video tutorial. In pratica evidenzia il testo per il quale sto mostrando la funzionalità.
        RICORDATI CHE PER IL TUTORIAL DEVI AVERE IL PULSANTA AGGIORNAMENTI ATTIVO, QUINDI COPIA E INCOLLA QUESTO CODICE NEL CREATE/MOUNTED:*/
      // window.localStorage.removeItem('lastMonth'); window.localStorage.removeItem('lastYear');
      // this.highlits = num;
    },
    showListIstructions(section) {
      this.highlits = null;
      switch (section) {
        case 'addEditDelete':
          this.addEditDelete = !this.addEditDelete;
          break;
        case 'categoriesInfo':
          this.categoriesInfo = !this.categoriesInfo;
          break;
        case 'dragNdrop':
          this.dragNdrop = !this.dragNdrop;
          break;
        case 'selectAndDelete':
          this.selectAndDelete = !this.selectAndDelete;
          break;
        case 'copyHighlights':
          this.copyHighlights = !this.copyHighlights;
          break;
        case 'deleteAllInfo':
          this.deleteAllInfo = !this.deleteAllInfo;
          break;
        case 'tutorial':
          this.tutorial = !this.tutorial;
          break;
        case 'support':
          this.support = !this.support;
          break;
      }
    },
    resetListIstructions() {
      this.addEditDelete = false;
      this.categoriesInfo = false;
      this.dragNdrop = false;
      this.selectAndDelete = false;
      this.copyHighlights = false;
      this.deleteAllInfo = false;
      this.tutorial = false;
      this.support = false;
    },
  },
};
</script>

<template>
  <div>
    <p class="helper-title" @click="highlightsForTutorial(6)">
      Risoluzione Problemi:
    </p>
    <small :class="{ 'tutorial-highlights': highlits === 6 }">
      Nel caso riscontrassi lentezza o blocchi nel caricamento di immagini,
      controlla la tua connessione, se è ok prova a riavviare l'app. Se il
      problema persiste segnalalo all'email nella sezione contatti.
    </small>
    <p
      class="helper-title"
      :class="isChristmas.christmasTheme ? 'christmas-red' : ''"
    >
      Istruzioni:
    </p>
    <ul class="helper-list">
      <div
        class="list-title"
        :class="{
          'list-title-color': theme.lightTheme || theme.winterTheme,
          'list-title-summer': theme.summerTheme,
          'list-title-retro': theme.retroTheme,
        }"
        @click="showListIstructions('addEditDelete')"
      >
        Aggiungere, Modificare, Eliminare.
        <img
          class="arrow"
          :class="{
            'arrow-selected': this.addEditDelete,
            'arrow-deselected': !this.addEditDelete,
          }"
          src="./img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="addEditDelete">
        <i class="far fa-paper-plane btn btn-info helper-icon"></i>
        serve per aggiungere alla lista roba da comprare.
      </li>
      <li v-if="addEditDelete">
        Con
        <i
          class="fas fa-pencil-alt btn-primary rounded-circle btn-sm helper-icon"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-btn-button': theme.retroTheme,
          }"
        ></i>
        potrai modificare un nome e salvare le modifiche cliccando
        <i
          class="far fa-save btn btn-success rounded-circle btn-sm helper-icon"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-btn-button': theme.retroTheme,
          }"
        ></i
        >.
      </li>
      <li v-if="addEditDelete">
        Con
        <i
          class="fas fa-trash-alt btn-primary rounded-circle btn-sm helper-icon"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-btn-button': theme.retroTheme,
          }"
        ></i>
        eliminerai roba dalla lista.
      </li>
      <li v-if="addEditDelete">
        Con
        <button
          class="btn btn-outline-info p-0"
          style="rotate: 270deg"
          :class="{
            'minimal-theme-back-top': theme.minimalTheme,
            'dark-theme-back-top': theme.darkTheme,
            'retro-theme-back-top': theme.retroTheme,
            'summer-theme-back-top': theme.summerTheme,
            'winter-theme-back-top': theme.winterTheme,
          }"
        >
          <span> >> </span>
        </button>
        torni in cima alla lista. Funziona quando è molto lunga.
      </li>
      <div
        class="list-title"
        :class="{
          'list-title-color': theme.lightTheme || theme.winterTheme,
          'list-title-summer': theme.summerTheme,
          'list-title-retro': theme.retroTheme,
        }"
        @click="showListIstructions('categoriesInfo')"
      >
        Categorie.
        <img
          class="arrow"
          :class="{
            'arrow-selected': this.categoriesInfo,
            'arrow-deselected': !this.categoriesInfo,
          }"
          src="./img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="categoriesInfo">
        Per aggiungere una categoria basta scriverla e cliccare su
        <i class="far fa-paper-plane btn btn-info helper-icon"></i> oppure
        sceglierla nel riquadro cliccando
        <span
          style="border: none"
          class="custom-show-listbtn helper-icon pl-2 pr-2"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-teme-btns': theme.retroTheme,
          }"
          >+</span
        >. Ti apparirà
        <span
          class="category p-1"
          :class="{
            'category-retro': theme.retroTheme,
            'category-minimal': theme.minimalTheme,
          }"
        >
          Così
        </span>
        e cliccando sul nome si <span class="selected">evidenzierà</span>, così
        potrai aggiungerci roba al suo interno. Una volta finito basta
        ricliccare sul nome o su qualsiasi altro nome di altre categorie.
      </li>
      <li v-if="categoriesInfo">
        You can add all the categories by clicking on
        <button
          :class="{
            'light-btn': theme.lightTheme,
            'dark-btn': theme.darkTheme,
            'minimal-helper-btn': theme.minimalTheme,
            'retro-insert-all-btn': theme.retroTheme,
            'summer-btn': theme.summerTheme,
            'winter-btn': theme.winterTheme,
          }"
        >
          <span>Inserisci tutte</span></button
        >.
      </li>
      <li v-if="categoriesInfo">
        You can delete only the categories left empty by clicking on
        <button
          :class="{
            'light-btn': theme.lightTheme,
            'dark-btn': theme.darkTheme,
            'minimal-helper-btn': theme.minimalTheme,
            'retro-insert-all-btn': theme.retroTheme,
            'summer-btn': theme.summerTheme,
            'winter-btn': theme.winterTheme,
          }"
        >
          <span>Rimuovi Vuote</span></button
        >.
      </li>
      <div
        class="list-title"
        :class="{
          'list-title-color': theme.lightTheme || theme.winterTheme,
          'list-title-summer': theme.summerTheme,
          'list-title-retro': theme.retroTheme,
        }"
        @click="showListIstructions('dragNdrop')"
      >
        Trascina e sposta elementi.
        <img
          class="arrow"
          :class="{
            'arrow-selected': this.dragNdrop,
            'arrow-deselected': !this.dragNdrop,
          }"
          src="./img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="dragNdrop">
        Cliccando su
        <button
          class="btn custom-show-listbtn"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-teme-btns': theme.retroTheme,
          }"
        >
          <img src="./img/drag-and-drop.webp" alt="move" />
        </button>
        potrai trascinare gli elementi e spostarli dove vuoi.
      </li>
      <div
        class="list-title"
        :class="{
          'list-title-color': theme.lightTheme || theme.winterTheme,
          'list-title-summer': theme.summerTheme,
          'list-title-retro': theme.retroTheme,
        }"
        @click="showListIstructions('selectAndDelete')"
      >
        Seleziona ed elimina più elementi.
        <img
          class="arrow"
          :class="{
            'arrow-selected': this.selectAndDelete,
            'arrow-deselected': !this.selectAndDelete,
          }"
          src="./img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="selectAndDelete">
        Puoi eliminare più prodotti insieme cliccando su
        <i class="fas fa-cart-arrow-down"></i>. Così li smarchi e poi a fine
        spesa cliccado sul
        <button class="text-danger border-danger rounded">
          <i class="fas fa-trash-alt"></i>
        </button>
        in basso verranno eliminati solo quelli che hai smarcato.
      </li>
      <div
        class="list-title"
        :class="{
          'list-title-color': theme.lightTheme || theme.winterTheme,
          'list-title-summer': theme.summerTheme,
          'list-title-retro': theme.retroTheme,
        }"
        @click="showListIstructions('copyHighlights')"
      >
        Copia lista, Evidenzia elementi.
        <img
          class="arrow"
          :class="{
            'arrow-selected': this.copyHighlights,
            'arrow-deselected': !this.copyHighlights,
          }"
          src="./img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="copyHighlights">
        <i class="far fa-copy btn btn-outline-success helper-icon"></i> serve
        per copiare la lista e incollarla dove vuoi.
      </li>
      <li v-if="copyHighlights">
        Puoi rendere "importante" un prodotto cliccando sul nome e verrà
        <span class="active">evidenziato</span>, così non potrà essere eliminato
        o modificato.
      </li>
      <div
        class="list-title"
        :class="{
          'list-title-color': theme.lightTheme || theme.winterTheme,
          'list-title-summer': theme.summerTheme,
          'list-title-retro': theme.retroTheme,
        }"
        @click="showListIstructions('deleteAllInfo')"
      >
        Elimina tutto.
        <img
          class="arrow"
          :class="{
            'arrow-selected': this.deleteAllInfo,
            'arrow-deselected': !this.deleteAllInfo,
          }"
          src="./img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="deleteAllInfo">
        Se clicchi su
        <span class="delete-all-description">
          cancella tutto <i class="fas fa-skull-crossbones"></i
        ></span>
        ti apparirà un riquadro di conferma per l'eliminazione di
        <u>TUTTA</u> la lista.
      </li>
      <div
        class="list-title"
        :class="{
          'list-title-color': theme.lightTheme || theme.winterTheme,
          'list-title-summer': theme.summerTheme,
          'list-title-retro': theme.retroTheme,
        }"
        @click="showListIstructions('tutorial')"
      >
        Video tutorial.
        <img
          class="arrow"
          :class="{
            'arrow-selected': this.tutorial,
            'arrow-deselected': !this.tutorial,
          }"
          src="./img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <video
        v-if="tutorial"
        :class="{ video: !theme.retroTheme }"
        width="98%"
        height="500"
        poster="./img/favicon.png"
        controls
      >
        <source src="./video/ITA.mp4" type="video/mp4" />
        Il tuo device non supporta i video tag. Guardalo su youtube
        <a href="https://www.youtube.com/watch?v=VSO1k1CUrBY" target="_blank"
          >cliccando qui</a
        >
      </video>
      <div
        class="list-title"
        :class="{
          'list-title-color': theme.lightTheme || theme.winterTheme,
          'list-title-summer': theme.summerTheme,
          'list-title-retro': theme.retroTheme,
        }"
        @click="showListIstructions('support')"
      >
        Contatti.
        <img
          class="arrow"
          :class="{
            'arrow-selected': this.support,
            'arrow-deselected': !this.support,
          }"
          src="./img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="support">
        Per qualsiasi segnalazione puoi contattarmi:
        <a href="mailto:lucarhcp88@hotmail.it">lucarhcp88@hotmail.it</a>
      </li>
      <li v-if="support">
        Seguici sui social:
        <a
          href="https://www.facebook.com/profile.php?id=100080626866860"
          target="_blank"
        >
          <img src="img/facebook.webp" alt="social_facebook" class="social" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.helper-title {
  margin-bottom: 0;
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid;
}
.tutorial-highlights {
  background-color: orangered;
  color: white;
}
.helper-list {
  padding-inline-start: 25px;
}
.helper-list > li {
  display: list-item;
  animation: fadeIn 0.6s;
}

.list-title {
  padding: 5px;
  border: 1px solid;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-left: -15px;
  display: flex;
  justify-content: space-between;
}
.list-title-color {
  background-color: #ededed;
  color: #000000;
}
.list-title-summer {
  background-color: #efcb8f;
}
.list-title-retro {
  border-radius: 0 !important;
  border: 2px outset;
}
.arrow {
  width: 1.5625rem;
  height: 1.5625rem;
}
.arrow-selected {
  -webkit-animation: spin 0.5s linear;
  -moz-animation: spin 0.5s linear;
  animation: spin 0.5s linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }
}

.arrow-deselected {
  -webkit-animation: reverseSpin 0.5s linear;
  -moz-animation: reverseSpin 0.5s linear;
  animation: reverseSpin 0.5s linear;
}
@keyframes reverseSpin {
  from {
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }
  to {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}

.helper-icon {
  max-width: 30px;
  max-height: 30px;
  padding: 5px;
  text-align: center;
  display: inline;
  margin-left: 0;
}

.category {
  background: rgba(192, 224, 133, 0.75);
  border-radius: 15px;
}
.selected {
  text-align: center;
  background-color: #0169d9;
  color: #ffffff;
  border-radius: 5px;
  padding-left: 3px;
  animation: underline 0.8s ease-out;
}

.custom-show-listbtn {
  background-color: rgba(192, 224, 133, 0.883);
  border: 2px solid rgb(180, 230, 89);
  border-radius: 10%;
  padding: 2px;
  min-width: 30px;
  width: 60px;
}
.custom-show-listbtn > img {
  width: 20px;
}

.delete-all-description {
  background-color: #000000;
  color: #ffffff;
}

.social {
  width: 40px;
  height: 30px;
}
</style>
