/* eslint-disable no-undef */
import { phrases, shoppingListLocalOrGlobal } from '../support/commands.js';

// Chiedo scusa se scrivo in italiano ma faccio prima a capire. L'inglese lo mastico ma non velocissimo.

// eslint-disable-next-line no-undef
describe("test dell'helper e delle impostazioni", () => {
    beforeEach(() => {
        cy.visit(shoppingListLocalOrGlobal);
        cy.wait(1100);
    });

    it("l'helper appare e scompare", () => {
        cy.get('.settings').click();
        cy.get('#helper-description-container').should('exist');
        cy.get('.close-helper').click();
        cy.get('#helper-description-container').should('not.exist');
    });

    it("cambio lingue", () => {
        //Spagnolo
        cy.get('.settings').click();
        cy.get('.btn-lang-center').click();
        cy.wait(1500);
        cy.get('.title').should('include.text', 'Lista de la compra');
        //Italiano
        cy.get('.settings').click();
        cy.get('.btn-lang-right').click();
        cy.wait(1500);
        cy.get('.title').should('include.text', 'Lista Spesa');
        //Inglese
        cy.get('.settings').click();
        cy.get('.btn-lang-left').click();
        cy.wait(1500);
        cy.get('.title').should('include.text', 'Shopping List');

        /*Per il momento verifico solo il titolo, il cazzo con le patate che mi metto a vedere se TUTTE le traduzioni sono corrette!!!
          Scherzo! lo devo fare ma piano piano con calma perchè è tanta roba.*/
    });

    it("cambio temi", () => {
        // light
        cy.get('.settings').click();
        cy.get('.top > .btn-light').click().then(() => {
            //funziona solo in locale, in produzione ovviamente l'url dell'immagine cambia
            cy.get('.container').should('have.css', 'background-image').and('include', '/src/img/foglio_righe.webp');
        });
        cy.get('.settings').click();
        cy.get('.helper-light').should('have.css', 'background-image').and('include', 'repeating-linear-gradient(rgb(204, 204, 204) 0px, rgb(204, 204, 204) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 100%), repeating-linear-gradient(90deg, rgb(204, 204, 204) 0px, rgb(204, 204, 204) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 100%)');

        // dark
        cy.get('.top > .btn-dark').click().then(() => {
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(51, 51, 51)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(255, 255, 255)');
            cy.get('body').should('have.css', 'border').and('include', '10px solid rgb(209, 126, 71)');
        });
        cy.get('.settings').click();
        cy.get('.dark-theme-helper').should('have.css', 'background-color').and('include', 'rgb(56, 83, 54)');
        cy.get('.dark-theme-helper').should('have.css', 'border').and('include', 'rgb(209, 126, 71)');

        // minimal
        cy.get('.top > .minimal-theme').click().then(() => {
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(165, 190, 204)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(124, 62, 102)');
            cy.get('body').should('have.css', 'font-family').and('include', 'Cabin, sans-serif');
        });
        cy.get('.settings').click();
        cy.get('.minimal-theme-helper').should('have.css', 'background-color').and('include', 'rgb(211, 235, 205)');

        // retro/dos
        cy.get('.top > .retro-theme').click().then(() => {
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(9, 10, 12)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(255, 255, 255)');
            cy.get('body').should('have.css', 'font-family').and('include', 'DotGothic16, sans-serif');
        });
        cy.get('.settings').click();
        cy.get('.retro-theme-helper').should('have.css', 'border').and('include', '3px outset rgb(255, 255, 255)');
        cy.get('.retro-theme-helper').should('have.css', 'border-radius').and('include', '0');
        cy.get('.retro-theme-helper').should('have.css', 'background-color').and('include', 'rgb(192, 192, 192)');
    });

    it('autoeliminazione categorie vuote', () => {
        cy.addCategoryAndTodo();
        cy.get('.category').should('exist');
        cy.get('.category > .button-container > .btn').click();

        cy.get('.settings').click().then(() => {
            cy.get('#auto-delete > .text-primary').should('include.text', 'OFF');
            cy.get('#auto-delete > .mr-2').click();
            cy.get('#auto-delete > .text-primary').should('include.text', 'ON');
            cy.get('.close-helper-container > .close-helper').click();
        });

        cy.addCategoryAndTodo();
        cy.get('.category').should('not.exist');
    });

    it('importa lista', () => {
        cy.addSomeItemsToList(phrases);
        cy.get('.pushbutton-container > :nth-child(2)').click({ force: true });
        cy.get('.delete-all').click();
        cy.get('.confirm > .btn-primary').click();
        cy.get('#todo-list').should('be.empty');

        cy.get('.settings').click();
        cy.get('#text-area').click();
        cy.document().invoke('execCommand', 'paste');
        cy.get('.add-list-copied > .btn').click();
        cy.get('#todo-list').should('not.be.empty');
    });

    it('condividi link app', () => {
        const storeAppLink = 'https://play.google.com/store/apps/details?id=io.kodular.caputoluca88.Shopping_List';

        cy.get('.settings').click();
        cy.get('#share').click();


        cy.window().then((win) => {
            win.navigator.clipboard.readText().then((text) => {
                expect(text.trim()).to.eq(storeAppLink);
            });
        });
    });
});
