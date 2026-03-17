<script setup>
import { useFirebaseStore } from "@/server/FirebaseStore";
import Accordion from "./Accordion.vue";
import LoadingOrUpdating from "../Loading-or-updating.vue";
</script>

<script>
export default {
	data() {
		return {
			firebaseStore: useFirebaseStore(),
		};
	},
	created() {
		this.firebaseStore.getData();
	},
};
</script>

<template>
	<div class="shopping-container mx-auto">
		<div v-if="firebaseStore.firebaseLoading">
			<LoadingOrUpdating :listChanged="firebaseStore.firebaseLoading" />
		</div>
		<h2 v-if="firebaseStore.firebaseErrorMessage" style="color: red">
			{{ firebaseStore.firebaseErrorMessage }}
		</h2>
		<template v-if="!firebaseStore.firebaseLoading && !firebaseStore.firebaseErrorMessage">
			<template v-for="(element, i) in firebaseStore.myYearOfShoppingsArray" :key="i">
				<Accordion :title="element.month" :content="element.elements" />
			</template>
		</template>
	</div>
</template>

<style scoped>
.shopping-container {
	overflow-y: auto;
	overflow-x: hidden;
	width: 100%;
	padding: 0 15px;
}
</style>
