<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useOthersFestivitiesStore } from '@/store/OthersFestivitiesStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useSettingsStore } from '@/store/SettingsStore';

import foglioRighePreload from '@/img/foglio_righe.webp';
import cancellaPreload from '@/img/cancella.webp';
import marePreload from '@/img/mare.webp';
import montagnePreload from '@/img/montagne.webp';
import cartBlackPreload from '@/img/icons/cart-black.webp';
import cartWhitePreload from '@/img/icons/cart-white.webp';
import cartRedPreload from '@/img/icons/cart-red.webp';
import DragDropElegant from '@/img/icons/drag-and-drop-elegant.webp';
import copyElegant from '@/img/icons/copy-elegant.webp';

import merryChristmas from '@/img/festivities/christmas.webp';
import christmasSkull from '@/img/icons/christmas-skull.webp';
import garland from '@/img/festivities/ghirlanda.webp';
import biscotto from '@/img/festivities/Gingerman-icon.webp';
import christmasBalls from '@/img/festivities/Decorations-icon.webp';
import bells from '@/img/festivities/christmas-bells.webp';

import cancerLogo from '@/img/festivities/cancer-logo.webp';
import paceLogo from '@/img/festivities/pace.webp';
import womensLogo from '@/img/festivities/mimose.webp';
import shoahLogo from '@/img/festivities/shoah.webp';
import heartLogo from '@/img/festivities/eart.webp';
import beerLogo from '@/img/festivities/beer.webp';
import parentLogo from '@/img/festivities/genitori.webp';
import toiletLogo from '@/img/festivities/cesso.webp';
import computerLogo from '@/img/festivities/computer.webp';
import halloweenPumpkin from '@/img/festivities/zucca.webp';
import halloweenCobwebs from '@/img/festivities/ragnatele.webp';
import arrowDown from '@/img/icons/arrow-down.webp';
import update from '@/img/icons/update.webp';
import share from '@/img/icons/share.webp';
</script>

<script>
export default {
  data() {
    return {
      theme: useThemeStore(),
      festivitiesOrOccurrences: useOthersFestivitiesStore(),
      isChristmas: useChristmasStore(),
      settings: useSettingsStore(),
    };
  },
};
</script>

<template>
  <!-- --------------------------------preload delle immagini in base ai temi------------------------- -->
  <link
    v-if="theme.lightTheme"
    rel="preload"
    as="image"
    :href="foglioRighePreload"
  />
  <link
    v-if="theme.lightTheme"
    rel="preload"
    as="image"
    :href="cancellaPreload"
  />
  <link v-if="theme.summerTheme" rel="preload" as="image" :href="marePreload" />
  <link
    v-if="theme.winterTheme"
    rel="preload"
    as="image"
    :href="montagnePreload"
  />
  <!-- --------------------------------preload delle icone in base ai temi------------------------- -->
  <template v-if="!theme.minimalTheme && !theme.elegantTheme">
    <link
      v-if="theme.lightTheme || theme.summerTheme"
      rel="preload"
      as="image"
      :href="cartBlackPreload"
    />
    <link
      v-if="theme.darkTheme || theme.retroTheme || theme.winterTheme"
      rel="preload"
      as="image"
      :href="cartWhitePreload"
    />
    <link rel="preload" as="image" :href="cartRedPreload" />
  </template>
  <link
    v-if="theme.elegantTheme"
    rel="preload"
    as="image"
    :href="DragDropElegant"
  />
  <link
    v-if="theme.elegantTheme"
    rel="preload"
    as="image"
    :href="copyElegant"
  />
  <!-- --------------------------------preload di altre immagini/icone in base alle festività--------------------- -->
  <link
    v-if="isChristmas.christmasTheme"
    rel="preload"
    as="image"
    :href="merryChristmas"
  />
  <link
    v-if="isChristmas.christmasTheme"
    rel="preload"
    as="image"
    :href="christmasSkull"
  />
  <link
    v-if="isChristmas.christmasTheme"
    rel="preload"
    as="image"
    :href="garland"
  />
  <link
    v-if="isChristmas.christmasTheme"
    rel="preload"
    as="image"
    :href="biscotto"
  />
  <link
    v-if="isChristmas.christmasTheme"
    rel="preload"
    as="image"
    :href="christmasBalls"
  />
  <link
    v-if="isChristmas.christmasTheme"
    rel="preload"
    as="image"
    :href="bells"
  />

  <link
    v-if="festivitiesOrOccurrences.worldCancerDay"
    rel="preload"
    as="image"
    :href="cancerLogo"
  />
  <link
    v-if="festivitiesOrOccurrences.worldPeaceDay"
    rel="preload"
    as="image"
    :href="paceLogo"
  />
  <link
    v-if="festivitiesOrOccurrences.womensDay"
    rel="preload"
    as="image"
    :href="womensLogo"
  />
  <link
    v-if="festivitiesOrOccurrences.HolocaustMemorialDay"
    rel="preload"
    as="image"
    :href="shoahLogo"
  />
  <link
    v-if="festivitiesOrOccurrences.earthDay"
    rel="preload"
    as="image"
    :href="heartLogo"
  />
  <link
    v-if="festivitiesOrOccurrences.beerDay"
    rel="preload"
    as="image"
    :href="beerLogo"
  />
  <link
    v-if="festivitiesOrOccurrences.parentsDay"
    rel="preload"
    as="image"
    :href="parentLogo"
  />
  <link
    v-if="festivitiesOrOccurrences.toiletDay"
    rel="preload"
    as="image"
    :href="toiletLogo"
  />
  <link
    v-if="festivitiesOrOccurrences.internetDay"
    rel="preload"
    as="image"
    :href="computerLogo"
  />

  <link
    v-if="festivitiesOrOccurrences.halloweenTheme"
    rel="preload"
    as="image"
    :href="halloweenPumpkin"
  />
  <link
    v-if="festivitiesOrOccurrences.halloweenTheme"
    rel="preload"
    as="image"
    :href="halloweenCobwebs"
  />
  <!-- -----------------------------------------------------------preload dell'helper---------------------------- -->
  <link v-if="settings.helper" rel="preload" as="image" :href="arrowDown" />
  <link v-if="settings.helper" rel="preload" as="image" :href="update" />
  <link v-if="settings.helper" rel="preload" as="image" :href="share" />
</template>
