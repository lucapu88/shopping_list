<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import emailjs from "emailjs-com";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			secondTodosStore: useSecondTodoStore(),
			isChristmas: useChristmasStore(),
			message: "",
			status: "",
			recipient: "shoppinglist.service@outlook.com",
			feedbackPlaceholder: null,
			disableTextarea: false,
		};
	},
	created() {
		this.feedbackPlaceholder = `${this.languages.feedback.placeholder}\n${this.languages.feedback.extraText}`;
	},
	methods: {
		sendEmail() {
			if (!this.message) {
				this.status = "Inserisci un messaggio prima di inviare.";
				return;
			}
			this.disableTextarea = true;

			const templateParams = {
				message: this.message,
				to_email: this.recipient,
			};

			emailjs.send("service_cqx5ois", "template_pguljf9", templateParams, "6CKwkjwoAzycygE3V").then(
				() => {
					this.status = this.languages.feedback.successMessage;
					setTimeout(() => {
						this.status = "";
					}, 5000);
					this.status = this.languages.feedback.successMessage;
					this.message = "";
					this.disableTextarea = false;
				},
				(error) => {
					console.error(error);
					this.disableTextarea = false;
					this.status = `${this.languages.feedback.errorMessage} ${this.recipient}`;
					setTimeout(() => {
						this.status = "";
					}, 6000);
				}
			);
		},
	},
};
</script>

<template>
	<div class="modal">
		<div
			class="modal-content"
			:class="{
				light: theme.lightTheme,
				dark: theme.darkTheme,
				minimal: theme.minimalTheme,
				retro: theme.retroTheme,
				summer: theme.summerTheme,
				winter: theme.winterTheme,
				elegant: theme.elegantTheme,
				pink: theme.pinkTheme,
				panter: theme.panterTheme,
				lemon: theme.lemonTheme,
				jeans: theme.jeansTheme,
			}"
		>
			<span class="close-feedback-modal" @click="secondTodosStore.showFeedbackForm = false">X</span>
			<form @submit.prevent="sendEmail">
				<label class="title">{{ languages.feedback.title }}</label>

				<p v-if="status" class="text-danger text-sm mt-2">{{ status }}</p>

				<textarea :disabled="disableTextarea" v-model="message" class="content" rows="5" :placeholder="feedbackPlaceholder"></textarea>

				<button type="submit" class="send-message-button mt-3">
					{{ languages.send }}
				</button>
			</form>
		</div>
	</div>
</template>

<style scoped>
.modal {
	padding-top: 10px;
}

.modal-content {
	position: relative;
	margin: auto;
	padding: 25px;
	border-radius: 10px;
	width: 95%;
	height: 98%;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow-y: auto;
}

.close-feedback-modal {
	position: absolute;
	top: 5px;
	right: 15px;
	font-size: 1.25rem;
	font-weight: bold;
	cursor: pointer;
}

.title {
	font-size: 1rem;
	font-weight: bold;
	margin-bottom: 15px;
}

textarea {
	height: 75vh;
	width: 100%;
	text-align: center;
	padding: 10px;
}

.light {
	background-color: #ffffff;
	background-size: cover;
	background-repeat: no-repeat;
}
.light > p {
	max-width: 24ch;
}

.dark,
.dark > button {
	background-color: #333333;
	color: #ffff;
	border: 2px solid #ffff;
}

.minimal,
.minimal > button {
	background-color: #a5becc;
	color: #7c3e66;
}

.retro,
.retro > button {
	background-color: #000000;
	color: #35c50d;
	border: 1px solid #35c50d;
	border-radius: 0 !important;
}

.summer {
	background-color: #12a1df;
	border: 2px solid #12a1df;
	background-size: cover;
	background-repeat: no-repeat;
	color: #ffffff;
}

.winter {
	background-color: #ffff;
	border: 2px solid #ffff;
	background-size: cover;
	background-repeat: no-repeat;
}

.elegant {
	background-color: #1d2731;
	border: 1px solid #d98410;
	color: #d98410;
}
.elegant > p {
	font-weight: bold;
}
.elegant > button {
	background-color: #045687;
	border-color: #d98410;
	color: #d98410;
}
</style>
