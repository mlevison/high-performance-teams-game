import { Effect } from '../effects';
import { ClosedRound } from '../round';
import { roundDescriptions } from './roundDescriptions';

export function getRoundDescriptionEffects(pastRounds: ClosedRound[]) {
  const currentRound = pastRounds.length;
  const roundDescriptionEffects: (null | Effect)[] = [];

  for (let i = 0; i <= currentRound; i++) {
    const desc = roundDescriptions[i + 1];
    if (!desc) {
      continue;
    }
    const previousRounds = pastRounds.slice(0, i);
    roundDescriptionEffects.push(desc.effect?.(previousRounds) || null);
  }

  return roundDescriptionEffects;
}
