<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
</script>

<script>
export default {
  props: {
    showModal: Boolean,
    color: Number,
  },
  emits: ['closeModal'],
  data() {
    return {
      languages: useLanguageStore(),
    };
  },
};
</script>

<template>
  <div v-if="showModal" class="modal" @click="$emit('closeModal', false)">
    <div
      class="modal-background"
      :class="{
        red: color === 1,
        'dark-gray': color === 2,
        blue: color === 3,
        gray: color === 4,
        orange: color === 5,
        azure: color === 6,
        fuchsia: color === 7,
        'light-blue': color === 8,
        violet: color === 9,
        pink: color === 10,
        black: color === 11,
      }"
    >
      <div class="confirmed-share-container">
        <p class="share-text">{{ languages.share.text }}</p>
        <button class="share-button" @click="$emit('closeModal', false)">
          <strong>OK</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  background-image: url('@/img/shared.webp');
  background-color: #9f9f9f;
  background-size: cover;
  border-radius: 10px;
  width: 90%;
  max-width: 700px;
  margin: auto;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.4s;
}
.confirmed-share-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 25px;
  height: 265px;
  max-width: 700px;
  overflow: auto;
  text-align: center;
  background-color: #bfbfbf6f;
}
.share-text {
  background-color: #79797988;
  border-radius: 10px;
  color: var(--shared-text);
  font-size: larger;
  font-weight: bold;
}
.share-button {
  background-color: #013668;
  color: var(--shared-text);
  border-radius: 5px;
  padding: 5px 20px;
}

.red {
  background-color: #c30101;
}
.pink {
  background-color: #e375c1;
}
.dark-gray {
  background-color: #046b06;
}
.black {
  background-color: #000000;
}
.blue {
  background-color: #0051ff;
}
.gray {
  background-color: #00e951fd;
}
.orange {
  background-color: #ff8800;
}
.azure {
  background-color: #00fbff;
}
.light-blue {
  background-color: #009dff;
}
.fuchsia {
  background-color: #c40ac4;
}
.violet {
  background-color: #7103c4;
}
</style>
