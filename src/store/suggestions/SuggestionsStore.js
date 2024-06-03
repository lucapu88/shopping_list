import { defineStore } from 'pinia';
import { useLanguageStore } from '@/store/LanguageStore';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';
import { useEnglishSuggStoreStore } from '@/store/suggestions/EnglishSuggStore';
import { useItalianSuggStoreStore } from '@/store/suggestions/ItalianSuggStore';
import { useSpanishSuggStoreStore } from '@/store/suggestions/SpanishSuggStore';

export const useSuggestionsStore = defineStore('suggestions', {
  state: () => ({
    languages: useLanguageStore(),
    todosStore: useAddModifyDeleteTodosStore(),
    eng: useEnglishSuggStoreStore(),
    ita: useItalianSuggStoreStore(),
    spa: useSpanishSuggStoreStore(),
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
        case 'vegetables':
          this.suggestionsList = this.eng.vegetables;
          break;
        case 'meat':
          this.suggestionsList = this.eng.meat;
          break;
        case 'fish':
          this.suggestionsList = this.eng.fish;
          break;
        case 'fruit':
          this.suggestionsList = this.eng.fruit;
          break;
        case 'sweets':
          this.suggestionsList = this.eng.sweets;
          break;
        case 'dairy products':
          this.suggestionsList = this.eng.dairyProducts;
          break;
        case 'starchy':
          this.suggestionsList = this.eng.starchy;
          break;
        case 'drinks':
          this.suggestionsList = this.eng.drinks;
          break;
        case 'frozen foods':
          this.suggestionsList = this.eng.frozenFoods;
          break;
        case 'spices':
          this.suggestionsList = this.eng.spices;
          break;
        case 'hygiene':
          this.suggestionsList = this.eng.hygiene;
          break;
        case 'medications':
          this.suggestionsList = this.eng.medications;
          break;
        case 'stationery':
          this.suggestionsList = this.eng.stationery;
          break;
        case 'babies':
          this.suggestionsList = this.eng.babies;
          break;
        case 'electronics':
          this.suggestionsList = this.eng.electronics;
          break;
        case 'pets':
          this.suggestionsList = this.eng.pets;
          break;
        case 'work tools':
          this.suggestionsList = this.eng.workTools;
          break;
        case 'clothes':
          this.suggestionsList = this.eng.clothes;
          break;
        case 'toys':
          this.suggestionsList = this.eng.toys;
          break;
        case 'furniture/decor':
          this.suggestionsList = this.eng.furnitureDecor;
          break;
        case 'household objects':
          this.suggestionsList = this.eng.householdObjects;
          break;
        case 'gardening':
          this.suggestionsList = this.eng.gardening;
          break;
        case 'other':
          this.suggestionsList = this.eng.other;
          break;

        case 'christmas gifts':
          this.suggestionsList = this.eng.christmasGifts;
          break;

        // ------------------------------------------------------------- ITALIANO
        case 'vegetali':
          this.suggestionsList = this.ita.vegetali;
          break;

        case 'carne':
          this.suggestionsList = this.ita.carne;
          break;

        case 'pesce':
          this.suggestionsList = this.ita.pesce;
          break;

        case 'frutta':
          this.suggestionsList = this.ita.frutta;
          break;

        case 'dolci':
          this.suggestionsList = this.ita.dolci;
          break;

        case 'latticini':
          this.suggestionsList = this.ita.latticini;
          break;

        case 'farinacei':
          this.suggestionsList = this.ita.farinacei;
          break;

        case 'bevande':
          this.suggestionsList = this.ita.bevande;
          break;

        case 'surgelati':
          this.suggestionsList = this.ita.surgelati;
          break;

        case 'spezie':
          this.suggestionsList = this.ita.spezie;
          break;

        case 'igiene':
          this.suggestionsList = this.ita.igiene;
          break;

        case 'farmaci':
          this.suggestionsList = this.ita.farmaci;
          break;

        case 'cancelleria':
          this.suggestionsList = this.ita.cancelleria;
          break;

        case 'bimbi':
          this.suggestionsList = this.ita.bimbi;
          break;

        case 'elettronica':
          this.suggestionsList = this.ita.elettronica;
          break;

        case 'animali':
          this.suggestionsList = this.ita.animali;
          break;

        case 'attrezzi':
          this.suggestionsList = this.ita.attrezzi;
          break;

        case 'vestiti':
          this.suggestionsList = this.ita.vestiti;
          break;

        case 'giocattoli':
          this.suggestionsList = this.ita.giocattoli;
          break;

        case 'arredamento':
          this.suggestionsList = this.ita.arredamento;
          break;

        case 'oggetti domestici':
          this.suggestionsList = this.ita.oggettiDomestici;
          break;

        case 'giardinaggio':
          this.suggestionsList = this.ita.giardinaggio;
          break;

        case 'altro':
          this.suggestionsList = this.ita.altro;
          break;

        case 'regali di natale':
          this.suggestionsList = this.ita.regaliDiNatale;
          break;

        // ------------------------------------------------------------- SPAGNOLO
        case 'verduras':
          this.suggestionsList = this.spa.verduras;
          break;

        case 'carnes':
          this.suggestionsList = this.spa.carnes;
          break;

        case 'pescado':
          this.suggestionsList = this.spa.pescado;
          break;

        case 'fruta':
          this.suggestionsList = this.spa.fruta;
          break;

        case 'dulces':
          this.suggestionsList = this.spa.dulces;
          break;

        case 'lácteos':
          this.suggestionsList = this.spa.lacteos;
          break;

        case 'harina':
          this.suggestionsList = this.spa.harina;
          break;

        case 'bebidas':
          this.suggestionsList = this.spa.bebidas;
          break;

        case 'congelados':
          this.suggestionsList = this.spa.congelados;
          break;

        case 'especias':
          this.suggestionsList = this.spa.especias;
          break;

        case 'higiene':
          this.suggestionsList = this.spa.higiene;
          break;

        case 'medicamentos':
          this.suggestionsList = this.spa.medicamentos;
          break;

        case 'papelería':
          this.suggestionsList = this.spa.papeleria;
          break;

        case 'niños':
          this.suggestionsList = this.spa.ninos;
          break;

        case 'electrónica':
          this.suggestionsList = this.spa.electronica;
          break;

        case 'animales':
          this.suggestionsList = this.spa.animales;
          break;

        case 'herramientas':
          this.suggestionsList = this.spa.herramientas;
          break;

        case 'ropa':
          this.suggestionsList = this.spa.ropa;
          break;

        case 'juguetes':
          this.suggestionsList = this.spa.juguetes;
          break;

        case 'mobiliario':
          this.suggestionsList = this.spa.mobiliario;
          break;

        case 'objetos domésticos':
          this.suggestionsList = this.spa.objetosDomesticos;
          break;

        case 'jardinería':
          this.suggestionsList = this.spa.jardineria;
          break;

        case 'otros':
          this.suggestionsList = this.spa.otros;
          break;

        case 'regalos de navidad':
          this.suggestionsList = this.spa.regalosDeNavidad;
          break;

        default:
          break;
      }
    },
    addTip(tip) {
      this.todosStore.addTodo(tip);
      this.suggestionsModal = false;
    }
  }
});