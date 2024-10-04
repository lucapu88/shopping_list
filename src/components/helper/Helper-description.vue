<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useLanguageStore } from '@/store/LanguageStore';
import ListIstructionAccordion from './settings/List-istruction-accordion.vue';
import Tutorial from './tutorials/Tutorial.vue';
import ToggleTutorialButton from './tutorials/ToggleTutorialButton.vue';
import Troubleshooting from './Troubleshooting.vue';
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
      suggestions: 'suggestions',
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
    <!-- ISTRUZIONI -->
    <p
      class="helper-title"
      :class="{ 'christmas-red': isChristmas.christmasTheme }"
    >
      {{ languages.helperDescription.instructionsTitle }}
    </p>
    <ul class="helper-list">
      <!-- AGGIUNGI MODIFICA ELIMINA -->
      <ListIstructionAccordion
        show-list-istructions-input="addEditDelete"
        :istructions-text="languages.helperDescription.addEditDelete"
        :select-deselect-arrow="settings.addEditDelete"
      />
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

        <ToggleTutorialButton :features="addEditDelete" :margin="true" />
        <Tutorial
          v-if="settings.video && settings.feature === addEditDelete"
          :features="addEditDelete"
        />
      </template>
      <!-- CATEGORIE -->
      <ListIstructionAccordion
        show-list-istructions-input="categoriesInfo"
        :istructions-text="languages.helperDescription.categories"
        :select-deselect-arrow="settings.categoriesInfo"
      />
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
        <ToggleTutorialButton :features="categories" :margin="true" />
        <Tutorial
          v-if="settings.video && settings.feature === categories"
          :features="categories"
        />
      </template>
      <!-- SUGGERIMENTI -->
      <ListIstructionAccordion
        show-list-istructions-input="suggestions"
        :istructions-text="languages.helperDescription.suggestionsTitle"
        :select-deselect-arrow="settings.suggestions"
      />
      <template v-if="settings.suggestions">
        <li>
          {{ languages.helperDescription.suggestions.part1 }}:
          <button
            class="tips-btn"
            :class="{
              'tips-btn-light': theme.lightTheme,
              'tips-btn-dark': theme.darkTheme,
              'tips-btn-minimal': theme.minimalTheme,
              'tips-btn-retro': theme.retroTheme,
              'tips-btn-summer': theme.summerTheme,
              'tips-btn-winter': theme.winterTheme,
              'tips-btn-elegant': theme.elegantTheme,
              'tips-btn-pink': theme.pinkTheme,
            }"
          >
            <span class="tips-text">
              {{ languages.suggestions.tipsBtnText }}
            </span>
          </button>
          <br />
          {{ languages.helperDescription.suggestions.part2 }}
        </li>
        <ToggleTutorialButton :features="suggestions" :margin="true" />
        <Tutorial
          v-if="settings.video && settings.feature === suggestions"
          :features="suggestions"
        />
      </template>
      <!-- DRAG N DROP -->
      <ListIstructionAccordion
        show-list-istructions-input="dragNdrop"
        :istructions-text="languages.helperDescription.dragNdropTitle"
        :select-deselect-arrow="settings.dragNdrop"
      />
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

        <ToggleTutorialButton :features="dragNdrop" :margin="true" />
        <Tutorial
          v-if="settings.video && settings.feature === dragNdrop"
          :features="dragNdrop"
        />
      </template>
      <!-- SELEZIONE MULTIPLA -->
      <ListIstructionAccordion
        show-list-istructions-input="selectAndDelete"
        :istructions-text="languages.helperDescription.multipleDeleteTitle"
        :select-deselect-arrow="settings.selectAndDelete"
      />
      <template v-if="settings.selectAndDelete">
        <li>
          {{ languages.helperDescription.multipleDeleteText.part1 }}
          <span class="cart">
            <strong class="galeazzi" v-if="theme.elegantTheme"> > </strong>
          </span>
          <div
            class="checkbox mettiti-in-riga-cazzo"
            :class="{
              'light-checkbox': theme.lightTheme,
              'retro-checkbox': theme.retroTheme,
              'summer-checked': theme.summerTheme,
              'pink-checkbox pink-theme-btn': theme.pinkTheme,
            }"
            v-if="!theme.elegantTheme"
          >
            <img
              class="checkbox-img"
              src="@/img/icons/checked.webp"
              alt="checked"
            />
          </div>
          {{ languages.helperDescription.multipleDeleteText.part2 }}
          <button
            class="text-danger border-danger rounded"
            :class="{ 'elegant-btn': theme.elegantTheme }"
          >
            <img class="trash" src="@/img/icons/trash-red.webp" alt="delete" />
          </button>
          {{ languages.helperDescription.multipleDeleteText.part3 }}
        </li>

        <ToggleTutorialButton :features="multipleDelete" :margin="true" />
        <Tutorial
          v-if="settings.video && settings.feature === multipleDelete"
          :features="multipleDelete"
        />
      </template>
      <!-- COPIA E INCOLLA - EVIDENZIA -->
      <ListIstructionAccordion
        show-list-istructions-input="copyHighlights"
        :istructions-text="languages.helperDescription.copyListTitle"
        :select-deselect-arrow="settings.copyHighlights"
      />
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

        <ToggleTutorialButton :features="copyPaste" :margin="true" />
        <Tutorial
          v-if="settings.video && settings.feature === copyPaste"
          :features="copyPaste"
        />
      </template>
      <!-- CANCELLA TUTTO -->
      <ListIstructionAccordion
        show-list-istructions-input="deleteAllInfo"
        :istructions-text="languages.helperDescription.deleteAllTitle"
        :select-deselect-arrow="settings.deleteAllInfo"
      />
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
      <!-- CONTATTI -->
      <ListIstructionAccordion
        show-list-istructions-input="support"
        :istructions-text="languages.helperDescription.support"
        :select-deselect-arrow="settings.support"
      />
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
    <!-- RISOLUZIONE PROBLEMI -->
    <Troubleshooting />
  </div>
  <br />
  <section id="helper-important-alert">
    <p class="update-alert">
      <span style="color: red">
        {{ languages.helperDescription.adviceTitle }}
      </span>
      <span>
        {{ languages.helperDescription.adviceText }}
      </span>
    </p>
    <p v-if="languages.updateText.readyForUpdate">
      {{ languages.helperDescription.dateLastUpdateText }}
      <span class="updated">
        {{ settings.dateLastUpdate }}
      </span>
    </p>
  </section>
</template>

<style scoped>
.helper-title {
  margin-bottom: 0;
  text-align: center;
  margin-top: 20px;
  font-size: large;
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
  margin-bottom: 0;
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

.updated {
  color: #008000;
}
</style>
