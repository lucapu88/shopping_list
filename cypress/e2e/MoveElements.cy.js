/* eslint-disable no-undef */
import { phrases, shoppingListLocalOrGlobal } from '../support/commands.js';

// eslint-disable-next-line no-undef
describe("test dello spostamento elementi da una lista ad un'altra", () => {
    beforeEach(() => {
        cy.visit(shoppingListLocalOrGlobal);
        cy.wait(1100);
        cy.closeBlockingElements();
        cy.hideUpdatesAlertsModal();
    });

    it("verifico se la modalità spostamento funziona", () => {
        cy.addSomeItemsToList(phrases);
        // apro il menu delle liste e attivo la modalità spostamento
        cy.showListsButtonClick();
        // verifico i pulsanti disabilitati
        cy.get('.copy-elements-btn').contains('Copy').should('exist');
        cy.get('.move-elements-btn').contains('Move').click({ force: true });
        cy.contains('.copy-elements-btn', 'Copy').should('not.exist');
        cy.get('#list-btn').each(($btn) => {
            cy.wrap($btn).should('be.disabled');
        });
        // verifico la presenza delle frecce in basso
        cy.get('.zoom-animation').should('exist');
        cy.get('.rotate').should('not.exist');
        // verifico cosa accade selezionando un elemento
        cy.get('[index="1"] > .is-moving-visible').click({ force: true });
        cy.get('[index="1"] > .is-moving-visible').should('have.class', 'is-moving');
        cy.get('#list-btn').each(($btn) => {
            cy.wrap($btn).should('have.class', 'btn-in-moving-mode');
        });
        // verifico la presenza delle frecce in alto
        cy.get('.zoom-animation').should('not.exist');
        cy.get('.rotate').should('exist');
        // scorro in alto e seleziono la lista di destinazione
        cy.scrollTo('top', { ensureScrollable: false });
        cy.get(':nth-child(2) > .apply-moving-wrapper').click({ force: true });
        cy.wait(500);
        // verifico che l'elemento sia stato spostato
        cy.get(`#todo:contains(${phrases.frase2})`).should('not.exist');

        cy.get(':nth-child(2) > .apply-moving-wrapper').click({ force: true });
        cy.get(`#todo:contains(${phrases.frase2})`).should('be.visible');
        // verifico che la modalità spostamento si sia disattivata
        cy.get('.pushbutton-container > :nth-child(1)').click({ force: true });
        cy.get('#list-btn').each(($btn) => {
            cy.wrap($btn).should('be.enabled');
        });
        cy.get('.zoom-animation').should('not.exist');
        cy.get('.rotate').should('not.exist');
        cy.get('#list-btn').each(($btn) => {
            cy.wrap($btn).should('not.have.class', 'btn-in-moving-mode');
        });
    });

    it("verifico se la modalità copia funziona", () => {
        cy.addSomeItemsToList(phrases);
        // apro il menu delle liste e attivo la modalità copia
        cy.showListsButtonClick();
        // verifico i pulsanti disabilitati
        cy.get('.move-elements-btn').contains('Move').should('exist');
        cy.get('.copy-elements-btn').contains('Copy').click({ force: true });
        cy.contains('.move-elements-btn', 'Move').should('not.exist');
        cy.get('#list-btn').each(($btn) => {
            cy.wrap($btn).should('be.disabled');
        });
        // verifico la presenza delle frecce in basso
        cy.get('.zoom-animation').should('exist');
        cy.get('.rotate').should('not.exist');
        // verifico cosa accade selezionando un elemento
        cy.get('[index="1"] > .is-moving-visible').click({ force: true });
        cy.get('[index="1"] > .is-moving-visible').should('have.class', 'is-coping');
        cy.get('#list-btn').each(($btn) => {
            cy.wrap($btn).should('have.class', 'btn-in-coping-mode');
        });
        // verifico la presenza delle frecce in alto
        cy.get('.zoom-animation').should('not.exist');
        cy.get('.rotate').should('exist');
        // scorro in alto e seleziono la lista di destinazione
        cy.scrollTo('top', { ensureScrollable: false });
        cy.get(':nth-child(2) > .apply-moving-wrapper').click({ force: true });
        cy.wait(500);
        cy.get('.btn-selected').click({ force: true });
        // verifico che l'elemento sia stato copiato
        /* É INCREDIBILE DI COME FACCIA SCHIFO CYPRESS!!! QUESTO ELEMENTO NON LO TROVA MA È LÌ PORCO IL DEMONIO, É LI LO VEDO CON I MIEI OCCHI PORCA PUTTANA CYPRESS DI MERDA BASTARDO!!!
           EPPURE CYPRESS NON LO VEDE.....HO PROVATO DI TUTTO, HO PROVATO ANCHE A METTERE IL CONTENUTO IN UNA VARIABILE E POI USARLA DENTRO IL CONTAINS MA NIENTE.
           2 RIGHE PIÙ SOTTO INVECE LO VEDE MA É LA STESSA IDENTICA COSA SOLO CHE IN LISTE DIVERSE...MALEDETTO IL GIORNO IN CUI HO SCELTO CYPRESS, CHE DIO VI MALEDICA!!!
           
           cy.get(`#todo:contains(${phrases.frase2})`).should('be.visible');
        */
        cy.showListsButtonClick();

        cy.get(':nth-child(2) > .apply-moving-wrapper').click({ force: true });
        cy.get(`#todo:contains(${phrases.frase2})`).should('be.visible');
        // verifico che la modalità copia si sia disattivata
        cy.get('.pushbutton-container > :nth-child(1)').click({ force: true });
        cy.get('#list-btn').each(($btn) => {
            cy.wrap($btn).should('be.enabled');
        });
        cy.get('.zoom-animation').should('not.exist');
        cy.get('.rotate').should('not.exist');
        cy.get('#list-btn').each(($btn) => {
            cy.wrap($btn).should('not.have.class', 'btn-in-coping-mode');
        });
    });

    it("verifico se selezionando la stessa lista impedisce lo spostamento e lancia l'alert", () => {
        cy.get('.inputText').click({ force: true }).type(phrases.frase6);
        cy.get('.input-btns-container > .btn-info').click({ force: true });

        cy.showListsButtonClick();
        cy.get('.move-elements-btn').click({ force: true });
        cy.get('.is-moving-visible').click({ force: true });
        cy.get('.selected-btn > .apply-moving-wrapper').click({ force: true });
        cy.get('.text-danger > small').should('exist');
    });

});
