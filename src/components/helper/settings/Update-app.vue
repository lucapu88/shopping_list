<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useSettingsStore } from "@/store/SettingsStore";
</script>

<script>
export default {
	emits: ["updatingAppEmit"],
	data() {
		return {
			languages: useLanguageStore(),
			settings: useSettingsStore(),
		};
	},
	methods: {
		updateApp() {
			/*dato che per aggiornare l'app basta riavviare la pagina, essendo un app la rendo più carina,
        e faccio si che ogni mese l'utente può farlo, in modo da avere sempre l'app aggiornata.*/
			const d = new Date();
			const month = d.getMonth();
			const year = d.getFullYear();
			window.localStorage.setItem("lastMonth", month);
			window.localStorage.setItem("lastYear", year);
			this.$emit("updatingAppEmit", true);
			// const range = Math.random() * (1500 - 3500) + 1500;
			setTimeout(() => {
				location.reload();
			}, 2500);
		},
	},
};
</script>

<template>
	<div class="share-update helper-settings">
		<span class="settings-icon me-1"> &#x2699; </span>
		<span :class="{ 'english-size': languages.langEnglish }"> {{ languages.updateText.description }}: </span>
		<div class="update-container">
			<button
				:disabled="languages.updateText.updated"
				id="update"
				:class="{
					'ready-for-update': !languages.updateText.updated,
				}"
				class="btn btn-light border-dark me-3 share-update-btn"
				@click="updateApp()"
			>
				<span>{{ !languages.updateText.updated ? languages.updateText.available : languages.updateText.unavailable }}</span>
			</button>
			<!-- <small v-if="!languages.updateText.updated">
        {{ languages.updateText.available }}
      </small>
      <small v-if="languages.updateText.updated">
        {{ languages.updateText.unavailable }}
      </small> -->
		</div>
	</div>
</template>

<style scoped>
.update-container {
	text-align: center;
}

.ready-for-update {
	background-color: #28a745 !important;
}
</style>
