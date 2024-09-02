import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
import { useEnglishSuggStoreStore } from '@/store/suggestions/EnglishSuggStore';
import { useItalianSuggStoreStore } from '@/store/suggestions/ItalianSuggStore';
import { useSpanishSuggStoreStore } from '@/store/suggestions/SpanishSuggStore';
import { useChristmasStore } from '@/store/ChristmasStore';

export const useSuggestionsStore = defineStore('suggestions', {
  state: () => ({
    languages: useLanguageStore(),
    todosStore: useAddModifyDeleteTodosStore(),
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
      /* TOFIX: Pensavo di migliorarlo e forse si potrebbe mettendo gli array in oggetti separati in base alla lingua, ma poi dovrei gestire le lingue e se un utente ha aggiunto una categoria es.: vegetali e poi cambia lingua in inglese per sbaglio, e prova ad aprire i suggerimenti, non gli verrebbe mostrato nulla poichè vegetali non è inglese.
      Poi mi son fatto idee su qualcosa da ciclare ma creerei cicli su tanti array andando a ciclare inutilmente. In questo caso con lo switch si va diretti all'array interessato in base alla categoria che arriva in input indipendentemente dalla lingua senza dover ciclare nulla.
      Quindi pensavo di aver scritto una cagata con questo switch gigantesco ma per ora non mi sembra un'idea malvagia...mmm boh non lo so! */
      //Se stai leggendo e pensi ci sia una cosa migliore fammelo sapere. 
      const categoryName = catName.toLowerCase();
      // ------------------------------------------------------------- INGLESE
      switch (categoryName) {
        case this.languages.engCategories[0].name:
          this.suggestionsList = this.eng.vegetables;
          break;
        case this.languages.engCategories[1].name:
          this.suggestionsList = this.eng.meat;
          break;
        case this.languages.engCategories[2].name:
          this.suggestionsList = this.eng.fish;
          break;
        case this.languages.engCategories[3].name:
          this.suggestionsList = this.eng.fruit;
          break;
        case this.languages.engCategories[4].name:
          this.suggestionsList = this.eng.sweets;
          break;
        case this.languages.engCategories[5].name:
          this.suggestionsList = this.eng.dairyProducts;
          break;
        case this.languages.engCategories[6].name:
          this.suggestionsList = this.eng.starchy;
          break;
        case this.languages.engCategories[7].name:
          this.suggestionsList = this.eng.drinks;
          break;
        case this.languages.engCategories[8].name:
          this.suggestionsList = this.eng.frozenFoods;
          break;
        case this.languages.engCategories[9].name:
          this.suggestionsList = this.eng.spices;
          break;
        case this.languages.engCategories[10].name:
          this.suggestionsList = this.eng.hygiene;
          break;
        case this.languages.engCategories[11].name:
          this.suggestionsList = this.eng.medications;
          break;
        case this.languages.engCategories[12].name:
          this.suggestionsList = this.eng.stationery;
          break;
        case this.languages.engCategories[13].name:
          this.suggestionsList = this.eng.babies;
          break;
        case this.languages.engCategories[14].name:
          this.suggestionsList = this.eng.electronics;
          break;
        case this.languages.engCategories[15].name:
          this.suggestionsList = this.eng.pets;
          break;
        case this.languages.engCategories[16].name:
          this.suggestionsList = this.eng.workTools;
          break;
        case this.languages.engCategories[17].name:
          this.suggestionsList = this.eng.clothes;
          break;
        case this.languages.engCategories[18].name:
          this.suggestionsList = this.eng.toys;
          break;
        case this.languages.engCategories[19].name:
          this.suggestionsList = this.eng.furnitureDecor;
          break;
        case this.languages.engCategories[20].name:
          this.suggestionsList = this.eng.householdObjects;
          break;
        case this.languages.engCategories[21].name:
          this.suggestionsList = this.eng.gardening;
          break;
        case this.languages.engCategories[22].name:
          this.suggestionsList = this.eng.onlineShopping;
          break;
        case this.languages.engCategories[23].name:
          this.suggestionsList = this.eng.other;
          break;

        case this.languages.engCategories[24].name:
          this.suggestionsList = this.eng.christmasGifts;
          break;

        // ------------------------------------------------------------- ITALIANO
        case this.languages.itaCategories[0].name:
          this.suggestionsList = this.ita.vegetali;
          break;

        case this.languages.itaCategories[1].name:
          this.suggestionsList = this.ita.carne;
          break;

        case this.languages.itaCategories[2].name:
          this.suggestionsList = this.ita.pesce;
          break;

        case this.languages.itaCategories[3].name:
          this.suggestionsList = this.ita.frutta;
          break;

        case this.languages.itaCategories[4].name:
          this.suggestionsList = this.ita.dolci;
          break;

        case this.languages.itaCategories[5].name:
          this.suggestionsList = this.ita.latticini;
          break;

        case this.languages.itaCategories[6].name:
          this.suggestionsList = this.ita.farinacei;
          break;

        case this.languages.itaCategories[7].name:
          this.suggestionsList = this.ita.bevande;
          break;

        case this.languages.itaCategories[8].name:
          this.suggestionsList = this.ita.surgelati;
          break;

        case this.languages.itaCategories[9].name:
          this.suggestionsList = this.ita.spezie;
          break;

        case this.languages.itaCategories[10].name:
          this.suggestionsList = this.ita.igiene;
          break;

        case this.languages.itaCategories[11].name:
          this.suggestionsList = this.ita.farmaci;
          break;

        case this.languages.itaCategories[12].name:
          this.suggestionsList = this.ita.cancelleria;
          break;

        case this.languages.itaCategories[13].name:
          this.suggestionsList = this.ita.bimbi;
          break;

        case this.languages.itaCategories[14].name:
          this.suggestionsList = this.ita.elettronica;
          break;

        case this.languages.itaCategories[15].name:
          this.suggestionsList = this.ita.animali;
          break;

        case this.languages.itaCategories[16].name:
          this.suggestionsList = this.ita.attrezzi;
          break;

        case this.languages.itaCategories[17].name:
          this.suggestionsList = this.ita.vestiti;
          break;

        case this.languages.itaCategories[18].name:
          this.suggestionsList = this.ita.giocattoli;
          break;

        case this.languages.itaCategories[19].name:
          this.suggestionsList = this.ita.arredamento;
          break;

        case this.languages.itaCategories[20].name:
          this.suggestionsList = this.ita.oggettiDomestici;
          break;

        case this.languages.itaCategories[21].name:
          this.suggestionsList = this.ita.giardinaggio;
          break;

        case this.languages.itaCategories[22].name:
          this.suggestionsList = this.ita.acquistiOnline;
          break;

        case this.languages.itaCategories[23].name:
          this.suggestionsList = this.ita.altro;
          break;

        case this.languages.itaCategories[24].name:
          this.suggestionsList = this.ita.regaliDiNatale;
          break;

        // ------------------------------------------------------------- SPAGNOLO
        case this.languages.spanCategories[0].name:
          this.suggestionsList = this.spa.verduras;
          break;

        case this.languages.spanCategories[1].name:
          this.suggestionsList = this.spa.carnes;
          break;

        case this.languages.spanCategories[2].name:
          this.suggestionsList = this.spa.pescado;
          break;

        case this.languages.spanCategories[3].name:
          this.suggestionsList = this.spa.fruta;
          break;

        case this.languages.spanCategories[4].name:
          this.suggestionsList = this.spa.dulces;
          break;

        case this.languages.spanCategories[5].name:
          this.suggestionsList = this.spa.lacteos;
          break;

        case this.languages.spanCategories[6].name:
          this.suggestionsList = this.spa.harina;
          break;

        case this.languages.spanCategories[7].name:
          this.suggestionsList = this.spa.bebidas;
          break;

        case this.languages.spanCategories[8].name:
          this.suggestionsList = this.spa.congelados;
          break;

        case this.languages.spanCategories[9].name:
          this.suggestionsList = this.spa.especias;
          break;

        case this.languages.spanCategories[10].name:
          this.suggestionsList = this.spa.higiene;
          break;

        case this.languages.spanCategories[11].name:
          this.suggestionsList = this.spa.medicamentos;
          break;

        case this.languages.spanCategories[12].name:
          this.suggestionsList = this.spa.papeleria;
          break;

        case this.languages.spanCategories[13].name:
          this.suggestionsList = this.spa.ninos;
          break;

        case this.languages.spanCategories[14].name:
          this.suggestionsList = this.spa.electronica;
          break;

        case this.languages.spanCategories[15].name:
          this.suggestionsList = this.spa.animales;
          break;

        case this.languages.spanCategories[16].name:
          this.suggestionsList = this.spa.herramientas;
          break;

        case this.languages.spanCategories[17].name:
          this.suggestionsList = this.spa.ropa;
          break;

        case this.languages.spanCategories[18].name:
          this.suggestionsList = this.spa.juguetes;
          break;

        case this.languages.spanCategories[19].name:
          this.suggestionsList = this.spa.mobiliario;
          break;

        case this.languages.spanCategories[20].name:
          this.suggestionsList = this.spa.objetosDomesticos;
          break;

        case this.languages.spanCategories[21].name:
          this.suggestionsList = this.spa.jardineria;
          break;

        case this.languages.spanCategories[22].name:
          this.suggestionsList = this.spa.comprarEnIntenet;
          break;

        case this.languages.spanCategories[23].name:
          this.suggestionsList = this.spa.otros;
          break;

        case this.languages.spanCategories[24].name:
          this.suggestionsList = this.spa.regalosDeNavidad;
          break;

        default:
          break;
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