/* eslint-disable no-undef */
import { phrases, shoppingListLocalOrGlobal } from '../support/commands.js';

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

    // it("Aggiorna app", () => {
    //     cy.get('.settings').click();
    //     cy.get('#helper-description > :nth-child(3) > .list-title').click();
    // });

    it("cambio lingue", () => {
        const childNumber = 4;
        //Spagnolo
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.btn-lang-center').click();
        cy.wait(1500);
        cy.get('.title').should('include.text', 'Lista de la compra');
        //Italiano
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.btn-lang-right').click();
        cy.wait(1500);
        cy.get('.title').should('include.text', 'Lista Spesa');
        //Inglese
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.btn-lang-left').click();
        cy.wait(1500);
        cy.get('.title').should('include.text', 'Shopping List');

        /*Per il momento verifico solo il titolo...Il cazzo con le patate che mi metto a vedere se TUTTE le traduzioni sono corrette!!!
          Scherzo! lo devo fare ma piano piano con calma perchè è tanta roba.*/
    });

    it('autoeliminazione categorie vuote', () => {
        cy.addCategoryAndTodo();
        cy.get('.category').should('exist');
        cy.get('.category > .button-container > .btn').click({ force: true });

        cy.get('.settings').click().then(() => {
            cy.get('#helper-description > :nth-child(7) > .list-title').click();
            cy.get('#auto-delete > .text-primary').should('include.text', 'OFF');
            cy.get('#auto-delete > u').click();
            cy.get('#auto-delete > .text-primary').should('include.text', 'ON');
            cy.get('.close-helper-container > .close-helper').click();
        });

        cy.addCategoryAndTodo();
        cy.get('.category').should('not.exist');
    });

    it('inserimento multiplo di elementi in categoria', () => {
        cy.get('.pushbutton-container > :nth-child(4)').click();
        cy.get('.categories > :nth-child(1)').click();
        cy.get('#todo').click();
        cy.get('.inputText').type('Ile <3');
        cy.get('.plane').click();
        categoryCheck();

        cy.get('.settings').click();
        cy.get('#helper-description > :nth-child(8) > .list-title').click();
        cy.get('.text-primary').should('include.text', 'ON');
        cy.get('#auto-delete > .hand-pointing').click();
        cy.get('.text-primary').should('include.text', 'OFF');
        cy.get('.close-helper').click();

        cy.get('.inputText').type('Ile :-)');
        cy.get('.plane').click();
        categoryCheck('not');

        function categoryCheck(not) {
            const haveClass = not ? 'not.have.class' : 'have.class';
            const exist = not ? 'not.exist' : 'exist';

            cy.get('li').first().should(haveClass, 'selected');
            cy.get('.tips-container').should(haveClass, 'waterfall-descent');
            cy.get('.remove-selected-cat').should(exist);
        }
    });

    it('importa ultimo backup lista', () => {
        cy.addSomeItemsToList(phrases);
        cy.get('.pushbutton-container > :nth-child(3)').click({ force: true });
        cy.get('.delete-all').click();
        cy.get('.confirm > .btn-primary').click();
        checkBackupSuccessful();

        cy.get('[index="0"] > .button-container > :nth-child(2)').click({ force: true });
        checkBackupSuccessful();

        cy.get('[index="4"] > .checkbox').click({ force: true });
        cy.get('.text-danger').first().click();
        cy.get('.confirm-delete-modal-content > .confirm-buttons-container > #yes-delete-selected').click({ force: true });
        checkBackupSuccessful();

        function checkBackupSuccessful() {
            cy.get('.settings').click();
            cy.get('#helper-description > :nth-child(10) > .list-title').click();
            cy.get('#backup-button').click();
            cy.get('#confirm-backup').click();
            cy.get('[index="0"] > #todo').should('have.text', `${phrases.frase1} `);
            cy.get('[index="1"] > #todo').should('have.text', `${phrases.frase2} `);
            cy.get('[index="2"] > #todo').should('have.text', `${phrases.frase3} `);
            cy.get('[index="3"] > #todo').should('have.text', `${phrases.frase4} `);
            cy.get('[index="4"] > #todo').should('have.text', `${phrases.frase5} `);
            cy.get('[index="5"] > #todo').should('have.text', `${phrases.frase6} `);
        }
    });

    it('importa lista', () => {
        cy.addSomeItemsToList(phrases);
        const fraseDaIncollareMock = "DOTTORE CHIAMI UN DOTTOREEEE!!!!";

        cy.get('.pushbutton-container > :nth-child(3)').click({ force: true });
        cy.get('.delete-all').click({ force: true });
        cy.get('.confirm > .btn-primary').click({ force: true });
        cy.get('#todo-list').within(() => {
            cy.get('div.empty-logo-container').should('exist');
        });
        cy.get('.settings').click({ force: true });
        cy.get('#helper-description > :nth-child(11) > .list-title').click({ force: true });
        cy.get('#text-area').click({ force: true });
        //Cypress non supporta nativamente execCommand('paste') e dato che non è lo scopo del test, lo vado a simulare inserendo un testo standard.
        cy.get('#text-area').type(fraseDaIncollareMock);
        cy.get('.add-list-copied > .btn').click({ force: true });
        cy.get('#todo-list').within(() => {
            cy.get('div.empty-logo-container').should('not.exist');
            cy.get('[index="0"] > #todo').should('have.text', `${fraseDaIncollareMock} `);
        });
    });

    it('condividi link app', () => {
        const storeAppLink = 'https://play.google.com/store/apps/details?id=io.kodular.caputoluca88.Shopping_List';

        cy.get('.settings').click().then(() => {
            cy.get('#share').click();
        });
        cy.window().then((win) => {
            win.navigator.clipboard.readText().then((text) => {
                expect(text.trim()).to.eq(storeAppLink);
            });
        });
    });
});
