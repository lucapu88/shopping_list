<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
</script>

<script>
export default {
	props: {
		showAlert: Boolean,
	},
	emits: ["closeAlert"],
	data() {
		return {
			languages: useLanguageStore(),
		};
	},
};
</script>

<template>
	<div v-if="showAlert" class="modal">
		<div class="empty-div" @click="$emit('closeAlert', false)"></div>
		<div class="modal-background">
			<p class="text-dark text-center mb-0 p-3 pt-4">
				{{ languages.loyalityCards.alertMessage }}
			</p>
			<button @click="$emit('closeAlert', false)">OK</button>
		</div>
	</div>
</template>

<style scoped>
.empty-div {
	height: 100%;
	position: absolute;
	top: 0;
	width: 100%;
}
.modal-background {
	position: relative;
	background-color: #9f9f9f;
	background-size: cover;
	border-radius: 5px;
	width: 90%;
	margin: auto;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.4s;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
