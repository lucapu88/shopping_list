/* eslint-disable no-undef */
import { phrases, shoppingListLocalOrGlobal } from '../support/commands.js';

// Chiedo scusa se scrivo in italiano ma faccio prima a capire. L'inglese lo mastico ma non velocissimo.

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();
let natale = currentDay <= 31 && currentMonth === 12;

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
        const childNumber = 3;
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

    it("cambio temi", () => {
        const childNumber = 4;
        // light
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.one > .btn-light').click().then(() => {
            //funziona solo in locale, in produzione ovviamente l'url dell'immagine cambia
            cy.get('.app-container').should('have.css', 'background-image').and('include', '/src/img/foglio_righe.webp');
            cy.get('body').should('have.css', 'font-family').and('include', 'Permanent Marker", cursive');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.helper-light').should('have.css', 'background-image').and('include', 'repeating-linear-gradient(rgb(204, 204, 204) 0px, rgb(204, 204, 204) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 100%), repeating-linear-gradient(90deg, rgb(204, 204, 204) 0px, rgb(204, 204, 204) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 100%)');

        // dark
        cy.get('.one > .btn-dark').click().then(() => {
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(51, 51, 51)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(255, 255, 255)');
            /* if (!natale) {
                 //Faccio sta roba perchè nel periodo natalizio si spacca poichè viene coperto da "l'addobbo"
                 cy.get('body').should('have.css', 'border').and('include', '10px solid rgb(209, 126, 71)');
             }*/
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.dark-theme-helper').should('have.css', 'background-color').and('include', 'rgb(56, 83, 54)');
        cy.get('.dark-theme-helper').should('have.css', 'border').and('include', 'rgb(209, 126, 71)');

        // minimal
        cy.get('.one > .minimal-theme').click().then(() => {
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(165, 190, 204)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(124, 62, 102)');
            cy.get('body').should('have.css', 'font-family').and('include', 'Cabin, sans-serif');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.minimal-theme-helper').should('have.css', 'background-color').and('include', 'rgb(211, 235, 205)');

        // retro/dos
        cy.get('.one > .retro-theme').click().then(() => {
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(0, 0, 0)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(255, 255, 255)');
            cy.get('body').should('have.css', 'font-family').and('include', 'DotGothic16, sans-serif');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        /*if (!natale) {
             //Faccio sta roba perchè nel periodo natalizio si spacca poichè viene coperto da "l'addobbo"
             cy.get('.retro-theme-helper').should('have.css', 'border').and('include', '3px outset rgb(255, 255, 255)');
         }*/
        cy.get('.retro-theme-helper').should('have.css', 'border-radius').and('include', '0');
        cy.get('.retro-theme-helper').should('have.css', 'background-color').and('include', 'rgb(192, 192, 192)');

        //summer
        cy.get('.two > .summer-theme').click().then(() => {
            //funziona solo in locale, in produzione ovviamente l'url dell'immagine cambia
            cy.get('.summer-container').should('have.css', 'background-image').and('include', '/src/img/mare-tablet.webp');
            cy.get('body').should('have.css', 'font-family').and('include', 'Permanent Marker", cursive');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();

        //winter
        cy.get('.two > .winter-theme').click().then(() => {
            //funziona solo in locale, in produzione ovviamente l'url dell'immagine cambia
            cy.get('.winter-container').should('have.css', 'background-image').and('include', '/src/img/montagne-tablet.webp');
            cy.get('body').should('have.css', 'font-family').and('include', 'Permanent Marker", cursive');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.winter-theme-helper').should('have.css', 'background-image').and('include', '/src/img/inverno.webp');

        // elegant
        cy.get('.two > .elegant-theme').click().then(() => {
            cy.get('body').should('have.css', 'background').and('include', 'linear-gradient(90deg, rgb(7, 60, 92) 30%, rgb(29, 39, 49) 55%)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(217, 132, 16)');
            cy.get('body').should('have.css', 'font-family').and('include', 'Courier New');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();

        //pink
        cy.get('.two > .pink-theme-btn').click().then(() => {
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(232, 172, 208)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(147, 0, 54)');
            cy.get('body').should('have.css', 'font-family').and('include', '"Protest Riot", sans-serif');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();

        //panter
        cy.get('.three > .panter-theme-btn').click().then(() => {
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(0, 0, 24)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(101, 101, 101)');
            cy.get('body').should('have.css', 'font-family').and('include', 'Audiowide, serif');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();

        //lemon
        cy.get('.three > .lemon-theme-btn').click().then(() => {
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(253, 237, 4)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(130, 86, 169)');
            cy.get('body').should('have.css', 'font-family').and('include', 'Creepster, serif');
        });
        cy.get('.settings').click();

    });

    it('autoeliminazione categorie vuote', () => {
        cy.addCategoryAndTodo();
        cy.get('.category').should('exist');
        cy.get('.category > .button-container > .btn').click({ force: true });

        cy.get('.settings').click().then(() => {
            cy.get('#helper-description > :nth-child(6) > .list-title').click();
            cy.get('#auto-delete > .text-primary').should('include.text', 'OFF');
            cy.get('#auto-delete > u').click();
            cy.get('#auto-delete > .text-primary').should('include.text', 'ON');
            cy.get('.close-helper-container > .close-helper').click();
        });

        cy.addCategoryAndTodo();
        cy.get('.category').should('not.exist');
    });

    it('mostra ultime eliminazioni', () => {
        cy.addSomeItemsToList(phrases);
        cy.get('[index="0"] > .checkbox').click({ force: true });
        cy.get('[index="1"] > .checkbox').click({ force: true });
        cy.get('[index="4"] > .checkbox').click({ force: true });
        cy.get('.text-danger').first().click();
        cy.get('.confirm-delete-modal-content > .confirm-buttons-container > #yes-delete-selected').click({ force: true });
        cy.get('[index="1"] > .button-container > :nth-child(2)').click({ force: true });

        cy.get('.settings').click();
        cy.get('#helper-description > :nth-child(7) > .list-title').click();
        cy.get('.todo-deleted-container').should('include.text', phrases.frase4);
        cy.get('.multiple-deleted-container > :nth-child(1)').should('include.text', phrases.frase1);
        cy.get('.multiple-deleted-container > :nth-child(2)').should('include.text', phrases.frase2);
        cy.get('.multiple-deleted-container > :nth-child(3)').should('include.text', phrases.frase5);
    });

    it('importa ultimo backup lista', () => {
        cy.addSomeItemsToList(phrases);
        cy.get('.pushbutton-container > :nth-child(2)').click({ force: true });
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
            cy.get('#helper-description > :nth-child(8) > .list-title').click();
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
        cy.get('.pushbutton-container > :nth-child(2)').click({ force: true });
        cy.get('.delete-all').click();
        cy.get('.confirm > .btn-primary').click();
        cy.get('#todo-list').within(() => {
            cy.get('div.empty-logo-container').should('exist');
        });

        cy.get('.settings').click();
        cy.get('#helper-description > :nth-child(9) > .list-title').click();
        cy.get('#text-area').click();
        cy.document().invoke('execCommand', 'paste');
        cy.get('.add-list-copied > .btn').click();
        cy.get('#todo-list').within(() => {
            cy.get('div.empty-logo-container').should('not.exist');
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
