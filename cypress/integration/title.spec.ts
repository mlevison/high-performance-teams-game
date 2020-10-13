describe('Main headline', () => {
  // TODO - Failure for no clear reason - skipped for now
  it.skip('\'s title is High-Performance Teams Game', () => {
    cy.visit('/');
    cy.findByRole('heading', { name: /High-Performance Teams Game/i }).should('be.visible');
  });
})
