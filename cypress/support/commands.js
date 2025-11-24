/* eslint-disable no-undef */

// PER FAR PARTIRE CYPRESS CON INTERFACCIA GRAFICA:  npx cypress open
// PER FAR PARTIRE CYPRESS SOLO DA TERMINALE:  npx cypress run

// PER FAR PARTIRE I TEST E PUSHARE SE I TEST VANNO A BUON FINE: npm run push
// PER FAR PARTIRE I TEST E PUSHARE CON FORCE SE C'È STATO UN COMMIT CON AMEND: npm run push-amend

// ***********************************************
// This example commands.js shows you how to create various custom commands and overwrite existing commands.
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// export const shoppingListLocalOrGlobal = 'https://shopping-list-lc.netlify.app/';
export const shoppingListLocalOrGlobal = 'http://localhost:5173/';

export const phrases = {
  frase1: 'dottore chiami un dottore',
  frase2: 'ho i pugni nelle mani',
  frase3: 'marooooon',
  frase4: 'shamalayaaa',
  frase5: 'è stato li zingheri sono stati!',
  frase6: 'come una catapulta!',
};

//AGGIUNGE ELEMENTI IN LISTA 
Cypress.Commands.add('addSomeItemsToList', (phrases) => {
  cy.get('.inputText').click({ force: true }).type(phrases.frase1);
  cy.get('.input-btns-container > .btn-info').click({ force: true });
  cy.get('.inputText').click({ force: true }).type(phrases.frase2);
  cy.get('.input-btns-container > .btn-info').click({ force: true });
  cy.get('.inputText').click({ force: true }).type(phrases.frase3);
  cy.get('.input-btns-container > .btn-info').click({ force: true });
  cy.get('.inputText').click({ force: true }).type(phrases.frase4);
  cy.get('.input-btns-container > .btn-info').click({ force: true });
  cy.get('.inputText').click({ force: true }).type(phrases.frase5);
  cy.get('.input-btns-container > .btn-info').click({ force: true });
  cy.get('.inputText').click({ force: true }).type(phrases.frase6);
  cy.get('.input-btns-container > .btn-info').click({ force: true });
  cy.get('.btn-outline-info').click({ force: true });
});

Cypress.Commands.add('addCategoryAndTodo', () => {
  cy.get('.pushbutton-container > :nth-child(4)').click({ force: true });
  cy.get('.categories > :nth-child(18) > span').click({ force: true });
  cy.get('.inputText').click().type('zucchine da mangiare');
  cy.get('.input-btns-container > .btn-info').click({ force: true });
  cy.get('.button-container > :nth-child(2)').click({ force: true });
});

const getCoords = ($el) => {
  const domRect = $el[0].getBoundingClientRect();
  const coords = { x: domRect.left + (domRect.width / 2 || 0), y: domRect.top + (domRect.height / 2 || 0) };
  return coords;
};
// TRIGGERA IL DRAG N DROP https://stackoverflow.com/questions/55361499/how-to-implement-drag-and-drop-in-cypress-test
const dragTo = (subject, to) => {
  const win = subject[0].ownerDocument.defaultView;
  const elFromCoords = (coords) => win.document.elementFromPoint(coords.x, coords.y);
  const winMouseEvent = win.MouseEvent;

  const send = (type, coords, el) => {
    el = el || elFromCoords(coords);
    el.dispatchEvent(
      new winMouseEvent(type, Object.assign({}, { clientX: coords.x, clientY: coords.y }, { bubbles: true, cancelable: true }))
    );
  };

  function drag(from, to, steps = 1) {
    const fromEl = elFromCoords(from);
    const _log = Cypress.log({
      $el: fromEl,
      name: 'drag to',
    });

    _log.snapshot('before', { next: 'after', at: 0 });
    _log.set({ coords: to });

    send('mouseover', from, fromEl);
    send('mousedown', from, fromEl);

    cy.then(() => {
      return Cypress.Promise.try(() => {
        if (steps > 0) {
          const dx = (to.x - from.x) / steps;
          const dy = (to.y - from.y) / steps;

          return Cypress.Promise.map(Array(steps).fill(), (v, i) => {
            i = steps - 1 - i;

            let _to = {
              x: from.x + dx * (i),
              y: from.y + dy * (i),
            };
            send('mousemove', _to, fromEl);
          }, { concurrency: 1 });
        }
      }).then(() => {
        send('mousemove', to, fromEl);
        send('mouseover', to);
        send('mousemove', to);
        send('mouseup', to);
        _log.snapshot('after', { at: 1 }).end();
      });
    });
  }
  const $el = subject;
  const fromCoords = getCoords($el);
  const toCoords = getCoords(cy.$$(to));

  drag(fromCoords, toCoords);
};

Cypress.Commands.addAll({ prevSubject: 'element' }, { dragTo, });