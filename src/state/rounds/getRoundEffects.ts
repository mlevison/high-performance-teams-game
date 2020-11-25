import { Effect } from '../effects';
import { ClosedRound } from '../round';
import { rounds } from '../../config';

export function getRoundEffects(pastRounds: ClosedRound[]) {
  const currentRound = pastRounds.length;
  const roundEffects: (null | Effect)[] = [];

  for (let i = 0; i <= currentRound; i++) {
    const desc = rounds[i + 1];
    if (!desc) {
      continue;
    }
    const previousRounds = pastRounds.slice(0, i);
    roundEffects.push(desc.effect?.(previousRounds, currentRound + 1) || null);
  }

  return roundEffects;
}
