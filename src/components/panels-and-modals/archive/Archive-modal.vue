<script setup>
import { useFirebaseStore } from "@/server/FirebaseStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useThemeStore } from "@/store/ThemeStore";
import ShowOnlyLatestDeleted from "./Show-only-latest-deleted.vue";
import ShoppingsDB from "../../not-in-prod/Shoppings-db.vue";
</script>

<script>
export default {
	data() {
		return {
			firebaseStore: useFirebaseStore(),
			isChristmas: useChristmasStore(),
			settings: useSettingsStore(),
			theme: useThemeStore(),
			visible: false,
			showLatestDeleted: false,
		};
	},
	mounted() {
		this.visible = true;
	},
	methods: {
		close() {
			this.visible = false;
			setTimeout(() => {
				this.firebaseStore.openfirebaseModal = false;
			}, 800);
		},
	},
};
</script>

<template>
	<div class="modal" v-if="firebaseStore.openfirebaseModal">
		<transition name="slide">
			<div
				v-if="visible"
				class="modal-content"
				:class="{
					'container-light': theme.lightTheme,
					'container-dark': theme.darkTheme,
					'container-minimal': theme.minimalTheme,
					'container-retro': theme.retroTheme,
					'container-summer': theme.summerTheme,
					'container-winter': theme.winterTheme,
					'container-elegant': theme.elegantTheme,
					'confirm-pink': theme.pinkTheme,
					'container-panter': theme.panterTheme,
					'container-lemon': theme.lemonTheme,
					'container-jeans': theme.jeansTheme,
					'border-radius-nooo-hai-rotto-il-cazzo': theme.retroTheme,
				}"
			>
				<div class="title">
					<span v-if="settings.isIphone && isChristmas.christmasTheme && !showLatestDeleted" class="christmas-decorations me-2">🎄</span>
					<span v-if="settings.isIphone && !showLatestDeleted">ELENCO SPESE</span>
					<span v-if="settings.isIphone && isChristmas.christmasTheme && !showLatestDeleted" class="christmas-decorations ms-2">🎅 </span>
					<span class="x" @click="close()">X</span>
				</div>
				<!-- SOLO PER ME, NON IN PRODUZIONE -->
				<button v-if="settings.isIphone" @click="showLatestDeleted = !showLatestDeleted">
					{{ showLatestDeleted ? "Elenca le spese" : "Elenca le eliminazioni" }}
				</button>
				<ShoppingsDB v-if="settings.isIphone && !showLatestDeleted" />

				<!-- PER GLI ALTRI UTENTI MOSTRA SOLO GLI ULTIMI ELIMINATI CHE NON SONO SALVATI IN DB MA SOLO NEL LORO LOCALE -->
				<ShowOnlyLatestDeleted v-if="!settings.isIphone || showLatestDeleted" />
			</div>
		</transition>
	</div>
</template>

<style scoped>
.modal {
	padding-top: 5%;
	background-color: #363636d2;
	overflow: hidden;
}
.modal-content {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	margin: auto;
	padding: 25px 10px;
	border-radius: 10px;
	width: 95vw;
	height: 95vh;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
}

.slide-enter-active {
	animation: slideIn 0.8s ease-out forwards;
}
.slide-leave-active {
	animation: slideOut 0.8s ease-in forwards;
}

@keyframes slideIn {
	0% {
		left: -100%;
		opacity: 0;
	}
	60% {
		left: 50%;
		transform: translate(-55%, -50%) scale(1.05);
		opacity: 1;
	}
	100% {
		left: 50%;
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
	}
}

@keyframes slideOut {
	0% {
		left: 50%;
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
	}
	100% {
		left: -100%;
		transform: translateY(-50%) scale(0.95);
		opacity: 0;
	}
}

.title {
	margin-bottom: 0.625rem;
	z-index: 600;
	height: 15px;
}
.x {
	position: fixed;
	right: -30px;
	top: 5px;
	width: 100px;
	height: 35px;
	z-index: 600;
}

.christmas-decorations {
	font-size: 1.5625rem;
}
</style>
