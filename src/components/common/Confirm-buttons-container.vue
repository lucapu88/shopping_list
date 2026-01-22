<script setup></script>

<script>
export default {
	emits: ["yesSelected", "noSelected"],
	data() {
		return {};
	},
	methods: {
		emitYes() {
			this.$emit("yesSelected", true);
		},
		emitNo() {
			this.$emit("noSelected", true);
		},
	},
};
</script>

<template>
	<button class="btn btn-success" id="confirm-backup" @click="emitYes()">
		<span class="ok">{{ String.fromCodePoint(0x1f44d) }}</span>
	</button>
	<button class="btn btn-dark" @click="emitNo()">
		<span class="no">{{ String.fromCodePoint(0x274c) }}</span>
	</button>
</template>

<style scoped>
button {
	margin-left: 0.625rem;
}

.btn-dark {
	border: 2px solid #000000;
}
</style>
