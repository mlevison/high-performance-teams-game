import { rollDice } from './rollDice';

let implementation = () => rollDice() >= 3;

if (process.env.REACT_APP_ENV === 'test') {
  require('../__mocks__/cypress/expose').default(
    'setStorySucceeds',
    (newImplementation: any) => {
      implementation = newImplementation;
    },
  );
}

export function storySucceeds() {
  return implementation();
}
