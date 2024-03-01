<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useLanguageStore } from '@/store/LanguageStore';
import ListIstructionAccordion from './settings/List-istruction-accordion.vue';
import Tutorial from './tutorials/Tutorial.vue';
import ToggleTutorialButton from './tutorials/ToggleTutorialButton.vue';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      isChristmas: useChristmasStore(),
      settings: useSettingsStore(),
      languages: useLanguageStore(),
      addEditDelete: 'addEditDelete',
      categories: 'categories',
      dragNdrop: 'dragNdrop',
      multipleDelete: 'multipleDelete',
      copyPaste: 'copyPaste',
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
  <div>
    <p class="helper-title" @click="settings.highlightsForTutorial(7)">
      {{ languages.helperDescription.troubleshooting }}
    </p>
    <small :class="{ 'tutorial-highlights': settings.highlits === 7 }">
      {{ languages.helperDescription.troubleshootingText }}
    </small>
    <p
      class="helper-title"
      :class="{ 'christmas-red': isChristmas.christmasTheme }"
    >
      {{ languages.helperDescription.instructionsTitle }}
    </p>
    <ul class="helper-list">
      <ListIstructionAccordion
        show-list-istructions-input="addEditDelete"
        :istructions-text="languages.helperDescription.addEditDelete"
        :select-deselect-arrow="settings.addEditDelete"
      />
      <!-- AGGIUNGI MODIFICA ELIMINA -->
      <template v-if="settings.addEditDelete">
        <li>
          <img
            class="btn btn-info helper-icon"
            :class="{ 'elegant-btn elegant-border': theme.elegantTheme }"
            src="@/img/icons/paper-plane.webp"
            alt="paper-plane"
          />
          {{ languages.helperDescription.add }}
        </li>
        <li>
          {{ languages.priceText }}
        </li>
        <li>
          <img
            class="btn-primary rounded-circle btn-sm helper-icon"
            :class="{
              'minimal-helper-btn': theme.minimalTheme,
              'retro-btn-button': theme.retroTheme,
              'elegant-helper-btn': theme.elegantTheme,
              'pink-theme-btn': theme.pinkTheme,
            }"
            src="@/img/icons/pencil.webp"
            alt="pencil"
          />
          {{ languages.helperDescription.edit }}
          <img
            class="btn-success rounded-circle btn-sm helper-icon"
            :class="{
              'minimal-helper-btn': theme.minimalTheme,
              'retro-btn-button': theme.retroTheme,
              'elegant-helper-btn': theme.elegantTheme,
            }"
            src="@/img/icons/floppy.webp"
            alt="floppy"
          />.
        </li>
        <li>
          <img
            class="btn-primary rounded-circle btn-sm helper-icon"
            :class="{
              'minimal-helper-btn': theme.minimalTheme,
              'retro-btn-button': theme.retroTheme,
              'elegant-helper-btn': theme.elegantTheme,
              'pink-theme-btn': theme.pinkTheme,
            }"
            src="@/img/icons/trash.webp"
            alt="trash"
          />
          {{ languages.helperDescription.delete }}
        </li>
        <li>
          <button
            class="btn btn-back-to-top p-1 mr-1"
            :class="{
              'btn-outline-info': theme.lightTheme || theme.darkTheme,
              'minimal-theme-back-top': theme.minimalTheme,
              'dark-theme-back-top': theme.darkTheme,
              'retro-theme-back-top': theme.retroTheme,
              'summer-theme-back-top': theme.summerTheme,
              'winter-theme-back-top': theme.winterTheme,
              'elegant-theme-back-top': theme.elegantTheme,
              'pink-theme-btn': theme.pinkTheme,
            }"
          >
            <span> >> </span>
          </button>
          {{ languages.helperDescription.backToTop }}
        </li>

        <ToggleTutorialButton :alignRight="true" :features="addEditDelete" />
        <Tutorial
          v-if="settings.video && settings.feature === addEditDelete"
          :features="addEditDelete"
        />
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="categoriesInfo"
        :istructions-text="languages.helperDescription.categories"
        :select-deselect-arrow="settings.categoriesInfo"
      />
      <!-- CATEGORIE -->
      <template v-if="settings.categoriesInfo">
        <li>
          {{ languages.helperDescription.addCategory.part1 }}
          <img
            class="btn btn-info helper-icon"
            :class="{ 'elegant-btn elegant-border': theme.elegantTheme }"
            src="@/img/icons/paper-plane.webp"
            alt="paper-plane"
          />
          {{ languages.helperDescription.addCategory.part2 }}
          <span
            style="border: none"
            class="custom-show-listbtn helper-icon pl-2 pr-2"
            :class="{
              'minimal-helper-btn': theme.minimalTheme,
              'retro-teme-btns': theme.retroTheme,
              'elegant-helper-btn': theme.elegantTheme,
              'pink-theme-btn': theme.pinkTheme,
              'summer-header-btn': theme.summerTheme,
              'winter-header-btn': theme.winterTheme,
            }"
          >
            +
          </span>
          . {{ languages.helperDescription.addCategory.part3 }}
          <span
            class="p-1"
            :class="{
              category: theme.lightTheme,
              'category-retro': theme.retroTheme,
              'category-minimal': theme.minimalTheme,
              'category-elegant': theme.elegantTheme,
              'category-dark': theme.darkTheme,
              'category-summer': theme.summerTheme,
              'category-winter': theme.winterTheme,
              'category-pink': theme.pinkTheme,
            }"
          >
            {{ languages.helperDescription.addCategory.part4 }}
          </span>
          {{ languages.helperDescription.addCategory.part5 }}
          <span :class="theme.elegantTheme ? 'elegant-selected' : 'selected'">
            {{ languages.helperDescription.addCategory.part6 }}.
          </span>
          {{ languages.helperDescription.addCategory.part7 }}
        </li>
        <li>
          {{ languages.helperDescription.addAllCat }}
          <button
            :class="{
              'light-btn': theme.lightTheme,
              'dark-btn': theme.darkTheme,
              'minimal-helper-btn': theme.minimalTheme,
              'retro-insert-all-btn': theme.retroTheme,
              'summer-btn': theme.summerTheme,
              'winter-btn': theme.winterTheme,
              'elegant-helper-btn': theme.elegantTheme,
            }"
          >
            <span>{{ languages.insertAll }}</span></button
          >.
        </li>
        <li>
          {{ languages.helperDescription.removeEmptyCat }}
          <button
            :class="{
              'light-btn': theme.lightTheme,
              'dark-btn': theme.darkTheme,
              'minimal-helper-btn': theme.minimalTheme,
              'retro-insert-all-btn': theme.retroTheme,
              'summer-btn': theme.summerTheme,
              'winter-btn': theme.winterTheme,
              'elegant-helper-btn': theme.elegantTheme,
            }"
          >
            <span>{{ languages.removeEmpty }}</span></button
          >.
        </li>

        <ToggleTutorialButton :alignRight="true" :features="categories" />
        <Tutorial
          v-if="settings.video && settings.feature === categories"
          :features="categories"
        />
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="dragNdrop"
        :istructions-text="languages.helperDescription.dragNdropTitle"
        :select-deselect-arrow="settings.dragNdrop"
      />
      <!-- DRAG N DROP -->
      <template v-if="settings.dragNdrop">
        <li>
          {{ languages.helperDescription.dragNdropText.part1 }}
          <button
            class="btn custom-show-listbtn"
            :class="{
              'minimal-helper-btn': theme.minimalTheme,
              'retro-teme-btns': theme.retroTheme,
              'elegant-helper-btn': theme.elegantTheme,
              'pink-theme-btn': theme.pinkTheme,
              'summer-header-btn': theme.summerTheme,
              'winter-header-btn': theme.winterTheme,
            }"
          >
            <img
              v-if="!theme.elegantTheme"
              src="@/img/icons/drag-and-drop.webp"
              alt="move"
            />
            <img
              v-if="theme.elegantTheme"
              src="@/img/icons/drag-and-drop-elegant.webp"
              alt="move"
            />
          </button>
          {{ languages.helperDescription.dragNdropText.part2 }} <br />
        </li>

        <ToggleTutorialButton :alignRight="true" :features="dragNdrop" />
        <Tutorial
          v-if="settings.video && settings.feature === dragNdrop"
          :features="dragNdrop"
        />
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="selectAndDelete"
        :istructions-text="languages.helperDescription.multipleDeleteTitle"
        :select-deselect-arrow="settings.selectAndDelete"
      />
      <!-- SELEZIONE MULTIPLA -->
      <template v-if="settings.selectAndDelete">
        <li>
          {{ languages.helperDescription.multipleDeleteText.part1 }}
          <span class="cart">
            <img
              v-if="theme.darkTheme || theme.retroTheme || theme.winterTheme"
              src="@/img/icons/cart-white.webp"
            />
            <img
              v-if="theme.lightTheme || theme.summerTheme"
              src="@/img/icons/cart-black.webp"
            />
            <strong class="large" v-if="theme.minimalTheme"> - </strong>
            <strong class="large" v-if="theme.elegantTheme"> > </strong>
          </span>
          <span class="pink-checkbox pink-theme-btn" v-if="theme.pinkTheme">
            <img
              class="checkbox"
              src="@/img/icons/checked.webp"
              alt="checked"
            />
          </span>
          {{ languages.helperDescription.multipleDeleteText.part2 }}
          <button
            class="text-danger border-danger rounded"
            :class="{ 'elegant-btn': theme.elegantTheme }"
          >
            <img class="trash" src="@/img/icons/trash-red.webp" alt="delete" />
          </button>
          {{ languages.helperDescription.multipleDeleteText.part3 }}
        </li>

        <ToggleTutorialButton :alignRight="true" :features="multipleDelete" />
        <Tutorial
          v-if="settings.video && settings.feature === multipleDelete"
          :features="multipleDelete"
        />
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="copyHighlights"
        :istructions-text="languages.helperDescription.copyListTitle"
        :select-deselect-arrow="settings.copyHighlights"
      />
      <!-- COPIA E INCOLLA - EVIDENZIA -->
      <template v-if="settings.copyHighlights">
        <li>
          <span
            class="btn helper-btn-size"
            :class="{
              'custom-show-listbtn': theme.lightTheme || theme.darkTheme,
              'minimal-helper-btn': theme.minimalTheme,
              'retro-teme-btns': theme.retroTheme,
              'elegant-helper-btn': theme.elegantTheme,
              'category-summer': theme.summerTheme,
              'category-winter': theme.winterTheme,
              'category-pink': theme.pinkTheme,
            }"
          >
            <img
              v-if="!theme.elegantTheme"
              class="copy"
              src="@/img/icons/copy.webp"
              alt="copy"
            />
            <img
              v-if="theme.elegantTheme"
              class="copy"
              src="@/img/icons/copy-elegant.webp"
              alt="copy"
            />
          </span>
          {{ languages.helperDescription.copyListText }}
        </li>
        <li>
          {{ languages.helperDescription.highlightImportant.part1 }}
          <span class="active">
            {{ languages.helperDescription.highlightImportant.part2 }},
          </span>
          {{ languages.helperDescription.highlightImportant.part3 }}
        </li>
        <li>
          {{ languages.importantTodos.text.part1 }}
          <button
            class="btn helper-btn-size"
            :class="{
              'custom-show-listbtn': theme.lightTheme || theme.darkTheme,
              'minimal-helper-btn': theme.minimalTheme,
              'retro-teme-btns': theme.retroTheme,
              'elegant-helper-btn': theme.elegantTheme,
              'category-summer': theme.summerTheme,
              'category-winter': theme.winterTheme,
              'category-pink': theme.pinkTheme,
            }"
          >
            <img
              v-if="!theme.elegantTheme"
              class="important"
              src="@/img/icons/important.webp"
              alt="important"
            />
            <img
              v-if="theme.elegantTheme"
              class="important"
              src="@/img/icons/important-elegant.webp"
              alt="important"
            />
          </button>
          {{ languages.importantTodos.text.part2 }}
        </li>

        <ToggleTutorialButton :alignRight="true" :features="copyPaste" />
        <Tutorial
          v-if="settings.video && settings.feature === copyPaste"
          :features="copyPaste"
        />
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="deleteAllInfo"
        :istructions-text="languages.helperDescription.deleteAllTitle"
        :select-deselect-arrow="settings.deleteAllInfo"
      />
      <!-- CANCELLA TUTTO -->
      <template v-if="settings.deleteAllInfo">
        <li>
          {{ languages.helperDescription.deleteAllText.part1 }}
          <span
            class="delete-all-description p-2"
            :class="{
              'elegant-delete-all-btn elegant-border': theme.elegantTheme,
            }"
          >
            {{ languages.deleteAll }}
            <img class="skull" src="@/img/icons/skull.webp" alt="skull" />
          </span>
          {{ languages.helperDescription.deleteAllText.part2 }}
        </li>
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="support"
        :istructions-text="languages.helperDescription.support"
        :select-deselect-arrow="settings.support"
      />
      <!-- CONTATTI -->
      <template v-if="settings.support">
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
      </template>
    </ul>
  </div>
  <br />
  <p id="helper-important-alert" class="update-alert">
    <span style="color: red" @click="settings.highlightsForTutorial(8)">
      {{ languages.helperDescription.adviceTitle }}
    </span>
    <span :class="{ 'tutorial-highlights': settings.highlits === 8 }">
      {{ languages.helperDescription.adviceText }}
      <span style="color: green">{{ settings.dateLastUpdate }}</span>
    </span>
  </p>
</template>

<style scoped>
.helper-title {
  margin-bottom: 0;
  text-align: center;
  margin-top: 20px;
}
.tutorial-highlights {
  background-color: orangered;
  color: white;
}
.helper-list {
  padding-inline-start: 25px;
}

.cart {
  width: 28px;
  height: 24px;
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
  padding: 5px;
}

.social {
  width: 35px;
  height: 30px;
}

.update-alert {
  border-top: 1px solid;
}

.helper-list > li {
  display: list-item;
  animation: fadeIn 0.6s;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
  z-index: 100;
  padding: 5px;
}
@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
