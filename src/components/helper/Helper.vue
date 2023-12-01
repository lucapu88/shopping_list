<script setup>
import HelperDescription from './Helper-description.vue';
import PrivacyPolicyModal from '../panels-and-modals/privacy-policy/Privacy-policy-modal.vue';
import { useThemeStore } from '@/store/ThemeStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useOthersFestivitiesStore } from '@/store/OthersFestivitiesStore';
import { useLanguageStore } from '@/store/LanguageStore';
import { useSettingsStore } from '@/store/SettingsStore';
import LoadinfOrUpdating from '../Loading-or-updating.vue';
import ChangeLanguages from './Change-languages.vue';
import SafeDeleteMode from './Safe-delete-mode.vue';
import ChangeThemes from './Change-themes.vue';
import AutoDeleteEmptyCategories from './Auto-delete-empty-categories.vue';
import ExportList from './Export-list.vue';
import Share from './Share.vue';
import UpdateApp from './Update-app.vue';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      isChristmas: useChristmasStore(),
      festivities: useOthersFestivitiesStore(),
      languages: useLanguageStore(),
      settings: useSettingsStore(),
      themeLoading: false,
      updating: false,
      copyrightText: '',
    };
  },
  created() {
    this.settings.checkingUpdates();
    this.isChristmas.merryChristmasTheme();
    this.festivities.checkFestivities();
    this.copyright();
  },
  mounted() {
    document.getElementById('helper-description').scrollTo(0, 0);
  },
  methods: {
    themeLoadingEmitted(value) {
      this.themeLoading = value;
    },
    updatingAppEmited(value) {
      this.updating = value;
    },
    closeHelper() {
      this.settings.closeHelper();
    },
    copyright() {
      let copyright = new Date();
      const update = copyright.getFullYear();
      this.copyrightText = `Copyright© 2022 - ${update} Caputo Luca - All right reserved.`;
    },
  },
};
</script>

<template>
  <div>
    <LoadinfOrUpdating :themeLoading="themeLoading" :updating="updating" />
    <div
      v-if="!themeLoading && !updating"
      id="helper-description-container"
      class="helper-description"
      :class="{
        slideUp: settings.helper,
        slideDown: settings.helperInClosing,
        'dark-theme-helper': theme.darkTheme,
        'minimal-theme-helper': theme.minimalTheme,
        'retro-theme-helper': theme.retroTheme,
        'winter-theme-helper': theme.winterTheme,
        'summer-theme-helper': theme.summerTheme,
        'helper-light': theme.lightTheme,
        'elegant-theme-helper': theme.elegantTheme,
      }"
    >
      <div class="close-helper-container" @click="closeHelper()">
        <p
          class="close-helper"
          :class="{ 'close-retro-theme-helper': theme.retroTheme }"
        >
          X
        </p>
      </div>
      <img
        v-if="festivities.halloweenTheme"
        class="halloween-pumpkin"
        src="@/img/festivities/zucca.webp"
        alt="halloween"
      />
      <img
        v-if="isChristmas.christmasTheme"
        class="left-christmas-info"
        src="@/img/festivities/Gingerman-icon.webp"
        alt="Buon Natale!"
      />
      <p
        class="helper-settings-title"
        :class="{
          'christmas-red': isChristmas.christmasTheme,
          'retro-helper-settings-title': theme.retroTheme,
        }"
      >
        {{ languages.settingsTextTitle }}:
      </p>
      <img
        v-if="isChristmas.christmasTheme"
        class="right-christmas-info"
        src="@/img/festivities/Decorations-icon.webp"
        alt="E felice anno nuovo!"
      />
      <img
        v-if="festivities.halloweenTheme"
        class="halloween-cobweb"
        src="@/img/festivities/ragnatele.webp"
        alt="halloween"
      />

      <div id="helper-description">
        <ChangeLanguages />

        <SafeDeleteMode />

        <ChangeThemes @themeLoadingEmit="themeLoadingEmitted" />

        <AutoDeleteEmptyCategories />

        <ExportList />

        <Share />

        <UpdateApp @updatingAppEmit="updatingAppEmited" />

        <div id="helper-istructions">
          <HelperDescription />
        </div>

        <button
          id="privacy-policy-btn"
          class="privacy-policy-btn"
          @click="settings.showPrivacyPolicy()"
        >
          <small>Privacy policy</small>
        </button>
        <div class="copyright">
          <small>{{ copyrightText }}</small>
        </div>
      </div>

      <PrivacyPolicyModal v-if="settings.privacyPolicy" />
    </div>
  </div>
</template>

<style scoped>
.helper {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  /* padding: 0 5px; */
  z-index: 5;
  margin-right: 2%;
}

.helper:hover {
  cursor: pointer;
}

.halloween-pumpkin {
  width: 75px;
  position: absolute;
  top: 3px;
  left: 10px;
  height: 50px;
}
.halloween-cobweb {
  width: 60px;
  position: absolute;
  top: 0;
  right: 50px;
}
.settings {
  width: 33px;
}

.helper-description {
  position: absolute;
  left: 0;
  top: -100%;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-size: contain;
  z-index: 300;
  background-color: #ffffff;
}

.helper-light {
  background-image: repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
    repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
  background-size: 30px 30px;
}

.helper-description.slideUp {
  display: block;
  animation-name: slideUp;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
@keyframes slideUp {
  from {
    top: 200%;
  }
  to {
    top: 0;
  }
}
.helper-description.slideDown {
  display: block;
  animation-name: slideDown;
  animation-duration: 1s;
  animation-fill-mode: none;
}
@keyframes slideDown {
  from {
    top: 55px;
  }
  to {
    top: 200%;
  }
}
.helper-description.slideDown > div:not(:first-child) {
  display: none;
}

.helper-description > span {
  font-size: 12px;
}
.helper-description > div:not(:first-child) {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 30%;
}
.helper-settings-title {
  margin-bottom: 15px;
  text-align: center;
}

.close-helper-container {
  width: 65px;
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
}
.close-helper {
  float: right;
  width: 25px;
  padding-left: 5px;
}

.helper-footer {
  font-size: smaller;
}
.helper-footer-title {
  text-align: center;
  color: #ff0000;
  border-top: 1.5px solid #000000;
  margin-top: 15px;
  margin-bottom: 0;
}
.left-christmas-info {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 50px;
}
.right-christmas-info {
  position: absolute;
  top: 5px;
  right: 10%;
  width: 50px;
}

.copyright {
  text-align: center;
  font-size: 15px;
  margin-top: 40px;
}
</style>
