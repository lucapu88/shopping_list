import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';
import { useTodoStore } from '@/store/TodoStore';
import { useEnglishSuggStoreStore } from '@/store/suggestions/EnglishSuggStore';
import { useItalianSuggStoreStore } from '@/store/suggestions/ItalianSuggStore';
import { useSpanishSuggStoreStore } from '@/store/suggestions/SpanishSuggStore';
import { useFrenchSuggStoreStore } from '@/store/suggestions/FrenchSuggStore';
import { useChristmasStore } from '@/store/festivities/ChristmasStore';

export const useSuggestionsStore = defineStore('suggestions', {
  state: () => ({
    languages: useLanguageStore(),
    todosStore: useTodoStore(),
    eng: useEnglishSuggStoreStore(),
    ita: useItalianSuggStoreStore(),
    spa: useSpanishSuggStoreStore(),
    fra: useFrenchSuggStoreStore(),
    christmas: useChristmasStore(),
    suggestionsModal: false,
    suggestionsList: [],
  }),
  getters: {},
  actions: {
    toggleSuggestionsModal() {
      this.suggestionsModal = !this.suggestionsModal;
    },
    checkAndSetSuggestionsLanguage(catName) {
      const categoryName = catName.toLowerCase();

      const categories = {
        // INGLESE
        'vegetables': this.eng.vegetables,
        'meat': this.eng.meat,
        'fish': this.eng.fish,
        'fruit': this.eng.fruit,
        'sweets': this.eng.sweets,
        'dairy': this.eng.dairy,
        'starchy': this.eng.starchy,
        'drinks': this.eng.drinks,
        'frozen': this.eng.frozen,
        'spices': this.eng.spices,
        'hygiene': this.eng.hygiene,
        'medications': this.eng.medications,
        'stationery': this.eng.stationery,
        'babies': this.eng.babies,
        'electronics': this.eng.electronics,
        'pets': this.eng.pets,
        'tools': this.eng.tools,
        'clothes': this.eng.clothes,
        'toys': this.eng.toys,
        'furniture': this.eng.furniture,
        'household': this.eng.household,
        'gardening': this.eng.gardening,
        'online': this.eng.online,
        'sports': this.eng.sports,
        'beauty': this.eng.beauty,
        'other': this.eng.other,
        'christmas gifts': this.eng.christmasGifts,

        // ITALIANO
        'vegetali': this.ita.vegetali,
        'carne': this.ita.carne,
        'pesce': this.ita.pesce,
        'frutta': this.ita.frutta,
        'dolci': this.ita.dolci,
        'latticini': this.ita.latticini,
        'farinacei': this.ita.farinacei,
        'bevande': this.ita.bevande,
        'surgelati': this.ita.surgelati,
        'spezie': this.ita.spezie,
        'igiene': this.ita.igiene,
        'farmaci': this.ita.farmaci,
        'cancelleria': this.ita.cancelleria,
        'bimbi': this.ita.bimbi,
        'elettronica': this.ita.elettronica,
        'animali': this.ita.animali,
        'attrezzi': this.ita.attrezzi,
        'vestiti': this.ita.vestiti,
        'giocattoli': this.ita.giocattoli,
        'arredamento': this.ita.arredamento,
        'casalinghi': this.ita.casalinghi,
        'giardinaggio': this.ita.giardinaggio,
        'web': this.ita.web,
        'sport': this.ita.sport,
        'estetica': this.ita.estetica,
        'altro': this.ita.altro,
        'regali di natale': this.ita.regaliDiNatale,

        // SPAGNOLO
        'verduras': this.spa.verduras,
        'carnes': this.spa.carnes,
        'pescado': this.spa.pescado,
        'fruta': this.spa.fruta,
        'dulces': this.spa.dulces,
        'lácteos': this.spa.lacteos,
        'harina': this.spa.harina,
        'bebidas': this.spa.bebidas,
        'congelados': this.spa.congelados,
        'especias': this.spa.especias,
        'higiene': this.spa.higiene,
        'medicamentos': this.spa.medicamentos,
        'papelería': this.spa.papeleria,
        'niños': this.spa.ninos,
        'electrónica': this.spa.electronica,
        'animales': this.spa.animales,
        'herramientas': this.spa.herramientas,
        'ropa': this.spa.ropa,
        'juguetes': this.spa.juguetes,
        'mobiliario': this.spa.mobiliario,
        'hogar': this.spa.hogar,
        'jardinería': this.spa.jardineria,
        'internet': this.spa.internet,
        'deporte': this.spa.deporte,
        'belleza': this.spa.belleza,
        'otros': this.spa.otros,
        'regalos de navidad': this.spa.regalosDeNavidad,

        // FRANCESE
        'légumes': this.fra.legumes,
        'viande': this.fra.viande,
        'poisson': this.fra.poisson,
        'fruits': this.fra.fruit,
        'sucreries': this.fra.sucreries,
        'laitages': this.fra.laitages,
        'amidon': this.fra.amidon,
        'boissons': this.fra.boissons,
        'surgelés': this.fra.surgeles,
        'épices': this.fra.epices,
        'hygiène': this.fra.hygiene,
        'médicaments': this.fra.medicaments,
        'papeterie': this.fra.papeterie,
        'bébés': this.fra.bebes,
        'électronique': this.fra.electronique,
        'animaux': this.fra.animaux,
        'matériel': this.fra.materiel,
        'vêtements': this.fra.vetements,
        'jouets': this.fra.jouets,
        'meubles': this.fra.meubles,
        'maison': this.fra.maison,
        'jardinage': this.fra.jardinage,
        'en ligne': this.fra.enLigne,
        'sportive': this.fra.sportive,
        'beauté': this.fra.beaute,
        'autre': this.fra.autre,
        'cadeaux de Noël': this.fra.cadeauxDeNoel,
      };

      if (categories[categoryName]) {
        this.suggestionsList = categories[categoryName].sort();
      }
    },
    addTip(tip, noSuggestions) {
      if (noSuggestions) {
        return;
      }
      this.todosStore.addTodo(tip);
      this.suggestionsModal = false;
    }
  }
});