describe('high performance team game', () => {
  it('completes 60 user stories in 6 rounds when all succeed and no actions are taken', () => {
    cy.visit('/');
    cy.hptg().then(({ setStorySucceeds }) => {
      setStorySucceeds(() => true);
    });

    cy.findByRole('heading', { name: /Round 1 of 6/i }).should('be.visible');
    cy.findByRole('button', { name: /Complete Round/i }).click();
    cy.findByRole('heading', { name: /Round 2 of 6/i }).should('be.visible');

    cy.findByRole('button', { name: /Complete Round/i }).click();
    cy.findByRole('heading', { name: /Round 3 of 6/i }).should('be.visible');

    cy.findByRole('button', { name: /Complete Round/i }).click();
    cy.findByRole('heading', { name: /Round 4 of 6/i }).should('be.visible');

    cy.findByRole('button', { name: /Complete Round/i }).click();
    cy.findByRole('heading', { name: /Round 5 of 6/i }).should('be.visible');

    cy.findByRole('button', { name: /Complete Round/i }).click();
    cy.findByRole('heading', { name: /Round 6 of 6/i }).should('be.visible');

    cy.findByRole('button', { name: /Complete Round/i }).click();
    cy.findByRole('heading', { name: /Round 7 of 6/i }).should(
      'not.be.visible',
    );
    cy.findByRole('heading', { name: /Results/i }).should('be.visible');
    cy.findByText(/Completed 60 user stories/i).should('be.visible');
  });

  it('completes 30 user stories in 6 rounds when 50% succeed and no actions are taken', () => {
    cy.visit('/');
    cy.hptg().then(({ setStorySucceeds }) => {
      let i = 0;
      setStorySucceeds(() => i++ % 2 === 0);
    });

    cy.times(6, () =>
      cy.findByRole('button', { name: /Complete Round/i }).click(),
    );

    cy.findByRole('heading', { name: /Results/i }).should('be.visible');
    cy.findByText(/Completed 30 user stories/i).should('be.visible');
  });
});
