<script setup>
import HelperDescriptionIta from './languages/Helper-description-ita.vue';
import HelperDescriptionEng from './languages/Helper-description-eng.vue';
import PrivacyPolicyModal from './panels-and-modals/privacy-policy/Privacy-policy-modal.vue';
import { useThemeStore } from '@/store/ThemeStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
import { useSettingsStore } from '@/store/SettingsStore';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      isChristmas: useChristmasStore(),
      languages: useLanguageStore(),
      addNewTodo: useAddModifyDeleteTodosStore(),
      settings: useSettingsStore(),
      highlits: null,
      textAreaHeight: 55,
      autoDeleteEmptyCategoriesInfo: false,
      safeModeInfo: false,
      pasteListInfo: false,
      themeLoading: false,
      listPasted: null,
      updating: false,
    };
  },
  created() {
    this.safeModeInfo = false;
    this.autoDeleteEmptyCategoriesInfo = false;
    this.pasteListInfo = false;
    this.settings.checkingUpdates();
    this.isChristmas.merryChristmasTheme();
  },
  mounted() {
    document.getElementById('helper-description').scrollTo(0, 0);
    this.resetTextarea();
  },
  methods: {
    resetTextarea() {
      if (!document.getElementById('text-area').value) {
        this.textAreaHeight = 55;
        this.adjustTextareaHeight();
      }
    },
    adjustTextareaHeight() {
      document.getElementById(
        'text-area'
      ).style.height = `${this.textAreaHeight}px`;
    },
    closeHelper() {
      this.settings.closeHelper();
    },
    highlightsForTutorial(num) {
      console.log(num);
      /*Mi serve solo quando creo i video tutorial. In pratica evidenzia il testo per il quale sto mostrando la funzionalità.
        RICORDATI CHE PER IL TUTORIAL DEVI AVERE IL PULSANTA AGGIORNAMENTI ATTIVO, QUINDI COPIA E INCOLLA QUESTO CODICE NEL CREATE/MOUNTED:*/
      // window.localStorage.removeItem('lastMonth'); window.localStorage.removeItem('lastYear');
      // this.highlits = num;
    },
    changeTheme(theme) {
      this.theme.resetAllThemes();
      this.themeLoading = true;
      switch (theme) {
        case 'light':
          this.theme.lightTheme = true;
          window.localStorage.setItem('lightTheme', true);
          break;
        case 'dark':
          this.theme.darkTheme = true;
          window.localStorage.setItem('darkTheme', true);
          break;
        case 'minimal':
          this.theme.minimalTheme = true;
          window.localStorage.setItem('minimalTheme', true);
          break;
        case 'retro':
          this.theme.retroTheme = true;
          window.localStorage.setItem('retroTheme', true);
          break;
        case 'summer':
          this.theme.summerTheme = true;
          window.localStorage.setItem('summerTheme', true);
          break;
        case 'winter':
          this.theme.winterTheme = true;
          window.localStorage.setItem('winterTheme', true);
          break;

        default:
          this.theme.lightTheme = true;
          window.localStorage.setItem('lightTheme', true);
          break;
      }
      setTimeout(() => {
        location.reload();
      }, 700);
    },
    startIncreasing() {
      if (this.textAreaHeight <= 405) {
        this.textAreaHeight += 50;
        this.adjustTextareaHeight();
      }
    },
    startDecreasing() {
      if (this.textAreaHeight >= 56) {
        this.textAreaHeight -= 50;
        this.adjustTextareaHeight();
      }
    },
    addListCopied() {
      if (!this.listPasted) {
        return;
      }
      const listPastedToArray = this.listPasted
        .split('\n')
        .filter((el) => el !== '')
        .map((todo) => todo.replace(/[^a-zA-Z0-9\s]/g, '').trim());
      listPastedToArray.forEach((td) => {
        this.addNewTodo.newTodo = td;
        this.addNewTodo.addTodo();
      });
      location.reload();
    },
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
    },
    updateApp() {
      //dato che per aggiornare l'app basta riavviare la pagina, essendo un app la rendo più carina,
      //e faccio si che ogni mese l'utente può farlo, in modo da avere sempre l'app aggiornata.
      const d = new Date();
      const month = d.getMonth();
      const year = d.getFullYear();
      window.localStorage.setItem('lastMonth', month);
      window.localStorage.setItem('lastYear', year);
      this.updating = true;
      // const range = Math.random() * (1500 - 3500) + 1500;
      setTimeout(() => {
        location.reload();
      }, 3700);
    },
  },
};
</script>

<template>
  <div>
    <!-- CONTAINER LOADING DEI TEMI -->
    <div
      v-if="themeLoading"
      id="loading-themes-container"
      :class="{
        light: theme.lightTheme,
        dark: theme.darkTheme,
        minimal: theme.minimalTheme,
        retro: theme.retroTheme,
        summer: theme.summerTheme,
        winter: theme.winterTheme,
      }"
    >
      <img src="@/img/Loading.webp" alt="loading" />
      <img src="@/img/favicon.png" alt="loading" />
    </div>
    <!-- CONTAINER LOADING UPDATE APP -->
    <div v-if="updating" id="updating-container">
      <img src="@/img/update-img.webp" alt="loading" />
      <h2 class="category-emoji-selected updating-text">..DOWNLOAD..</h2>
    </div>
    <!-- CONTAINER DI TUTTO L'HELPER -->
    <div
      v-if="!themeLoading && !updating"
      id="helper-description-container"
      class="helper-description"
      :class="{
        slideUp: settings.helper,
        slideDown: settings.helperInClosing,
        'dark-theme-helper': theme.darkTheme,
        'minimal-theme-helper': theme.minimalTheme,
        'retro-theme-helper': theme.retroTheme,
        'winter-theme-helper': theme.winterTheme,
        'summer-theme-helper': theme.summerTheme,
        'helper-light': theme.lightTheme,
      }"
    >
      <div class="close-helper-container" @click="closeHelper()">
        <p
          class="close-helper"
          :class="{ 'close-retro-theme-helper': theme.retroTheme }"
        >
          X
        </p>
      </div>
      <img
        v-if="isChristmas.christmasTheme"
        class="left-christmas-info"
        src="@/img/Gingerman-icon.webp"
        alt="Buon Natale!"
      />
      <p
        class="helper-settings-title"
        :class="{
          'christmas-red': isChristmas.christmasTheme,
          'retro-helper-settings-title': theme.retroTheme,
        }"
      >
        {{ languages.settingsTextTitle }}:
      </p>
      <img
        v-if="isChristmas.christmasTheme"
        class="right-christmas-info"
        src="@/img/Decorations-icon.webp"
        alt="E felice anno nuovo!"
      />

      <div id="helper-description">
        <div class="helper-settings">
          <span class="settings-icon mr-1" @click="highlightsForTutorial(1)"
            >&#x2699;</span
          >
          <span :class="{ 'tutorial-highlights': highlits === 1 }">
            {{ languages.safeModeText.title }}
          </span>
          <span class="info-icon" @click="safeModeInfo = !safeModeInfo">i</span
          ><br />
          <li class="ml-4" v-if="safeModeInfo">
            ({{ languages.safeModeText.description }})
          </li>
          <div
            class="toggle-delete-confirm-container"
            @click="settings.toggleDeleteConfirm()"
          >
            <span>{{ languages.safeModeText.function }}</span>
            <span class="toggle-delete-confirm">&#x1F449;</span>
            <span class="text-primary">{{ settings.canDeleteText }}</span>
          </div>
        </div>

        <div class="helper-settings">
          <span class="settings-icon mr-1" @click="highlightsForTutorial(2)"
            >&#x2699;</span
          >
          <span :class="{ 'tutorial-highlights': highlits === 2 }"
            >{{ languages.chosenThemeText }}:
          </span>
          <span class="text-primary">{{ theme.themeName }}</span
          ><br />
          <li class="ml-4">{{ languages.changeThemeText }}</li>
          <br />
          <div
            class="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              class="btn btn-light p-1 border border-dark"
              @click="changeTheme('light')"
            >
              Light
            </button>
            <button
              type="button"
              class="btn btn-dark p-1"
              @click="changeTheme('dark')"
            >
              Dark
            </button>
            <button
              type="button"
              class="btn minimal-theme p-0"
              @click="changeTheme('minimal')"
            >
              Minimal
            </button>
            <button
              type="button"
              class="btn retro-theme p-1"
              @click="changeTheme('retro')"
            >
              Dos
            </button>
            <button
              type="button"
              class="btn summer-theme p-1"
              @click="changeTheme('summer')"
            >
              Summer
            </button>
            <button
              type="button"
              class="btn winter-theme p-0"
              @click="changeTheme('winter')"
            >
              Winter
            </button>
          </div>
        </div>

        <div class="helper-settings">
          <span class="settings-icon mr-1" @click="highlightsForTutorial(3)"
            >&#x2699;</span
          >
          <span :class="{ 'tutorial-highlights': highlits === 3 }"
            >{{ languages.autoDeleteEmptyCategoriesText.title }}:
          </span>
          <span
            class="info-icon"
            @click="
              autoDeleteEmptyCategoriesInfo = !autoDeleteEmptyCategoriesInfo
            "
            >i</span
          ><br />
          <li class="ml-4" v-if="autoDeleteEmptyCategoriesInfo">
            ({{ languages.autoDeleteEmptyCategoriesText.description }})
          </li>
          <li
            class="toggle-delete-confirm-container"
            @click="settings.toggleAutomaticDeleteEmptyCategories()"
          >
            <u>{{ languages.autoDeleteEmptyCategoriesText.function }}</u>
            <div class="toggle-delete-confirm">&#x1F449;</div>
            <span class="text-primary">{{
              settings.canDeleteEmptyCategoriesText
            }}</span>
          </li>
        </div>

        <div class="add-list-copied-container helper-settings">
          <span class="settings-icon mr-1" @click="highlightsForTutorial(4)"
            >&#x2699;</span
          >
          <span :class="{ 'tutorial-highlights': highlits === 4 }">
            {{ languages.pasteListText.title }}
          </span>
          <span class="info-icon" @click="pasteListInfo = !pasteListInfo"
            >i</span
          ><br />
          <li class="ml-4" v-if="pasteListInfo">
            ({{ languages.pasteListText.subtitle }})
          </li>
          <div class="add-list-copied">
            <div class="increase-decrease-container">
              <button
                :class="{ 'retro-btn-border': theme.retroTheme }"
                @click="startDecreasing()"
                touch-action="none"
              >
                <img
                  class="increase-decrease"
                  src="@/img/icons/decrease.webp"
                  alt="decrease"
                />
              </button>
              <button
                :class="{ 'retro-btn-border': theme.retroTheme }"
                @click="startIncreasing()"
                touch-action="none"
              >
                <img
                  class="increase-decrease"
                  src="@/img/icons/increase.webp"
                  alt="increase"
                />
              </button>
            </div>
            <textarea
              id="text-area"
              :class="{ 'add-list-textarea': !theme.retroTheme }"
              rows="2"
              v-model="listPasted"
            >
            </textarea>
            <button
              class="btn btn-light share-update-btn add-list-copied-btn"
              :class="{
                'retro-btn-border': theme.retroTheme,
                'border-dark': !theme.retroTheme,
              }"
              @click="addListCopied()"
            >
              <small v-if="!languages.langIta">Import</small>
              <small v-else>Importa</small>
            </button>
          </div>
        </div>

        <div class="share-update helper-settings">
          <span class="settings-icon mr-1" @click="highlightsForTutorial(5)"
            >&#x2699;</span
          >
          <span :class="{ 'tutorial-highlights': highlits === 5 }"
            >{{ languages.shareText }}:
          </span>
          <button
            class="btn btn-light border-dark share-update-btn"
            @click="shareLink()"
          >
            <img src="@/img/icons/share.webp" alt="share" />
          </button>
          <p class="link-copied" v-if="languages.share.visible">
            {{ languages.share.text }}
          </p>
        </div>

        <div class="share-update helper-settings">
          <span class="settings-icon mr-1" @click="highlightsForTutorial(6)"
            >&#x2699;</span
          >
          <span :class="{ 'tutorial-highlights': highlits === 6 }"
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

        <div id="helper-istructions">
          <!-- ----------------------------------DESCRIZIONE IN BASE ALLA LINGUA SCELTA----------------------------- -->
          <HelperDescriptionIta v-if="languages.langIta" />
          <HelperDescriptionEng v-if="!languages.langIta" />
        </div>

        <button
          id="privacy-policy-btn"
          class="privacy-policy-btn"
          @click="settings.showPrivacyPolicy()"
        >
          <small>Privacy policy</small>
        </button>
      </div>
      <!-- ------------------------------------------MODALE PRIVACY POLICY ------------------------------------------- -->
      <PrivacyPolicyModal v-if="settings.privacyPolicy" />
    </div>
  </div>
</template>

<style scoped>
.helper {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  /* padding: 0 5px; */
  z-index: 5;
  margin-right: 2%;
}

.helper:hover {
  cursor: pointer;
}
.settings {
  width: 33px;
}

.helper-settings {
  margin-bottom: 10px;
}

.helper-description {
  position: absolute;
  left: 0;
  top: -100%;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-size: contain;
  z-index: 150;
  background-color: #ffffff;
}

#loading-themes-container,
#updating-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-size: contain;
  z-index: 150;
  background-color: #ffffff;
  color: #d0e8a4;
  text-align: center;
  font-family: Verdana, sans-serif;
}

#loading-themes-container > img:first-child {
  margin-top: 30%;
  width: 75%;
  animation: zoominoutsinglefeatured 1s infinite;
}
#loading-themes-container > img:last-child {
  width: 100%;
}
@keyframes zoominoutsinglefeatured {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.3, 1.3);
  }
  100% {
    transform: scale(1, 1);
  }
}

#updating-container > img {
  margin-top: 35%;
  width: 100%;
  -webkit-text-fill-color: transparent;
  position: relative;
  left: -300px;
  -webkit-animation: slideDino 3.5s forwards;
  animation: slideDino 3.5s forwards;
  z-index: 1;
}
@-webkit-keyframes slideDino {
  50% {
    left: 0;
  }
  100% {
    left: 500px;
  }
}
@keyframes slideDino {
  50% {
    left: 0;
  }
  100% {
    left: 500px;
  }
}
.updating-text {
  font-weight: bold;
}

.helper-light {
  background-image: repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
    repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
  background-size: 30px 30px;
}

.helper-description.slideUp {
  display: block;
  animation-name: slideUp;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
@keyframes slideUp {
  from {
    top: 200%;
  }
  to {
    top: 0;
  }
}
.helper-description.slideDown {
  display: block;
  animation-name: slideDown;
  animation-duration: 1s;
  animation-fill-mode: none;
}
@keyframes slideDown {
  from {
    top: 55px;
  }
  to {
    top: 200%;
  }
}
.helper-description.slideDown > div:not(:first-child) {
  display: none;
}

.helper-description > span {
  font-size: 12px;
}
.helper-description > div:not(:first-child) {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 30%;
}
.helper-settings-title {
  margin-bottom: 15px;
  text-align: center;
}

.add-list-copied {
  display: grid;
  grid-template-columns: 9% 65% 20%;
  gap: 10px;
  margin-top: 5px;
}
.info-icon {
  font-family: Times New Roman;
  font-weight: bold;
  font-size: large;
  border: 2px solid;
  padding: 0 7px;
  border-radius: 50%;
  margin-left: 15px;
}
.add-list-textarea {
  border-radius: 5px;
}

textarea {
  resize: vertical;
  min-height: 55px;
  max-height: 405px;
}

.increase-decrease-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.increase-decrease-container > button {
  margin: 0;
  padding: 0;
  border: 1px solid rgb(41, 41, 41);
  border-radius: 5px;
}
.increase-decrease {
  width: 15px;
  height: 10px;
}
.add-list-copied-btn {
  max-height: 55px;
}

.share-update {
  margin-top: 15px;
}
.share-update-btn {
  padding: 0 10px 3px;
}
.share-update-btn > img {
  width: 20px;
}

.update-container {
  text-align: center;
}
.link-copied {
  font-size: 13px;
  margin-left: 5px;
  color: rgb(197, 0, 0);
}

.ready-for-update {
  background-color: #28a745 !important;
}

.close-helper-container {
  width: 65px;
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
}
.close-helper {
  float: right;
  width: 25px;
  padding-left: 5px;
}

.helper-footer {
  font-size: smaller;
}
.helper-footer-title {
  text-align: center;
  color: #ff0000;
  border-top: 1.5px solid #000000;
  margin-top: 15px;
  margin-bottom: 0;
}
.left-christmas-info {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 50px;
}
.right-christmas-info {
  position: absolute;
  top: 5px;
  right: 10%;
  width: 50px;
}

.toggle-delete-confirm {
  display: inline-block;
  animation: zoominout 1.5s infinite;
}
@keyframes zoominout {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.3, 1.3);
  }
  100% {
    transform: scale(1, 1);
  }
}

.toggle-delete-confirm-container {
  margin-left: 20px;
}
.toggle-delete-confirm-container:hover {
  cursor: pointer;
}

.light {
  background-color: white !important;
}
.dark {
  background-color: #333333 !important;
}
.minimal {
  background-color: #a5becc !important;
}
.retro {
  background-color: black !important;
}

.summer {
  background-color: #12a1df !important;
}
.winter {
  background-color: #1a3159 !important;
}
.tutorial-highlights {
  background-color: orangered;
  color: white;
}
</style>
