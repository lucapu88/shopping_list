/* eslint-disable no-undef */
import { shoppingListLocalOrGlobal } from '../support/commands.js';


// eslint-disable-next-line no-undef
describe("test della modale che appare appena si scarica l'app", () => {
    beforeEach(() => {
        cy.visit(shoppingListLocalOrGlobal);
        cy.wait(1100);
    });

    it("verifico se appena aperto l'app, appare la modale", () => {
        window.localStorage.clear();

        cy.get('.modal-content').should('exist');

        cy.get('.boldi-cipollino').should('include.text', "Do you want to see a short video tutorial?");
        cy.get(':nth-child(1) > .flag').should('have.attr', 'src').and('include', 'inglese.webp');

        cy.get(':nth-child(2) > .flag').should('have.attr', 'src').and('include', 'spagnolo.webp');
        cy.get(':nth-child(2) > .flag').click({ force: true });
        cy.get('.boldi-cipollino').should('include.text', "¿Quieres ver un breve vídeo tutorial?");

        cy.get(':nth-child(3) > .flag').should('have.attr', 'src').and('include', 'italiano.webp');
        cy.get(':nth-child(3) > .flag').click({ force: true });
        cy.get('.boldi-cipollino').should('include.text', "vuoi vedere un breve video tutorial?");
    });

    it("verifico se cliccando su si appare il video, e poi se cliccando su no si chiude la modale", () => {
        cy.get('.btn-success').click({ force: true });
        cy.get('.video-container').should('exist');

        Cypress.on('uncaught:exception', (err) => {
            //per ovviare un errore idiota non utile al fine dei test
            if (err.name === 'AbortError') {
                return false;
            }
        });
        cy.get('.close-tutorial').click();

        cy.get('.btn-container > span').contains('?').click({ force: true });
        cy.get('.modal-content').should('exist');
        cy.get('.empty-div').click({ force: true });

        //faccio un cambio lista solo per ricaricare la pagina e vedere che la modale non appare più automaticamente
        cy.get('.btn-back-to-top').click({ force: true });
        cy.wait(500);
        cy.get('.show-lists-img').click({ force: true });
        cy.get(':nth-child(5) > .apply-moving-wrapper').click({ force: true });
        cy.get('.modal-content').should('not.exist');
    });

});
