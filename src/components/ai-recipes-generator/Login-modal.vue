<script>
// QUESTO FILE è STATO GENERATO CON L'AIUTO DI CLAUDE AI / CLAUDE CODE
import { loginGoogle, loginEmail, registerEmail, resetPassword } from "@/firebase.js";
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { usePreloadStore } from "../../store/PreloadStore";
import chefLoginImg from "@/img/recipes/chef-giorgio-login.webp";
import chefSorpreso from "@/img/recipes/chef-sorpreso.webp";
import chefPassword from "@/img/recipes/chef-password.webp";

export default {
	name: "LoginModal",
	props: {
		isOpen: { type: Boolean, default: false },
	},
	emits: ["close", "skip"],
	data() {
		return {
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			preload: usePreloadStore(),
			loading: false,
			showEmailForm: false,
			isRegistering: false,
			email: "",
			password: "",
			errorMessage: "",
			showResetForm: false,
			resetEmail: "",
			resetSent: false,
			eyeDirection: "center",
			eyesClosed: false,
			eyeTimer: null,
		};
	},
	created() {
		const imagesToPreload = [chefLoginImg, chefSorpreso, chefPassword];
		imagesToPreload.forEach((src) => this.preload.preloadImage(src));
	},
	methods: {
		async handleGoogle() {
			this.loading = true;
			this.errorMessage = "";
			try {
				await loginGoogle();
				this.$emit("close");
			} catch (err) {
				this.errorMessage = err.message;
			} finally {
				this.loading = false;
			}
		},
		async handleEmail() {
			this.loading = true;
			this.errorMessage = "";
			try {
				this.isRegistering ? await registerEmail(this.email, this.password) : await loginEmail(this.email, this.password);
				this.$emit("close");
			} catch (err) {
				this.errorMessage = err.message;
			} finally {
				this.loading = false;
				setTimeout(() => {
					this.errorMessage = "";
				}, 5000);
			}
		},
		async handleResetPassword() {
			this.loading = true;
			this.errorMessage = "";
			try {
				await resetPassword(this.resetEmail);
				this.resetSent = true;
				setTimeout(() => {
					this.showResetForm = false;
					this.resetSent = false;
				}, 2500);
			} catch (err) {
				if (err.code === "auth/user-not-found") {
					this.errorMessage = this.languages.login.errorMessage;
				} else {
					this.errorMessage = err.message;
				}
			} finally {
				this.loading = false;
				setTimeout(() => {
					this.errorMessage = "";
				}, 5000);
			}
		},
		onPasswordFocus() {
			this.eyesClosed = true;
		},
		onPasswordBlur() {
			this.eyesClosed = false;
		},
	},
	watch: {
		email(newVal, oldVal) {
			this.eyeDirection = newVal.length >= oldVal.length ? "right" : "left";
			clearTimeout(this.eyeTimer);
			this.eyeTimer = setTimeout(() => {
				this.eyeDirection = "center";
			}, 600);
		},
	},
	beforeUnmount() {
		clearTimeout(this.eyeTimer);
	},
};
</script>

<template>
	<div class="login-overlay" v-if="isOpen" @click.self="$emit('skip')">
		<div class="login-card">
			<button class="close-btn" @click="$emit('skip')">✕</button>

			<!-- Header normale quando non si inserisce email/password -->
			<div class="card-header" v-if="!showEmailForm">
				<div class="icon-ring">
					<img src="@/img/recipes/chef-giorgio-login.webp" alt="chef_login" />
				</div>
				<h1>{{ languages.login.title }}</h1>
				<p>{{ languages.login.subtitle }}</p>
			</div>

			<!-- Header animato con chef e occhi interattivi durante la registrazione email -->
			<div class="card-header" v-if="showEmailForm">
				<div class="chef-eyes-wrapper">
					<img v-if="errorMessage" src="@/img/recipes/chef-sorpreso.webp" alt="chef" class="chef-anim-img" />
					<template v-else>
						<img src="@/img/recipes/chef-password.webp" alt="chef" class="chef-anim-img" />
						<div class="eye eye-left" :class="{ 'eye--closed': eyesClosed }">
							<div class="pupil" :class="`pupil--${eyeDirection}`"></div>
						</div>
						<div class="eye eye-right" :class="{ 'eye--closed': eyesClosed }">
							<div class="pupil" :class="`pupil--${eyeDirection}`"></div>
						</div>
					</template>
				</div>
			</div>
			<!-- Form reset password -->
			<div v-if="showResetForm">
				<p style="font-size: 13px; color: #7a6e5e; margin-bottom: 10px">{{ languages.login.emailTitle }}</p>
				<input v-model="resetEmail" type="email" placeholder="Email" class="input" />
				<button class="btn-email mt-2 mb-2" @click="handleResetPassword" :disabled="loading">{{ languages.login.recLink }}</button>
				<p v-if="resetSent" style="color: green; font-size: 13px; text-align: center">✅ {{ languages.login.emailSentText }}</p>
				<button class="btn-back ms-3" @click="showResetForm = false">✕</button>
			</div>

			<!-- Se sta registrando con email -->
			<div v-if="showEmailForm" class="email-form">
				<input v-model="email" type="email" placeholder="Email" class="input" />
				<input v-model="password" type="password" placeholder="Password" class="input" @focus="onPasswordFocus" @blur="onPasswordBlur" />
				<button class="btn-email" @click="handleEmail">
					{{ isRegistering ? languages.login.register : languages.login.singIn }}
				</button>
				<p class="toggle-auth" @click="isRegistering = !isRegistering">
					{{ isRegistering ? languages.login.accountOk : languages.login.accountNo }}
				</p>
				<!-- Link recupero password — visibile solo in modalità login -->
				<p v-if="!isRegistering" class="toggle-auth" @click="showResetForm = true">{{ languages.login.resetPassword }}</p>

				<button class="btn-back" @click="showEmailForm = false">← {{ languages.back }}</button>
			</div>

			<!-- Pulsanti principali -->
			<div v-else class="buttons">
				<button v-if="settings.isAndroidBrowser || settings.isIphone || !settings.isAndroid" class="btn-google" @click="handleGoogle" :disabled="loading">
					<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" />
					{{ languages.login.google }}
				</button>
				<button class="btn-email-option" @click="showEmailForm = true" :disabled="loading">✉ {{ languages.login.otherEmail }}</button>
			</div>

			<div class="error-msg" v-if="errorMessage">⚠ {{ errorMessage }}</div>
		</div>
	</div>
</template>

<style scoped>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

.login-overlay {
	position: fixed;
	inset: 0;
	background: rgba(10, 8, 5, 0.75);
	backdrop-filter: blur(6px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1001;
	padding: 16px;
}

.login-card {
	position: relative;
	background: #fdfaf4;
	border-radius: 24px;
	padding: 40px 36px 32px;
	width: 100%;
	max-width: 420px;
	box-shadow: 0 32px 80px rgba(0, 0, 0, 0.18);
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
}

.card-header {
	text-align: center;
	margin-bottom: 28px;
}
.icon-ring {
	font-size: 32px;
	width: 64px;
	height: 64px;
	background: linear-gradient(135deg, #fff3dc, #ffe5b4);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 40px;
}
.icon-ring > img {
	width: 130px;
	height: 130px;
}
.card-header h1 {
	font-size: 22px;
	color: #1a1208;
	margin-bottom: 8px;
}
.card-header p {
	font-size: 13px;
	color: #7a6e5e;
	line-height: 1.5;
}

.buttons {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.btn-google {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	padding: 14px;
	background: white;
	border: 1.5px solid #e8e0d0;
	border-radius: 12px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s;
	color: #1a1208;
}
.btn-google:hover {
	border-color: #c8a96e;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.btn-email-option {
	padding: 14px;
	background: linear-gradient(135deg, #1a1208, #3d2f1a);
	color: #fdfaf4;
	border: none;
	border-radius: 12px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s;
}
.btn-email-option:hover {
	opacity: 0.9;
}

.btn-skip {
	padding: 12px;
	background: transparent;
	border: none;
	font-size: 13px;
	color: #9e8e78;
	cursor: pointer;
	text-decoration: underline;
}

.email-form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.input {
	padding: 12px 14px;
	font-family: Arial, Helvetica, sans-serif;
	border: 1.5px solid #e8e0d0;
	border-radius: 12px;
	font-size: 14px;
	outline: none;
	background: white;
}
.input:focus {
	border-color: #c8a96e;
}

.btn-email {
	padding: 14px;
	background: linear-gradient(135deg, #1a1208, #3d2f1a);
	color: #fdfaf4;
	border: none;
	border-radius: 12px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
}

.toggle-auth {
	font-size: 12px;
	color: #9b6a2f;
	cursor: pointer;
	text-align: center;
}

.btn-back {
	background: none;
	border: none;
	font-size: 13px;
	color: #9e8e78;
	cursor: pointer;
	text-align: left;
}

.error-msg {
	background: #fef2f2;
	color: #991b1b;
	border: 1px solid #fecaca;
	border-radius: 10px;
	padding: 10px 14px;
	font-size: 13px;
	margin-top: 12px;
}

.chef-eyes-wrapper {
	position: relative;
	display: inline-block;
	margin: 0 auto 16px;
}

.chef-anim-img {
	width: 170px;
	height: auto;
	display: block;
	z-index: 100;
	position: relative;
}

.eye {
	position: absolute;
	width: 20px;
	height: 15px;
	border-radius: 50%;
	overflow: hidden;
	background: white;
	display: flex;
	align-items: center;
	justify-content: center;
	transition:
		height 0.15s ease,
		border-radius 0.15s ease,
		background 0.15s ease;
	transform: translate(-50%, -50%);
	z-index: 50;
}

.eye-left {
	top: 50%;
	left: 40%;
}

.eye-right {
	top: 50%;
	left: 54%;
}

.eye--closed {
	background: #f5b68e;
}
.eye--closed > .pupil {
	background: #f5b68e;
	border-bottom: 5px solid black;
}

.pupil {
	width: 9px;
	height: 9px;
	background: #1a0e05;
	border-radius: 50%;
	position: absolute;
	transition: transform 0.2s ease;
}

.pupil--left {
	transform: translateX(-3px);
}

.pupil--right {
	transform: translateX(5px);
}

.pupil--center {
	transform: translateX(0);
}
</style>
