<script setup>
import { useLanguageStore } from '@/store/LanguageStore';
import { useOthersFestivitiesStore } from '@/store/OthersFestivitiesStore';
</script>

<script>
export default {
  data() {
    return {
      festivitiesOrOccurrences: useOthersFestivitiesStore(),
      languages: useLanguageStore(),
      description: false,
    };
  },
  methods: {
    showDescription() {
      this.description = true;
      setTimeout(() => {
        this.description = false;
      }, 3000);
      if (this.festivitiesOrOccurrences.toiletDay) {
        const audioPlayer = this.$refs.audioPlayer;
        audioPlayer.volume = 0.4;
        audioPlayer.paused || audioPlayer.ended
          ? audioPlayer.play()
          : audioPlayer.pause();
      }
    },
  },
};
</script>

<template>
  <div class="fest-occur-container" @click="showDescription()">
    <!-- ---------------------------------------------------------------------GIORNATA MONDIALE CANCRO -->
    <img
      v-if="festivitiesOrOccurrences.worldCancerDay && !description"
      class="cancer-day"
      src="@/img/festivities/cancer-logo.webp"
      alt="cancer_day"
    />
    <p
      v-if="festivitiesOrOccurrences.worldCancerDay && description"
      class="description"
    >
      {{ languages.cancerDayText }}
    </p>
    <!-- ---------------------------------------------------------------------GIORNATA MONDIALE PACE -->
    <img
      v-if="festivitiesOrOccurrences.worldPeaceDay && !description"
      class="peace-day"
      src="@/img/festivities/pace.webp"
      alt="peace_day"
    />
    <p
      class="description"
      v-if="festivitiesOrOccurrences.worldPeaceDay && description"
    >
      {{ languages.peaceDayText }}
    </p>
    <!-- ---------------------------------------------------------------------FESTA DELLA DONNA -->
    <img
      v-if="festivitiesOrOccurrences.womensDay && !description"
      class="womens-day"
      src="@/img/festivities/mimose.webp"
      alt="womens_day"
    />
    <p
      class="description"
      v-if="festivitiesOrOccurrences.womensDay && description"
    >
      {{ languages.womensDayText }}
    </p>
    <!-- ---------------------------------------------------------------------GIORNO DELLA MEMORIA -->
    <img
      v-if="festivitiesOrOccurrences.HolocaustMemorialDay && !description"
      class="shoah-day"
      src="@/img/festivities/shoah.webp"
      alt="holocaust_day"
    />
    <p
      class="description"
      v-if="festivitiesOrOccurrences.HolocaustMemorialDay && description"
    >
      {{ languages.shoahText }}
    </p>
    <!-- ---------------------------------------------------------------------GIORNATA DELLA TERRA -->
    <img
      v-if="festivitiesOrOccurrences.earthDay && !description"
      class="earth-day"
      src="@/img/festivities/eart.webp"
      alt="earth_day"
    />
    <p
      class="description"
      v-if="festivitiesOrOccurrences.earthDay && description"
    >
      {{ languages.earthDayText }}
    </p>
    <!-- ---------------------------------------------------------------------GIORNATA DELLA BIRRA -->
    <img
      v-if="festivitiesOrOccurrences.beerDay && !description"
      class="beer-day"
      src="@/img/festivities/beer.webp"
      alt="beer_day"
    />
    <p
      class="description"
      v-if="festivitiesOrOccurrences.beerDay && description"
    >
      {{ languages.beerDayText }}
    </p>
    <!-- ---------------------------------------------------------------------FESTA DEI GENITORI -->
    <img
      v-if="festivitiesOrOccurrences.parentsDay && !description"
      class="parents-day"
      src="@/img/festivities/genitori.webp"
      alt="parents_day"
    />
    <p
      class="description"
      v-if="festivitiesOrOccurrences.parentsDay && description"
    >
      {{ languages.parentsDayText }}
    </p>
    <!-- --------------------------------------------------FESTA DEL GABINETTO (Scusate ma è divertente e assurda come festa)-->
    <img
      v-if="festivitiesOrOccurrences.toiletDay && !description"
      class="toilet-day"
      src="@/img/festivities/cesso.webp"
      alt="toilet_day"
    />
    <p
      class="description"
      v-if="festivitiesOrOccurrences.toiletDay && description"
    >
      {{ languages.toiletDayText }}
    </p>
    <audio
      v-if="festivitiesOrOccurrences.toiletDay"
      ref="audioPlayer"
      src="src/video/toilet.mp3"
    ></audio>
  </div>
</template>

<style scoped>
.fest-occur-container {
  width: 20%;
  height: 6%;
  position: absolute;
  top: 5px;
  left: 3px;
  z-index: 200;
}
.cancer-day {
  width: 30px;
  margin-left: 10px;
}
.peace-day {
  width: 60px;
}
.womens-day {
  width: 50px;
  height: 65px;
}
.shoah-day {
  height: 50px;
}
.earth-day {
  width: 60px;
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
  width: 65px;
  height: 60px;
}

.parents-day {
  width: 65px;
  height: 50px;
}

.toilet-day {
  width: 55px;
}
.description {
  font-family: sans-serif;
  font-size: 13px;
  width: 12ch;
  padding: 10px;
  position: absolute;
  color: #bf0000;
  background-color: rgba(133, 131, 131, 0.49);
  font-weight: bold;
  border-radius: 10px;
  text-transform: uppercase;
}
</style>
