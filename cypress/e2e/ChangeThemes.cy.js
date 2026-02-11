/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { shoppingListLocalOrGlobal } from '../support/commands.js';

// eslint-disable-next-line no-undef
describe("test dell'helper e delle impostazioni", () => {
    beforeEach(() => {
        cy.visit(shoppingListLocalOrGlobal);
        cy.wait(1100);
        cy.closeBlockingElements();
        cy.hideUpdatesAlertsModal();
    });

    it("cambio temi", () => {
        // TOFIX verificare anche le immagini 
        const childNumber = 4;
        // light
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.one > .btn-light').click().then(() => {
            cy.closeBlockingElements();
            //funziona solo in locale, in produzione ovviamente l'url dell'immagine cambia
            cy.get('body').should('have.css', 'font-family').and('include', 'Permanent Marker", cursive');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.closeBlockingElements();
        cy.get('.helper-light').should('have.css', 'background-image').and('include', 'repeating-linear-gradient(rgb(204, 204, 204) 0px, rgb(204, 204, 204) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 100%), repeating-linear-gradient(90deg, rgb(204, 204, 204) 0px, rgb(204, 204, 204) 1px, rgba(0, 0, 0, 0) 1px, rgba(0, 0, 0, 0) 100%)');

        // dark
        cy.get('.one > .btn-dark').click().then(() => {
            cy.closeBlockingElements();
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(51, 51, 51)');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.dark-theme-helper').should('have.css', 'background-color').and('include', 'rgb(56, 83, 54)');
        cy.get('.dark-theme-helper').should('have.css', 'border').and('include', 'rgb(209, 126, 71)');

        // minimal
        cy.get('.one > .minimal-theme').click().then(() => {
            cy.closeBlockingElements();
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(165, 190, 204)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(124, 62, 102)');
            cy.get('body').should('have.css', 'font-family').and('include', 'Cabin, sans-serif');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.minimal-theme-helper').should('have.css', 'background-color').and('include', 'rgb(211, 235, 205)');

        // retro/dos
        cy.get('.one > .retro-theme').click().then(() => {
            cy.closeBlockingElements();
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(0, 0, 0)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(255, 255, 255)');
            cy.get('body').should('have.css', 'font-family').and('include', 'DotGothic16, sans-serif');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.retro-theme-helper').should('have.css', 'border-radius').and('include', '0');
        cy.get('.retro-theme-helper').should('have.css', 'background-color').and('include', 'rgb(192, 192, 192)');

        //summer
        cy.get('.two > .summer-theme').click().then(() => {
            cy.closeBlockingElements();
            //funziona solo in locale, in produzione ovviamente l'url dell'immagine cambia
            cy.get('.summer-container').should('have.css', 'background-image').and('include', '/src/img/mare-tablet.webp');
            cy.get('body').should('have.css', 'font-family').and('include', 'Permanent Marker", cursive');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();

        //winter
        cy.get('.two > .winter-theme').click().then(() => {
            cy.closeBlockingElements();
            //funziona solo in locale, in produzione ovviamente l'url dell'immagine cambia
            cy.get('.winter-container').should('have.css', 'background-image').and('include', '/src/img/montagne-tablet.webp');
            cy.get('body').should('have.css', 'font-family').and('include', 'Permanent Marker", cursive');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
        cy.get('.winter-theme-helper').should('have.css', 'background').and('include', 'rgba(0, 0, 0, 0) radial-gradient(circle, rgb(35, 47, 52) 80%, rgb(191, 248, 255) 100%) repeat scroll 0% 0% / auto padding-box border-box');

        // elegant
        cy.get('.two > .elegant-theme').click().then(() => {
            cy.closeBlockingElements();
            cy.get('body').should('have.css', 'background').and('include', 'linear-gradient(90deg, rgb(7, 60, 92) 30%, rgb(29, 39, 49) 55%)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(217, 132, 16)');
            cy.get('body').should('have.css', 'font-family').and('include', 'Tauri, sans-serif');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();

        //pink
        cy.get('.two > .pink-theme-btn').click().then(() => {
            cy.closeBlockingElements();
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(232, 172, 208)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(147, 0, 54)');
            cy.get('body').should('have.css', 'font-family').and('include', '"Protest Riot", sans-serif');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();

        //panter
        cy.get('.three > .panter-theme-btn').click().then(() => {
            cy.closeBlockingElements();
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(0, 0, 24)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(101, 101, 101)');
            cy.get('body').should('have.css', 'font-family').and('include', 'Audiowide, serif');
        });
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();

        //lemon
        cy.get('.three > .lemon-theme-btn').click().then(() => {
            cy.closeBlockingElements();
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(253, 237, 4)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(130, 86, 169)');
            cy.get('body').should('have.css', 'font-family').and('include', 'Creepster, serif');
        });
        cy.get('.settings').click();
        cy.get('#lemon-img').should('exist');
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();

        //jeans
        cy.get('.three > .jeans-theme-btn').click().then(() => {
            cy.closeBlockingElements();
            cy.get('body').should('have.css', 'background-color').and('include', 'rgb(60, 98, 141)');
            cy.get('body').should('have.css', 'color').and('include', 'rgb(218, 194, 158)');
            cy.get('body').should('have.css', 'font-family').and('include', '"Lucida Console", "Courier New", monospace');
        });
        cy.get('.text-center').should('have.css', 'background-color').and('include', 'rgb(165, 110, 71)');
        cy.get('.text-center').should('have.css', 'color').and('include', 'rgb(98, 56, 21)');
        cy.get('.settings').click();
        cy.get(`#helper-description > :nth-child(${childNumber}) > .list-title`).click();
    });

});
