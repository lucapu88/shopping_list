import { defineStore } from 'pinia';
import { useAddModifyDeleteTodosStore } from '@/store/AddModifyDeleteTodosStore';


export const useLanguageStore = defineStore('Language', {
    state: () => ({
        todosStore: useAddModifyDeleteTodosStore(),
        categories: [],
        engCategories: [
            { name: 'vegetables', emojy: String.fromCodePoint(0x1f966) },
            { name: 'meat', emojy: String.fromCodePoint(0x1f969) },
            { name: 'fish', emojy: String.fromCodePoint(0x1f99e) },
            { name: 'fruit', emojy: String.fromCodePoint(0x1f353) },
            { name: 'sweets', emojy: String.fromCodePoint(0x1f382) },
            { name: 'dairy products', emojy: String.fromCodePoint(0x1f95b) },
            { name: 'starchy', emojy: String.fromCodePoint(0x1f35e) },
            { name: 'drinks', emojy: String.fromCodePoint(0x1f37a) },
            { name: 'hygiene', emojy: String.fromCodePoint(0x1f9fb) },
            { name: 'medications', emojy: String.fromCodePoint(0x1f48a) },
            { name: 'stationery', emojy: String.fromCodePoint(0x1f4da) },
            { name: 'babies', emojy: String.fromCodePoint(0x1f476) },
            { name: 'electronics', emojy: String.fromCodePoint(0x1f4a1) },
            { name: 'pets', emojy: String.fromCodePoint(0x1f439) },
            { name: 'other', emojy: String.fromCodePoint(0x1f4b8) },
        ],
        itaCategories: [
            { name: 'verdura', emojy: String.fromCodePoint(0x1f966) },
            { name: 'carne', emojy: String.fromCodePoint(0x1f969) },
            { name: 'pesce', emojy: String.fromCodePoint(0x1f99e) },
            { name: 'frutta', emojy: String.fromCodePoint(0x1f353) },
            { name: 'dolci', emojy: String.fromCodePoint(0x1f382) },
            { name: 'latticini', emojy: String.fromCodePoint(0x1f95b) },
            { name: 'farinacei', emojy: String.fromCodePoint(0x1f35e) },
            { name: 'bevande', emojy: String.fromCodePoint(0x1f37a) },
            { name: 'igiene', emojy: String.fromCodePoint(0x1f9fb) },
            { name: 'farmaci', emojy: String.fromCodePoint(0x1f48a) },
            { name: 'cancelleria', emojy: String.fromCodePoint(0x1f4da) },
            { name: 'bimbi', emojy: String.fromCodePoint(0x1f476) },
            { name: 'elettronica', emojy: String.fromCodePoint(0x1f4a1) },
            { name: 'animali', emojy: String.fromCodePoint(0x1f439) },
            { name: 'altro', emojy: String.fromCodePoint(0x1f4b8) },
        ],
        langIta: false,
        settingsTextTitle: 'Settings',
        placeholder: 'Write here what to buy',
        defaultPlaceholderText: 'Write here what to buy',
        copyList: {
            text: 'List copied to clipboard',
            visible: false,
        },
        share: {
            text: 'Link copied to clipboard, paste it with whoever you want.',
            visible: false,
        },
        confirmText: 'Are you sure you want to delete:',
        completeConfirmText: '',
        selectedTodosConfirmText: 'Are you sure you want to delete the selected items',
        themeName: 'light',
        safeModeText: {
            title: 'Safe delete mode',
            description: 'it will ask you to confirm the deletion for each single product on the list',
            function: 'Click to activate/deactivate',
        },
        chosenThemeText: 'Chosen theme',
        changeThemeText: 'Change theme',
        autoDeleteEmptyCategoriesInfo: false,
        autoDeleteEmptyCategoriesText: {
            title: 'Auto delete of empty categories',
            description: 'Choose whether to delete the categories left empty manually, or have them deleted automatically.',
            function: 'Click to activate/deactivate',
        },
        pasteListText: {
            title: 'Export a list from other apps',
            subtitle: 'Just copy and paste it into the box and click import. N.B.: Separates list items by sending them to a head',
        },
        shareText: 'Share',
        updateText: {
            description: 'If the button is green, click to update the app',
            available: 'Updates available',
            unavailable: 'There are no updates',
            readyForUpdate: false,
        },
    }),
    getters: {},
    actions: {
        checkAndSetLanguage() {
            const langIta = window.localStorage.getItem('langIta');
            this.langIta = langIta === 'true';
            if (this.langIta) {
                this.placeholder = 'Scrivi qui cosa comprare';
                this.defaultPlaceholderText = 'Scrivi qui cosa comprare';
                this.categories = this.itaCategories;
                this.copyList.text = 'Lista copiata negli appunti';
                this.share.text = 'Link copiato negli appunti, incollalo con chi vuoi.';
                this.confirmText = 'Sei sicuro di voler eliminare:';
                this.selectedTodosConfirmText =
                    'Sei sicuro di voler eliminare gli elementi selezionati';
                this.settingsTextTitle = 'Impostazioni';
                this.safeModeText.title = 'Modalità eliminazione sicura';
                this.safeModeText.description =
                    'ti chiederà conferma di eliminazione per ogni singolo prodotto della lista';
                this.safeModeText.function = 'Clicca per attivare/disattivare';
                this.chosenThemeText = 'Tema impostato';
                this.changeThemeText = 'Cambia tema';
                this.autoDeleteEmptyCategoriesText.title = 'Auto eliminazione categorie vuote';
                this.autoDeleteEmptyCategoriesText.description = 'Scegli se eliminare manualmente le categorie rimaste vuote, oppure che vengano eliminate automaticamente.';
                this.autoDeleteEmptyCategoriesText.function = 'Clicca per attivare/disattivare';
                this.pasteListText.title = "Esporta una lista da altre app";
                this.pasteListText.subtitle = 'Basterà copiarla e incollarla nel riquadro e cliccare su importa. NB: separa gli elementi della lista mandandoli a capo';
                this.shareText = 'Condividi';
                this.updateText.description = "Se il pulsante è verde, clicca per aggiornare";
                this.updateText.available = 'Aggiornamento disponibile';
                this.updateText.unavailable = 'Non ci sono aggiornamenti';
            } else {
                this.categories = this.engCategories;
            }
        },
        setEnglishLanguage() {
            this.langIta = false;
            this.placeholder = 'Write what to buy';
            this.defaultPlaceholderText = 'Write what to buy';
            this.categories = this.engCategories;
            this.copyList.text = 'List copied to clipboard';
            this.share.text = 'Link copied to clipboard, paste it with whoever you want.';
            window.localStorage.setItem('langIta', false);
            location.reload(); // TOFIX lo faccio solo perchè mi obbligano ad inserire librerie del c---- per la privacy policy che mi buggano il codice.
        },
        setItalianoLanguage() {
            this.langIta = true;
            this.placeholder = 'Scrivi qui cosa comprare';
            this.defaultPlaceholderText = 'Scrivi qui cosa comprare';
            this.categories = this.itaCategories;
            this.copyList.text = 'Lista copiata negli appunti';
            this.share.text = 'Link copiato negli appunti, incollalo con chi vuoi.';
            window.localStorage.setItem('langIta', true);
            location.reload(); // TOFIX lo faccio solo perchè mi obbligano ad inserire librerie del c---- per la privacy policy e mi buggano il codice.
        },
        insertAllCategories() {
            if (this.langIta) {
                this.itaCategories.forEach((category) => {
                    this.todosStore.newTodo = category.name;
                    this.todosStore.addTodo();
                });
            } else {
                this.engCategories.forEach((category) => {
                    this.todosStore.newTodo = category.name;
                    this.todosStore.addTodo();
                });
            }
        },
    },
});

