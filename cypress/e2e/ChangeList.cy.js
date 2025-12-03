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
        // Resetto il localStorage altrimenti se rieseguo il test va in errore perchè tiene in canna i nomi delle liste salvati in precedenza
        window.localStorage.clear();

        cy.addSomeItemsToList(phrases);

        const lists = ['List 1', 'List 2', 'List 3', 'List 4'];
        cy.showListsButtonClick();
        cy.get('.buttons-container > .selected-btn > .apply-moving-wrapper > .btn-name').each(($btn, $i) => {
            cy.wrap($btn).should('contain.text', lists[$i]);
        });
        cy.get('.empty-logo-container').should('not.exist');

        cy.get('.buttons-container > :nth-child(5)').click();
        cy.wait(1000);

        cy.get('.empty-logo-container').should('exist');

        cy.showListsButtonClick();
        cy.get('.buttons-container > :nth-child(6)').click();

        cy.get('.empty-logo-container').should('exist');
        cy.get('.inputText').click({ force: true }).type(phrases.frase1);
        cy.get('.input-btns-container > .btn-info').click({ force: true });
        cy.wait(500);

        cy.showListsButtonClick();
        cy.get('.buttons-container > :nth-child(7)').click();
        cy.wait(500);

        cy.get('.empty-logo-container').should('exist');
        cy.get('.inputText').click({ force: true }).type(phrases.frase2);
        cy.get('.input-btns-container > .btn-info').click({ force: true });
        cy.wait(500);
        cy.get('.empty-logo-container').should('not.exist');

        cy.showListsButtonClick();
        cy.get('.buttons-container > :nth-child(6)').click();
        cy.wait(500);
        cy.get('.empty-logo-container').should('not.exist');
    });

    it('verifico se il cambio nome delle liste funziona', () => {
        cy.get('.settings').click({ force: true });
        cy.get(`#helper-description > :nth-child(${3}) > .list-title`).click();
        cy.get('[placeholder="List 1"]').type('A');
        cy.get('[placeholder="List 2"]').type('B');
        cy.get('[placeholder="List 3"]').type('C');
        cy.get('[placeholder="List 4"]').type('D');
        cy.get('.save-btn').click();
        cy.wait(1000);

        cy.showListsButtonClick();
        checkListNameChange('D');

        //Verifico se inserisco un nome vuoto non cambia nulla
        cy.get('.btn-back-to-top').click({ force: true });
        cy.wait(500);
        cy.get('.settings').click({ force: true });
        cy.get(`#helper-description > :nth-child(${3}) > .list-title`).click();
        cy.get('[placeholder="A"]').type('A');
        cy.get('[placeholder="B"]').type(' ');
        cy.get('[placeholder="C"]').type('  ');
        cy.get('[placeholder="D"]').type('Z');
        cy.get('.save-btn').click();
        cy.wait(1000);

        cy.showListsButtonClick();
        checkListNameChange('Z');

        function checkListNameChange(letter) {
            const letters = [letter, 'A', 'B', 'C'];
            cy.get('.buttons-container > :nth-child(4) > .apply-moving-wrapper > .btn-name').each(($btn, $i) => {
                cy.wrap($btn).should('contain.text', letters[$i]);

            });
        }
    });

    it('verifico se al cambio lista aggiorna la lista corrente sotto il titolo', () => {
        cy.showListsButtonClick();
        cy.get('.buttons-container > :nth-child(6)').click();
        cy.get('.selected-list-name > span').should('contain.text', 'You are writing on the list: List 6');

        cy.showListsButtonClick();
        cy.get('.buttons-container > :nth-child(7)').click();
        cy.get('.selected-list-name > span').should('contain.text', 'You are writing on the list: List 7');

        //Me ne bastano solo 2, anzi teoricamente bastava 1, non li controllo tutti tutti dato che la funzione è sempre la stessa identica su tutti i pulsanti
    });

    it("verifico se selezionando la stessa lista impedisce il cambio e lancia l'alert", () => {
        cy.showListsButtonClick();
        cy.get('.buttons-container > :nth-child(6)').click({ force: true });
        cy.wait(1000);
        cy.showListsButtonClick();
        cy.get('.buttons-container > :nth-child(6)').click({ force: true });
        cy.get('.bottom > .text-danger').should('exist');
        cy.wait(3100);
        cy.get('.bottom > .text-danger').should('not.exist');
    });

});