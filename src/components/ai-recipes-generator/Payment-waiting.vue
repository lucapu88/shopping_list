<script setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({ isVisible: Boolean });

const phrases = ["🍝 Stiamo preparando le tue generazioni...", "🔪 Il chef sta affilando i coltelli...", "🥘 Il pagamento è quasi pronto...", "🍷 Quasi fatto, ancora un secondo...", "🌿 Stiamo raccogliendo gli ingredienti..."];

const currentPhrase = ref(phrases[0]);
let interval = null;

onMounted(() => {
	let i = 0;
	interval = setInterval(() => {
		i = (i + 1) % phrases.length;
		currentPhrase.value = phrases[i];
	}, 3000);
});

onUnmounted(() => clearInterval(interval));
</script>

<template>
	<div class="waiting-overlay" v-if="isVisible">
		<div class="waiting-card">
			<div class="chef-icon">👨‍🍳</div>
			<h2>Stiamo confermando il tuo pagamento...</h2>
			<p class="phrase">{{ currentPhrase }}</p>
			<div class="dots"><span></span><span></span><span></span></div>
		</div>
	</div>
</template>

<style scoped>
.waiting-overlay {
	position: fixed;
	inset: 0;
	background: rgba(10, 8, 5, 0.85);
	backdrop-filter: blur(8px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
}

.waiting-card {
	background: #fdfaf4;
	border-radius: 24px;
	padding: 48px 40px;
	text-align: center;
	max-width: 400px;
	width: 90%;
	box-shadow: 0 32px 80px rgba(0, 0, 0, 0.2);
}

.chef-icon {
	font-size: 56px;
	margin-bottom: 20px;
	animation: bounce 1s infinite;
}

h2 {
	font-size: 20px;
	color: #1a1208;
	margin-bottom: 16px;
	font-weight: 600;
}

.phrase {
	font-size: 14px;
	color: #7a6e5e;
	margin-bottom: 24px;
	min-height: 24px;
	transition: opacity 0.3s;
}

.dots {
	display: flex;
	justify-content: center;
	gap: 8px;
}

.dots span {
	width: 10px;
	height: 10px;
	background: #9b6a2f;
	border-radius: 50%;
	animation: pulse 1.2s infinite;
}

.dots span:nth-child(2) {
	animation-delay: 0.2s;
}
.dots span:nth-child(3) {
	animation-delay: 0.4s;
}

@keyframes bounce {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}

@keyframes pulse {
	0%,
	100% {
		opacity: 0.3;
		transform: scale(0.8);
	}
	50% {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
