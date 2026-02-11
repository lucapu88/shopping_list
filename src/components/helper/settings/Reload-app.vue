<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
</script>

<script>
// TODO: componente inutilizzato! Valutare se tenerlo o meno
export default {
	data() {
		return {
			languages: useLanguageStore(),
			secondTodos: useSecondTodoStore(),
			loading: false,
		};
	},
	methods: {
		reloadApp() {
			this.loading = true;
			setTimeout(() => {
				location.reload();
			}, 800);
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
			<div :class="{ loading: loading }">
				<span class="refresh-icon">{{ secondTodos.refreshIcon }}</span>
			</div>
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
	margin-top: 0.625rem;
	margin-bottom: 0.625rem;
}
.clicked {
	background-color: #b1b1b1;
}
.reload-btn {
	padding: 1px 15px;
	margin-left: 0.9375rem;
	margin-right: 0.625rem;
}
.refresh-icon {
	font-size: 1.3rem;
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
