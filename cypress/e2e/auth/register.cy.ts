describe('register should', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('have title', () => {
    cy.getByAttr('title').should('be.visible');
  });

  it('register successfully', () => {
    cy.getByAttr('register-submit-button').as('submit-btn');

    cy.get('@submit-btn').should('be.disabled');

    cy.getByAttr('register-name-input').type('Weinberg des Herrn');
    cy.getByAttr('register-password-input').type('iLoveJesus<3');

    cy.get('@submit-btn').should('be.enabled');
    cy.get('@submit-btn').click(); // should redirect somewhere in success
    cy.url().should('not.include', 'register');
    cy.getByAttr('auth-corner')
      .getByAttr('logout-button')
      .contains('Ausloggen');
  });
});
