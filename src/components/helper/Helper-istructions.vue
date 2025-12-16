<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useLanguageStore } from "@/store/LanguageStore";
import Troubleshooting from "./Troubleshooting.vue";
import AddEditDelete from "./istructions/AddEditDelete.vue";
import Categories from "./istructions/Categories.vue";
import Suggestions from "./istructions/Suggestions.vue";
import DragDrop from "./istructions/DragDrop.vue";
import MultipleDelete from "./istructions/MultipleDelete.vue";
import CopyPasteAndHighlight from "./istructions/CopyPasteAndHighlight.vue";
import DeleteAll from "./istructions/DeleteAll.vue";
import Support from "./istructions/Support.vue";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			isChristmas: useChristmasStore(),
			settings: useSettingsStore(),
			languages: useLanguageStore(),
		};
	},
};
</script>

<template>
	<div>
		<!-- ISTRUZIONI -->
		<h4 class="helper-title" :class="{ 'christmas-red': isChristmas.christmasTheme }">
			{{ languages.helperDescription.instructionsTitle }}
		</h4>

		<!-- AGGIUNGI MODIFICA ELIMINA -->
		<AddEditDelete />

		<!-- CATEGORIE -->
		<Categories />

		<!-- SUGGERIMENTI -->
		<Suggestions />

		<!-- DRAG N DROP -->
		<DragDrop />

		<!-- ELIMINAZIONE MULTIPLA -->
		<MultipleDelete />

		<!-- COPIA E INCOLLA - EVIDENZIA -->
		<CopyPasteAndHighlight />

		<!-- CANCELLA TUTTO -->
		<DeleteAll />
		<!-- CONTATTI -->
		<Support />

		<!-- RISOLUZIONE PROBLEMI -->
		<Troubleshooting />
	</div>
	<br />
	<!-- AVVISO IMPORTANTE SUGLI AGGIORNAMENTI DELL'APP -->
	<section id="helper-important-alert">
		<p class="update-alert">
			<span style="color: red">
				{{ languages.helperDescription.adviceTitle }}
			</span>
			<span>
				{{ languages.helperDescription.adviceText }}
			</span>
		</p>
		<p v-if="languages.updateText.updated">
			{{ languages.helperDescription.dateLastUpdateText }}
			<span class="updated">
				{{ settings.dateLastUpdate }}
			</span>
		</p>
	</section>
</template>

<style scoped>
.helper-title {
	margin-bottom: 0;
	text-align: center;
	margin-top: 1.25rem;
	border-top: 1px solid;
	padding-top: 10px;
}

.update-alert {
	border-top: 1px solid;
	margin-bottom: 0;
}

.updated {
	color: #008000;
}
</style>
