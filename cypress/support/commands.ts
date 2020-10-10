import '@testing-library/cypress/add-commands';
import 'cypress-wait-until';

import { storySucceeds } from '../../src/lib/storySucceeds';

type HPTG = {
  setStorySucceeds: (implementation: typeof storySucceeds) => void;
};

function times(repeatTimes: number, callback: () => void) {
  for (let i = 0; i < repeatTimes; i++) {
    callback();
  }
}

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      times: typeof times;
      hptg: () => Cypress.Chainable<HPTG>;
    }
  }
}

Cypress.Commands.add('times', times);
Cypress.Commands.add('hptg', () => {
  cy.window().waitUntil((win) => (win as any).__HPTG, {
    errorMsg: 'Could not find __BB on window',
  });
});
