PROCEDURA PER QUANDO SI AGGIUNGE UNA NUOVA FUNZIONALITÀ:

- Nella cartella helper crea l'apposito componente che fa le sue cose. Se è una impostazione va nella sottostante cartella settings, se è un'istruzione va nella cartella istructions.

- Inserisci sempre tutto l'html all'interno di un "div class="helper-settings"" che a sua volta ha un ListIstructionAccordion ecc...insomma la struttura deve essere uguale a tutte le altre, quindi ti conviene copiare e incollare l'html. La differenza è che l'impostazione ha il tag template mentre l'istruzione ha il tag ul.

- Se è un'impostazione devi mettere la proprietà :isSettings="true" come input nel ListIstructionAccordion, se è un'istruzione non mettere la proprietà.

- Fai attenzione al nome della nuova funzionalità, che va cambiato alla variabile e poi in tutto il codice hmtl. Come ad esempio in:
  ListIstructionAccordion show-list-instructions-input="NOME NUOVA FUNZIONALITÀ"
  ToggleTutorialButton :features="NOME NUOVA FUNZIONALITÀ" (se la funzionalità prevede un video tutorial)
  Tutorial :features="NOME NUOVA FUNZIONALITÀ" (se la funzionalità prevede un video tutorial)

- Nel file SettingsStore.js devi aggiungere il metodo che fa le sue cose e una variabile booleana che deve avere lo stesso ed identico nome della variabile del componente. Servirà per i vari toggle dell'accordion e dei tutorial. Come ad esempio:
  ListIstructionAccordion :select-deselect-arrow="settings.NOME-NUOVA-FUNZIONALITÀ && settings.section === NOME-NUOVA-FUNZIONALITÀ"
  Tutorial v-if="settings.video && settings.feature === NOME-NUOVA-FUNZIONALITÀ"

- La nuova variabile booleana va anche aggiunta e settata a false all'interno del metodo resetHelperSettingsAndIstructions() sempre all'interno del file SettingsStore.js.

- Nel file SettingsStore.js, all'interno del metodo showListInstructions aggiungi una proprietà nella costante "sectionMap" con lo stesso ed identico nome che hai dato alla variabile booleana aggiunta prima.

- Nel file LanguageStore.js aggiungi i rispettivi testi con le rispettive traduzioni.

- Crea un video tutorial, se lo prevede, e inseriscilo all'interno del componente Tutorial.vue. Quando crei il video poi riducilo di dimensione e aumentane la velocità.

- Di solito se è un'istruzione ci va quasi sempre anche il video tranne se non è una banalissima come il delete all. Per l'impostazione invece dipende, quasi tutte lo hanno, ma quelle banali tipo cambio lingua o cambio tema no.

- Se non ci sarà un video tutorial allora elimina dal componente i componenti ToggleTutorialButton e Tutorial.

- Aggiungi la dicitura "NEW" passando in input :isNew="true" al ListIstructionAccordion. Ricordati poi di toglierla dopo un mesetto circa.

- Testa tutto con cypress, molto probabilmente si rompono i test precedenti avendo aggiunto un nuovo elemento dovrai rivedere e cambiare numero al "nth-child" in "cy.get('#helper-description > :nth-child(6) > .list-title')".
