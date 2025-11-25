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
		this.feedbackPlaceholder = `${this.languages.feedback.placeholder}\n${this.languages.feedback.extraText} \n\n\n ${this.isChristmas.christmasTheme ? this.languages.merryChristmasText : ""}`;
	},
	methods: {
		sendEmail() {
			if (!this.message) {
				this.status = this.languages.feedback.statusText;
				setTimeout(() => {
					this.status = "";
				}, 3000);
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
				'container-light': theme.lightTheme,
				'container-dark': theme.darkTheme,
				'container-minimal': theme.minimalTheme,
				'container-retro': theme.retroTheme,
				'container-summer': theme.summerTheme,
				'container-winter': theme.winterTheme,
				'container-elegant': theme.elegantTheme,
				'container-pink': theme.pinkTheme,
				'container-panter': theme.panterTheme,
				'container-lemon': theme.lemonTheme,
				'container-jeans': theme.jeansTheme,
				'pt-0': isChristmas.christmasTheme,
			}"
		>
			<div class="christmas-decorations-container" v-if="isChristmas.christmasTheme">
				<img class="christmas-decorations" src="@/img/festivities/christmas-decorations.webp" alt="christmas_decorations" />
			</div>

			<span class="close-feedback-modal" @click="secondTodosStore.showFeedbackForm = false">X</span>

			<form @submit.prevent="sendEmail">
				<label class="title" :class="{ 'margin-30': isChristmas.christmasTheme }">{{ languages.feedback.title }}</label>

				<p v-if="status" class="text-danger text-sm mt-2">{{ status }}</p>

				<textarea :disabled="disableTextarea" v-model="message" class="content" rows="5" :placeholder="feedbackPlaceholder"></textarea>

				<button type="submit" class="btn btn-success send-message-button mt-3">
					{{ languages.send }}
				</button>

				<img v-if="isChristmas.christmasTheme" class="christmas-tree" src="@/img/festivities/christmas-tree.webp" alt="christmas_tree" />
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
	overflow-x: hidden;
	animation: modalEnter 0.8s ease forwards;
}

@keyframes modalEnter {
	0% {
		opacity: 0;
		transform: translateY(-20px) scale(0.95);
	}
	60% {
		opacity: 1;
		transform: translateY(5px) scale(1.03);
	}
	100% {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

.close-feedback-modal {
	position: absolute;
	top: 5px;
	right: -25px;
	font-size: 1.25rem;
	font-weight: bold;
	cursor: pointer;
	width: 100px;
	height: 50px;
	z-index: 20;
}

.title {
	font-size: 1rem;
	font-weight: bold;
	margin-bottom: 10px;
}

.margin-30 {
	margin-top: 30px;
}

textarea {
	height: 70vh;
	width: 100%;
	text-align: center;
	padding: 10px;
}

.christmas-decorations-container {
	width: 230px;
	height: 50px;
	position: relative;
}

.christmas-decorations-container img {
	width: 100%;
	position: absolute;
	top: -400%;
	left: 5px;
	animation: dropDown 1s ease-out forwards;
	animation-delay: 0.5s;
	z-index: 10;
}

@keyframes dropDown {
	from {
		top: -400%;
	}
	to {
		top: 0;
	}
}

.christmas-tree {
	width: 100px;
	position: absolute;
	bottom: 0px;
	left: 0;
}

@media (max-width: 370px) {
	.title {
		font-size: 0.875rem;
	}
}
</style>
