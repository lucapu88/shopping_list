<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
import { useThemeStore } from '@/store/ThemeStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
import { useSuggestionsStore } from '@/store/suggestions/SuggestionsStore';
import { useChristmasStore } from '@/store/ChristmasStore';
</script>

<script>
export default {
  data() {
    return {
      languages: useLanguageStore(),
      themes: useThemeStore(),
      todosStore: useAddModifyDeleteTodosStore(),
      suggestionsStore: useSuggestionsStore(),
      isChristmas: useChristmasStore(),
      noSuggestions: false,
    };
  },
  created() {
    //se l'emoticon della categoria scelta è uguale ad una delle emoticon per le quali NON ci sono suggerimenti
    this.noSuggestions =
      this.todosStore.categoryEmo === this.languages.engCategories[24].emojy ||
      this.todosStore.categoryEmo === this.languages.engCategories[22].emojy;
  },
};
</script>

<template>
  <div class="modal suggestions">
    <div
      class="suggestions-modal-container"
      :class="{
        'sugg-modal-light': themes.lightTheme,
        'sugg-modal-dark': themes.darkTheme,
        'sugg-modal-minimal': themes.minimalTheme,
        'sugg-modal-retro': themes.retroTheme,
        'sugg-modal-summer': themes.summerTheme,
        'sugg-modal-winter': themes.winterTheme,
        'sugg-modal-elegant': themes.elegantTheme,
        'sugg-modal-pink': themes.pinkTheme,
      }"
    >
      <header>
        <img
          v-if="isChristmas.christmasTheme"
          class="santa-claus"
          src="@/img/festivities/babbo-natale.webp"
          alt="OH-OH-OOOOH-Merry-Christmas"
        />
        <div>
          <h4>
            {{ todosStore.categoryName }}
            <span v-if="!isChristmas.christmasTheme">
              {{ todosStore.categoryEmo }}
            </span>
          </h4>
          <span
            class="close-sugg-modal"
            @click="suggestionsStore.toggleSuggestionsModal()"
          >
            X
            <img
              v-if="isChristmas.christmasTheme"
              class="ghirlanda-tonda"
              src="@/img/festivities/ghirlanda-tonda.webp"
              alt="merry-christmas"
            />
          </span>
        </div>
        <div class="header-info">
          <small
            v-if="!noSuggestions"
            :class="{ 'christmas-subtitle': isChristmas.christmasTheme }"
          >
            {{ languages.suggestions.headerInfo }}
          </small>
        </div>
      </header>
      <main>
        <p
          class="tip"
          :class="{
            'boldi-cipollino': themes.elegantTheme,
            'under-pressure': themes.lightTheme,
          }"
          v-for="(tip, n) in suggestionsStore.suggestionsList"
          :key="n"
          @click="suggestionsStore.addTip(tip, noSuggestions)"
        >
          <strong v-if="!noSuggestions"> + </strong>
          {{ tip }}
        </p>
      </main>
      <footer v-if="isChristmas.christmasTheme">
        <img
          :class="{ 'arrotonda-sto-bordo': !themes.retroTheme }"
          class="decorations"
          src="@/img/festivities/christmas-decorations-sinistra.webp"
          alt="Merry-Christmas"
        />
        <img
          :class="{ 'arrotonda-sto-bordo': !themes.retroTheme }"
          class="decorations"
          src="@/img/festivities/christmas-decorations-destra.webp"
          alt="Merry-Christmas"
        />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal {
  padding-top: 0;
  z-index: 400;
}
.suggestions {
  display: flex;
  justify-content: center;
  align-items: center;
}
.suggestions-modal-container {
  position: relative;
  width: 90%;
  height: 90%;
}
.suggestions-modal-container > header {
  text-align: center;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.santa-claus {
  position: absolute;
  top: -8px;
  left: 3px;
  height: 65px;
  width: 55px;
  z-index: 10;
}
.header-info {
  line-height: 1;
  min-height: 20px;
  z-index: 20;
}
.suggestions-modal-container > main {
  height: 88%;
  padding: 0 15px;
  overflow: auto;
  text-align: center;
  font-size: 20px;
}
.close-sugg-modal {
  position: absolute;
  top: 0%;
  right: 0%;
  width: 40px;
  height: 40px;
  text-align: center;
  font-weight: bold;
  padding-top: 5px;
}
.ghirlanda-tonda {
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
}
.tip {
  margin-bottom: 5px;
}
footer {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0px;
  width: 100%;
}
.decorations {
  width: 100px;
}
.christmas-subtitle {
  background-color: #dfbf5d;
  color: #ff0000;
}
</style>
