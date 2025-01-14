<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import ShareModal from "../../panels-and-modals/Share-modal.vue";
</script>

<script>
export default {
	data() {
		return {
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			showModal: false,
			color: null,
			colorsNum: 11,
		};
	},
	methods: {
		shareLink() {
			const playStoreUrl = "https://play.google.com/store/apps/details?id=io.kodular.caputoluca88.Shopping_List";
			navigator.clipboard.writeText(playStoreUrl);
			document.addEventListener("copy", function (e) {
				//copio negli appunti anche qui per sistemare su android (quello di sopra non funziona)
				e.clipboardData.setData("text/plain", playStoreUrl);
				e.preventDefault();
			});
			document.execCommand("copy");
			/*this.languages.share.visible = true;
      setTimeout(() => (this.languages.share.visible = false), 5000);
      this.openShareOptions(); */
			this.showModal = true;
			this.color = Math.floor(Math.random() * this.colorsNum);
		},
		onCloseModal(value) {
			this.showModal = value;
		},
		async openShareOptions() {
			/*Purtroppo questa cosa magnifica di visualizzare le opzioni di condivisione funziona per il web ma non per android.
        La lascio, magari in futuro le cose cambiano...Nel frattempo comunque sia condividi questa cazzo di app prima di subito!!! XD */
			let shareData = {
				title: "Shopping List",
				text: "Download this beautiful, cool and fantastic app: ",
				url: "https://play.google.com/store/apps/details?id=io.kodular.caputoluca88.Shopping_List",
			};
			try {
				await navigator.share(shareData);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<template>
	<div class="share-container share-update helper-settings mb-3">
		<span class="settings-icon me-1"> &#x2699; </span>
		<span>
			{{ languages.shareText }}
		</span>
		<span class="hand-pointing galeazzi ms-3"> &#x1F449; </span>
		<button id="share" class="btn btn-light border-dark share-update-btn ms-3" @click="shareLink()">
			<img src="@/img/icons/share.webp" alt="share" />
		</button>
		<p class="link-copied" v-if="languages.share.visible">
			{{ languages.share.text }}
		</p>
	</div>
	<ShareModal :showModal="showModal" :color="color" @closeModal="onCloseModal" />
</template>

<style scoped>
.share-container > button {
	padding: 3px 25px;
}

.link-copied {
	font-size: 0.813rem;
	margin-left: 5px;
	color: rgb(197, 0, 0);
}
</style>
