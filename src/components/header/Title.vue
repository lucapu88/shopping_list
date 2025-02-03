<script setup>
import { useChristmasStore } from "@/store/ChristmasStore";
import { useOthersFestivitiesStore } from "@/store/OthersFestivitiesStore";
import { useLanguageStore } from "@/store/LanguageStore";
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			isChristmas: useChristmasStore(),
			festivities: useOthersFestivitiesStore(),
			languages: useLanguageStore(),
			settings: useSettingsStore(),
			addTodo: useTodoStore(),
		};
	},
	methods: {
		openDevPanel() {
			if (this.settings.isAndroid) {
				return;
			}
			if (this.settings.isIphone && !this.settings.isAndroid) {
				this.addTodo.secondList = !this.addTodo.secondList;
			}
		},
	},
};
</script>

<template>
	<div class="title-container">
		<h1
			class="title text-center"
			:class="{
				'happy-new-year': festivities.newYear,
				'christmas-title': isChristmas.christmasTheme,
				'dark-theme-title': theme.darkTheme,
				'minimal-theme-title': theme.minimalTheme,
				'retro-theme-title': theme.retroTheme,
				'elegant-theme-title': theme.elegantTheme,
				'title-spanish': languages.langSpanish,
				'title1-spanish': languages.langSpanish,
			}"
			@click="openDevPanel()"
		>
			<template v-if="!addTodo.secondList">
				<template v-if="festivities.newYear">
					{{ languages.newYearText }}
				</template>
				<template v-else>
					{{ languages.shoppingListTitle }}
				</template>
			</template>
			<template v-else> Todo List </template>
		</h1>
		<img class="cart slide-cart" src="@/img/carrello-spesa.webp" alt="carrello" />
		<img class="cart slide-cart-infinity" src="@/img/carrello-spesa.webp" alt="carrello" />
	</div>
</template>

<style scoped>
.title-container {
	display: flex;
	justify-content: center;
}
.title {
	padding: 0 5px;
	background: -webkit-radial-gradient(circle, #ff0000 0%, #3d0000 80%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	position: relative;
	left: -300px;
	animation-timing-function: ease-out;
	-webkit-animation: slide 3.3s forwards;
	animation: slide 3.3s forwards;
	z-index: 1;
}
@-webkit-keyframes slide {
	100% {
		left: 6%;
	}
}
@keyframes slide {
	100% {
		left: 6%;
	}
}

.happy-new-year {
	color: #fe0000;
	background-image: -webkit-linear-gradient(92deg, #ff8400, #fe3aee);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-animation: hue 2s infinite linear;
}

@-webkit-keyframes hue {
	from {
		-webkit-filter: hue-rotate(0deg);
	}
	to {
		-webkit-filter: hue-rotate(-360deg);
	}
}

.christmas-title {
	z-index: 20;
}

.title-spanish {
	font-size: 1.563rem;
}
.title1-spanish {
	margin-left: -17px;
}

.cart {
	width: 40px;
	height: 40px;
	position: relative;
	left: -270px;
	z-index: 1;
}
.slide-cart {
	-webkit-animation: slideCart 11s forwards;
	animation: slideCart 11s forwards;
	animation-timing-function: ease-out;
}
@-webkit-keyframes slideCart {
	100% {
		transform: translateX(1000px);
	}
}
@keyframes slideCart {
	100% {
		transform: translateX(1000px);
	}
}
.slide-cart-infinity {
	left: -500px;
	animation: slideCartInfinity 13s infinite;
	animation-delay: 3s;
	z-index: 0;
}

@-webkit-keyframes slideCartInfinity {
	100% {
		transform: translateX(800px);
	}
}
@keyframes slideCartInfinity {
	100% {
		transform: translateX(800px);
	}
}
</style>
