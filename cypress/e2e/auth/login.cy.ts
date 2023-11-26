describe('login should', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('have title', () => {
    cy.getByAttr('title').should('be.visible');
  });

  it('not log in with empty inputs', () => {
    cy.getByAttr('login-submit-button').click({ force: true });
    cy.url().should('include', 'login');
  });

  it('have disabled submit button when inputs are empty', () => {
    cy.getByAttr('login-submit-button').should('be.disabled');

    cy.getByAttr('login-name-input').type('Weinberg des Herrn');
    cy.getByAttr('password-input').type('iLoveJesus<3');

    cy.getByAttr('login-submit-button').should('be.enabled');
  });

  it('log in sucessfully', () => {
    cy.getByAttr('login-name-input').type('Weinberg des Herrn');
    cy.getByAttr('password-input').type('iLoveJesus<3');
    cy.getByAttr('login-submit-button').click(); // should redirect somewhere in success
    cy.url().should('not.include', 'register');
    cy.getByAttr('auth-corner')
      .getByAttr('logout-button')
      .contains('Ausloggen');
  });
});
