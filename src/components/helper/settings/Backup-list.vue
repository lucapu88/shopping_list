<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useTodoStore } from "@/store/TodoStore";
import { useSettingsStore } from "@/store/SettingsStore";
import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
import Tutorial from "../tutorials/Tutorial.vue";
import ToggleTutorialButton from "../tutorials/ToggleTutorialButton.vue";
</script>

<script>
export default {
	emits: ["backupLoadingEmit"],
	data() {
		return {
			languages: useLanguageStore(),
			addNewTodo: useTodoStore(),
			settings: useSettingsStore(),
			showConfirmBackup: false,
			noBackup: false,
			backupList: "backupList",
		};
	},
	methods: {
		importBackup() {
			if (window.localStorage.getItem("secondList")) {
				const savedLastTodosBackup2 = window.localStorage.getItem("todosBackup2");
				this.getBackup(savedLastTodosBackup2, "todos2");
			} else if (window.localStorage.getItem("thirdList")) {
				const savedLastTodosBackup3 = window.localStorage.getItem("todosBackup3");
				this.getBackup(savedLastTodosBackup3, "todos3");
			} else if (window.localStorage.getItem("fourthList")) {
				const savedLastTodosBackup4 = window.localStorage.getItem("todosBackup4");
				this.getBackup(savedLastTodosBackup4, "todos4");
			} else {
				const savedLastTodosBackup = window.localStorage.getItem("todosBackup");
				this.getBackup(savedLastTodosBackup, "todos");
			}
		},
		getBackup(lastCopy, list) {
			if (lastCopy && lastCopy.length) {
				window.localStorage.setItem(list, lastCopy);

				this.$emit("backupLoadingEmit", true);
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
		<ListIstructionAccordion show-list-instructions-input="backupList" :istructions-text="languages.backupListText.title" :select-deselect-arrow="settings.backupList && settings.section === backupList" :isSettings="true" />
		<template v-if="settings.backupList && settings.section === backupList">
			<div class="last-backup-container mb-3">
				<li class="ms-3">
					<small>{{ languages.backupListText.preDescriprion }}</small> <br />
					<small>{{ languages.backupListText.description }}</small>
					<ToggleTutorialButton :features="backupList" />
				</li>
				<div v-if="!showConfirmBackup" class="backup-btn-container">
					<button id="backup-button" @click="showConfirmBackup = true">
						<img class="cloud" src="@/img/icons/cloud.webp" alt="backup" />
					</button>
				</div>

				<div class="confirm-backup-container">
					<div class="confirm-backup p-1" v-if="showConfirmBackup && !noBackup">
						<span>{{ languages.backupListText.confirm }}</span>
						<button id="confirm-backup" style="background-color: lightgreen" @click="importBackup()">
							{{ languages.langEnglish ? "YES" : "SI" }}
						</button>
						<button style="background-color: lightcoral" @click="showConfirmBackup = false">NO</button>
					</div>

					<p v-if="noBackup" class="no-backup">
						{{ languages.backupListText.noBackupText }}
					</p>
				</div>

				<Tutorial v-if="settings.video && settings.feature === backupList" :features="backupList" />
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
	display: flex;
	justify-content: center;
}
.confirm-backup {
	max-width: 250px;
	border: 2px solid #ff0000;
	border-radius: 5px;
}
.confirm-backup-container > div > button {
	margin-left: 10px;
}

.no-backup {
	color: #c40000;
}
</style>
