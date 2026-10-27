<script setup>
import { connection } from '@/utils/connection';
</script>

<template>
  <div v-if="connection.notice" class="connection-notice" role="alert" aria-live="assertive">
    <span>{{ connection.notice }}</span>
    <button type="button" aria-label="Chiudi avviso" @click="connection.notice = ''">×</button>
  </div>
</template>

<style scoped>
.connection-notice {
  position: fixed;
  z-index: 2147483647;
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  width: min(92vw, 480px);
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  border: 1px solid #ffe08a;
  border-radius: 10px;
  background: #fff3cd;
  color: #493600;
  box-shadow: 0 4px 18px #0004;
  font: 16px/1.4 sans-serif;
}
button { border: 0; background: transparent; color: inherit; font-size: 26px; padding: 4px; }
</style>
