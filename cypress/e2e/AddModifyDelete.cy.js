/* eslint-disable no-undef */
// Chiedo scusa se scrivo in italiano ma faccio prima a capire. L'inglese lo mastico ma non velocissimo.

// eslint-disable-next-line no-undef
describe('test del componente HeadList', () => {
  const parola = 'vedo la gente scema!';
  const altraParola = 'tu sei il sesto!';

  beforeEach(() => {
    //GLOBALE
    //cy.visit('https://shopping-list-lc.netlify.app/'); 
    //LOCALE
    cy.visit('http://localhost:5173/');
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

  it('verifico se funziona la modalità eliminazione sicura', () => {
    cy.get('.inputText').click().type(parola);
    cy.get('.input-btns-container > .btn-info').click();

    cy.get('.settings').click();
    cy.wait(1500);
    cy.get('.toggle-delete-confirm-container > .text-primary').should('include.text', 'OFF');
    cy.get('.toggle-delete-confirm-container > .toggle-delete-confirm').click({ multiple: true });
    cy.get('.toggle-delete-confirm-container > .text-primary').should('include.text', 'ON');
    cy.get('.close-helper-container > .close-helper').click();

    cy.get('.trash').click();
    cy.get('.confirm-delete-modal-content').should('exist');
    cy.get('.confirm-delete-modal-content > #yes-delete').click();

    cy.get('#draggable-children').should('not.exist');
  });

  it("verifico l'eliminazione di alcuni e di tutti gli elementi", () => {
    const frase1 = 'dottore chiami un dottore';
    const frase2 = 'ho i pugni nelle mani';
    const frase3 = 'marooooon';
    const frase4 = 'shamalayaaa';
    const frase5 = 'è stato li zingheri sono stati!';
    const frase6 = 'come una catapulta!';

    cy.get('.inputText').click().type(frase1);
    cy.get('.input-btns-container > .btn-info').click();
    cy.get('.inputText').click().type(frase2);
    cy.get('.input-btns-container > .btn-info').click();
    cy.get('.inputText').click({ force: true }).type(frase3);
    cy.get('.input-btns-container > .btn-info').click({ force: true });
    cy.get('.inputText').click({ force: true }).type(frase4);
    cy.get('.input-btns-container > .btn-info').click({ force: true });
    cy.get('.inputText').click({ force: true }).type(frase5);
    cy.get('.input-btns-container > .btn-info').click({ force: true });
    cy.get('.inputText').click({ force: true }).type(frase6);
    cy.get('.input-btns-container > .btn-info').click({ force: true });
    cy.get('.btn-outline-info').click();

    // eliminazione solo selezionati
    cy.get('[index="0"] > .cart > img').click({ force: true });
    cy.get('[index="1"] > .cart > img').click({ force: true });
    cy.get('[index="4"] > .cart > img').click({ force: true });
    cy.get('[index="5"] > .cart > img').click({ force: true });

    cy.get('.text-danger').click();
    cy.get('.confirm-delete-modal-content > #yes-delete-selected').click();
    cy.get(`#todo:contains(${frase1})`).should('not.exist');
    cy.get(`#todo:contains(${frase2})`).should('not.exist');
    cy.get(`#todo:contains(${frase5})`).should('not.exist');
    cy.get(`#todo:contains(${frase6})`).should('not.exist');
    cy.get('[index="0"] > #todo').should('include.text', frase3);
    cy.get('[index="1"] > #todo').should('include.text', frase4);

    //eliminazione tutti
    cy.get('.delete-all').click();
    cy.get('.confirm > .btn-primary').click();
    cy.get('#todo-list').should('be.empty');
  });

});