<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useLanguageStore } from '@/store/LanguageStore';
</script>

<script>
export default {
  props: {
    features: String,
  },
  data() {
    return {
      theme: useThemeStore(),
      languages: useLanguageStore(),
    };
  },
};
</script>

<template>
  <video
    class="video-container"
    :class="{ video: !theme.retroTheme }"
    width="300"
    height="400"
    poster="@/img/favicon.png"
    controls
  >
    <source
      v-if="features === 'safeDelete'"
      src="@/video/safe-delete.mp4"
      type="video/mp4"
    />
    <source
      v-if="features === 'autoDeleteEmptyCategories'"
      src="@/video/auto-delete-category.mp4"
      type="video/mp4"
    />
    <source
      v-if="features === 'backupList'"
      src="@/video/backup-list.mp4"
      type="video/mp4"
    />
    <source
      v-if="features === 'exportList'"
      src="@/video/export-list.mp4"
      type="video/mp4"
    />
    <source
      v-if="features === 'addEditDelete'"
      src="@/video/add-edit-delete.mp4"
      type="video/mp4"
    />
    <source
      v-if="features === 'categories'"
      src="@/video/categories.mp4"
      type="video/mp4"
    />
    <source
      v-if="features === 'dragNdrop'"
      src="@/video/drag-drop.mp4"
      type="video/mp4"
    />
    <source
      v-if="features === 'multipleDelete'"
      src="@/video/multiple-delete.mp4"
      type="video/mp4"
    />
    <source
      v-if="features === 'copyPaste'"
      src="@/video/copy-paste.mp4"
      type="video/mp4"
    />

    {{ languages.helperDescription.videoAlert }}
  </video>
</template>

<style scoped>
.video-container {
  margin-left: 10%;
}
.video {
  z-index: 100;
  border-radius: 15px;
}
</style>
