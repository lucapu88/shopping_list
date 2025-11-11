<script setup>
import { useFirebaseStore } from "@/store/FirebaseStore";
import Accordion from "./Accordion.vue";
import LoadingOrUpdating from "../Loading-or-updating.vue";
</script>

<script>
export default {
	components: { Accordion },
	data() {
		return {
			firebaseStore: useFirebaseStore(),
			visible: false,
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
					<span>ELENCO SPESE</span>
					<span class="x" @click="close()">X</span>
				</div>
				<div class="shopping-container">
					<div v-if="firebaseStore.firebaseLoading">
						<LoadingOrUpdating :listChanged="firebaseStore.firebaseLoading" />
					</div>
					<h2 v-if="firebaseStore.firebaseErrorMessage" style="color: red">
						{{ firebaseStore.firebaseErrorMessage }}
					</h2>
					<template v-if="!firebaseStore.firebaseLoading && !firebaseStore.firebaseErrorMessage">
						<template v-for="(element, i) in firebaseStore.myYearOfShoppingsArray" :key="i">
							<template> </template>
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
	background-color: #363636;
	overflow: hidden;
}
.modal-content {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	margin: auto;
	padding: 25px;
	border-radius: 10px;
	width: 95vw;
	height: 95vh;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	background-color: #ffffff;
	overflow-y: auto;
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
	overflow: auto;
	width: 100%;
}

.title {
	margin-bottom: 10px;
}
.x {
	position: absolute;
	right: -20px;
	top: 5px;
	width: 90px;
	height: 35px;
}
</style>
