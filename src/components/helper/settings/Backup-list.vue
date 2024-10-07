<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
import { useSettingsStore } from '@/store/SettingsStore';
import ListIstructionAccordion from '../../panels-and-modals/List-istruction-accordion.vue';
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
    <ListIstructionAccordion
      show-list-instructions-input="backupList"
      :istructions-text="languages.backupListText.title"
      :select-deselect-arrow="
        settings.backupList && settings.section === backupList
      "
      :isSettings="true"
    />
    <template v-if="settings.backupList && settings.section === backupList">
      <div class="last-backup-container mb-3">
        <li class="ml-3">
          <small>{{ languages.backupListText.description }}</small>
          <ToggleTutorialButton :features="backupList" />
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
  </div>
</template>

<style scoped>
.backup-btn-container {
  text-align: center;
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
