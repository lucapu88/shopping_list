<script setup>
import { useThemeStore } from "@/store/ThemeStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { computed } from "vue";

const props = defineProps({
	multipleDelete: {
		type: Boolean,
		default: false,
	},
	extraClasses: {
		type: [String, Array, Object],
		default: "",
	},
});
const emit = defineEmits(["ok", "no"]);
const theme = useThemeStore();
const settings = useSettingsStore();

const classes = computed(() => ({
	"multiple-delete": props.multipleDelete,
	"left-25": !settings.isIphone,
	"left-35": settings.isIphone,
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
}));
</script>

<template>
	<div class="confirm-deselect-all-container deselect-all p-2" :class="[classes, extraClasses]">
		<button class="btn btn-success rounded btn-sm confirm-undo-button" @click="emit('ok')">
			<img class="confirm-deselect-all" src="@/img/icons/ok.webp" alt="ok" />
		</button>
		<button class="btn btn-danger rounded btn-sm confirm-undo-button" @click="emit('no')">
			<img class="undo" src="@/img/icons/close.webp" alt="X" />
		</button>
	</div>
</template>

<style scoped>
.confirm-deselect-all-container > button {
	width: 45px;
}

.left-25 {
	left: 25%;
}
.left-35 {
	left: 35%;
}
</style>
