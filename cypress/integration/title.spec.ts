describe('Main headline', () => {
  it('\'s title is High-Performance Teams Game', () => {
    cy.visit('/');
    cy.findByRole('heading', { name: /High-Performance Teams Game/i }).should('be.visible');
  });
})
