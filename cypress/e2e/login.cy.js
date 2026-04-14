describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="nama@email.com"]').should('be.visible');
    cy.get('input[placeholder="Masukkan password"]').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="nama@email.com"]').type('salah@email.com');
    cy.get('input[placeholder="Masukkan password"]').type('salahpassword');
    cy.get('button').contains('Masuk').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="nama@email.com"]').type('463@gmail.com');
    cy.get('input[placeholder="Masukkan password"]').type('1111111');
    cy.get('button').contains('Masuk').click();

    cy.get('nav').should('be.visible');
  });
});
