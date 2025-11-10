<script setup>
import MyFirebaseDbModal from "./My-firebase-db-modal.vue";
import ListIstructionAccordion from "../panels-and-modals/List-istruction-accordion.vue";
import { useFirebaseStore } from "@/store/FirebaseStore";
</script>

<script>
export default {
	data() {
		return {
			firebaseStore: useFirebaseStore(),
		};
	},
};
</script>

<template>
	<div>
		<button class="archive-btn btn btn-secondary" @click="firebaseStore.openfirebaseModal = true">Archivio {{ String.fromCodePoint(0x1f4dd) }}</button>
		<MyFirebaseDbModal v-if="firebaseStore.openfirebaseModal" />
	</div>
</template>

<style scoped>
.archive-btn {
	padding: 0.5rem;
}
</style>
