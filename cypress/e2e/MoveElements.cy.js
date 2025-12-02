/* eslint-disable no-undef */
import { phrases, shoppingListLocalOrGlobal } from '../support/commands.js';

// eslint-disable-next-line no-undef
describe("test dello spostamento elementi da una lista ad un'altra", () => {
    beforeEach(() => {
        cy.visit(shoppingListLocalOrGlobal);
        cy.wait(1100);
    });

    it("verifico se lo spostamento funziona", () => {
        cy.addSomeItemsToList(phrases);
        // apro il menu delle liste e attivo la modalità spostamento
        cy.get('.show-lists-img').click({ force: true });
        cy.wait(1000);
        // verifico i pulsanti disabilitati
        cy.get('.move-elements-btn').click({ force: true });
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
        cy.wait(1000);
        // verifico che l'elemento sia stato spostato
        cy.get(`#todo:contains(${phrases.frase2})`).should('not.exist');
        cy.get('.show-lists-img').click({ force: true });
        cy.get(':nth-child(2) > .apply-moving-wrapper').click({ force: true });
        cy.wait(1000);
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
});
