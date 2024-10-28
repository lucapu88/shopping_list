<script setup>
import { useThemeStore } from '@/store/ThemeStore';
import { useOthersFestivitiesStore } from '@/store/OthersFestivitiesStore';
import { useChristmasStore } from '@/store/ChristmasStore';
import { useSettingsStore } from '@/store/SettingsStore';

import foglioRighePreload from '@/img/foglio_righe.webp';
import cancellaPreload from '@/img/cancella.webp';
import marePreload from '@/img/mare.webp';
import mareTabletPreload from '@/img/mare-tablet.webp';
import montagnePreload from '@/img/montagne.webp';
import montagneTabletPreload from '@/img/montagne-tablet.webp';
import checked from '@/img/icons/checked.webp';
import DragDropElegant from '@/img/icons/drag-and-drop-elegant.webp';
import copyElegant from '@/img/icons/copy-elegant.webp';
import importantElegant from '@/img/icons/important-elegant.webp';

import merryChristmas from '@/img/festivities/christmas.webp';
import christmasSkull from '@/img/icons/christmas-skull.webp';
import garland from '@/img/festivities/ghirlanda.webp';
import biscotto from '@/img/festivities/gingerman-icon.webp';
import christmasBalls from '@/img/festivities/balls.webp';
import bells from '@/img/festivities/christmas-bells.webp';
import babboNatale from '@/img/festivities/babbo-natale.webp';
import garlandCircle from '@/img/festivities/ghirlanda-tonda.webp';
import christmasDecorationsRight from '@/img/festivities/christmas-decorations-destra.webp';
import christmasDecorationsLeft from '@/img/festivities/christmas-decorations-sinistra.webp';

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
import shareLogo from '@/img/icons/share.webp';
import shareBackgr from '@/img/shared.webp';
import cloud from '@/img/icons/cloud.webp';
import tutorial from '@/img/icons/video-logo.webp';
import winterHelperBackgr from '@/img/inverno.webp';
import reloadIcon from '@/img/icons/reload-icon.webp';
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
<!--  -------------------------------I PRELOAD PRINCIPALI SONO NELL'HEAD DELL'INDEX.HTML ------------------------------------- -->
<template>
  <!-- --------------------------------preload dei font in base ai temi------------------------- -->
  <link
    v-if="theme.retroTheme"
    href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap"
    rel="stylesheet"
  />
  <link
    v-if="theme.minimalTheme"
    href="https://fonts.googleapis.com/css2?family=Cabin:wght@500&display=swap"
    rel="stylesheet"
  />
  <link
    v-if="theme.pinkTheme"
    href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap"
    rel="stylesheet"
  />

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
    v-if="theme.summerTheme"
    rel="preload"
    as="image"
    :href="mareTabletPreload"
  />

  <link
    v-if="theme.winterTheme"
    rel="preload"
    as="image"
    :href="montagnePreload"
  />
  <link
    v-if="theme.winterTheme"
    rel="preload"
    as="image"
    :href="montagneTabletPreload"
  />
  <!-- --------------------------------preload delle icone in base ai temi------------------------- -->
  <link v-if="!theme.elegantTheme" rel="preload" as="image" :href="checked" />

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
  <link
    v-if="theme.elegantTheme"
    rel="preload"
    as="image"
    :href="importantElegant"
  />
  <!-- --------------------------------preload di altre immagini/icone in base alle festività--------------------- -->
  <template v-if="isChristmas.christmasTheme">
    <link rel="preload" as="image" :href="merryChristmas" />
    <link rel="preload" as="image" :href="christmasSkull" />
    <link rel="preload" as="image" :href="garland" />
    <link rel="preload" as="image" :href="biscotto" />
    <link rel="preload" as="image" :href="christmasBalls" />
    <link rel="preload" as="image" :href="bells" />
    <link rel="preload" as="image" :href="babboNatale" />
    <link rel="preload" as="image" :href="garlandCircle" />
    <link rel="preload" as="image" :href="christmasDecorationsRight" />
    <link rel="preload" as="image" :href="christmasDecorationsLeft" />
  </template>

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
  <link v-if="settings.helper" rel="preload" as="image" :href="reloadIcon" />
  <link v-if="settings.helper" rel="preload" as="image" :href="shareLogo" />
  <link v-if="settings.helper" rel="preload" as="image" :href="shareBackgr" />
  <link v-if="settings.helper" rel="preload" as="image" :href="cloud" />
  <link v-if="settings.helper" rel="preload" as="image" :href="tutorial" />
  <link
    v-if="settings.helper && theme.winterTheme"
    rel="preload"
    as="image"
    :href="winterHelperBackgr"
  />
</template>
