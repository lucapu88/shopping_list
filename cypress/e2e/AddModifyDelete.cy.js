/* eslint-disable no-undef */
import { phrases, shoppingListLocalOrGlobal } from '../support/commands.js';
// Chiedo scusa se scrivo in italiano ma faccio prima a capire. L'inglese lo mastico ma non velocissimo.

// eslint-disable-next-line no-undef
describe("test dell'input di inserimento todo, della modifica di un todo e dell'eliminazione", () => {
  const parola = 'vedo la gente scema!';
  const altraParola = 'tu sei il sesto!';
  const altraParolaAncora = '15 + 18 quanto fa?!';

  beforeEach(() => {
    cy.visit(shoppingListLocalOrGlobal);
    cy.closeBlockingElements();
    cy.hideUpdatesAlertsModal();
  });

  it('inserisco qualcosa nella lista, poi la modifico e la elimino.', () => {
    // aggiunta elemento
    cy.get('.inputText').click({ force: true }).type(parola);
    cy.get('.input-btns-container > .btn-info').click({ force: true });
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

  it('inserisco qualcosa nella lista MA in una categoria specifica.', () => {
    cy.get('.inputText').click({ force: true });
    cy.get('#category-list-container').should('exist');
    cy.get('.input-btns-container').click({ force: true });
    cy.get('#category-list-container').should('not.exist');
    // inserisco nuovo elemento
    cy.get('.inputText').click({ force: true }).type(parola);
    cy.get('.categories > :nth-child(1)').click();
    cy.get('.input-btns-container > .btn-info').click({ force: true });
    cy.get('#draggable-children').should('exist').should('have.class', 'category').should('include.text', '👶babies ');
    // verifico se funziona su elemento esistente
    cy.get('.inputText').click({ force: true }).type(altraParola);
    cy.get('.categories > :nth-child(2)').click();
    cy.get('.input-btns-container > .btn-info').click({ force: true });
    cy.get('.inputText').click({ force: true }).type(altraParolaAncora);
    cy.get('.categories > :nth-child(1)').click();
    cy.get('.input-btns-container > .btn-info').click({ force: true });
    cy.contains('👶babies ').should('have.length', 1);
    cy.get('.remove-selected-cat').click({ force: true });
    //verifico se togliendo il focus dall'input e poi rientro nell'input, azzera le categorie selezionate
    cy.get('.inputText').click({ force: true });
    cy.get('.categories > :nth-child(1)').click();
    cy.get('.categories > :nth-child(1)').should('have.class', 'btn-selected');
    cy.get('.remove-selected-cat').click({ force: true });
    cy.get('#category-list-container').should('not.exist');
    cy.get('.inputText').click({ force: true });
    cy.get('#category-list-container').should('exist');
    cy.get('.categories > :nth-child(1)').should('not.have.class', 'btn-selected');
    cy.get('.inputText').click({ force: true }).type("la bambaaaaaaaaaaaa");
    cy.get('.input-btns-container > .btn-info').click({ force: true });
    cy.get('#todo-list').children().last().should('contain.text', 'la bambaaaaaaaaaaaa');
  });

  it('verifico se funzionano i suggerimenti nelle categorie', () => {
    cy.get('.pushbutton-container > :nth-child(4)').click({ force: true, multiple: true });
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
    cy.get('.inputText').click({ force: true }).type(parola);
    cy.get('.input-btns-container > .btn-info').click({ force: true });

    cy.get('.settings').click();
    cy.wait(1500);
    cy.get('#helper-description > :nth-child(5) > .list-title').click();
    cy.get('#safe-delete > .text-primary').should('include.text', 'OFF');
    cy.get('#safe-delete > .hand-pointing').click({ multiple: true });
    cy.get('#safe-delete > .text-primary').should('include.text', 'ON');
    cy.get('.close-helper-container > .close-helper').click();

    cy.get('.trash').click();
    cy.get('.confirm-delete-modal-content').should('exist');
    cy.get('.confirm-delete-modal-content > .confirm-buttons-container > #yes-delete').click({ force: true });

    cy.get('#draggable-children').should('not.exist');
  });

  it("verifico l'eliminazione di alcuni e di tutti gli elementi", () => {
    cy.addSomeItemsToList(phrases);
    //controllo deseleziona tutti
    cy.get('[index="0"] > .checkbox').click({ force: true });
    cy.get('[index="1"] > .checkbox').click({ force: true });
    cy.get('[index="4"] > .checkbox').click({ force: true });
    cy.get('[index="0"] > .checkbox').should('have.class', 'checked');
    cy.get('[index="1"] > .checkbox').should('have.class', 'checked');
    cy.get('[index="4"] > .checkbox').should('have.class', 'checked');
    cy.get('.deselect-all').first().click({ multiple: true });
    cy.get('.confirm-deselect-all-container > .btn-success').click();
    cy.get('[index="0"] > .checkbox').should('not.have.class', 'checked');
    cy.get('[index="1"] > .checkbox').should('not.have.class', 'checked');
    cy.get('[index="4"] > .checkbox').should('not.have.class', 'checked');

    // eliminazione solo selezionati
    cy.get('[index="0"] > .checkbox').click({ force: true });
    cy.get('[index="1"] > .checkbox').click({ force: true });
    cy.get('[index="4"] > .checkbox').click({ force: true });
    cy.get('[index="5"] > .checkbox').click({ force: true });

    cy.get('#trash').click({ multiple: true });
    cy.get('.confirm-delete-modal-content > .confirm-buttons-container > #yes-delete-selected').click({ force: true });
    cy.get(`#todo:contains(${phrases.frase1})`).should('not.exist');
    cy.get(`#todo:contains(${phrases.frase2})`).should('not.exist');
    cy.get(`#todo:contains(${phrases.frase5})`).should('not.exist');
    cy.get(`#todo:contains(${phrases.frase6})`).should('not.exist');
    cy.get('[index="0"] > #todo').should('include.text', phrases.frase3);
    cy.get('[index="1"] > #todo').should('include.text', phrases.frase4);

    //eliminazione tutti
    cy.get('.delete-all').click();
    cy.get('.confirm > .btn-success').click();
    cy.get('div.empty-logo-container').should('exist');
  });

  it('verifico se inserendo un elemento duplicato, te lo segnala', () => {
    cy.get('.inputText').click({ force: true }).type(parola);
    cy.get('.input-btns-container > .btn-info').click({ force: true });
    cy.get('.inputText').click().type(parola);
    cy.get('.input-btns-container > .btn-info').click();
    cy.get('.duplicate-container').should('exist');
    //Clicco su NO
    cy.get('.btn-dark').click();
    cy.get('.duplicate-container').should('not.exist');
    cy.get('.inputText').should('have.value', '');
    cy.get('#todo-list').should('have.length', 1);
    let todos = [];
    cy.get('#todo-list').each(($todo) => {
      todos.push($todo.text());
    }).then(() => {
      expect(todos.length).to.equal(1);
    });
    //Clicco su SI
    todos = [];
    cy.get('.inputText').click({ force: true }).type(parola);
    cy.get('.input-btns-container > .btn-info').click();
    cy.get('.btn-success').click();
    cy.get('.duplicate-container').should('not.exist');
    cy.get('#todo-list').each(($todo) => {
      todos.push($todo.text());
    }).then(() => {
      expect(todos.length).to.equal(2);
    });
  });

  it('verifico se nasconde/mostra gli elementi selezionati', () => {
    cy.addSomeItemsToList(phrases);

    cy.get('[index="0"] > .checkbox').click({ force: true });
    cy.get('.eye').click();
    cy.get('.eye').should('have.attr', 'src', '/src/img/icons/eye-open.webp');
    cy.get(`#todo:contains(${phrases.frase1})`).should('not.be.visible');

    cy.get('.eye').click();
    cy.get('.eye').should('have.attr', 'src', '/src/img/icons/eye-close.webp');
    cy.get(`#todo:contains(${phrases.frase1})`).should('be.visible');
  });

});