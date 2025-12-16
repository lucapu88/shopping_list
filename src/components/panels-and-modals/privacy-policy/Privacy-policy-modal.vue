<script setup>
import PrivacyPolicyComplete from "./Pricacy-policy-complete.vue";
import { useSettingsStore } from "@/store/SettingsStore";
</script>

<script>
export default {
	data() {
		return {
			settings: useSettingsStore(),
			completePrivacyPolicy: false,
		};
	},
	created() {
		this.completePrivacyPolicy = false;
	},
	methods: {
		showCompletePrivacyPolicy() {
			this.completePrivacyPolicy = true;
			document.getElementById("privacy-modal-content").scrollTo({ top: 0, left: 0, behavior: "smooth" });
		},
	},
};
</script>

<template>
	<div>
		<div id="privacy-policy-modal" class="modal">
			<div class="privacy-modal-content" id="privacy-modal-content">
				<span class="close" @click="settings.closePrivacyPolicy()">&times;</span>
				<template v-if="!completePrivacyPolicy">
					<div id="pp" style="color: black"></div>
					<div class="privacy-modal-header">
						<h2 class="text-center">Privacy Policy of Shopping List</h2>
						<small>Application collects some Personal Data from its Users.</small>
					</div>
					<div class="privacy-modal-main">
						<strong> Personal Data processed for the following purposes and using the following services: </strong>
						<hr />
						<p class="text-center">
							<strong>Displaying content from external platforms</strong>
						</p>
						<strong>Google Fonts</strong>
						<p>Personal Data: Trackers; Usage Data</p>
						<hr />
						<p class="text-center">
							<strong>Hosting and backend infrastructure</strong>
						</p>
						<strong>GitHub Pages</strong>
						<p>Various types of Data as specified in the privacy policy of the service</p>
						<strong>Netlify</strong>
						<p>Various types of Data as specified in the privacy policy of the service</p>
						<strong>Kodular</strong>
						<p>Various types of Data as specified in the privacy policy of the service</p>
						<hr />
						<p class="text-center">
							<strong>Contact information</strong>
						</p>
						<p>Owner: Luca Caputo</p>
						<p>Contact email: shoppinglist.service@outlook.com</p>
					</div>
					<div class="privacy-modal-footer">
						<p style="color: #12a1df; text-decoration-line: underline; cursor: pointer" @click="showCompletePrivacyPolicy()">Show the complete Privacy Policy</p>
					</div>
				</template>
				<PrivacyPolicyComplete v-if="completePrivacyPolicy" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.close {
	background-color: #ffffffad;
	width: 35px;
	height: 40px;
	line-height: 1;
}
.privacy-policy-btn {
	border: 1px solid grey;
	font-size: x-small;
	text-transform: capitalize;
	margin-top: 1.25rem;
	border-radius: 5px;
	background-color: transparent;
}
.privacy-modal-content {
	background-color: #efefef;
	margin: auto;
	padding: 25px;
	border-radius: 10px;
	width: 95%;
	height: 90%;
	overflow: auto;
	text-align: left;
	font-family: sans-serif;
}

.privacy-modal-header,
.privacy-modal-main {
	border-bottom: 1px solid #000000;
	margin-bottom: 2.5rem;
}
.privacy-modal-header,
.privacy-modal-main,
.privacy-modal-footer {
	color: #000000;
}
</style>
