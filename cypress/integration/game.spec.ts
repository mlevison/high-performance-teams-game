describe('high performance team game', () => {
  it.skip('completes 60 user stories in 6 rounds when all succeed and no actions are taken', () => {
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

  it.skip('completes 30 user stories in 6 rounds when 50% succeed and no actions are taken', () => {
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

describe("Build Server Action", () => {
  it('Action Impl', () => {
    cy.visit("/");
    cy.hptg().then(({ setStorySucceeds }) => {
      setStorySucceeds(() => true);
    });

    cy.findByText("Capacity: 10").should('be.visible');
    cy.findByRole("button", { name: /BuildServer/i }).click();
    cy.findByRole('button', { name: /Complete Round/i }).click();
    cy.findByText("Capacity: 11").should('be.visible');
  });

  // TODO Failing test since I can't find how to paramterize text display for buttons
  it('Actions have Cost', () => {
    cy.visit("/");
    cy.hptg().then(({ setStorySucceeds }) => {
      setStorySucceeds(() => true);
    });
    cy.findByRole("button", { name: /BuildServer/i }).contains("Cost: 2");
  });
});
