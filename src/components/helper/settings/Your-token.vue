<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
</script>

<script>
export default {
	data() {
		return {
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			secondTodosStore: useSecondTodoStore(),
			theme: useThemeStore(),
			token: "token",
		};
	},
	methods: {
		copyToken() {
			navigator.clipboard.writeText(this.settings.yourToken); //copio negli appunti una lista della spesa per poterla condividere
			document.addEventListener("copy", function (e) {
				//copio negli appunti anche qui per sistemare su android (quello di sopra non funziona)
				e.clipboardData.setData("text/plain", this.settings.yourToken);
				e.preventDefault();
			});
		},
	},
};
</script>

<template>
	<div class="helper-settings">
		<ListIstructionAccordion show-list-instructions-input="token" :istructions-text="languages.helperDescription.tokenText.title" :select-deselect-arrow="settings.token && settings.section === token" :isSettings="true" />
		<template v-if="settings.token && settings.section === token">
			<div class="auto-delete-container mb-3">
				<li class="ms-3">
					<small>{{ languages.helperDescription.tokenText.description }}</small>
					<br />
					<small>{{ languages.helperDescription.tokenText.description2 }}</small>
				</li>
				<li class="toggle-delete-confirm-container" id="auto-delete">
					<span class="font-small text-primary ms-2">
						{{ settings.yourToken }}
					</span>
					<button class="ms-2 btn btn btn-outline-success" @click="copyToken()">
						<img class="copy-token" src="@/img/icons/copy.webp" alt="copy" />
						<span class="font-small ms-1">{{ languages.moveMode.copyElementText }}</span>
					</button>
				</li>
				<li class="toggle-delete-confirm-container" id="auto-delete">
					<p v-if="secondTodosStore.totalRecipes && +secondTodosStore.totalRecipes > 0">{{ languages.recipes.totalRecipesText }} {{ secondTodosStore.totalRecipes }}</p>
					<p v-else class="text-danger">{{ languages.recipes.generationsEndedText }}</p>
				</li>
			</div>
		</template>
	</div>
</template>

<style scoped>
.font-small {
	font-size: 0.625rem;
}
.copy-token {
	width: 20px;
	height: 22px;
}
</style>
