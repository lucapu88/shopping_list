/* eslint-disable no-undef */
import { phrases, shoppingListLocalOrGlobal } from '../support/commands.js';

// Chiedo scusa se scrivo in italiano ma faccio prima a capire. L'inglese lo mastico ma non velocissimo.

// eslint-disable-next-line no-undef
describe('test della pulsantiera di aggiunta categorie, copia e incolla lista e drag n drop', () => {
    beforeEach(() => {
        cy.visit(shoppingListLocalOrGlobal);
    });

    it("verifico il drag n drop", () => {
        cy.addSomeItemsToList(phrases);
        cy.wait(1000);
        cy.get('.pushbutton-container > :nth-child(1)').click({ force: true });
        //posizione INIZIALE deglli elementi
        cy.get('[index="3"] > #draggable-children > #todo').should('include.text', phrases.frase4);
        cy.get('[index="5"] > #draggable-children > #todo').should('include.text', phrases.frase6);
        //effettuo il drag n drop
        cy.get('[index="3"] > #draggable-children').dragTo('[index="5"] > #draggable-children', { steps: 10 });
        //posizione FINALE deglli elementi
        cy.get('[index="3"] > #draggable-children > #todo').should('include.text', phrases.frase5);
        cy.get('[index="4"] > #draggable-children > #todo').should('include.text', phrases.frase4);
    });

    it('verifico il copia e incolla', () => {
        const myText = 'Che la forza sia con te';
        cy.get('.inputText').type(myText);
        cy.get('.input-btns-container > .btn-info').click();

        cy.get('.pushbutton-container > :nth-child(2)').click();
        cy.get('.list-copied').should('exist');
        cy.wait(3100);
        cy.get('.list-copied').should('not.exist');

        cy.window().then((win) => {
            win.navigator.clipboard.readText().then((text) => {
                expect(text.trim()).to.eq(myText);
            });
        });
    });

    it('Inserisco le categorie e verifico se ci sono tutte', () => {
        cy.get('.pushbutton-container > :nth-child(3)').click();
        cy.get('.category-list-container').should('exist');
        //verifico se il numero di categorie è giusto
        const categories = [];
        cy.get('.category-list').each(($ele) => {
            categories.push($ele.text());
        }).then(() => {
            expect(categories.length).to.equal(24);
        }); //avrei voluto testare se le categorie vere e proprie sono le stesse nello store ma al momento ho problemi con la lettura dei componenti importati in cypress...non riesce a trovare i file che sono importati con la shortcut di vite: ovvero @/nome-path

        //verifico se il numero di categorie INSERITE è giusto
        cy.get('.add-remove-empty > :nth-child(1)').click();
        cy.get('#todo-list').each($ele => {
            expect(categories.length).to.equal($ele.children().length);
        });
        //verifico se vengono rimosse tutte
        cy.get('.btn-outline-info').click({ force: true });
        cy.get('.pushbutton-container > :nth-child(3)').click({ force: true });
        cy.get('.add-remove-empty > :nth-child(2)').click({ force: true });
        cy.get('#todo-list').within(() => {
            cy.get('div.empty-logo-container').should('exist');
        });
    });

    it('Verifico se funziona la visualizzazione degli elementi importanti', () => {
        cy.addSomeItemsToList(phrases);
        cy.wait(1000);
        cy.get('[index="2"] > #todo').click();
        cy.get('[index="4"] > #todo').click();
        cy.get('.pushbutton-container > :nth-child(4)').click();
        cy.get('.delete-all').should('not.exist');
        cy.get('.deselect-all-imp-standard').should('exist');

        cy.get(`.active:contains(${phrases.frase3})`).should('exist');
        cy.get(`.active:contains(${phrases.frase5})`).should('exist');
        cy.get(`.todo:contains(${phrases.frase1})`).should('not.exist');
        cy.get(`.todo:contains(${phrases.frase2})`).should('not.exist');
        cy.get(`.todo:contains(${phrases.frase4})`).should('not.exist');
        cy.get(`.todo:contains(${phrases.frase6})`).should('not.exist');

        cy.get('.pushbutton-container > :nth-child(4)').click();
        cy.get(`.active:contains(${phrases.frase3})`).should('exist');
        cy.get(`.active:contains(${phrases.frase5})`).should('exist');
        cy.get(`.todo:contains(${phrases.frase1})`).should('exist');
        cy.get(`.todo:contains(${phrases.frase2})`).should('exist');
        cy.get(`.todo:contains(${phrases.frase4})`).should('exist');
        cy.get(`.todo:contains(${phrases.frase6})`).should('exist');

        cy.get('.pushbutton-container > :nth-child(4)').click();
        cy.get('.deselect-all-imp-standard').click();
        cy.get(`.active:contains(${phrases.frase3})`).should('not.exist');
        cy.get(`.active:contains(${phrases.frase5})`).should('not.exist');
    });
});