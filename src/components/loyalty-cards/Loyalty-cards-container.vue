<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { dbPromise } from "@/server/db.js";
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import SimpleAlert from "@/components/loyalty-cards/Simple-alert.vue";
import LoadingOrUpdating from "../Loading-or-updating.vue";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import BackgroundImg from "./Background-img.vue";
import ErrorMessage from "./Error-message.vue";
import InfoContainer from "./Info-container.vue";
import OrderCards from "./Order-cards.vue";
/*
	TOFIX: Partiamo dal fatto che la nuova versione "composition API" fa cagare e in questo componente non si capisce un cazzo proprio per questo modtivo.
	Però vabbè è da sistemare, per ora ho fatto l'essenziale per farlo funzionare. Va suddiviso in componenti e sistemata la sintassi per quel che si può fare vista sta merda di composition api.
*/
const theme = useThemeStore();
const languages = useLanguageStore();
const secondTodos = useSecondTodoStore();
const isChristmas = useChristmasStore();
const imageName = ref("");
const photos = ref([]);
const selectedFiles = ref([]);
const confirmAlertMessage = ref("");
const cropperInstance = ref(null);
const cropImageEl = ref(null);
const imageUrl = ref(null);
const photoId = ref(null);
const photoName = ref(null);
const showConfirmAlert = ref(null);
const saveBtnVisible = ref(false);
const showAlert = ref(false);
const loading = ref(false);
const addCard = ref(false);
const showInfo = ref(false);
const errorLoading = ref(false);
const insertNameAlert = ref(false);
const showImgPreview = ref(false);
const showNoNameAlert = ref(false);
const cropPreview = ref(false);
const az = ref(localStorage.getItem("az-order") === "true");
let objectUrl = null;
const limitCards = 25; //Se lo cambi qui, cambialo anche nel testo in loyalityCards.infoSubText  in languageStore.js
const maxHeight = 300; //Se la cambi qui, cambiala anche nel css in .crop-container
onMounted(loadPhotos);

async function onSelect(e) {
	selectedFiles.value = Array.from(e.target.files);
	saveBtnVisible.value = selectedFiles.value.length > 0;
	cropPreview.value = saveBtnVisible.value;
	imageUrl.value = URL.createObjectURL(selectedFiles.value[0]);
	showNoNameAlert.value = false;
	await nextTick();
	cropperInstance.value = new Cropper(cropImageEl.value, {
		aspectRatio: NaN, // libero
		viewMode: 1,
		autoCropArea: 1,
		responsive: false,
		restore: false,
	});
}

function clearSelection() {
	imageUrl.value = null;
	selectedFiles.value = [];
	showConfirmAlert.value = false;
	showImgPreview.value = false;
	saveBtnVisible.value = false;
	cropPreview.value = false;
	const inputEl = document.querySelector('input[type="file"]');
	if (inputEl) inputEl.value = null;
}

async function processImage() {
	const canvas = cropperInstance.value.getCroppedCanvas();
	const scale = maxHeight / canvas.height;
	const finalWidth = canvas.width * scale;
	const resizedCanvas = document.createElement("canvas");
	resizedCanvas.width = finalWidth;
	resizedCanvas.height = maxHeight;

	const rctx = resizedCanvas.getContext("2d");
	rctx.drawImage(canvas, 0, 0, finalWidth, maxHeight);

	const scannedCanvas = applyScannerEffect(resizedCanvas);

	return scannedCanvas.toDataURL("image/jpeg", 0.9);
}

function applyScannerEffect(canvas) {
	const w = canvas.width;
	const h = canvas.height;
	const ctx = canvas.getContext("2d");
	const imgData = ctx.getImageData(0, 0, w, h);
	const data = imgData.data;

	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];

		let gray = r * 0.3 + g * 0.59 + b * 0.11;

		gray = gray * 1.35 + 10;

		data[i] = data[i + 1] = data[i + 2] = gray;
	}

	ctx.putImageData(imgData, 0, 0);
	return canvas;
}

function dataUrlToBlob(dataUrl) {
	return fetch(dataUrl).then((res) => res.blob());
}

function onNameChange() {
	showNoNameAlert.value = !imageName.value;
}

async function loadPhotos() {
	loading.value = true;
	try {
		errorLoading.value = false;
		const db = await dbPromise;
		photos.value = await db.getAll("photos");
		orderPhotos(az.value);
	} catch (err) {
		errorLoading.value = true;
	} finally {
		loading.value = false;
	}
}

function orderPhotos(order) {
	order ? photos.value.sort((a, b) => a.name.localeCompare(b.name)) : photos.value.sort((a, b) => b.name.localeCompare(a.name));
}

function viewOrderPhotos() {
	az.value = !az.value;
	window.localStorage.setItem("az-order", String(az.value));
	orderPhotos(az.value);
}

function showPhoto(photo) {
	document.querySelector("main").scrollTo({ top: 0, behavior: "smooth" });

	if (objectUrl) {
		URL.revokeObjectURL(objectUrl);
	}

	objectUrl = URL.createObjectURL(photo.blob);
	imageUrl.value = objectUrl;
	photoName.value = photo.name;
	showImgPreview.value = true;
}

async function deletePhoto() {
	const db = await dbPromise;
	await db.delete("photos", photoId.value);
	await loadPhotos();

	if (imageUrl.value) {
		URL.revokeObjectURL(imageUrl.value);
		imageUrl.value = null;
	}

	showConfirmAlert.value = false;
}

function selectPhotoForDelete(id, name) {
	photoId.value = id;
	confirmAlertMessage.value = `${languages.loyalityCards.confirmAlertMessage} "${name}"?`;
	showImgPreview.value = false;
	showConfirmAlert.value = true;
	document.querySelector("main").scrollTo({ top: 0, behavior: "smooth" });
}

function onCloseAlert(value) {
	showAlert.value = value;
}

function showAddCard() {
	addCard.value = !addCard.value;
	if (!addCard.value) {
		showImgPreview.value = false;
		saveBtnVisible.value = false;
		insertNameAlert.value = false;
		imageName.value = "";
		cropPreview.value = false;
	}
}

async function saveSelected() {
	imageName.value = imageName.value.trim();

	if (photos.value.length >= limitCards) {
		return;
	}
	if (!selectedFiles.value.length || !imageName.value) {
		showNoNameAlert.value = true;
		insertNameAlert.value = true;
		return;
	}

	const db = await dbPromise;

	const existing = await db.getAll("photos");
	const exists = existing.some((p) => p.name === imageName.value);

	if (exists) {
		showAlert.value = true;
		return;
	}

	const processedDataUrl = await processImage();

	const blob = await dataUrlToBlob(processedDataUrl);

	await db.put("photos", {
		id: crypto.randomUUID(),
		name: imageName.value,
		blob,
		createdAt: Date.now(),
	});

	resetToDefaultValue();

	if (cropperInstance.value) {
		cropperInstance.value.destroy();
		cropperInstance.value = null;
	}
	await loadPhotos();
}

function resetToDefaultValue() {
	selectedFiles.value = [];
	imageName.value = "";
	confirmAlertMessage.value = "";
	photoId.value = null;
	showConfirmAlert.value = false;
	insertNameAlert.value = false;
	saveBtnVisible.value = false;
	showInfo.value = false;
	addCard.value = false;
}

onUnmounted(() => {
	if (objectUrl) {
		URL.revokeObjectURL(objectUrl);
	}
});
</script>

<template>
	<div class="modal pt-0">
		<!-- ALERT CHE AVVERTE SE SI CERCA DI SALVARE UNA TESSERA CON NOME GIA' ESISTENTE -->
		<SimpleAlert :showAlert="showAlert" @closeAlert="onCloseAlert" />

		<div
			class="modal-content loy-container"
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
			<BackgroundImg :addHeight="addCard" />

			<header :class="{ 'text-dark': theme.winterTheme }">
				<h3 :class="{ 'bg-light': theme.lemonTheme }">{{ languages.loyalityCards.title }}</h3>
				<p class="close-icon" @click="secondTodos.loyaltyCardsVisible = false">
					<span class="btn-font-custom" :class="{ 'bg-light rounded-circle boldi-cipollino p-1': theme.lemonTheme }">X</span>
				</p>
			</header>
			<main>
				<LoadingOrUpdating :listChanged="loading" />

				<!-- MESSAGGIO DI ERRORE CARICAMENTO TESSERE -->
				<ErrorMessage :errorLoading="errorLoading" />

				<button class="btn-info" :class="{ 'btn-add-selected': showInfo }" @click="showInfo = !showInfo"><span>Info</span> <span class="add btn-font-custom"> i </span></button>

				<!-- INFO PER L'UTENTE -->
				<InfoContainer :show-info="showInfo" />

				<!-- MESSAGGIO CHE TI MOSTRA QUANDO HAI RAGGIUNTO IL LIMITE MASSIMO DI CARTE  -->
				<small v-if="photos.length >= limitCards">{{ languages.loyalityCards.maxNumberCardsMessage }}</small>

				<!-- PULSANTE PER APRIRE LA SCHERMATA PER AGGIUNGERE LA TESSERA -->
				<button v-if="photos.length < limitCards" class="btn-add" :class="{ 'btn-add-selected': addCard }" @click="showAddCard">
					<span>{{ languages.loyalityCards.functionText }}</span> <span class="add btn-font-custom"> + </span>
				</button>

				<!-- ISTRUZIONI PER L'UTENTE -->
				<template v-if="addCard">
					<!-- WARNING PER IL NOME DELLA TESSERA -->
					<small :class="{ 'text-dark': theme.winterTheme }" v-if="!imageName">{{ languages.loyalityCards.isctructionText }}</small>
					<!-- INPUT SCELTA NOME TESSERA -->
					<input class="input-name" :class="{ 'arrotonda-sto-bordo': !theme.retroTheme }" @input="onNameChange" v-model="imageName" type="text" :placeholder="languages.loyalityCards.nameInputPlaceholder" />
					<!-- PULSANTE PER AGGIUNGERE LA TESSERA -->
					<label class="btn-add btn btn-warning" :class="{ 'arrotonda-sto-bordo': !theme.retroTheme }">
						<span>{{ languages.loyalityCards.selectCardText }}</span>
						<input type="file" accept="image/*" @click="clearSelection" @change="onSelect" hidden />
					</label>

					<!-- PULSANTE PER SALVARE LA TESSERA -->
					<button class="btn btn-success" v-if="saveBtnVisible" @click="saveSelected()">{{ languages.saveText }}</button>
				</template>

				<!-- ALERT CHE APPARE PER CONFERMARE LA CANCELLAZIONE DELLA TESSERA -->
				<div class="confirm-delete-alert" :class="{ 'arrotonda-sto-bordo': !theme.retroTheme }" v-if="showConfirmAlert">
					<p>{{ confirmAlertMessage }}</p>

					<div class="btns-container mb-4">
						<button class="btn btn-success" :class="{ 'pink-theme-btn': theme.pinkTheme }" @click="deletePhoto">
							<span class="ok">{{ String.fromCodePoint(0x1f44d) }}</span>
						</button>
						<button class="btn btn-dark" :class="{ 'pink-theme-btn-secondary': theme.pinkTheme }" @click="showConfirmAlert = false">
							<span class="no">{{ String.fromCodePoint(0x274c) }}</span>
						</button>
					</div>
				</div>

				<!-- ANTEPRIMA DEL RITAGLIO -->
				<div class="preview-container" v-if="selectedFiles.length && cropPreview">
					<p>{{ languages.loyalityCards.cropMessage }}</p>
					<h3 v-if="showNoNameAlert" class="no-name-red-alert bg-light text-danger rounded">{{ languages.loyalityCards.isctructionText }}</h3>
					<img class="crop-container p-3" ref="cropImageEl" :src="imageUrl" />
				</div>

				<!-- CONTENITORE PREVIEW DELLA TESSERA SELEZIONATA -->
				<div class="preview-container" v-if="showImgPreview && !showConfirmAlert">
					<h3>{{ photoName }}</h3>
					<span class="delete-card hide-card" @click="showImgPreview = false">X</span>
					<img class="preview" :src="imageUrl" />
				</div>

				<!-- CONTENITORE ORDINAMENTO CARTE -->
				<OrderCards :azOrder="az" @changeOrder="viewOrderPhotos" />

				<!-- CONTENITORE DELLE TESSERE SALVATE -->
				<div class="cards-container mt-3" v-if="photos.length">
					<div v-for="photo in photos" :key="photo.id" class="card-name-container-wrapper">
						<span class="delete-card" @click="selectPhotoForDelete(photo.id, photo.name)">
							<img class="trash" src="@/img/icons/trash-red.webp" alt="delete" />
						</span>
						<button class="card-name-container" @click="showPhoto(photo)">
							<span class="card-icon">{{ String.fromCodePoint(0x1f4b3) }}</span>

							<span class="card-name">{{ photo.name }}</span>
						</button>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<style scoped>
.loy-container {
	width: 100%;
	height: 100%;
	border-radius: 0%;
}

.close-icon {
	font-size: 1.875rem;
	position: absolute;
	right: 10px;
	top: 0;
	width: 60px;
	text-align: right;
}

small {
	text-align: center;
}

header {
	display: flex;
	justify-content: center;
	padding: 0.625rem;
	z-index: 20;
}

main {
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	gap: 15px;
	overflow: auto;
	margin-bottom: 10px;
	position: relative;
	width: 100%;
	height: 100%;
}

.input-name {
	text-align: center;
}

.btn-add,
.btn-info {
	width: 230px;
	border: 1px solid;
	text-align: center;
	padding: 3px;
}
.btn-add-selected {
	background-color: #a2a2a2;
}

.btn-info {
	width: 110px;
	padding: 2px;
}

.add {
	font-size: 1.25rem;
	margin-right: 10px;
	border: 2px solid;
	border-radius: 50%;
	padding: 0px 5px;
}

.confirm-delete-alert {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 2px solid;
}
.confirm-delete-alert > p {
	text-align: center;
	font-weight: bold;
}
.btns-container {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
}

.cards-container {
	display: grid;
	grid-template-columns: 150px 150px;
	gap: 18px;
	justify-items: center;
}

.card-name-container-wrapper {
	position: relative;
}

.card-name-container {
	width: 145px;
	display: flex;
	flex-direction: column;
	border: 2px solid;
}

.delete-card,
.hide-card {
	position: absolute;
	top: -15px;
	right: -5px;
	font-size: 1.25rem;
	font-weight: bold;
	color: #ff0000;
	border: 1px solid;
	background-color: #dcdcdc;
	border-radius: 50%;
	padding: 0px 5px;
}

.hide-card {
	right: 1px;
	color: #000000;
}

.card-icon {
	font-size: 2.563rem;
}
.card-name {
	font-size: 1.563rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.preview-container {
	position: relative;
	text-align: center;
	border: 1px solid;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	color: #000000;
	background-color: #ffffff;
}
.preview-container > h3 {
	text-transform: uppercase;
	font-weight: bold;
	padding-top: 0.313rem;
}

.no-name-red-alert {
	position: absolute;
	top: 15%;
	z-index: 20;
}
.preview {
	width: 100%;
	max-height: 300px;
	padding: 15px 0;
}

.crop-container {
	max-width: 100%;
	max-height: 300px;
}
</style>
