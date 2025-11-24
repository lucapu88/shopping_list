/* eslint-disable no-undef */
import { phrases, shoppingListLocalOrGlobal } from '../support/commands.js';


// eslint-disable-next-line no-undef
describe("test del salvataggio ultime eliminazioni", () => {
    beforeEach(() => {
        cy.visit(shoppingListLocalOrGlobal);
        cy.wait(1100);
    });


    it('mostra ultime eliminazioni singole', () => {
        addPhrasesAndRemoveSome();

        checkPhrasesDeleted(1, '.top');

        cy.get('.close-helper').click();
        cy.get('.show-lists-img').click();
        cy.wait(1000);
        cy.get('.buttons-container > :nth-child(5)').click();
        cy.wait(900);
        addPhrasesAndRemoveSome();
        checkPhrasesDeleted(2, '.top');

        cy.get('.close-helper').click();
        cy.get('.show-lists-img').click();
        cy.wait(1000);
        cy.get('.buttons-container > :nth-child(6)').click();
        cy.wait(900);
        addPhrasesAndRemoveSome();
        checkPhrasesDeleted(1, '.bottom');

        cy.get('.close-helper').click();
        cy.get('.show-lists-img').click();
        cy.wait(1000);
        cy.get('.buttons-container > :nth-child(7)').click();
        cy.wait(900);
        addPhrasesAndRemoveSome();
        checkPhrasesDeleted(2, '.bottom');

        function addPhrasesAndRemoveSome() {
            cy.get('.inputText').click({ force: true }).type(phrases.frase6);
            cy.get('.input-btns-container > .btn-info').click({ force: true });
            cy.get('[index="0"] > .button-container > :nth-child(2) > .trash').click({ force: true });
        }

        function checkPhrasesDeleted(childNumber, classType) {
            cy.get('.settings').click();
            cy.get('#helper-description > :nth-child(9) > .list-title').click();
            cy.get('.todo-deleted-container > .top > :nth-child(1) > :nth-child(2)');
            cy.get(`.todo-deleted-container > ${classType} > :nth-child(${childNumber}) > :nth-child(2)`).should('include.text', phrases.frase6);
            cy.get(`.todo-deleted-container > ${classType} > :nth-child(${childNumber}) > :nth-child(3)`).should('include.text', setDate());
        }
    });

    it('mostra ultime eliminazioni multiple', () => {
        addPhrasesAndRemoveSome();

        checkPhrasesDeleted(1, '.top');

        cy.get('.close-helper').click();
        cy.get('.show-lists-img').click();
        cy.wait(1000);
        cy.get('.buttons-container > :nth-child(5)').click();
        cy.wait(900);
        addPhrasesAndRemoveSome();
        checkPhrasesDeleted(2, '.top');

        cy.get('.close-helper').click();
        cy.get('.show-lists-img').click();
        cy.wait(1000);
        cy.get('.buttons-container > :nth-child(6)').click();
        cy.wait(900);
        addPhrasesAndRemoveSome();
        checkPhrasesDeleted(1, '.bottom');

        cy.get('.close-helper').click();
        cy.get('.show-lists-img').click();
        cy.wait(1000);
        cy.get('.buttons-container > :nth-child(7)').click();
        cy.wait(900);
        addPhrasesAndRemoveSome();
        checkPhrasesDeleted(2, '.bottom');

        function addPhrasesAndRemoveSome() {
            cy.addSomeItemsToList(phrases);
            cy.get('[index="0"] > .checkbox').click({ force: true });
            cy.get('[index="1"] > .checkbox').click({ force: true });
            cy.get('[index="4"] > .checkbox').click({ force: true });
            cy.get('.text-danger').first().click();
            cy.get('.confirm-delete-modal-content > .confirm-buttons-container > #yes-delete-selected').click({ force: true });
            cy.get('[index="1"] > .button-container > :nth-child(2)').click({ force: true });
        }

        function checkPhrasesDeleted(childNumber, classType) {
            cy.get('.settings').click();
            cy.get('#helper-description > :nth-child(9) > .list-title').click();
            cy.get(`.multiple-deleted-container > ${classType} > :nth-child(${childNumber}) > :nth-child(2)`).should('include.text', phrases.frase1);
            cy.get(`.multiple-deleted-container > ${classType} > :nth-child(${childNumber}) > :nth-child(3)`).should('include.text', phrases.frase2);
            cy.get(`.multiple-deleted-container > ${classType} > :nth-child(${childNumber}) > :nth-child(4)`).should('include.text', phrases.frase5);
            cy.get(`.multiple-deleted-container > ${classType} > :nth-child(${childNumber}) > :nth-child(5)`).should('include.text', setDate());
        }
    });

    function setDate() {
        //TOFIX è la stessa che c'è nel settingsStore, valla a prendere da li
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }
});
