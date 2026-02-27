/* eslint-disable no-undef */
import { shoppingListLocalOrGlobal } from '../support/commands.js';

// eslint-disable-next-line no-undef
describe('Periodic-list-container e2e', () => {
    beforeEach(() => {
        cy.visit(shoppingListLocalOrGlobal);
        cy.closeBlockingElements();
        cy.hideUpdatesAlertsModal();
    });

    it("Verifico il funzionamento del pulsante che mostra il pannello e la sua visibilità", () => {
        cy.get('.inputText').click({ force: true });
        cy.wait(200);
        cy.get('.show-periodic-list-button').click();
        cy.get('.periodic-list-container').should('exist').and('be.visible');
        cy.get('.periodic-list-container .title').should('exist');
        cy.get('.periodic-list-container .title button').should('exist');
    });

    it("Verifico l'inserimento di un elemento e la sua visibilità nel pannello e la sua rimozione", () => {
        cy.get('.inputText').click({ force: true }).type('cadrega');
        cy.get('.input-btns-container > .btn-info').click({ force: true });
        cy.get('.btn-outline-success').click();
        cy.get('.alert-container').should('exist');
        cy.wait(2300);
        cy.get('.alert-container').should('not.exist');
        cy.get('.inputText').click({ force: true });
        cy.wait(200);
        cy.get('.show-periodic-list-button').click();
        cy.get(':nth-child(1) > .periodic-todo-name').contains('> cadrega');

        cy.get('.periodic-list-todo-container > ul > :nth-child(1) > .btn').click();
        cy.get('.btn-success').click();
        cy.get('.periodic-list-todo-container > ul > :nth-child(1) > .btn').should('not.exist');
    });

    it("Verifico l'eliminazione di un elemento dalla lista periodica", () => {
        cy.get('.inputText').click({ force: true }).type('fuori dal letto? nessuno è perfetto');
        cy.get('.input-btns-container > .btn-info').click({ force: true });
        cy.get('.btn-outline-success').click();
        cy.get('.close-x-btn').click();
        cy.get('.input-btns-container > .btn-info').click({ force: true });
        cy.get('.trash').click();
        cy.get('.periodic-todo-name').should('not.exist');
    });

    it("Verifico l'inserimento di un elemento dal pannello nella lista principale", () => {
        /* Questo test potevo tranquillamente inserirlo insieme a quello qui sopra senza riscrivere codice qui sotto,
           ma purtroppo cypress è una merda e per non so quale magia si rompe il test nel punto cy.get('.show-periodic-list-button').click(); CHE É IDENTICO A TUTTI GLI ALTRI PIÙ SU DOVE NON SI ROMPE!
           Come mai accade??? cazzo ne so! chiedete ai cani che sviluppano cypress...io ho smesso di chiedermi cose su cypress! */
        const aldoGiovanniGiacomo = 'Chi sa fare sa capire!';

        cy.get('.inputText').click({ force: true }).type(aldoGiovanniGiacomo);
        cy.get('.input-btns-container > .btn-info').click({ force: true });
        cy.get('.btn-outline-success').click({ force: true });
        cy.get('.close-x-btn').click();

        cy.get('.inputText').click({ force: true });
        cy.wait(200);
        cy.get('.show-periodic-list-button').click();
        cy.get('.periodic-todo-name').click({ force: true });
        cy.get('#categories > :nth-child(12)').click({ force: true });

        cy.get('.periodic-list-todo').should('have.class', 'btn-selected');
        cy.get('#categories > :nth-child(12)').should('have.class', 'btn-selected');
        cy.get('.confirm-container > .btn').click();
        cy.get('.periodic-list-todo').should('not.have.class', 'btn-selected');
        cy.get('#categories > :nth-child(12)').should('not.have.class', 'btn-selected');

        cy.get('.close-periodic-panel').click();

        cy.get('.category > #todo').contains('household').should('exist');
        cy.get('[index="2"] > #todo').contains(aldoGiovanniGiacomo).should('exist');
    });

});