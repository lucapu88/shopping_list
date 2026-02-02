<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useOthersFestivitiesStore } from "@/store/festivities/OthersFestivitiesStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";

import cancellaPreload from "@/img/cancella.webp";
import marePreload from "@/img/mare.webp";
import mareTabletPreload from "@/img/mare-tablet.webp";
import ondeMare from "@/img/loyalty-cards/onde-mare.webp";
import montagnePreload from "@/img/montagne.webp";
import montagneTabletPreload from "@/img/montagne-tablet.webp";
import snowman from "@/img/loyalty-cards/snowman.webp";
import strawberries from "@/img/loyalty-cards/strawberries.webp";
import DragDropElegant from "@/img/icons/drag-and-drop-elegant.webp";
import copyElegant from "@/img/icons/copy-elegant.webp";
import importantElegant from "@/img/icons/important-elegant.webp";
import DragDropPanter from "@/img/icons/drag-and-drop-panter.webp";
import copyPanter from "@/img/icons/copy-panter.webp";
import importantPanter from "@/img/icons/important-panter.webp";
import pantherEyes from "@/img/loyalty-cards/panther-eyes.webp";
import lemon from "@/img/lemon-send.webp";
import leaves from "@/img/foglie.webp";
import limoncello from "@/img/loyalty-cards/limoncello.webp";
import leotta from "@/img/jeans-zip.webp";
import levisMio from "@/img/jeans-mio.webp";
import jeansIle from "@/img/jeans-ile.webp";
import jeansTasca from "@/img/jeans-tasca-culo.webp";

import merryChristmas from "@/img/festivities/christmas.webp";
import christmasSkull from "@/img/icons/christmas-skull.webp";
import garland from "@/img/festivities/ghirlanda.webp";

import shareBackgr from "@/img/shared.webp";
import eyeClosed from "@/img/icons/eye-close.webp";
import eyeOpen from "@/img/icons/eye-open.webp";

import okIcon from "@/img/icons/ok.webp";
import closeIcon from "@/img/icons/close.webp";
import loyaltyCard from "@/img/icons/loy-card.webp";
import gooniesMap from "@/img/loyalty-cards/goonies-map.webp";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			festivitiesOrOccurrences: useOthersFestivitiesStore(),
			isChristmas: useChristmasStore(),
			settings: useSettingsStore(),
			todosStore: useTodoStore(),
			languages: useLanguageStore(),
			secondTodosStore: useSecondTodoStore(),
		};
	},
};
</script>
<!--  -------------------------------I PRELOAD PRINCIPALI SONO NELL'HEAD DELL'INDEX.HTML ------------------------------------- -->
<template>
	<!-- --------------------------------preload delle immagini in base ai temi------------------------- -->
	<link v-if="theme.lightTheme" rel="preload" as="image" :href="cancellaPreload" />
	<link v-if="theme.lightTheme" rel="preload" as="image" :href="gooniesMap" />

	<link v-if="theme.summerTheme" rel="preload" as="image" :href="marePreload" />
	<link v-if="theme.summerTheme" rel="preload" as="image" :href="mareTabletPreload" />
	<link v-if="theme.summerTheme" rel="preload" as="image" :href="ondeMare" />

	<link v-if="theme.winterTheme" rel="preload" as="image" :href="montagnePreload" />
	<link v-if="theme.winterTheme" rel="preload" as="image" :href="montagneTabletPreload" />
	<link v-if="theme.winterTheme" rel="preload" as="image" :href="snowman" />

	<link v-if="theme.pinkTheme" rel="preload" as="image" :href="strawberries" />

	<link v-if="theme.jeansTheme" rel="preload" as="image" :href="leotta" />
	<link v-if="theme.jeansTheme" rel="preload" as="image" :href="levisMio" />
	<link v-if="theme.jeansTheme" rel="preload" as="image" :href="jeansIle" />
	<link v-if="theme.jeansTheme" rel="preload" as="image" :href="jeansTasca" />

	<!-- --------------------------------preload delle icone in base ai temi------------------------- -->

	<link v-if="theme.elegantTheme" rel="preload" as="image" :href="DragDropElegant" />
	<link v-if="theme.elegantTheme" rel="preload" as="image" :href="copyElegant" />
	<link v-if="theme.elegantTheme" rel="preload" as="image" :href="importantElegant" />

	<link v-if="theme.panterTheme" rel="preload" as="image" :href="DragDropPanter" />
	<link v-if="theme.panterTheme" rel="preload" as="image" :href="copyPanter" />
	<link v-if="theme.panterTheme" rel="preload" as="image" :href="importantPanter" />
	<link v-if="theme.panterTheme" rel="preload" as="image" :href="pantherEyes" />

	<link v-if="theme.lemonTheme" rel="preload" as="image" :href="lemon" />
	<link v-if="theme.lemonTheme" rel="preload" as="image" :href="leaves" />
	<link v-if="theme.lemonTheme" rel="preload" as="image" :href="limoncello" />

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
	<link v-if="settings.isIphone" rel="preload" as="image" :href="loyaltyCard" />
</template>
