<script setup>
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";

import merryChristmas from "@/img/festivities/christmas.webp";
import christmasSkull from "@/img/icons/christmas-skull.webp";
import garland from "@/img/festivities/ghirlanda.webp";

import shareBackgr from "@/img/shared.webp";
import eyeClosed from "@/img/icons/eye-close.webp";
import eyeOpen from "@/img/icons/eye-open.webp";

import okIcon from "@/img/icons/ok.webp";
import closeIcon from "@/img/icons/close.webp";
</script>

<script>
export default {
	data() {
		return {
			isChristmas: useChristmasStore(),
			settings: useSettingsStore(),
			todosStore: useTodoStore(),
		};
	},
};
</script>

<template>
	<!-- --------------------------------preload di altre immagini/icone in base alle festività--------------------- -->
	<template v-if="isChristmas.christmasTheme">
		<link rel="preload" as="image" :href="merryChristmas" />
		<link rel="preload" as="image" :href="christmasSkull" />
		<link rel="preload" as="image" :href="garland" />
	</template>

	<!-- -----------------------------------------------------------preload dell'helper---------------------------- -->
	<link v-if="settings.helper" rel="preload" as="image" :href="shareBackgr" />

	<!-- -----------------------------------------------------------altri preload---------------------------- -->
	<link v-if="todosStore.canDeleteMultipleTodo" rel="preload" as="image" :href="okIcon" />
	<link v-if="todosStore.canDeleteMultipleTodo" rel="preload" as="image" :href="closeIcon" />
	<link v-if="todosStore.canDeleteMultipleTodo" rel="preload" as="image" :href="eyeClosed" />
	<link v-if="todosStore.canDeleteMultipleTodo" rel="preload" as="image" :href="eyeOpen" />
</template>
