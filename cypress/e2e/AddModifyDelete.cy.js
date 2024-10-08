/* eslint-disable no-undef */
import { phrases, shoppingListLocalOrGlobal } from '../support/commands.js';
// Chiedo scusa se scrivo in italiano ma faccio prima a capire. L'inglese lo mastico ma non velocissimo.

// eslint-disable-next-line no-undef
describe("test dell'input di inserimento todo, della modifica di un todo e dell'eliminazione", () => {
  const parola = 'vedo la gente scema!';
  const altraParola = 'tu sei il sesto!';

  beforeEach(() => {
    cy.visit(shoppingListLocalOrGlobal);
  });

  it('inserisco qualcosa nella lista, poi la modifico e la elimino.', () => {
    // aggiunta elemento
    cy.get('.inputText').click().type(parola);
    cy.get('.input-btns-container > .btn-info').click();
    cy.get('#draggable-children').should('exist').should('include.text', parola);
    // modifica elemento
    cy.get('.pencil').click();
    cy.get('.modify-input').clear().type(altraParola);
    cy.get('.floppy').click();
    cy.get('#draggable-children').should('exist').should('include.text', altraParola);
    // cancella elemento
    cy.get('.trash').click();
    cy.get('#draggable-children').should('not.exist');
  });

  it('verifico se funzionano i suggerimenti nelle categorie', () => {
    cy.get('.pushbutton-container > :nth-child(3)').click({ multiple: true });
    cy.get('.categories > :nth-child(20) > .animation-no-retro').click({ force: true });
    cy.get('#todo-list').children().should('have.length', 1);

    cy.get('#todo').click();
    cy.get('.tips-btn').should('exist').click();

    cy.get('.suggestions-modal-container').should('exist');
    cy.get('main > :nth-child(2)').click();
    cy.get('.suggestions-modal-container').should('not.exist');

    cy.get('#todo-list').children().should('have.length', 2);
  });

  it('verifico se funziona la modalità eliminazione sicura', () => {
    cy.get('.inputText').click().type(parola);
    cy.get('.input-btns-container > .btn-info').click();

    cy.get('.settings').click();
    cy.wait(1500);
    cy.get('#helper-description > :nth-child(4) > .list-title').click();
    cy.get('#safe-delete > .text-primary').should('include.text', 'OFF');
    cy.get('#safe-delete > .hand-pointing').click({ multiple: true });
    cy.get('#safe-delete > .text-primary').should('include.text', 'ON');
    cy.get('.close-helper-container > .close-helper').click();

    cy.get('.trash').click();
    cy.get('.confirm-delete-modal-content').should('exist');
    cy.get('.confirm-delete-modal-content > #yes-delete').click();

    cy.get('#draggable-children').should('not.exist');
  });

  it("verifico l'eliminazione di alcuni e di tutti gli elementi", () => {
    cy.addSomeItemsToList(phrases);

    // eliminazione solo selezionati
    cy.get('[index="0"] > .checkbox').click({ force: true });
    cy.get('[index="1"] > .checkbox').click({ force: true });
    cy.get('[index="4"] > .checkbox').click({ force: true });
    cy.get('[index="5"] > .checkbox').click({ force: true });

    cy.get('.text-danger').click();
    cy.get('.confirm-delete-modal-content > #yes-delete-selected').click();
    cy.get(`#todo:contains(${phrases.frase1})`).should('not.exist');
    cy.get(`#todo:contains(${phrases.frase2})`).should('not.exist');
    cy.get(`#todo:contains(${phrases.frase5})`).should('not.exist');
    cy.get(`#todo:contains(${phrases.frase6})`).should('not.exist');
    cy.get('[index="0"] > #todo').should('include.text', phrases.frase3);
    cy.get('[index="1"] > #todo').should('include.text', phrases.frase4);

    //eliminazione tutti
    cy.get('.delete-all').click();
    cy.get('.confirm > .btn-primary').click();
    cy.get('#todo-list').within(() => {
      cy.get('div.empty-logo-container').should('exist');
    });
  });

});