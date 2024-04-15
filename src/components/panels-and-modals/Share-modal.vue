<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
</script>

<script>
export default {
  props: {
    showModal: Boolean,
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
    <div class="modal-background">
      <div class="confirmed-share-container">
        <p class="share-text">{{ languages.share.text }}</p>
        <button class="share-button" @click="$emit('closeModal', false)">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  background-image: url('@/img/shared.webp');
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
  background-color: #63636359;
  border-radius: 10px;
  color: var(--shared-text);
  font-size: larger;
}
.share-button {
  background-color: #013668;
  color: var(--shared-text);
  border-radius: 5px;
  padding: 5px 20px;
}
</style>
