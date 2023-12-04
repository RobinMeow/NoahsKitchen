// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByAttr(
      selector: string,
      options?:
        | Partial<
            Cypress.Loggable &
              Cypress.Timeoutable &
              Cypress.Withinable &
              Cypress.Shadow
          >
        | undefined,
    ): Cypress.Chainable<JQuery<HTMLElement>>;

    createTestUser(): void;
    deleteTestUser(): void;
  }
}

/**
 * @example
 * <button data-cy-my-button></button>
 * Cy.getByDataCy('my-button').should.be('be.visivle');
 */
function getByAttr(
  selector: string,
  options?:
    | Partial<
        Cypress.Loggable &
          Cypress.Timeoutable &
          Cypress.Withinable &
          Cypress.Shadow
      >
    | undefined,
): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get(`[data-cy-${selector}]`);
}

Cypress.Commands.add('getByAttr', getByAttr);

function createTestUser() {
  cy.fixture('test-user.json').as('user');
  cy.get('@user').then((user) => {
    const { chefname, password }: any = user;

    const registerUrl = '/register';

    cy.location('pathname').then((currentPath) => {
      if (currentPath !== registerUrl) {
        cy.visit(registerUrl);
      }
    });

    cy.getByAttr('register-name-input').type(chefname);
    cy.getByAttr('password-input').type(password);

    cy.intercept('http://localhost:5126/Auth/RegisterAsync').as(
      'registerAsync',
    );

    cy.getByAttr('register-form').submit();

    cy.wait('@registerAsync');
  });
}

Cypress.Commands.add('createTestUser', createTestUser);

function deleteTestUser() {
  cy.fixture('test-user.json').as('user');
  cy.get('@user').then((user) => {
    const { password }: any = user;
    cy.visit('/delete-account');
    cy.getByAttr('password-input').type(password);
    cy.intercept('http://localhost:5126/Auth/DeleteAsync').as('deleteAsync');
    cy.getByAttr('delete-account-form').submit();
    cy.wait('@deleteAsync');
  });
}

Cypress.Commands.add('deleteTestUser', deleteTestUser);
