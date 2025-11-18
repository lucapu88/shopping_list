<script setup>
import { useFirebaseStore } from "@/store/FirebaseStore";
import Accordion from "./Accordion.vue";
import LoadingOrUpdating from "../Loading-or-updating.vue";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
</script>

<script>
export default {
	components: { Accordion },
	data() {
		return {
			firebaseStore: useFirebaseStore(),
			visible: false,
			isChristmas: useChristmasStore(),
		};
	},
	created() {
		this.firebaseStore.getData();
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
			<div v-if="visible" class="modal-content">
				<div class="title">
					<span v-if="isChristmas.christmasTheme" class="christmas-decorations me-2">🎄</span>
					<span>ELENCO SPESE</span>
					<span v-if="isChristmas.christmasTheme" class="christmas-decorations ms-2">🎅 </span>
					<span class="x" @click="close()">X</span>
				</div>
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
	background-color: #ffffff;
	overflow-y: auto;
	overflow-x: hidden;
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

.shopping-container {
	overflow-y: auto;
	overflow-x: hidden;
	width: 100%;
	padding: 0 15px;
}

.title {
	margin-bottom: 10px;
	z-index: 600;
}
.x {
	position: absolute;
	right: -20px;
	top: 5px;
	width: 90px;
	height: 35px;
	z-index: 600;
}

.christmas-decorations {
	font-size: 1.5625rem;
}
</style>
