<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
import { useSettingsStore } from '@/store/SettingsStore';
import ListIstructionAccordion from './List-istruction-accordion.vue';
import Tutorial from '../tutorials/Tutorial.vue';
import ToggleTutorialButton from '../tutorials/ToggleTutorialButton.vue';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      languages: useLanguageStore(),
      addNewTodo: useAddModifyDeleteTodosStore(),
      settings: useSettingsStore(),
      textAreaHeight: 55,
      pasteListInfo: 'pasteListInfo',
      listPasted: null,
      exportList: 'exportList',
    };
  },
  methods: {
    adjustTextareaHeight() {
      document.getElementById(
        'text-area'
      ).style.height = `${this.textAreaHeight}px`;
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
        .map((todo) => todo.replace(/\b-\b/g, '').trim());
      // .map((todo) => todo.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, '').trim());
      listPastedToArray.forEach((td) => {
        this.addNewTodo.newTodo = td;
        this.addNewTodo.addTodo();
      });
      location.reload();
    },
  },
};
</script>

<template>
  <div class="add-list-copied-container helper-settings">
    <ListIstructionAccordion
      show-list-istructions-input="pasteList"
      :istructions-text="languages.pasteListText.title"
      :select-deselect-arrow="
        settings.pasteList && settings.section === 'pasteList'
      "
      :isSettings="true"
    />
    <template v-if="settings.pasteList && settings.section === 'pasteList'">
      <div class="export-list-container mb-3">
        <li class="ml-3">
          <small>{{ languages.pasteListText.subtitle }}. </small>
          <small>{{ languages.infoCategoriesAlert }}</small>
          <ToggleTutorialButton :features="exportList" />
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
            <small>{{ languages.importText }}</small>
          </button>
        </div>

        <Tutorial
          v-if="settings.video && settings.feature === exportList"
          :features="exportList"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.add-list-copied {
  display: grid;
  grid-template-columns: 9% 65% 20%;
  gap: 10px;
  margin-top: 5px;
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
</style>
