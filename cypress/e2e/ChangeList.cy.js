/* eslint-disable no-undef */
import { phrases, shoppingListLocalOrGlobal } from '../support/commands.js';

// eslint-disable-next-line no-undef
describe("test delle liste multiple", () => {
    beforeEach(() => {
        // Per ovviare ad un errore di cypress: TypeError: Cannot read properties of undefined (reading 'KeyboardEvent')     
        if (typeof window !== 'undefined' && !window.KeyboardEvent) {
            window.KeyboardEvent = KeyboardEvent;
        }
        cy.visit(shoppingListLocalOrGlobal);
    });

    it('inserisco qualcosa nella lista, poi cambio lista e provo le altre', () => {
        cy.addSomeItemsToList(phrases);
        cy.get('.buttons-container > .selected-btn > .btn-name').contains('List 1');
        cy.get('.empty-logo-container').should('not.exist');
        cy.get('.buttons-container > .second').click();
        cy.get('.buttons-container > .selected-btn > .btn-name').contains('List 2');
        cy.get('.empty-logo-container').should('exist');
        cy.get('.buttons-container > .third').click();
        cy.get('.buttons-container > .selected-btn > .btn-name').contains('List 3');
        cy.get('.empty-logo-container').should('exist');
        cy.get('.inputText').click({ force: true }).type(phrases.frase1);
        cy.get('.input-btns-container > .btn-info').click({ force: true });
        cy.get('.buttons-container > .fourth').click();
        cy.get('.buttons-container > .selected-btn > .btn-name').contains('List 4');
        cy.get('.empty-logo-container').should('exist');
        cy.get('.inputText').click({ force: true }).type(phrases.frase2);
        cy.get('.input-btns-container > .btn-info').click({ force: true });
        cy.get('.empty-logo-container').should('not.exist');
        cy.get('.buttons-container > .third').click();
        cy.get('.empty-logo-container').should('not.exist');
    });

    it('verifico se il cambio nome delle liste funziona', () => {
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${3}) > .list-title`).click();
        cy.get('[placeholder="List 1"]').type('A');
        cy.get('[placeholder="List 2"]').type('B');
        cy.get('[placeholder="List 3"]').type('C');
        cy.get('[placeholder="List 4"]').type('D');
        cy.get('.save-btn').click();
        cy.wait(1000);

        cy.get('.buttons-container > .first > .btn-name').contains('A');
        cy.get('.buttons-container > .second > .btn-name').contains('B');
        cy.get('.buttons-container > .third > .btn-name').contains('C');
        cy.get('.buttons-container > .fourth > .btn-name').contains('D');

        //Verifico se inserisco un nome vuoto non cambia nulla
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${3}) > .list-title`).click();
        cy.get('[placeholder="A"]').type('A');
        cy.get('[placeholder="B"]').type(' ');
        cy.get('[placeholder="C"]').type('  ');
        cy.get('[placeholder="D"]').type('Z');
        cy.get('.save-btn').click();
        cy.wait(1000);

        cy.get('.buttons-container > .first > .btn-name').contains('A');
        cy.get('.buttons-container > .second > .btn-name').contains('B');
        cy.get('.buttons-container > .third > .btn-name').contains('C');
        cy.get('.buttons-container > .fourth > .btn-name').contains('Z');
    });

});