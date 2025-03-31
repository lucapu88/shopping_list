import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';
import { useTodoStore } from '@/store/TodoStore';
import { useEnglishSuggStoreStore } from '@/store/suggestions/EnglishSuggStore';
import { useItalianSuggStoreStore } from '@/store/suggestions/ItalianSuggStore';
import { useSpanishSuggStoreStore } from '@/store/suggestions/SpanishSuggStore';
import { useChristmasStore } from '@/store/festivities/ChristmasStore';

export const useSuggestionsStore = defineStore('suggestions', {
  state: () => ({
    languages: useLanguageStore(),
    todosStore: useTodoStore(),
    eng: useEnglishSuggStoreStore(),
    ita: useItalianSuggStoreStore(),
    spa: useSpanishSuggStoreStore(),
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
        'dairy products': this.eng.dairyProducts,
        'starchy': this.eng.starchy,
        'drinks': this.eng.drinks,
        'frozen foods': this.eng.frozenFoods,
        'spices': this.eng.spices,
        'hygiene': this.eng.hygiene,
        'medications': this.eng.medications,
        'stationery': this.eng.stationery,
        'babies': this.eng.babies,
        'electronics': this.eng.electronics,
        'pets': this.eng.pets,
        'work tools': this.eng.workTools,
        'clothes': this.eng.clothes,
        'toys': this.eng.toys,
        'furniture': this.eng.furniture,
        'household objects': this.eng.householdObjects,
        'gardening': this.eng.gardening,
        'online shopping': this.eng.onlineShopping,
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
        'oggetti domestici': this.ita.oggettiDomestici,
        'giardinaggio': this.ita.giardinaggio,
        'acquisti online': this.ita.acquistiOnline,
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
        'objetos domésticos': this.spa.objetosDomesticos,
        'jardinería': this.spa.jardineria,
        'comprar en internet': this.spa.comprarEnIntenet,
        'deporte': this.spa.deporte,
        'belleza': this.spa.belleza,
        'otros': this.spa.otros,
        'regalos de navidad': this.spa.regalosDeNavidad,
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