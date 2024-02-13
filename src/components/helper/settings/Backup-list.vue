<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
import { useSettingsStore } from '@/store/SettingsStore';
import Tutorial from '../tutorials/Tutorial.vue';
import ToggleTutorialButton from '../tutorials/ToggleTutorialButton.vue';
</script>

<script>
export default {
  emits: ['backupLoadingEmit'],
  data() {
    return {
      languages: useLanguageStore(),
      addNewTodo: useAddModifyDeleteTodosStore(),
      settings: useSettingsStore(),
      backupListInfo: 'backupListInfo',
      showConfirmBackup: false,
      noBackup: false,
      backupList: 'backupList',
    };
  },
  methods: {
    importBackup() {
      const savedLastTodosCopy = window.localStorage.getItem('todosBackup');
      if (savedLastTodosCopy !== '[]') {
        window.localStorage.setItem('todos', savedLastTodosCopy);
        this.$emit('backupLoadingEmit', true);
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        this.noBackupAlert();
      }
    },
    noBackupAlert() {
      this.noBackup = true;
      setTimeout(() => {
        this.noBackup = false;
        this.showConfirmBackup = false;
      }, 3000);
    },
  },
};
</script>

<template>
  <div class="helper-settings">
    <span class="settings-icon mr-1" @click="settings.highlightsForTutorial(9)">
      &#x2699;
    </span>
    <span :class="{ 'tutorial-highlights': settings.highlits === 9 }">{{
      languages.backupListText.title
    }}</span>
    <span class="info-icon" @click="settings.toggleInfo(backupListInfo)"
      >i</span
    >
    <li
      class="ml-4"
      v-if="settings.info && settings.featureInfo === backupListInfo"
    >
      ({{ languages.backupListText.description }})
      <ToggleTutorialButton :features="backupList" /> <br />
      <!-- <small>{{ languages.infoCategoriesAlert }}</small> -->
    </li>
    <div v-if="!showConfirmBackup" class="backup-btn-container">
      <button id="backup-button" @click="showConfirmBackup = true">
        <img class="cloud" src="@/img/icons/cloud.webp" alt="backup" />
      </button>
    </div>

    <div class="confirm-backup-container">
      <template v-if="showConfirmBackup && !noBackup">
        <span>{{ languages.backupListText.confirm }}</span>
        <button
          id="confirm-backup"
          style="background-color: lightgreen"
          @click="importBackup()"
        >
          {{ languages.langEnglish ? 'YES' : 'SI' }}
        </button>
        <button
          style="background-color: lightcoral"
          @click="showConfirmBackup = false"
        >
          NO
        </button>
      </template>

      <p v-if="noBackup" class="no-backup">
        {{ languages.backupListText.noBackupText }}
      </p>
    </div>

    <Tutorial
      v-if="settings.video && settings.feature === backupList"
      :features="backupList"
    />
  </div>
</template>

<style scoped>
.backup-btn-container {
  text-align: center;
  margin-top: 5px;
}

.backup-btn-container > button {
  padding: 0 10px;
}
.cloud {
  width: 40px;
  height: 30px;
}

.confirm-backup-container {
  text-align: center;
}
.confirm-backup-container > button {
  margin-left: 10px;
}

.no-backup {
  color: #c40000;
}
</style>
