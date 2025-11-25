<script setup>
import ArchiveModal from "../panels-and-modals/archive/Archive-modal.vue";
import { useFirebaseStore } from "@/server/FirebaseStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
</script>

<script>
export default {
	data() {
		return {
			firebaseStore: useFirebaseStore(),
			isChristmas: useChristmasStore(),
			languages: useLanguageStore(),
			theme: useThemeStore(),
		};
	},
};
</script>

<template>
	<div>
		<button
			class="archive-btn btn btn-secondary"
			:class="{
				christmas: isChristmas.christmasTheme,
				'delete-all-retro': theme.retroTheme,
				'elegant-delete-all-btn': theme.elegantTheme,
				'panter-border': theme.panterTheme,
			}"
			@click="firebaseStore.openfirebaseModal = true"
		>
			{{ languages.archive }} {{ String.fromCodePoint(0x1f4dd) }}
		</button>
		<ArchiveModal v-if="firebaseStore.openfirebaseModal" />
	</div>
</template>

<style scoped>
.archive-btn {
	padding: 0.5rem;
}
</style>
