<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { useTodoStore } from "@/store/TodoStore";
</script>

<script>
export default {
	data() {
		return {
			theme: useThemeStore(),
			settings: useSettingsStore(),
			addTodo: useTodoStore(),
		};
	},
	methods: {
		showHelper() {
			this.settings.openHelper();
			if (this.settings.helper) {
				window.scrollTo(0, 0);
				document.documentElement.style.overflow = "hidden";
				this.addTodo.focusIn = false;
			} else {
				document.documentElement.style.overflow = "auto";
			}
		},
	},
};
</script>

<template>
	<span
		class="helper"
		:class="{
			'helper-selected': settings.helper,
			'helper-deselected': settings.helperInClosing,
			'helper-btn-dark': theme.darkTheme,
		}"
		@click="showHelper()"
	>
		<img class="settings" src="@/img/icons/settings.webp" alt="settings" />
	</span>
</template>

<style scoped>
.helper-selected {
	-webkit-animation: spin 2s linear;
	-moz-animation: spin 2s linear;
	animation: spin 2s linear;
}
@-moz-keyframes spin {
	100% {
		-moz-transform: rotate(360deg);
	}
}
@-webkit-keyframes spin {
	100% {
		-webkit-transform: rotate(360deg);
	}
}
@keyframes spin {
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

.helper-deselected {
	-webkit-animation: reverseSpin 1.5s linear;
	-moz-animation: reverseSpin 1.5s linear;
	animation: reverseSpin 1.5s linear;
}
@-moz-keyframes reverseSpin {
	100% {
		-moz-transform: rotate(-360deg);
	}
}
@-webkit-keyframes reverseSpin {
	100% {
		-webkit-transform: rotate(-360deg);
	}
}
@keyframes reverseSpin {
	100% {
		-webkit-transform: rotate(-360deg);
		transform: rotate(-360deg);
	}
}

.helper {
	position: absolute;
	top: 10px;
	right: 5px;
	border-radius: 50%;
	z-index: 510;
	margin-right: 2%;
}

.helper:hover {
	cursor: pointer;
}

.settings {
	width: 33px;
	z-index: 300;
}
</style>
