describe('register should', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('have title', () => {
    cy.getByAttr('title').should('be.visible');
  });

  it('register and delete account successfully', () => {
    // Register
    const credentials = {
      chefname: 'Cypress-Register',
      password: 'iLoveJesus<3',
    };
    cy.getByAttr('register-submit-button').as('submit-btn');

    cy.get('@submit-btn').should('be.disabled');

    cy.getByAttr('register-name-input').type(credentials.chefname);
    cy.getByAttr('register-password-input').type(credentials.password);

    cy.get('@submit-btn').should('be.enabled');
    cy.get('@submit-btn').click(); // should redirect somewhere in success
    cy.url().should('not.include', 'register');
    cy.getByAttr('auth-corner')
      .getByAttr('logout-button')
      .contains('Ausloggen');

    // Delete the just registered account
    cy.visit('/delete-account');
    cy.get('[data-cy-password-input]').type(credentials.password);
    cy.get('[data-cy-delete-account-form]').submit(); // redirect on success
    cy.url().should('not.include', 'delete-account');
    cy.getByAttr('auth-corner').getByAttr('login-button');
  });
});
