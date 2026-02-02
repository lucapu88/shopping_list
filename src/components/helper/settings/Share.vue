<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
import ListIstructionAccordion from "../../panels-and-modals/List-istruction-accordion.vue";
import ShareModal from "../../panels-and-modals/Share-modal.vue";
import QrCodeModal from "../../panels-and-modals/Qr-code-modal.vue";
</script>

<script>
export default {
	data() {
		return {
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			showShareModal: false,
			showQrModal: false,
			color: null,
			colorsNum: 11,
			share: "share",
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
			this.showShareModal = true;
			this.color = Math.floor(Math.random() * this.colorsNum);
		},
		onCloseShareModal(value) {
			this.showShareModal = value;
		},
		showQrCodeModal() {
			this.showQrModal = true;
		},
		onCloseQrModal(value) {
			this.showQrModal = value;
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
	<div class="helper-settings">
		<ListIstructionAccordion show-list-instructions-input="share" :istructions-text="languages.share.title" :select-deselect-arrow="settings.share && settings.section === share" :isSettings="true" />
		<template v-if="settings.share && settings.section === share">
			<div class="share-container share-update helper-settings mb-3">
				<li class="ms-3">{{ languages.share.info }}</li>
				<div class="mt-2">
					<span>- Link: </span>
					<span class="hand-pointing galeazzi ms-3"> &#x1F449; </span>
					<button id="share" class="btn btn-light border-dark share-update-btn ms-3" @click="shareLink()">
						<img src="@/img/icons/share.webp" loading="lazy" alt="share" />
					</button>
				</div>
				<div class="mt-3">
					<span>- QR code: </span>
					<span class="hand-pointing galeazzi ms-3"> &#x1F449; </span>
					<button id="qr" class="btn btn-light border-dark qr-btn ms-3" @click="showQrCodeModal()">
						{{ String.fromCodePoint(0x1f523) }}
					</button>
				</div>
			</div>
		</template>
	</div>

	<ShareModal :showShareModal="showShareModal" :color="color" @closeShareModal="onCloseShareModal" />
	<QrCodeModal :showQrModal="showQrModal" @closeQrModal="onCloseQrModal" />
</template>

<style scoped>
.share-update-btn {
	padding: 4px 25px;
}
.qr-btn {
	padding: 3px 20px;
}

.link-copied {
	font-size: 0.813rem;
	margin-left: 0.313rem;
	color: rgb(197, 0, 0);
}
</style>
