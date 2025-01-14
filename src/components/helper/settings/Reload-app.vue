<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
</script>

<script>
export default {
	data() {
		return {
			languages: useLanguageStore(),
			loading: false,
		};
	},
	methods: {
		reloadApp() {
			this.loading = true;
			setTimeout(() => {
				location.reload();
			}, 1500);
		},
	},
};
</script>

<template>
	<div v-if="loading" class="empty-full-screen-panel"></div>
	<div class="reload-container helper-settings">
		<span class="settings-icon me-1"> &#x2699; </span>
		<span> {{ languages.reloadAppText }} </span>
		<button class="btn btn-light border-dark me-3 reload-btn" :class="{ clicked: loading }" @click="reloadApp()">
			<img :class="{ loading: loading }" src="@/img/icons/reload-icon.webp" alt="reload" />
		</button>
		<span v-if="loading" class="loading-text">LOADING</span>
	</div>
</template>

<style scoped>
.empty-full-screen-panel {
	width: 100%;
	height: 100%;
	z-index: 450;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #adadad56;
}
.reload-container {
	margin-top: 10px;
	margin-bottom: 10px;
}
.clicked {
	background-color: #b1b1b1;
}
.reload-btn {
	padding: 2px 15px;
	margin-left: 15px;
	margin-right: 10px;
}
.reload-btn > img {
	width: 30px;
	height: 27px;
}
.loading {
	animation: spin 1s infinite;
}
@keyframes spin {
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
.loading-text {
	animation: fadeIn 0.5s infinite;
	color: #00a700;
	font-weight: bold;
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
