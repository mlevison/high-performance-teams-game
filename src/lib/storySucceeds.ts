import { random } from './random';

export function storySucceeds(chance: number) {
  return random() * 100 < chance;
}
