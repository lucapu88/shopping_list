<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { dbPromise } from "@/server/db.js";
import { ref, onMounted, onUnmounted } from "vue";

const theme = useThemeStore();
const languages = useLanguageStore();
const secondTodos = useSecondTodoStore();
const isChristmas = useChristmasStore();
const imageName = ref("");
const photos = ref([]);
const imageUrl = ref(null);
let objectUrl = null;

onMounted(loadPhotos);

async function savePhotos(event) {
	const files = Array.from(event.target.files);
	if (!files.length || !imageName.value) return;

	const db = await dbPromise;

	let index = 1;

	for (const file of files) {
		await db.put("photos", {
			id: crypto.randomUUID(),
			name: files.length > 1 ? `${imageName.value}_${index++}` : imageName.value,
			blob: file,
			createdAt: Date.now(),
		});
	}

	imageName.value = "";
	event.target.value = null;

	await loadPhotos();
}

async function loadPhotos() {
	const db = await dbPromise;
	photos.value = await db.getAll("photos");
}

function showPhoto(photo) {
	if (objectUrl) {
		URL.revokeObjectURL(objectUrl);
	}

	objectUrl = URL.createObjectURL(photo.blob);
	imageUrl.value = objectUrl;
}

onUnmounted(() => {
	if (objectUrl) {
		URL.revokeObjectURL(objectUrl);
	}
});
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			languages: useLanguageStore(),
			secondTodos: useSecondTodoStore(),
			isChristmas: useChristmasStore(),
			scanner: null,
			photos: [],
			imageUrl: null,
			objectUrl: null,
		};
	},
	mounted() {},
	methods: {
		close() {
			this.secondTodos.loyaltyCardsVisible = false;
		},
	},
	beforeUnmount() {
		if (this.objectUrl) {
			URL.revokeObjectURL(this.objectUrl);
		}
	},
};
</script>

<template>
	<div class="modal pt-0">
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
			<header>
				<h3>{{ languages.loyalityCards.title }}</h3>
				<p class="close-helper" @click="secondTodos.loyaltyCardsVisible = false">X</p>
			</header>
			<main>
				<small v-if="!imageName">{{ languages.loyalityCards.isctructionText }}</small>

				<input class="input-name" :class="{ 'arrotonda-sto-bordo': !theme.retroTheme }" v-model="imageName" type="text" :placeholder="languages.loyalityCards.nameInputPlaceholder" />

				<label class="btn-add" :class="{ 'arrotonda-sto-bordo': !theme.retroTheme }">
					<span>{{ languages.loyalityCards.functionText }}</span> <span class="add"> + </span>
					<input type="file" accept="image/*" multiple @change="savePhotos" :disabled="!imageName" hidden />
				</label>

				<div class="cards-container" v-if="photos.length">
					<button v-for="photo in photos" :key="photo.id" class="card-name" @click="showPhoto(photo)">
						<span class="card-icon">{{ String.fromCodePoint(0x1f4b3) }}</span>

						<span>{{ photo.name }}</span>
					</button>
				</div>

				<img class="preview" v-if="imageUrl" :src="imageUrl" />
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

.close-helper {
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
}

main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
}

.input-name {
	text-align: center;
}

.btn-add {
	width: 230px;
	border: 1px solid;
	text-align: center;
}

.add {
	font-size: 1.25rem;
	margin-right: 10px;
	border: 2px solid;
	border-radius: 50%;
	padding: 0px 5px;
}

.cards-container {
	display: grid;
	grid-template-columns: 120px 120px 120px;
	gap: 10px;
	justify-items: center;
}

.card-name {
	width: 100px;
	display: flex;
	flex-direction: column;
}

.card-icon {
	font-size: 1.563rem;
}

.preview {
	width: 100%;
	max-height: 300px;
}
</style>
