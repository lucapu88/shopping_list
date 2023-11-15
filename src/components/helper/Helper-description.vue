<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useSettingsStore } from '@/store/SettingsStore';
import { useLanguageStore } from '@/store/LanguageStore';
import ListIstructionAccordion from './List-istruction-accordion.vue';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      isChristmas: useChristmasStore(),
      settings: useSettingsStore(),
      languages: useLanguageStore(),
    };
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
      :class="isChristmas.christmasTheme ? 'christmas-red' : ''"
    >
      {{ languages.helperDescription.instructionsTitle }}
    </p>
    <ul class="helper-list">
      <ListIstructionAccordion
        show-list-istructions-input="addEditDelete"
        :istructions-text="languages.helperDescription.addEditDelete"
        :select-deselect-arrow="settings.addEditDelete"
      />
      <template v-if="settings.addEditDelete">
        <li>
          <img
            class="btn btn-info helper-icon"
            src="@/img/icons/paper-plane.webp"
            alt="paper-plane"
          />
          {{ languages.helperDescription.add }}
        </li>
        <li>
          <img
            class="btn-primary rounded-circle btn-sm helper-icon"
            :class="{
              'minimal-helper-btn': theme.minimalTheme,
              'retro-btn-button': theme.retroTheme,
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
            }"
            src="@/img/icons/trash.webp"
            alt="trash"
          />
          {{ languages.helperDescription.delete }}
        </li>
        <li>
          <button
            class="btn btn-outline-info btn-back-to-top p-0"
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
          {{ languages.helperDescription.backToTop }}
        </li>
      </template>
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
            }"
          >
            +
          </span>
          . {{ languages.helperDescription.addCategory.part3 }}
          <span
            class="category p-1"
            :class="{
              'category-retro': theme.retroTheme,
              'category-minimal': theme.minimalTheme,
            }"
          >
            {{ languages.helperDescription.addCategory.part4 }}
          </span>
          {{ languages.helperDescription.addCategory.part5 }}
          <span class="selected">
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
            }"
          >
            <span>{{ languages.removeEmpty }}</span></button
          >.
        </li>
      </template>
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
            }"
          >
            <img src="@/img/icons/drag-and-drop.webp" alt="move" />
          </button>
          {{ languages.helperDescription.dragNdropText.part2 }}
        </li>
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="selectAndDelete"
        :istructions-text="languages.helperDescription.multipleDeleteTitle"
        :select-deselect-arrow="settings.selectAndDelete"
      />
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
            <strong v-if="theme.minimalTheme"> - </strong>
          </span>
          {{ languages.helperDescription.multipleDeleteText.part2 }}
          <button class="text-danger border-danger rounded">
            <img class="trash" src="@/img/icons/trash-red.webp" alt="delete" />
          </button>
          {{ languages.helperDescription.multipleDeleteText.part3 }}
        </li>
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="copyHighlights"
        :istructions-text="languages.helperDescription.copyListTitle"
        :select-deselect-arrow="settings.copyHighlights"
      />
      <template v-if="settings.copyHighlights">
        <li>
          <span
            class="btn custom-show-listbtn"
            :class="{
              'minimal-helper-btn': theme.minimalTheme,
              'retro-teme-btns': theme.retroTheme,
            }"
          >
            <img class="copy" src="@/img/icons/copy.webp" alt="copy" />
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
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="deleteAllInfo"
        :istructions-text="languages.helperDescription.deleteAllTitle"
        :select-deselect-arrow="settings.deleteAllInfo"
      />
      <template v-if="settings.deleteAllInfo">
        <li>
          {{ languages.helperDescription.deleteAllText.part1 }}
          <span class="delete-all-description">
            {{ languages.deleteAll }}
            <img class="skull" src="@/img/icons/skull.webp" alt="skull" />
          </span>
          {{ languages.helperDescription.deleteAllText.part2 }}
        </li>
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="tutorial"
        :istructions-text="'Video tutorial'"
        :select-deselect-arrow="settings.tutorial"
      />
      <template v-if="settings.tutorial">
        <video
          :class="{ video: !theme.retroTheme }"
          width="325"
          height="500"
          poster="@/img/favicon.png"
          controls
        >
          <source
            v-if="languages.langEnglish"
            src="@/video/ENG.mp4"
            type="video/mp4"
          />
          <source
            v-if="languages.langIta"
            src="@/video/ITA.mp4"
            type="video/mp4"
          />
          <source
            v-if="languages.langSpanish"
            src="@/video/SPA.mp4"
            type="video/mp4"
          />
          {{ languages.helperDescription.videoAlert }}
          <!-- <a href="https://www.youtube.com/watch?v=H1E9ynY9f9w" target="_blank"
          >by clicking here</a
        > -->
        </video>
      </template>
      <ListIstructionAccordion
        show-list-istructions-input="support"
        :istructions-text="languages.helperDescription.support"
        :select-deselect-arrow="settings.support"
      />
      <template v-if="settings.support">
        <li>
          {{ languages.helperDescription.supportText }}
          <a href="mailto:lucarhcp88@hotmail.it">lucarhcp88@hotmail.it</a>
        </li>
        <li>
          {{ languages.helperDescription.socialText }}
          <a href="https://twitter.com/shoppList231023" target="_blank">
            <img src="@/img/x.webp" alt="social_twitter" class="social" />
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

.video {
  z-index: 100;
  border-radius: 15px;
}

.update-alert {
  border-top: 1px solid;
}

.helper-list > li {
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
