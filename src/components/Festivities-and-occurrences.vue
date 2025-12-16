<script setup>
import { useLanguageStore } from "@/store/LanguageStore";
import { useOthersFestivitiesStore } from "@/store/festivities/OthersFestivitiesStore";
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import beerpour from "@/sounds/beerpour.mp3";
import toilet from "@/sounds/toilet.mp3";
</script>

<script>
export default {
	data() {
		return {
			festivitiesOrOccurrences: useOthersFestivitiesStore(),
			christmas: useChristmasStore(),
			languages: useLanguageStore(),
			description: false,
		};
	},
	mounted() {
		if (this.festivitiesOrOccurrences.worldPeaceDay) {
			//In questo caso è il primo dell'anno nuovo e faccio apparire per qualche secondo la scritta buon anno al posto del titolo
			setTimeout(() => {
				this.festivitiesOrOccurrences.newYear = true;
			}, 4000);
			setTimeout(() => {
				this.festivitiesOrOccurrences.newYear = false;
			}, 14000);
		}
	},
	methods: {
		showDescription() {
			this.christmas.merryChristmasTheme(); //TOFIX: da rimuovere se non serve più
			this.festivitiesOrOccurrences.checkFestivities(); //TOFIX: da rimuovere se non serve più
			this.description = true;
			setTimeout(() => {
				this.description = false;
			}, 2500);
		},
		audioPlay() {
			const audioPlayer = this.$refs.audioPlayer;
			audioPlayer.load();
			if (audioPlayer.paused || audioPlayer.ended) {
				audioPlayer.play();
			} else {
				audioPlayer.pause();
				audioPlayer.currentTime = 0;
			}
		},
	},
};
</script>

<template>
	<div class="fest-occur-container" @click="showDescription()">
		<!-- ---------------------------------------------------------------------GIORNATA MONDIALE CANCRO -->
		<img v-if="festivitiesOrOccurrences.worldCancerDay && !description" class="cancer-day" src="@/img/festivities/cancer-logo.webp" alt="cancer_day" />
		<p v-if="festivitiesOrOccurrences.worldCancerDay && description" class="description">
			{{ languages.cancerDayText }}
		</p>
		<!-- ---------------------------------------------------------------------GIORNATA MONDIALE PACE -->
		<img v-if="festivitiesOrOccurrences.worldPeaceDay && !description" class="peace-day" src="@/img/festivities/pace.webp" alt="peace_day" />
		<p class="description peace-day-text" v-if="festivitiesOrOccurrences.worldPeaceDay && description">
			{{ languages.peaceDayText }}
		</p>
		<!-- ---------------------------------------------------------------------FESTA DELLA DONNA -->
		<img v-if="festivitiesOrOccurrences.womensDay && !description" class="womens-day" src="@/img/festivities/mimose.webp" alt="womens_day" />
		<p class="description" v-if="festivitiesOrOccurrences.womensDay && description">
			{{ languages.womensDayText }}
		</p>
		<!-- ---------------------------------------------------------------------GIORNO DELLA MEMORIA -->
		<img v-if="festivitiesOrOccurrences.HolocaustMemorialDay && !description" class="shoah-day" src="@/img/festivities/shoah.webp" alt="holocaust_day" />
		<p class="description" v-if="festivitiesOrOccurrences.HolocaustMemorialDay && description">
			{{ languages.shoahText }}
		</p>
		<!-- ---------------------------------------------------------------------GIORNATA DELLA TERRA -->
		<img v-if="festivitiesOrOccurrences.earthDay && !description" class="earth-day" src="@/img/festivities/eart.webp" alt="earth_day" />
		<p class="description" v-if="festivitiesOrOccurrences.earthDay && description">
			{{ languages.earthDayText }}
		</p>
		<!-- ---------------------------------------------------------------------GIORNATA DELLA BIRRA -->
		<img v-if="festivitiesOrOccurrences.beerDay && !description" class="beer-day" src="@/img/festivities/beer.webp" alt="beer_day" @click="audioPlay()" />
		<p class="description" v-if="festivitiesOrOccurrences.beerDay && description">
			{{ languages.beerDayText }}
		</p>
		<!-- ---------------------------------------------------------------------FESTA DEI GENITORI -->
		<img v-if="festivitiesOrOccurrences.parentsDay && !description" class="parents-day" src="@/img/festivities/genitori.webp" alt="parents_day" />
		<p class="description" v-if="festivitiesOrOccurrences.parentsDay && description">
			{{ languages.parentsDayText }}
		</p>
		<!-- --------------------------------------------------FESTA DEL GABINETTO (Scusate ma è divertente e assurda come festa)-->
		<img v-if="festivitiesOrOccurrences.toiletDay && !description" class="toilet-day" src="@/img/festivities/cesso.webp" alt="toilet_day" @click="audioPlay()" />
		<p class="description" v-if="festivitiesOrOccurrences.toiletDay && description">
			{{ languages.toiletDayText }}
		</p>
		<!-- ---------------------------------------------------------- NASCITA DI INTERNET-->
		<img v-if="festivitiesOrOccurrences.internetDay && !description" class="internet-day" src="@/img/festivities/computer.webp" alt="internet_day" />
		<p class="description" v-if="festivitiesOrOccurrences.internetDay && description">
			{{ languages.worldWideWebText }}
		</p>
		<!-- ---------------------------------------------------------- GIORNATA DELLA PIZZAAAAAA-->
		<img v-if="festivitiesOrOccurrences.worldPizzaDay && !description" class="pizza-day" src="@/img/festivities/pizza.webp" alt="pizza_day" />
		<p class="description" v-if="festivitiesOrOccurrences.worldPizzaDay && description">
			{{ languages.worldPizzaDayText }}
		</p>
		<!-- ---------------------------------------------------------- SAN VALENTINO-->
		<img v-if="festivitiesOrOccurrences.valentinesDay && !description" class="valentines-day" src="@/img/festivities/cupido.webp" alt="valentine'valentines_day" />
		<p class="description" v-if="festivitiesOrOccurrences.valentinesDay && description">
			{{ languages.valentinesDayText }}
		</p>
		<!-- ---------------------------------------------------------- GIORNATA DELL'AMBIENTE-->
		<img v-if="festivitiesOrOccurrences.worldEnvironmentDay && !description" class="environment-day" src="@/img/festivities/plant.webp" alt="environment_day" />
		<p class="description" v-if="festivitiesOrOccurrences.worldEnvironmentDay && description">
			{{ languages.worldEnvironmentDayText }}
		</p>
		<!-- ---------------------------------------------------------- GIORNATA DEI DIRITTI UMANI-->
		<img v-if="festivitiesOrOccurrences.humanRightsDayText && !description" class="humans-rights-day" src="@/img/festivities/humans-rights.webp" alt="humans-rights_day" />
		<p class="description" v-if="festivitiesOrOccurrences.humanRightsDayText && description">
			{{ languages.humanRightsDayText }}
		</p>
		<!-- ---------------------------------------------------------- NASCITA DI STAR WARS -->
		<img v-if="festivitiesOrOccurrences.starWarsDay && !description" class="star-wars-day" src="@/img/festivities/millenium-falcon.webp" alt="star-wars_day" />
		<p class="description" v-if="festivitiesOrOccurrences.starWarsDay && description">
			{{ languages.starWarsDay }}
		</p>
	</div>
	<audio v-if="festivitiesOrOccurrences.beerDay" ref="audioPlayer" :src="beerpour" preload="auto"></audio>
	<audio v-if="festivitiesOrOccurrences.toiletDay" ref="audioPlayer" :src="toilet" preload="auto"></audio>
</template>

<style scoped>
.fest-occur-container {
	width: 20%;
	height: 6%;
	position: absolute;
	top: 5px;
	left: 5px;
	z-index: 205;
}

.cancer-day {
	width: 25px;
	margin-left: 0.625rem;
}

.peace-day {
	width: 55px;
}

.womens-day {
	width: 45px;
	height: 60px;
}

.shoah-day,
.environment-day {
	height: 45px;
}

.earth-day,
.pizza-day {
	width: 55px;
	-webkit-animation: spin 3s linear;
	-moz-animation: spin 3s linear;
	animation: spin 3s linear;
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

.beer-day {
	width: 60px;
	height: 55px;
}

.parents-day {
	width: 60px;
	height: 45px;
}

.toilet-day {
	width: 50px;
}

.internet-day {
	width: 55px;
}

.valentines-day {
	width: 70px;
	height: 60px;
}

.humans-rights-day {
	width: 95px;
}
.star-wars-day {
	width: 45px;
	animation: halfSpin 3s linear;
}

@keyframes halfSpin {
	50% {
		-webkit-transform: rotate(95deg);
		transform: rotate(95deg);
		margin-left: 0.9375rem;
	}
	100% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
		margin-left: 0;
	}
}

.description {
	font-family: sans-serif;
	font-size: 0.813rem;
	width: 35ch;
	padding: 10px;
	position: absolute;
	color: #db0505;
	background-color: rgba(255, 255, 255, 0.758);
	font-weight: bold;
	border-radius: 10px;
	text-transform: uppercase;
	text-shadow: 0px 1px 23px rgba(255, 255, 255, 0.8);
}
</style>
