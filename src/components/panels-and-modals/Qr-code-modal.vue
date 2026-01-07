<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
</script>

<script>
export default {
	props: {
		showQrModal: Boolean,
	},
	emits: ["closeQrModal"],
	data() {
		return {
			languages: useLanguageStore(),
		};
	},
};
</script>

<template>
	<div v-if="showQrModal" class="modal">
		<div class="empty-div" @click="$emit('closeQrModal', false)"></div>
		<div class="modal-background">
			<p class="close-qr-modal" @click="$emit('closeQrModal', false)">X</p>
			<p class="text-center mb-0 p-3 pt-4">{{ languages.share.qrMessage }}</p>
			<div class="qr-container">
				<img src="@/img/qr-code.webp" alt="qr_code" />
			</div>
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
}
.close-qr-modal {
	position: absolute;
	top: 5px;
	right: 15px;
	text-align: right;
	width: 100px;
	font-size: 1.5rem;
	font-weight: bold;
	cursor: pointer;
	z-index: 10;
}
.qr-container {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border-radius: 0 0 5px 5px;
	padding: 1.563rem;
	background-color: #ffffff;
}

.qr-container > img {
	width: 100%;
	height: 100%;
}
</style>
