<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useSettingsStore } from "@/store/SettingsStore";
import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
</script>

<script>
export default {
	data() {
		return {
			languages: useLanguageStore(),
			secondTodos: useSecondTodoStore(),
			settings: useSettingsStore(),
			buffer: [],
			renameList: "renameList",
		};
	},
	created() {
		this.secondTodos.createListsButtons();
	},
	methods: {
		renameButtons() {
			if (!this.buffer[0] && !this.buffer[1] && !this.buffer[2] && !this.buffer[3]) {
				return;
			}
			if (this.buffer[0] && this.buffer[0].trim().length) {
				window.localStorage.setItem("ListName1", this.buffer[0]);
			}
			if (this.buffer[1] && this.buffer[1].trim().length) {
				window.localStorage.setItem("ListName2", this.buffer[1]);
			}
			if (this.buffer[2] && this.buffer[2].trim().length) {
				window.localStorage.setItem("ListName3", this.buffer[2]);
			}
			if (this.buffer[3] && this.buffer[3].trim().length) {
				window.localStorage.setItem("ListName4", this.buffer[3]);
			}
			this.secondTodos.loading = true;
			this.settings.closeHelper();
			setTimeout(() => {
				location.reload();
			}, 600);
		},
	},
};
</script>

<template>
	<div class="helper-settings">
		<ListIstructionAccordion show-list-instructions-input="renameList" :istructions-text="languages.renameListText.title" :select-deselect-arrow="settings.renameList && settings.section === renameList" :isSettings="true" :isNew="true" />
		<template v-if="settings.renameList && settings.section === renameList">
			<li class="ms-3">
				<small>{{ languages.renameListText.description }}</small>
			</li>
			<div class="buttons-container">
				<template v-for="(btn, n) in secondTodos.listButtons" :key="n">
					<input class="button-name" type="text" :placeholder="`${btn.name}`" v-model="buffer[n]" />
				</template>
				<button class="save-btn" @click="renameButtons()">
					{{ languages.saveText }}
				</button>
			</div>
		</template>
	</div>
</template>

<style scoped>
.buttons-container {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.button-name {
	margin: 0 15px;
	text-align: center;
}

.save-btn {
	width: 60%;
	align-self: center;
	margin-bottom: 20px;
}
</style>
