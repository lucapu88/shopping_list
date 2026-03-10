<script>
// QUESTO FILE è STATO GENERATO CON L'AIUTO DI CLAUDE AI

import { useSettingsStore } from "../../store/SettingsStore";
import { useLanguageStore } from "@/store/LanguageStore";

export default {
	name: "PaymentModal",

	props: {
		isOpen: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["close", "payment-success"],
	data() {
		return {
			settings: useSettingsStore(),
			languages: useLanguageStore(),
			selectedPlan: null,
			loading: false,
			errorMessage: "",
			plans: [
				{
					id: "starter",
					price: 1,
					generations: 100,
					emoji: "🌱",
					note: "€0.01 per ricetta",
					priceId: import.meta.env.VITE_STRIPE_PRICE_100,
					featured: false,
				},
				{
					id: "chef",
					price: 2,
					generations: 200,
					emoji: "👨‍🍳",
					note: "€0.01 per ricetta",
					priceId: import.meta.env.VITE_STRIPE_PRICE_200,
					featured: true,
				},
				{
					id: "gourmet",
					price: 5,
					generations: 600,
					emoji: "⭐",
					note: "€0.008 per ricetta",
					priceId: import.meta.env.VITE_STRIPE_PRICE_600,
					featured: false,
				},
			],
		};
	},
	methods: {
		selectPlan(plan) {
			this.selectedPlan = plan;
			this.errorMessage = "";
		},
		getOrCreateToken() {
			let token = localStorage.getItem("ricette_token");
			if (!token) {
				token = crypto.randomUUID();
				localStorage.setItem("ricette_token", token);
			}
			return token;
		},
		async handleCheckout() {
			if (!this.selectedPlan) return;
			this.loading = true;
			this.errorMessage = "";

			try {
				const token = this.getOrCreateToken();

				const response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						priceId: this.selectedPlan.priceId,
						planId: this.selectedPlan.id,
						token,
					}),
				});

				if (!response.ok) throw new Error("Errore nella creazione della sessione");
				const { url } = await response.json();
				window.location.href = url;
			} catch (err) {
				this.errorMessage = err.message || "Si è verificato un errore. Riprova.";
			} finally {
				this.loading = false;
			}
		},
		close() {
			this.$emit("close");
			this.settings.showPaymentModal = false;
		},
	},
};
</script>

<template>
	<div class="payment-overlay" @click.self="close()">
		<div class="payment-card">
			<!-- Header -->
			<button class="close-btn" @click="close()">✕</button>
			<div class="card-header">
				<div class="icon-ring">🍳</div>
				<h1>{{ languages.paymentModal.title }}</h1>
				<p class="card-header-p">{{ languages.paymentModal.description }}</p>
				<p class="sub-description">{{ languages.paymentModal.subdescription }}</p>
			</div>

			<!-- Plans -->
			<div class="plans-grid">
				<div v-for="plan in plans" :key="plan.id" class="plan-card" :class="{ selected: selectedPlan?.id === plan.id, featured: plan.featured }" @click="selectPlan(plan)">
					<div class="plan-badge" v-if="plan.featured">{{ languages.paymentModal.popularText }}</div>
					<div class="plan-top">
						<span class="plan-emoji">{{ plan.emoji }}</span>
						<div class="plan-price">
							<span class="currency">€</span>
							<span class="amount">{{ plan.price }}</span>
						</div>
					</div>
					<div class="plan-gen">
						<strong>{{ plan.generations }}</strong> {{ languages.paymentModal.generationsText }}
					</div>
					<!-- <div class="plan-note">{{ plan.note }}</div> -->
					<div class="plan-check" v-if="selectedPlan?.id === plan.id">✓</div>
				</div>
			</div>

			<!-- Selected summary -->
			<transition name="fade">
				<div class="summary" v-if="selectedPlan">
					<span>{{ selectedPlan.generations }} {{ languages.paymentModal.generationsText }}</span>
					<span class="summary-price">€{{ selectedPlan.price }}</span>
				</div>
			</transition>

			<!-- Pay button -->
			<button class="pay-btn" :disabled="!selectedPlan || loading" @click="handleCheckout">
				<span v-if="loading" class="spinner"></span>
				<span v-else>
					{{ languages.paymentModal.payBtnText }}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</span>
			</button>

			<!-- Error -->
			<transition name="fade">
				<div class="error-msg" v-if="errorMessage">⚠ {{ errorMessage }}</div>
			</transition>

			<!-- Security note -->
			<div class="security">
				<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z" />
				</svg>
				{{ languages.paymentModal.stripeFooterInfo }}
			</div>
		</div>
	</div>
</template>

<style scoped>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

.payment-overlay {
	position: fixed;
	inset: 0;
	background: rgba(10, 8, 5, 0.75);
	backdrop-filter: blur(6px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	padding: 16px;
}

.payment-card {
	position: relative;
	background: #fdfaf4;
	border-radius: 24px;
	padding: 40px 36px 32px;
	width: 100%;
	max-width: 480px;
	box-shadow:
		0 32px 80px rgba(0, 0, 0, 0.18),
		0 0 0 1px rgba(0, 0, 0, 0.06);
}

.close-btn {
	position: absolute;
	top: 18px;
	right: 18px;
	background: rgba(0, 0, 0, 0.07);
	border: none;
	border-radius: 50%;
	width: 32px;
	height: 32px;
	cursor: pointer;
	font-size: 13px;
	color: #555;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background 0.2s;
}
.close-btn:hover {
	background: rgba(0, 0, 0, 0.14);
}

/* Header */
.card-header {
	text-align: center;
	margin-bottom: 32px;
}
.sub-description {
	font-size: 0.625rem;
	border-top: 1px solid #808080;
}

.icon-ring {
	font-size: 30px;
	width: 72px;
	height: 72px;
	background: linear-gradient(135deg, #fff3dc, #ffe5b4);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 16px;
	box-shadow: 0 4px 16px rgba(255, 180, 50, 0.25);
}
.card-header h1 {
	font-size: 25px;
	font-weight: 600;
	color: #1a1208;
	letter-spacing: -0.5px;
	margin-bottom: 8px;
}
.card-header-p {
	font-size: 14px;
}
.card-header-p,
.sub-description {
	color: #7a6e5e;
	line-height: 1.5;
	font-weight: 300;
}
/* Plans */
.plans-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
	margin-bottom: 20px;
}

.plan-card {
	position: relative;
	background: #fff;
	border: 1.5px solid #e8e0d0;
	border-radius: 16px;
	padding: 16px 12px;
	cursor: pointer;
	text-align: center;
	transition: all 0.22s ease;
	overflow: hidden;
}
.plan-card:hover {
	border-color: #c8a96e;
	transform: translateY(-2px);
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.plan-card.selected {
	border-color: #9b6a2f;
	background: #fff8ec;
	box-shadow:
		0 0 0 3px rgba(155, 106, 47, 0.15),
		0 8px 24px rgba(0, 0, 0, 0.08);
	transform: translateY(-2px);
}
.plan-card.featured {
	border-color: #c8a96e;
}

.plan-badge {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	background: linear-gradient(90deg, #9b6a2f, #c8a96e);
	color: white;
	font-size: 9px;
	font-weight: 500;
	letter-spacing: 0.5px;
	padding: 3px 10px;
	border-radius: 0 0 8px 8px;
	text-transform: uppercase;
	white-space: nowrap;
}

.plan-top {
	margin-top: 10px;
	margin-bottom: 8px;
}
.plan-emoji {
	font-size: 22px;
	display: block;
	margin-bottom: 6px;
}

.plan-price {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	line-height: 1;
}
.currency {
	font-size: 14px;
	font-weight: 500;
	color: #3d2f1a;
	margin-top: 4px;
}
.amount {
	font-size: 32px;
	font-weight: 700;
	color: #1a1208;
	letter-spacing: -1px;
}

.plan-gen {
	font-size: 12px;
	color: #4a3d2d;
	margin-bottom: 4px;
}
.plan-gen strong {
	font-weight: 600;
}

.plan-note {
	font-size: 10px;
	color: #9e8e78;
	font-weight: 300;
}

.plan-check {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 20px;
	height: 20px;
	background: #9b6a2f;
	border-radius: 50%;
	color: white;
	font-size: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* Summary */
.summary {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #f5efe3;
	border-radius: 12px;
	padding: 12px 16px;
	margin-bottom: 16px;
	font-size: 14px;
	color: #4a3d2d;
	border: 1px solid #e8d9bf;
}
.summary-price {
	font-size: 18px;
	font-weight: 600;
	color: #1a1208;
}

/* Pay button */
.pay-btn {
	width: 100%;
	padding: 16px;
	background: linear-gradient(135deg, #1a1208, #3d2f1a);
	color: #fdfaf4;
	border: none;
	border-radius: 14px;
	font-size: 15px;
	font-weight: 500;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	transition: all 0.22s ease;
	letter-spacing: 0.2px;
	margin-bottom: 16px;
}
.pay-btn:hover:not(:disabled) {
	background: linear-gradient(135deg, #2d1f0a, #5a4525);
	transform: translateY(-1px);
	box-shadow: 0 8px 24px rgba(26, 18, 8, 0.3);
}
.pay-btn:disabled {
	opacity: 0.45;
	cursor: not-allowed;
	transform: none;
}

/* Spinner */
.spinner {
	width: 18px;
	height: 18px;
	border: 2px solid rgba(253, 250, 244, 0.3);
	border-top-color: #fdfaf4;
	border-radius: 50%;
	animation: spin 0.7s linear infinite;
}
@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

/* Error */
.error-msg {
	background: #fef2f2;
	color: #991b1b;
	border: 1px solid #fecaca;
	border-radius: 10px;
	padding: 10px 14px;
	font-size: 13px;
	margin-bottom: 14px;
}

/* Security */
.security {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	font-size: 12px;
	color: #9e8e78;
}
.security svg {
	flex-shrink: 0;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

@media (max-width: 420px) {
	.payment-card {
		padding: 32px 20px 24px;
	}
	.plans-grid {
		gap: 8px;
	}
	.amount {
		font-size: 26px;
	}
}
</style>
