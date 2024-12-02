import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';
import { useTodoStore } from '@/store/TodoStore';
import { useEnglishSuggStoreStore } from '@/store/suggestions/EnglishSuggStore';
import { useItalianSuggStoreStore } from '@/store/suggestions/ItalianSuggStore';
import { useSpanishSuggStoreStore } from '@/store/suggestions/SpanishSuggStore';
import { useChristmasStore } from '@/store/ChristmasStore';

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
      /* TOFIX: Pensavo di migliorarlo e forse si potrebbe mettendo gli array in oggetti separati in base alla lingua, ma poi dovrei gestire le lingue e se un utente ha aggiunto una categoria es.: vegetali e poi cambia lingua in inglese per sbaglio, e prova ad aprire i suggerimenti, non gli verrebbe mostrato nulla poichè vegetali non è inglese.
      Poi mi son fatto idee su qualcosa da ciclare ma creerei cicli su tanti array andando a ciclare inutilmente. In questo caso con lo switch si va diretti all'array interessato in base alla categoria che arriva in input indipendentemente dalla lingua senza dover ciclare nulla.
      Quindi pensavo di aver scritto una cagata con questo switch gigantesco ma per ora non mi sembra un'idea malvagia...mmm boh non lo so! */
      //Se stai leggendo e pensi ci sia una cosa migliore fammelo sapere. 
      const categoryName = catName.toLowerCase();
      switch (categoryName) {
        // ------------------------------------------------------------- INGLESE
        case this.languages.engCategories[0].name:
          this.suggestionsList = this.eng.vegetables.sort();
          break;
        case this.languages.engCategories[1].name:
          this.suggestionsList = this.eng.meat.sort();
          break;
        case this.languages.engCategories[2].name:
          this.suggestionsList = this.eng.fish.sort();
          break;
        case this.languages.engCategories[3].name:
          this.suggestionsList = this.eng.fruit.sort();
          break;
        case this.languages.engCategories[4].name:
          this.suggestionsList = this.eng.sweets.sort();
          break;
        case this.languages.engCategories[5].name:
          this.suggestionsList = this.eng.dairyProducts.sort();
          break;
        case this.languages.engCategories[6].name:
          this.suggestionsList = this.eng.starchy.sort();
          break;
        case this.languages.engCategories[7].name:
          this.suggestionsList = this.eng.drinks.sort();
          break;
        case this.languages.engCategories[8].name:
          this.suggestionsList = this.eng.frozenFoods.sort();
          break;
        case this.languages.engCategories[9].name:
          this.suggestionsList = this.eng.spices.sort();
          break;
        case this.languages.engCategories[10].name:
          this.suggestionsList = this.eng.hygiene.sort();
          break;
        case this.languages.engCategories[11].name:
          this.suggestionsList = this.eng.medications.sort();
          break;
        case this.languages.engCategories[12].name:
          this.suggestionsList = this.eng.stationery.sort();
          break;
        case this.languages.engCategories[13].name:
          this.suggestionsList = this.eng.babies.sort();
          break;
        case this.languages.engCategories[14].name:
          this.suggestionsList = this.eng.electronics.sort();
          break;
        case this.languages.engCategories[15].name:
          this.suggestionsList = this.eng.pets.sort();
          break;
        case this.languages.engCategories[16].name:
          this.suggestionsList = this.eng.workTools.sort();
          break;
        case this.languages.engCategories[17].name:
          this.suggestionsList = this.eng.clothes.sort();
          break;
        case this.languages.engCategories[18].name:
          this.suggestionsList = this.eng.toys.sort();
          break;
        case this.languages.engCategories[19].name:
          this.suggestionsList = this.eng.furnitureDecor.sort();
          break;
        case this.languages.engCategories[20].name:
          this.suggestionsList = this.eng.householdObjects.sort();
          break;
        case this.languages.engCategories[21].name:
          this.suggestionsList = this.eng.gardening.sort();
          break;
        case this.languages.engCategories[22].name:
          this.suggestionsList = this.eng.onlineShopping.sort();
          break;
        case this.languages.engCategories[23].name:
          this.suggestionsList = this.eng.other.sort();
          break;

        case this.languages.engCategories[24].name:
          this.suggestionsList = this.eng.christmasGifts;
          break;

        // ------------------------------------------------------------- ITALIANO
        case this.languages.itaCategories[0].name:
          this.suggestionsList = this.ita.vegetali.sort();
          break;

        case this.languages.itaCategories[1].name:
          this.suggestionsList = this.ita.carne.sort();
          break;

        case this.languages.itaCategories[2].name:
          this.suggestionsList = this.ita.pesce.sort();
          break;

        case this.languages.itaCategories[3].name:
          this.suggestionsList = this.ita.frutta.sort();
          break;

        case this.languages.itaCategories[4].name:
          this.suggestionsList = this.ita.dolci.sort();
          break;

        case this.languages.itaCategories[5].name:
          this.suggestionsList = this.ita.latticini.sort();
          break;

        case this.languages.itaCategories[6].name:
          this.suggestionsList = this.ita.farinacei.sort();
          break;

        case this.languages.itaCategories[7].name:
          this.suggestionsList = this.ita.bevande.sort();
          break;

        case this.languages.itaCategories[8].name:
          this.suggestionsList = this.ita.surgelati.sort();
          break;

        case this.languages.itaCategories[9].name:
          this.suggestionsList = this.ita.spezie.sort();
          break;

        case this.languages.itaCategories[10].name:
          this.suggestionsList = this.ita.igiene.sort();
          break;

        case this.languages.itaCategories[11].name:
          this.suggestionsList = this.ita.farmaci.sort();
          break;

        case this.languages.itaCategories[12].name:
          this.suggestionsList = this.ita.cancelleria.sort();
          break;

        case this.languages.itaCategories[13].name:
          this.suggestionsList = this.ita.bimbi.sort();
          break;

        case this.languages.itaCategories[14].name:
          this.suggestionsList = this.ita.elettronica.sort();
          break;

        case this.languages.itaCategories[15].name:
          this.suggestionsList = this.ita.animali.sort();
          break;

        case this.languages.itaCategories[16].name:
          this.suggestionsList = this.ita.attrezzi.sort();
          break;

        case this.languages.itaCategories[17].name:
          this.suggestionsList = this.ita.vestiti.sort();
          break;

        case this.languages.itaCategories[18].name:
          this.suggestionsList = this.ita.giocattoli.sort();
          break;

        case this.languages.itaCategories[19].name:
          this.suggestionsList = this.ita.arredamento.sort();
          break;

        case this.languages.itaCategories[20].name:
          this.suggestionsList = this.ita.oggettiDomestici.sort();
          break;

        case this.languages.itaCategories[21].name:
          this.suggestionsList = this.ita.giardinaggio.sort();
          break;

        case this.languages.itaCategories[22].name:
          this.suggestionsList = this.ita.acquistiOnline.sort();
          break;

        case this.languages.itaCategories[23].name:
          this.suggestionsList = this.ita.altro.sort();
          break;

        case this.languages.itaCategories[24].name:
          this.suggestionsList = this.ita.regaliDiNatale;
          break;

        // ------------------------------------------------------------- SPAGNOLO
        case this.languages.spanCategories[0].name:
          this.suggestionsList = this.spa.verduras.sort();
          break;

        case this.languages.spanCategories[1].name:
          this.suggestionsList = this.spa.carnes.sort();
          break;

        case this.languages.spanCategories[2].name:
          this.suggestionsList = this.spa.pescado.sort();
          break;

        case this.languages.spanCategories[3].name:
          this.suggestionsList = this.spa.fruta.sort();
          break;

        case this.languages.spanCategories[4].name:
          this.suggestionsList = this.spa.dulces.sort();
          break;

        case this.languages.spanCategories[5].name:
          this.suggestionsList = this.spa.lacteos.sort();
          break;

        case this.languages.spanCategories[6].name:
          this.suggestionsList = this.spa.harina.sort();
          break;

        case this.languages.spanCategories[7].name:
          this.suggestionsList = this.spa.bebidas.sort();
          break;

        case this.languages.spanCategories[8].name:
          this.suggestionsList = this.spa.congelados.sort();
          break;

        case this.languages.spanCategories[9].name:
          this.suggestionsList = this.spa.especias.sort();
          break;

        case this.languages.spanCategories[10].name:
          this.suggestionsList = this.spa.higiene.sort();
          break;

        case this.languages.spanCategories[11].name:
          this.suggestionsList = this.spa.medicamentos.sort();
          break;

        case this.languages.spanCategories[12].name:
          this.suggestionsList = this.spa.papeleria.sort();
          break;

        case this.languages.spanCategories[13].name:
          this.suggestionsList = this.spa.ninos.sort();
          break;

        case this.languages.spanCategories[14].name:
          this.suggestionsList = this.spa.electronica.sort();
          break;

        case this.languages.spanCategories[15].name:
          this.suggestionsList = this.spa.animales.sort();
          break;

        case this.languages.spanCategories[16].name:
          this.suggestionsList = this.spa.herramientas.sort();
          break;

        case this.languages.spanCategories[17].name:
          this.suggestionsList = this.spa.ropa.sort();
          break;

        case this.languages.spanCategories[18].name:
          this.suggestionsList = this.spa.juguetes.sort();
          break;

        case this.languages.spanCategories[19].name:
          this.suggestionsList = this.spa.mobiliario.sort();
          break;

        case this.languages.spanCategories[20].name:
          this.suggestionsList = this.spa.objetosDomesticos.sort();
          break;

        case this.languages.spanCategories[21].name:
          this.suggestionsList = this.spa.jardineria.sort();
          break;

        case this.languages.spanCategories[22].name:
          this.suggestionsList = this.spa.comprarEnIntenet.sort();
          break;

        case this.languages.spanCategories[23].name:
          this.suggestionsList = this.spa.otros.sort();
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