<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useChristmasStore } from '@/store/ChristmasStore';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      languages: useLanguageStore(),
      isChristmas: useChristmasStore(),
    };
  },
};
</script>

<template>
  <div class="empty-logo-container">
    <div class="square" :class="{ 'light-square': theme.lightTheme }"></div>
    <div class="block-notes" :class="{ light: theme.lightTheme }">
      <div class="notes">
        <p class="flip">
          <!-- SE È NATALE BUON NATALE -->
          <template v-if="isChristmas.christmasTheme">
            <template v-if="languages.langEnglish">
              <span style="--i: 1">M</span>
              <span style="--i: 2">e</span>
              <span style="--i: 3">r</span>
              <span style="--i: 4">r</span>
              <span style="--i: 5">y</span>
            </template>
            <template v-if="languages.langSpanish">
              <span style="--i: 1">F</span>
              <span style="--i: 2">e</span>
              <span style="--i: 3">l</span>
              <span style="--i: 4">i</span>
              <span style="--i: 5">z</span>
            </template>
            <template v-if="languages.langIta">
              <span style="--i: 1">B</span>
              <span style="--i: 2">u</span>
              <span style="--i: 3">o</span>
              <span style="--i: 4">n</span>
            </template>
          </template>
          <!-- ALTRIMENTI CIAO -->
          <template v-if="!isChristmas.christmasTheme">
            <template v-if="languages.langEnglish">
              <span style="--i: 1">H</span>
              <span style="--i: 2">e</span>
              <span style="--i: 3">l</span>
              <span style="--i: 4">l</span>
              <span style="--i: 5">o</span>
            </template>
            <template v-if="languages.langSpanish">
              <span style="--i: 1">H</span>
              <span style="--i: 2">o</span>
              <span style="--i: 3">l</span>
              <span style="--i: 4">a</span>
            </template>
            <template v-if="languages.langIta">
              <span style="--i: 1">C</span>
              <span style="--i: 2">i</span>
              <span style="--i: 3">a</span>
              <span style="--i: 4">o</span>
            </template>
          </template>
        </p>
        <p class="flip" v-if="isChristmas.christmasTheme">
          <!-- SE È NATALE BUON NATALE -->
          <template v-if="languages.langEnglish">
            <span style="--i: 5">C</span>
            <span style="--i: 6">h</span>
            <span style="--i: 7">r</span>
            <span style="--i: 8">i</span>
            <span style="--i: 9">s</span>
            <span style="--i: 10">t</span>
            <span style="--i: 11">m</span>
            <span style="--i: 12">a</span>
            <span style="--i: 13">s</span>
          </template>
          <template v-if="languages.langSpanish">
            <span style="--i: 5">N</span>
            <span style="--i: 6">a</span>
            <span style="--i: 7">v</span>
            <span style="--i: 8">i</span>
            <span style="--i: 9">d</span>
            <span style="--i: 10">a</span>
            <span style="--i: 11">d</span>
          </template>
          <template v-if="languages.langIta">
            <span style="--i: 5">N</span>
            <span style="--i: 6">a</span>
            <span style="--i: 7">t</span>
            <span style="--i: 8">a</span>
            <span style="--i: 9">l</span>
            <span style="--i: 10">e</span>
          </template>
        </p>
        <p class="flip">
          <template v-if="languages.langEnglish">
            <span style="--i: 5">b</span>
            <span style="--i: 6">y</span>
          </template>
          <template v-if="languages.langSpanish">
            <span style="--i: 5">d</span>
            <span style="--i: 6">e</span>
          </template>
          <template v-if="languages.langIta">
            <span style="--i: 5">d</span>
            <span style="--i: 6">a</span>
          </template>
        </p>
        <p class="flip">
          <span style="--i: 7">L</span>
          <span style="--i: 8">u</span>
          <span style="--i: 9">c</span>
          <span style="--i: 10">a</span>
        </p>
        <p class="flip">
          <span style="--i: 11">C</span>
          <span style="--i: 12">a</span>
          <span style="--i: 13">p</span>
          <span style="--i: 14">u</span>
          <span style="--i: 15">t</span>
          <span style="--i: 16">o</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.empty-logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
}
.square {
  background-color: #b2b2b29d;
  width: 140px;
  height: 40px;
  border-top-left-radius: 20%;
  border-top-right-radius: 20%;
  border: 2px solid #6d6d6d;
}
.block-notes {
  display: flex;
  justify-content: center;
  background-color: #f1f1f19d;
  border: 10px solid #ad5d31;
  border-radius: 5%;
  width: 90%;
  height: 450px;
  color: #000000;
}
.light {
  background-color: #e9e9e9;
}
.light-square {
  background-color: #b2b2b2;
}
.notes {
  margin-top: 60px;
  font-size: 2.188rem;
  width: 200px;
}

.flip {
  position: relative;
  border-bottom: 3px solid #000000;
}
.flip span {
  position: relative;
  display: inline-block;
  animation: flip 2s infinite;
  animation-delay: calc(0.2s * var(--i));
}
@keyframes flip {
  0%,
  80% {
    transform: rotateY(360deg);
  }
}
</style>
