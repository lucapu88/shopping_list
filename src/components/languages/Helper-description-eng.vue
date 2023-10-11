<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useSettingsStore } from '@/store/SettingsStore';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      isChristmas: useChristmasStore(),
      settings: useSettingsStore(),
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
      Troubleshooting:
    </p>
    <small :class="{ 'tutorial-highlights': highlits === 6 }">
      If you experience slowness or blocks in loading images, check your
      connection, if it's ok try restarting the app. If the problem persists,
      report it to the e-mail in the support section.
    </small>
    <p
      class="helper-title"
      :class="isChristmas.christmasTheme ? 'christmas-red' : ''"
    >
      Instructions:
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
        Add, Edit, Delete.
        <img
          class="arrow"
          :class="{
            'arrow-selected': addEditDelete,
            'arrow-deselected': !addEditDelete,
          }"
          src="@/img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="addEditDelete">
        <i class="far fa-paper-plane btn btn-info helper-icon"> </i> is used to
        add stuff to buy list.
      </li>
      <li v-if="addEditDelete">
        With
        <!-- <i
          class="fas fa-pencil-alt btn-primary rounded-circle btn-sm helper-icon"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-btn-button': theme.retroTheme,
          }"
        ></i> -->
        <!--TOFIX -->
        <img
          class="btn-primary rounded-circle btn-sm helper-icon"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-btn-button': theme.retroTheme,
          }"
          src="@/img/pencil.webp"
          alt="pencil"
        />. you can change a name and save the changes by clicking
        <!-- <i
          class="far fa-save btn btn-success rounded-circle btn-sm helper-icon"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-btn-button': theme.retroTheme,
          }"
        ></i> -->
        <!--TOFIX -->
        <img
          class="btn-success rounded-circle btn-sm helper-icon"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-btn-button': theme.retroTheme,
          }"
          src="@/img/floppy.webp"
          alt="floppy"
        />.
      </li>
      <li v-if="addEditDelete">
        With
        <!-- <i
          class="fas fa-trash-alt btn-primary rounded-circle btn-sm helper-icon"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-btn-button': theme.retroTheme,
          }"
        >
        </i> -->
        <!--TOFIX -->
        <img
          class="btn-primary rounded-circle btn-sm helper-icon"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-btn-button': theme.retroTheme,
          }"
          src="@/img/trash.webp"
          alt="trash"
        />
        you will remove stuff from the list.
      </li>
      <li v-if="addEditDelete">
        With
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
        you returns at the top of the list. It works when it is very long.
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
        Categories.
        <img
          class="arrow"
          :class="{
            'arrow-selected': categoriesInfo,
            'arrow-deselected': !categoriesInfo,
          }"
          src="@/img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="categoriesInfo">
        To add a category just type it in and click
        <i class="far fa-paper-plane btn btn-info helper-icon"> </i> or choose
        it in the box by clicking
        <span
          style="border: none"
          class="custom-show-listbtn helper-icon pl-2 pr-2"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-teme-btns': theme.retroTheme,
          }"
        >
          + </span
        >. It will appear
        <span
          class="category p-1"
          :class="{
            'category-retro': theme.retroTheme,
            'category-minimal': theme.minimalTheme,
          }"
        >
          to you like
        </span>
        and clicking on the name will
        <span class="selected">highlight it</span>. So you can add stuff into
        it. When you are done just click back on the name or any other category
        names.
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
          <span>Insert all</span></button
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
          <span>Remove only empty</span></button
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
        Drag and Drop.
        <img
          class="arrow"
          :class="{
            'arrow-selected': dragNdrop,
            'arrow-deselected': !dragNdrop,
          }"
          src="@/img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="dragNdrop">
        By clicking on
        <button
          class="btn custom-show-listbtn"
          :class="{
            'minimal-helper-btn': theme.minimalTheme,
            'retro-teme-btns': theme.retroTheme,
          }"
        >
          <img src="@/img/drag-and-drop.webp" alt="move" />
        </button>
        you can drag the elements and move them wherever you want.
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
        Select and delete multiple items.
        <img
          class="arrow"
          :class="{
            'arrow-selected': selectAndDelete,
            'arrow-deselected': !selectAndDelete,
          }"
          src="@/img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="selectAndDelete">
        You can delete multiple products together by clicking on
        <i class="fas fa-cart-arrow-down"></i>. So you mark them and then at the
        end of shopping by clicking on
        <button class="text-danger border-danger rounded">
          <i class="fas fa-trash-alt"></i>
        </button>
        at the bottom only the ones you marked will be deleted.
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
        Copy list, Highlight items.
        <img
          class="arrow"
          :class="{
            'arrow-selected': copyHighlights,
            'arrow-deselected': !copyHighlights,
          }"
          src="@/img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="copyHighlights">
        <i class="far fa-copy btn btn-outline-success helper-icon"> </i>
        is used to copy the list and paste it wherever you want.
      </li>
      <li v-if="copyHighlights">
        You can make a product "important" by clicking on the name and it will
        be <span class="active">highlighted</span>, so it cannot be deleted or
        edited.
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
        Delete all.
        <img
          class="arrow"
          :class="{
            'arrow-selected': deleteAllInfo,
            'arrow-deselected': !deleteAllInfo,
          }"
          src="@/img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="deleteAllInfo">
        If you click on
        <span class="delete-all-description">
          delete all <i class="fas fa-skull-crossbones"> </i>
        </span>
        you will see a confirmation box for the 'delete
        <u> ALL </u> the list.
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
            'arrow-selected': tutorial,
            'arrow-deselected': !tutorial,
          }"
          src="@/img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <video
        v-if="tutorial"
        :class="{ video: !theme.retroTheme }"
        width="325"
        height="500"
        poster="@/img/favicon.png"
        controls
      >
        <source src="@/video/ENG.mp4" type="video/mp4" />
        Your device does not support the video tag. Watch on youtube
        <a href="https://www.youtube.com/watch?v=H1E9ynY9f9w" target="_blank"
          >by clicking here</a
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
        Support.
        <img
          class="arrow"
          :class="{
            'arrow-selected': support,
            'arrow-deselected': !support,
          }"
          src="@/img/arrow-down.webp"
          alt="arrow"
        />
      </div>
      <li v-if="support">
        For any report you can contact me:
        <a href="mailto:lucarhcp88@hotmail.it">lucarhcp88@hotmail.it</a>
      </li>
      <li v-if="support">
        Follow us on social media:
        <a
          href="https://www.facebook.com/profile.php?id=100080626866860"
          target="_blank"
        >
          <img src="@/img/facebook.webp" alt="social_facebook" class="social" />
        </a>
      </li>
    </ul>
  </div>
  <br />
  <p id="helper-important-alert" class="update-alert">
    <span style="color: red" @click="highlightsForTutorial(7)">IMPORTANT:</span>
    <span :class="{ 'tutorial-highlights': highlits === 7 }">
      This is a web app converted to an android app, and is always maintained,
      so don't pay attention to the date of the last update that appears in the
      store. That is just the day I published it. The actual date of the last
      update is: <span style="color: green">{{ settings.dateLastUpdate }}</span>
    </span>
  </p>
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

.show-video {
  font-weight: bold;
  color: #0169d9;
}
.hide-video {
  font-weight: bold;
  color: #d70a0a;
  margin-left: 30%;
}
.video {
  z-index: 100;
  border-radius: 15px;
}

.update-alert {
  border-top: 1px solid;
}
</style>
