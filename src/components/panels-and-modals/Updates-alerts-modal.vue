<script setup>
/*
    Questo componente viene usato quando ci sono cambiamenti che modificano la logica già esistente nell'app, 
    e quindi bisogna avvisare l'utente che già la usa (non il nuovo utente) che un comportamento è cambiato rispetto a come la usava prima.
*/
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";

const theme = useThemeStore();
const languages = useLanguageStore();
const settings = useSettingsStore();
const emit = defineEmits(["understand"]);

function understandSelected() {
	// 👇👇👇👇👇👇👇 OCCHIO EH! 👇👇👇👇👇👇👇👇
	// Quando cambi tipologia di aggiornamento modifica la chiave dentro readNewUpdates() nel SettingsStore.js
	settings.readNewUpdates();
	emit("understand", true);
}
</script>

<template>
	<div class="modal">
		<div
			class="modal-container text-center p-3"
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
			<h2 class="text-danger">{{ languages.alertMessageTitle }}:</h2>

			<!-- Non ho inserito le traduzioni nel file LanguageStore.js perchè queste sono temporanee e poi verranno rimosse una volta che ne usciranno di nuove. -->
			<template v-if="languages.langIta">
				<p>Da adesso in poi, se vuoi selezionare un prodotto come <span class="active px-1">importante</span> dovrai fare uno scorrimento verso sinistra sul nome (swipe-left).</p>
			</template>

			<template v-if="languages.langSpanish">
				<p>A partir de ahora, si deseas seleccionar un producto como <span class="active px-1">importante</span> tendrás que deslizar el dedo hacia la derecha sobre el nombre (swipe-left).</p>
			</template>

			<template v-if="languages.langFrench">
				<p>Désormais, si vous souhaitez sélectionner un produit comme <span class="active px-1">important</span>, vous devrez glisser vers la droite sur le nom (swipe-left).</p>
			</template>

			<template v-if="languages.langEnglish">
				<p>From now on, if you want to select a product as <span class="active px-1">important</span> you will have to swipe left on the name.</p>
			</template>

			<!-- QUANDO LA CANCELLI, ELIMINALA ANCHE DALLA CARTELLA IMG -->
			<img style="width: 95%; margin-bottom: 20px" src="@/img/markTutorial.gif" alt="mark-as-important-gif-tutorial" />

			<button id="understand" @click="understandSelected">
				{{ languages.understandText }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.modal {
	z-index: 800;
}

.modal-container {
	position: absolute;
	width: 96%;
	left: 2%;
}
</style>
