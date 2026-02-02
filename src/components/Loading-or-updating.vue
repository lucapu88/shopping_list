<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useSecondTodoStore } from "@/store/SecondTodoStore";
</script>

<script>
export default {
	props: {
		themeLoading: Boolean,
		updating: Boolean,
		backup: Boolean,
		listImportedOrDeleted: Boolean,
		languageChanged: String,
		listChanged: Boolean,
	},
	data() {
		return {
			theme: useThemeStore(),
			secondTodosStore: useSecondTodoStore(),
		};
	},
};
</script>

<template>
	<!-- CONTAINER LOADING -->
	<div
		v-if="themeLoading || backup || languageChanged || listImportedOrDeleted || listChanged"
		id="loading-themes-container"
		:class="{
			'zoom-animation': !listImportedOrDeleted && !listChanged,
			'zoom-animation-small': listImportedOrDeleted || listChanged,
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
		<!-- Scritta di caricamento di qualsiasi cosa tranne per le liste importate, cancellate o cambio lista -->
		<img v-if="!listImportedOrDeleted && !listChanged" src="@/img/Loading.webp" loading="lazy" alt="loading" />

		<!-- Caricamento classico -->
		<img v-if="!languageChanged && !backup && !listImportedOrDeleted && !listChanged" src="@/img/favicon.webp" loading="lazy" alt="loading" />

		<!-- Caricamento in caso di lista cancellata o importata -->
		<img style="margin-top: 25%" v-if="listImportedOrDeleted && !languageChanged && !backup && !listChanged" src="@/img/LOAD.webp" loading="lazy" alt="loading" />

		<!-- Caricamento al cambio lista -->
		<img style="margin-top: 30%" v-if="listChanged && !listImportedOrDeleted && !languageChanged && !backup" src="@/img/Loading-list.webp" loading="lazy" alt="loading_list" />

		<!-- Caricamento quando si effettua un backup -->
		<div v-if="backup && !listImportedOrDeleted && !listChanged" class="backup-container gelatine">
			<img src="@/img/icons/cloud.webp" loading="lazy" alt="backup_loading" />
		</div>

		<!-- Caricamento al cambio lingua -->
		<div v-if="languageChanged" class="flags-container">
			<img v-if="languageChanged === 'english'" class="language-spinner" src="@/img/flags/inglese.webp" loading="lazy" alt="english_flag" />
			<img v-if="languageChanged === 'spanish'" class="language-spinner" src="@/img/flags/spagnolo.webp" loading="lazy" alt="spanish_flag" />
			<img v-if="languageChanged === 'italian'" class="language-spinner" src="@/img/flags/italiano.webp" loading="lazy" alt="italian_flag" />
			<img v-if="languageChanged === 'french'" class="language-spinner" src="@/img/flags/francese.webp" loading="lazy" alt="italian_flag" />
		</div>
	</div>

	<!-- CONTAINER LOADING UPDATE APP -->
	<div v-if="updating" id="updating-container">
		<img src="@/img/update-img.webp" loading="lazy" alt="loading" />
		<h2 class="category-emoji-selected updating-text">..DOWNLOAD..</h2>
	</div>
</template>

<style scoped>
#loading-themes-container,
#updating-container {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	padding: 0.625rem;
	background-size: contain;
	z-index: 450;
	background-color: #ffffff;
	color: #b5db6f;
	text-align: center;
	font-family: Verdana, sans-serif;
}

.zoom-animation > img:first-child {
	margin-top: 30%;
	width: 75%;
	animation: zoominoutsinglefeatured 1s infinite;
}
#loading-themes-container > img:last-child {
	width: 100%;
}
@keyframes zoominoutsinglefeatured {
	0% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1.2, 1.3);
	}
	100% {
		transform: scale(1, 1);
	}
}

.zoom-animation-small {
	animation: zoominoutSmall 1s infinite;
}
@keyframes zoominoutSmall {
	0% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1.1, 1.2);
	}
	100% {
		transform: scale(1, 1);
	}
}

#updating-container > img {
	margin-top: 35%;
	width: 100%;
	-webkit-text-fill-color: transparent;
	position: relative;
	left: -300px;
	-webkit-animation: slideDino 3.5s forwards;
	animation: slideDino 3.5s forwards;
	z-index: 1;
}
@-webkit-keyframes slideDino {
	50% {
		left: 0;
	}
	100% {
		left: 500px;
	}
}
@keyframes slideDino {
	50% {
		left: 0;
	}
	100% {
		left: 500px;
	}
}
.updating-text {
	font-weight: bold;
}

.flags-container,
.backup-container {
	margin-top: 30%;
}
.backup-container > img {
	width: 85vw;
}
.gelatine {
	animation: gelatine 0.5s infinite;
}
@keyframes gelatine {
	from,
	to {
		transform: scale(1, 1);
	}
	25% {
		transform: scale(0.9, 1.1);
	}
	50% {
		transform: scale(1.1, 0.9);
	}
	75% {
		transform: scale(0.95, 1.05);
	}
}
.flags-container > img {
	width: 200px;
}
.language-spinner {
	animation: spin 1s infinite;
}
@keyframes spin {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(359deg);
	}
}

@media (min-width: 700px) {
	.flags-container,
	.backup-container {
		margin-top: 5%;
	}
	.backup-container > img {
		width: 50vw;
	}
	.zoom-animation > img:first-child {
		margin-top: 5%;
		max-width: 500px;
		animation: zoominoutsinglefeatured 1s infinite;
	}
	#loading-themes-container > img:last-child {
		max-width: 850px;
	}
	#updating-container > img {
		margin-top: 0;
		max-width: 850px;
		-webkit-animation: slideDino 3.5s forwards;
		animation: slideDino 3.5s forwards;
	}
	@-webkit-keyframes slideDino {
		50% {
			left: 0;
		}
		100% {
			left: 1000px;
		}
	}
	@keyframes slideDino {
		50% {
			left: 0;
		}
		100% {
			left: 1000px;
		}
	}
}
</style>
