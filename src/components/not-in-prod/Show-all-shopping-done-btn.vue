<script setup>
import MyFirebaseDbModal from "./My-firebase-db-modal.vue";
import ListIstructionAccordion from "../panels-and-modals/List-istruction-accordion.vue";
import { useFirebaseStore } from "@/store/FirebaseStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
</script>

<script>
export default {
	data() {
		return {
			firebaseStore: useFirebaseStore(),
			isChristmas: useChristmasStore(),
		};
	},
};
</script>

<template>
	<div>
		<button class="archive-btn btn btn-secondary" :class="{ christmas: isChristmas.christmasTheme }" @click="firebaseStore.openfirebaseModal = true">Archivio {{ String.fromCodePoint(0x1f4dd) }}</button>
		<MyFirebaseDbModal v-if="firebaseStore.openfirebaseModal" />
	</div>
</template>

<style scoped>
.archive-btn {
	padding: 0.5rem;
}
</style>
