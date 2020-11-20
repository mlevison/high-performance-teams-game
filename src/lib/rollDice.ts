import { random } from './random';

export function rollDice() {
  return 1 + Math.floor(random() * 6);
}
