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
				<p>Da adesso in poi, se clicchi sul nome del prodotto in lista <span class="line-through">lo smarcherai</span></p>
				<p>Mentre se vuoi selezionarlo come <span class="active px-1">importante</span> dovrai fare un doppio click sul nome</p>
			</template>

			<template v-if="languages.langSpanish">
				<p>De ahora en adelante, si haces clic en el nombre del producto en la lista <span class="line-through">lo desmarcarás</span></p>
				<p>Mientras que si quieres seleccionarlo como <span class="active px-1">importante</span> tendrás que hacer doble clic en el nombre</p>
			</template>

			<template v-if="languages.langFrench">
				<p>Désormais, si vous cliquez sur le nom du produit dans la liste vous <span class="line-through">le désélectionnerez</span></p>
				<p>Tandis que si vous souhaitez le sélectionner comme <span class="active px-1">important</span>, vous devrez double-cliquer sur le nom</p>
			</template>

			<template v-if="languages.langEnglish">
				<p>From now on, if you click on the product name in the list you will <span class="line-through">uncheck it</span></p>
				<p>while if you want to select it as <span class="active px-1">important</span> you will have to double click on the name</p>
			</template>

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
