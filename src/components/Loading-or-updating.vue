<script setup>
import { useThemeStore } from '@/store/ThemeStore';
</script>

<script>
export default {
  props: {
    themeLoading: Boolean,
    updating: Boolean,
  },
  data() {
    return {
      theme: useThemeStore(),
    };
  },
};
</script>

<template>
  <!-- CONTAINER LOADING DEI TEMI -->
  <div
    v-if="themeLoading"
    id="loading-themes-container"
    :class="{
      light: theme.lightTheme,
      dark: theme.darkTheme,
      minimal: theme.minimalTheme,
      retro: theme.retroTheme,
      summer: theme.summerTheme,
      winter: theme.winterTheme,
      elegant: theme.elegantTheme,
    }"
  >
    <img src="@/img/Loading.webp" alt="loading" />
    <img src="@/img/favicon.png" alt="loading" />
  </div>

  <!-- CONTAINER LOADING UPDATE APP -->
  <div v-if="updating" id="updating-container">
    <img src="@/img/update-img.webp" alt="loading" />
    <h2 class="category-emoji-selected updating-text">..DOWNLOAD..</h2>
  </div>
</template>

<style scoped>
#loading-themes-container,
#updating-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-size: contain;
  z-index: 450;
  background-color: #ffffff;
  color: #d0e8a4;
  text-align: center;
  font-family: Verdana, sans-serif;
}

#loading-themes-container > img:first-child {
  margin-top: 30%;
  width: 75%;
  animation: zoominoutsinglefeatured 1s infinite;
}
#loading-themes-container > img:last-child {
  width: 100%;
}
@keyframes zoominoutsinglefeatured {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.3, 1.3);
  }
  100% {
    transform: scale(1, 1);
  }
}

#updating-container > img {
  margin-top: 35%;
  width: 100%;
  -webkit-text-fill-color: transparent;
  position: relative;
  left: -300px;
  -webkit-animation: slideDino 3.5s forwards;
  animation: slideDino 3.5s forwards;
  z-index: 1;
}
@-webkit-keyframes slideDino {
  50% {
    left: 0;
  }
  100% {
    left: 500px;
  }
}
@keyframes slideDino {
  50% {
    left: 0;
  }
  100% {
    left: 500px;
  }
}
.updating-text {
  font-weight: bold;
}

.light {
  background-color: white !important;
}
.dark {
  background-color: #333333 !important;
}
.minimal {
  background-color: #a5becc !important;
}
.retro {
  background-color: black !important;
}

.summer {
  background-color: #12a1df !important;
}
.winter {
  background-color: #1a3159 !important;
}

.elegant {
  background-color: #045687 !important;
}
</style>
