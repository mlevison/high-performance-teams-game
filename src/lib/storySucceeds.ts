import { rollDice } from './rollDice';

export function storySucceeds() {
  return rollDice() >= 3;
}
