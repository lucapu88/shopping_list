<script setup>
import { computed } from "vue";
import { useThemeStore } from "@/store/ThemeStore";

const props = defineProps({
	selected: {
		type: Boolean,
		default: false,
	},
	otherBtnStyle: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	extraClasses: {
		type: [String, Array, Object],
		default: "",
	},
});

const emit = defineEmits(["click"]);

const theme = useThemeStore();

const themeClasses = computed(() => ({
	// classi dei temi
	"minimal-btn": theme.minimalTheme,
	"retro-teme-btns": theme.retroTheme && !props.otherBtnStyle,
	"summer-header-btn": theme.summerTheme,
	"winter-btn": theme.winterTheme,
	"elegant-btn": theme.elegantTheme,
	"pink-theme-btn": theme.pinkTheme,
	"panter-btn": theme.panterTheme,
	"lemon-btn": theme.lemonTheme,
	"jeans-other-btn jeans-font-size": theme.jeansTheme,
	"retro-other-btn": theme.retroTheme && props.otherBtnStyle,

	// classi per selected
	"btn-selected": props.selected,
	"minimal-selected-btn": theme.minimalTheme && props.selected,
	"retro-selected-btn": theme.retroTheme && props.selected,
	"summer-header-btn-selected": theme.summerTheme && props.selected,
	"winter-header-selected-btn": theme.winterTheme && props.selected,
	"elegant-selected-btn": theme.elegantTheme && props.selected,
	"pink-theme-selected-btn": theme.pinkTheme && props.selected,
	"panter-theme-selected-btn": theme.panterTheme && props.selected,
	"lemon-theme-selected-btn": theme.lemonTheme && props.selected,
	"jeans-theme-selected-btn": theme.jeansTheme && props.selected,
}));
</script>

<template>
	<button class="btn custom-show-listbtn" :class="[themeClasses, extraClasses]" :style="`max-width: ${!extraClasses ? '65px' : null}`" :disabled="disabled" @click="emit('click')">
		<slot />
	</button>
</template>

<style scoped>
.custom-show-listbtn {
	min-width: 30px;
	height: 40px;
}

.custom-show-listbtn {
	background-color: rgba(192, 224, 133, 0.883);
	border: 2px solid rgb(180, 230, 89);
	border-radius: 10%;
	padding: 2px;
}

.custom-show-listbtn > img {
	width: 25px;
}
</style>
