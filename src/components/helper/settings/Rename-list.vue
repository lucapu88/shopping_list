<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useSettingsStore } from "@/store/SettingsStore";
import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
import Tutorial from "../tutorials/Tutorial.vue";
import ToggleTutorialButton from "../tutorials/ToggleTutorialButton.vue";
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
			<div class="rename-list-container mb-3">
				<!-- É TUTTO MOMENTANEO! QUESTO ALERT POI VA TOLTO -->
				<div style="text-align: center; font-size: 0.75rem">
					<strong class="new" style="color: red; text-shadow: none">{{ languages.alertMomentaneoTitolo }}</strong>
					<p>{{ languages.alertMomentaneo }} 🤗</p>
				</div>
				<li class="ms-3">
					<small>{{ languages.renameListText.description }}</small>
					<ToggleTutorialButton :features="renameList" />
				</li>
				<div class="buttons-container">
					<template v-for="(btn, n) in secondTodos.listButtons" :key="n">
						<input class="button-name" type="text" :placeholder="`${btn.name}`" v-model="buffer[n]" />
					</template>
					<button class="save-btn" @click="renameButtons()">
						{{ languages.saveText }}
					</button>
				</div>
				<Tutorial v-if="settings.video && settings.feature === renameList" :features="renameList" />
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
}
</style>
