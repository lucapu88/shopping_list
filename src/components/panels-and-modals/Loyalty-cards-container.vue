<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";

import { Html5Qrcode } from "html5-qrcode";
import { dbPromise } from "@/server/db.js";
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
	mounted() {
		this.loadCards();
	},
	methods: {
		startScan() {
			this.scanner = new Html5Qrcode("reader");

			this.scanner.start(
				{ facingMode: "environment" },
				{
					fps: 10,
					qrbox: { width: 250, height: 120 },
				},
				(decodedText) => {
					// console.log("Codice letto:", decodedText);
					this.stopScan();
					this.saveCard(decodedText);
				},
				() => {}
			);
		},
		stopScan() {
			if (this.scanner) {
				this.scanner.stop().then(() => this.scanner.clear());
			}
		},
		async saveCard(code) {
			const db = await dbPromise;

			await db.put("photos", {
				id: crypto.randomUUID(),
				code,
				blob: file,
				createdAt: Date.now(),
			});
			await this.loadCards();
		},
		async loadCards() {
			const db = await dbPromise;
			this.cards = await db.getAll("photos");
		},
		// async savePhotos(event) {
		// 	const files = Array.from(event.target.files);
		// 	if (!files.length) return;

		// 	const db = await dbPromise;

		// 	for (const file of files) {
		// 		await db.put("photos", {
		// 			id: crypto.randomUUID(),
		// 			name: file.name,
		// 			blob: file,
		// 			createdAt: Date.now(),
		// 		});
		// 	}

		// 	await this.loadPhotos();
		// },
		// async loadPhotos() {
		// 	const db = await dbPromise;
		// 	this.photos = await db.getAll("photos");
		// },
		showPhoto(photo) {
			if (this.objectUrl) {
				URL.revokeObjectURL(this.objectUrl);
			}

			this.objectUrl = URL.createObjectURL(photo.blob);
			imageUrl = this.objectUrl;
		},
		close() {
			this.stopScan();
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
				<p class="close-helper" @click="close()">X</p>
			</header>
			<main>
				<button class="btn-add" @click="startScan()">
					<span>{{ languages.loyalityCards.functionText }}</span> <span class="add"> + </span>
				</button>
				<div id="reader" style="width: 100%; max-width: 320px"></div>
				<div>
					<!-- Lista immagini -->
					<ul v-if="photos.length">
						<li v-for="photo in photos" :key="photo.id">
							<button @click="showPhoto(photo)">
								{{ photo.name }}
							</button>
						</li>
					</ul>

					<!-- Preview -->
					<img v-if="imageUrl" :src="imageUrl" class="preview" />
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

.close-helper {
	font-size: 1.875rem;
	position: absolute;
	right: 10px;
	top: 0;
	width: 60px;
	text-align: right;
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
}

.btn-add {
	width: 230px;
}

.add {
	font-size: 1.25rem;
	margin-right: 10px;
	border: 2px solid;
	border-radius: 50%;
	padding: 0px 5px;
}
</style>
