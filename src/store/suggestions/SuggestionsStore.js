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

      // CI STO PROVANDO A FARE QUALCOSA DI SIMILE, MA É TROPPO SBATTI, DEVO VEDERLO BENE BENE E CONTROLLARE I SIDE EFFECTS:
      /*const array = [...this.languages.engCategories, ...this.languages.itaCategories, this.languages.spanCategories];
        array.forEach(cat => {
          if (cat.name == catName.toLowerCase()) {
            const engCat = this.eng[cat.name] === 'christmas_gifts' ? this.eng[cat.name] : this.eng[cat.name].sort();
            this.suggestionsList = engCat;
          }
        }); */

      //Se stai leggendo e pensi ci sia una cosa migliore fammelo sapere. 
      const categoryName = catName.toLowerCase();

      switch (categoryName) {
        // ------------------------------------------------------------- INGLESE
        case 'vegetables':
          this.suggestionsList = this.eng.vegetables.sort();
          break;
        case 'meat':
          this.suggestionsList = this.eng.meat.sort();
          break;
        case 'fish':
          this.suggestionsList = this.eng.fish.sort();
          break;
        case 'fruit':
          this.suggestionsList = this.eng.fruit.sort();
          break;
        case 'sweets':
          this.suggestionsList = this.eng.sweets.sort();
          break;
        case 'dairy products':
          this.suggestionsList = this.eng.dairyProducts.sort();
          break;
        case 'starchy':
          this.suggestionsList = this.eng.starchy.sort();
          break;
        case 'drinks':
          this.suggestionsList = this.eng.drinks.sort();
          break;
        case 'frozen foods':
          this.suggestionsList = this.eng.frozenFoods.sort();
          break;
        case 'spices':
          this.suggestionsList = this.eng.spices.sort();
          break;
        case 'hygiene':
          this.suggestionsList = this.eng.hygiene.sort();
          break;
        case 'medications':
          this.suggestionsList = this.eng.medications.sort();
          break;
        case 'stationery':
          this.suggestionsList = this.eng.stationery.sort();
          break;
        case 'babies':
          this.suggestionsList = this.eng.babies.sort();
          break;
        case 'electronics':
          this.suggestionsList = this.eng.electronics.sort();
          break;
        case 'pets':
          this.suggestionsList = this.eng.pets.sort();
          break;
        case 'work tools':
          this.suggestionsList = this.eng.workTools.sort();
          break;
        case 'clothes':
          this.suggestionsList = this.eng.clothes.sort();
          break;
        case 'toys':
          this.suggestionsList = this.eng.toys.sort();
          break;
        case 'furniture':
          this.suggestionsList = this.eng.furniture.sort();
          break;
        case 'household objects':
          this.suggestionsList = this.eng.householdObjects.sort();
          break;
        case 'gardening':
          this.suggestionsList = this.eng.gardening.sort();
          break;
        case 'online shopping':
          this.suggestionsList = this.eng.onlineShopping.sort();
          break;
        case 'other':
          this.suggestionsList = this.eng.other.sort();
          break;

        case 'christmas gifts':
          this.suggestionsList = this.eng.christmasGifts;
          break;

        // ------------------------------------------------------------- ITALIANO
        case 'vegetali':
          this.suggestionsList = this.ita.vegetali.sort();
          break;

        case 'carne':
          this.suggestionsList = this.ita.carne.sort();
          break;

        case 'pesce':
          this.suggestionsList = this.ita.pesce.sort();
          break;

        case 'frutta':
          this.suggestionsList = this.ita.frutta.sort();
          break;

        case 'dolci':
          this.suggestionsList = this.ita.dolci.sort();
          break;

        case 'latticini':
          this.suggestionsList = this.ita.latticini.sort();
          break;

        case 'farinacei':
          this.suggestionsList = this.ita.farinacei.sort();
          break;

        case 'bevande':
          this.suggestionsList = this.ita.bevande.sort();
          break;

        case 'surgelati':
          this.suggestionsList = this.ita.surgelati.sort();
          break;

        case 'spezie':
          this.suggestionsList = this.ita.spezie.sort();
          break;

        case 'igiene':
          this.suggestionsList = this.ita.igiene.sort();
          break;

        case 'farmaci':
          this.suggestionsList = this.ita.farmaci.sort();
          break;

        case 'cancelleria':
          this.suggestionsList = this.ita.cancelleria.sort();
          break;

        case 'bimbi':
          this.suggestionsList = this.ita.bimbi.sort();
          break;

        case 'elettronica':
          this.suggestionsList = this.ita.elettronica.sort();
          break;

        case 'animali':
          this.suggestionsList = this.ita.animali.sort();
          break;

        case 'attrezzi':
          this.suggestionsList = this.ita.attrezzi.sort();
          break;

        case 'vestiti':
          this.suggestionsList = this.ita.vestiti.sort();
          break;

        case 'giocattoli':
          this.suggestionsList = this.ita.giocattoli.sort();
          break;

        case 'arredamento':
          this.suggestionsList = this.ita.arredamento.sort();
          break;

        case 'oggetti domestici':
          this.suggestionsList = this.ita.oggettiDomestici.sort();
          break;

        case 'giardinaggio':
          this.suggestionsList = this.ita.giardinaggio.sort();
          break;

        case 'acquisti online':
          this.suggestionsList = this.ita.acquistiOnline.sort();
          break;

        case 'altro':
          this.suggestionsList = this.ita.altro.sort();
          break;

        case 'regali di natale':
          this.suggestionsList = this.ita.regaliDiNatale;
          break;

        // ------------------------------------------------------------- SPAGNOLO
        case 'verduras':
          this.suggestionsList = this.spa.verduras.sort();
          break;

        case 'carnes':
          this.suggestionsList = this.spa.carnes.sort();
          break;

        case 'pescado':
          this.suggestionsList = this.spa.pescado.sort();
          break;

        case 'fruta':
          this.suggestionsList = this.spa.fruta.sort();
          break;

        case 'dulces':
          this.suggestionsList = this.spa.dulces.sort();
          break;

        case 'lácteos':
          this.suggestionsList = this.spa.lacteos.sort();
          break;

        case 'harina':
          this.suggestionsList = this.spa.harina.sort();
          break;

        case 'bebidas':
          this.suggestionsList = this.spa.bebidas.sort();
          break;

        case 'congelados':
          this.suggestionsList = this.spa.congelados.sort();
          break;

        case 'especias':
          this.suggestionsList = this.spa.especias.sort();
          break;

        case 'higiene':
          this.suggestionsList = this.spa.higiene.sort();
          break;

        case 'medicamentos':
          this.suggestionsList = this.spa.medicamentos.sort();
          break;

        case 'papelería':
          this.suggestionsList = this.spa.papeleria.sort();
          break;

        case 'niños':
          this.suggestionsList = this.spa.ninos.sort();
          break;

        case 'electrónica':
          this.suggestionsList = this.spa.electronica.sort();
          break;

        case 'animales':
          this.suggestionsList = this.spa.animales.sort();
          break;

        case 'herramientas':
          this.suggestionsList = this.spa.herramientas.sort();
          break;

        case 'ropa':
          this.suggestionsList = this.spa.ropa.sort();
          break;

        case 'juguetes':
          this.suggestionsList = this.spa.juguetes.sort();
          break;

        case 'mobiliario':
          this.suggestionsList = this.spa.mobiliario.sort();
          break;

        case 'objetos domésticos':
          this.suggestionsList = this.spa.objetosDomesticos.sort();
          break;

        case 'jardinería':
          this.suggestionsList = this.spa.jardineria.sort();
          break;

        case 'comprar en intenet':
          this.suggestionsList = this.spa.comprarEnIntenet.sort();
          break;

        case 'otros':
          this.suggestionsList = this.spa.otros.sort();
          break;

        case 'regalos de navidad':
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