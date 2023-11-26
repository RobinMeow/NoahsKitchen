describe('login should', () => {
  it('have title', () => {
    cy.visit('/login');
    cy.getByAttr('title').should('be.visible');
  });

  it('not log in with empty inputs', () => {
    cy.visit('/login');
    cy.getByAttr('login-submit-button').click({ force: true });
    cy.url().should('include', 'login');
  });

  it('have disabled submit button when inputs are empty', () => {
    cy.visit('/login');
    cy.getByAttr('login-submit-button').should('be.disabled');

    cy.getByAttr('login-name-input').type('Weinberg des Herrn');
    cy.getByAttr('password-input').type('iLoveJesus<3');

    cy.getByAttr('login-submit-button').should('be.enabled');
  });

  it('register > logout > login > delete account', () => {
    cy.visit('/register');
    // Register
    const credentials = {
      chefname: 'Cypress-Login',
      password: 'iLoveJesus<3',
    };

    cy.getByAttr('register-name-input').type(credentials.chefname);
    cy.getByAttr('register-password-input').type(credentials.password);
    cy.getByAttr('register-submit-button').click();

    // Logout
    cy.getByAttr('auth-corner').getByAttr('logout-button').click();

    // Login
    cy.visit('/login');
    cy.getByAttr('login-name-input').type(credentials.chefname);
    cy.getByAttr('password-input').type(credentials.password);
    cy.getByAttr('login-submit-button').click(); // should redirect somewhere in success
    cy.url().should('not.include', 'login');
    cy.getByAttr('auth-corner')
      .getByAttr('logout-button')
      .contains('Ausloggen');

    // Delete the just registered account
    cy.visit('/delete-account');
    cy.get('[data-cy-password-input]').type(credentials.password);
    cy.get('[data-cy-delete-account-form]').submit(); // redirect on success
  });
});
