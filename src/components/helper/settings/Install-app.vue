<script setup>
import { pwaState, installPwa } from '@/pwa/register';
const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
const standalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone;
</script>

<template>
  <div v-if="pwaState.ready || pwaState.installPrompt" class="pwa-settings helper-settings mb-2">
    <small v-if="pwaState.ready">Liste e impostazioni disponibili anche offline.</small>
    <button v-if="pwaState.installPrompt && !standalone" type="button" class="btn btn-light border-dark" @click="installPwa">
      Installa app
    </button>
    <small v-else-if="isIos && !standalone">Per installarla su iPhone: Condividi → Aggiungi alla schermata Home.</small>
  </div>
</template>

<style scoped>
.pwa-settings { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px; text-align: center; }
</style>
