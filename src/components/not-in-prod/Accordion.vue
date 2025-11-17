<script setup></script>

<script>
const now = new Date();
let month = now.toLocaleString("it-IT", { month: "long" });
const year = now.getFullYear();
month = month.charAt(0).toUpperCase() + month.slice(1);
const monthYear = `${month} ${year}`;

export default {
	props: {
		title: String,
		content: Array,
	},
	data() {
		return {
			section: false,
			monthYear: monthYear,
		};
	},
	created() {
		this.content.sort((a, b) => {
			const dateA = a[a.length - 1].split("/").reverse().join("-");
			const dateB = b[b.length - 1].split("/").reverse().join("-");
			return new Date(dateA) - new Date(dateB);
		});
	},
	methods: {
		showSection() {
			this.section = !this.section;
		},
		formatDate(dataStr) {
			const [gg, mm, yyyy] = dataStr.split("/").map(Number);
			const data = new Date(yyyy, mm - 1, gg);
			const giorni = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
			const giornoSettimana = giorni[data.getDay()];

			return `${giornoSettimana} ${gg}`;
		},
	},
};
</script>

<template>
	<div
		class="list-title"
		:class="{
			'list-title-selected': section,
			'list-title-deselected': !section,
		}"
		@click="showSection()"
	>
		<span :class="{ 'current-month-year': title === monthYear }"> {{ title }} </span>
		<span
			class="arrow"
			:class="{
				'arrow-selected': section,
				'arrow-deselected': !section,
			}"
		>
			^
		</span>
	</div>
	<transition name="opacity">
		<div v-if="section" class="shopopings-list-container">
			<template v-if="content.length">
				<section v-for="(item, index) in content" :key="index">
					<p class="date">{{ formatDate(item.at(-1)) }}</p>
					<p v-for="(val, i) in item.slice(0, -1)" :key="i">- {{ val }}</p>
				</section>
			</template>
			<section v-else>
				<p>Non ci sono spese per questo mese.</p>
			</section>
		</div>
	</transition>
</template>

<style scoped>
section {
	margin-bottom: 15px;
	border-bottom: 1px solid;
}

.list-title {
	padding: 5px;
	border: 1px solid;
	border-radius: 5px;
	margin-bottom: 5px;
	display: flex;
	justify-content: space-between;
	background-color: #ffffff;
	position: relative;
	z-index: 5;
}

.current-month-year {
	font-weight: bold;
	color: #c70000;
}

.list-title-selected {
	box-shadow: inset 2px 2px 90px -50px rgba(0, 0, 0, 0.85);
}
.list-title-deselected {
	box-shadow: none;
}
.list-title-color {
	background-color: #ededed;
	color: #000000;
}

.arrow {
	width: 1.688rem;
	height: 1.688rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Lucida Console", "Courier New", monospace;
	font-weight: bold;
	border: 2px solid;
	border-radius: 50%;
	font-size: 1.563rem;
	padding-top: 0.625rem;
}

.arrow-selected {
	-webkit-animation: spin 0.5s linear;
	-moz-animation: spin 0.5s linear;
	animation: spin 0.5s linear;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
}
@keyframes spin {
	100% {
		-webkit-transform: rotate(-180deg);
		transform: rotate(-180deg);
	}
}

.arrow-deselected {
	-webkit-animation: reverseSpin 0.5s linear;
	-moz-animation: reverseSpin 0.5s linear;
	animation: reverseSpin 0.5s linear;
}
@keyframes reverseSpin {
	from {
		-webkit-transform: rotate(-180deg);
		transform: rotate(-180deg);
	}
	to {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}

p {
	margin-bottom: 0;
}

.date {
	font-weight: bold;
	color: #a00000;
}

.opacity-enter-active {
	animation: opacity1 1s ease-in forwards;
}
.opacity-leave-active {
	animation: opacity0 0.5s ease-out forwards;
}

@keyframes opacity1 {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes opacity0 {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>
