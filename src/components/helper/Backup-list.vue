<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
</script>

<script>
export default {
  data() {
    return {
      languages: useLanguageStore(),
      addNewTodo: useAddModifyDeleteTodosStore(),
      backupListInfo: false,
      showConfirmBackup: false,
      noBackup: false,
    };
  },
  methods: {
    importBackup() {
      navigator.clipboard
        .readText()
        .then((clipboardText) => {
          const listCopiedToArray = clipboardText
            .split('\n')
            .filter((el) => el !== '')
            .map((todo) => todo.replace(/\b-\b/g, '').trim());

          if (listCopiedToArray.includes('ListCopied')) {
            this.addNewTodo.todos = [];
            listCopiedToArray
              .filter((item) => item !== 'ListCopied')
              .forEach((td) => {
                this.addNewTodo.newTodo = td;
                this.addNewTodo.addTodo();
              });
            location.reload();
          } else {
            this.noBackupAlert();
          }
        })
        .catch((err) => {
          console.log('backup-error: ', err);
          this.noBackupAlert();
        });
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
    <span>{{ languages.backupListText.title }}</span>
    <span class="info-icon" @click="backupListInfo = !backupListInfo">i</span>
    <li class="ml-4" v-if="backupListInfo">
      ({{ languages.backupListText.description }}). <br />
      <small>{{ languages.infoCategoriesAlert }}</small>
    </li>
    <div v-if="!showConfirmBackup" class="backup-btn-container">
      <button id="backup-button" @click="showConfirmBackup = true">
        <img class="cloud" src="@/img/icons/cloud.webp" alt="backup" />
      </button>
      <small class="new">NEW</small>
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
