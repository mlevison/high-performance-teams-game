import { Effect, isEffect } from '../effects';
import { rounds } from '../../config';
import { GameState } from 'state/game';

export function getRoundEffects(
  state: Pick<GameState, 'currentRound' | 'pastRounds'>,
): Effect[] {
  const currentRound = state.pastRounds.length + 1;
  const roundEffects: (null | Effect)[] = [];

  for (let i = 0; i < currentRound; i++) {
    const desc = rounds[i + 1];
    if (!desc) {
      continue;
    }
    const previousRounds = state.pastRounds.slice(0, i);
    const effect = desc.effect?.(previousRounds, currentRound) || null;

    if (Array.isArray(effect)) {
      roundEffects.push(...effect);
    } else {
      roundEffects.push(effect);
    }
  }

  /* Since gremlins are rolled at the end of previous round we need to look
   * at the next rounds effect for gremlin modification */
  const nextRoundEffect =
    rounds[currentRound + 1]?.effect?.(
      [...state.pastRounds, state.currentRound],
      currentRound + 1,
    ) || [];
  const nextRoundEffects = Array.isArray(nextRoundEffect)
    ? nextRoundEffect
    : [nextRoundEffect];
  const nextRoundGremlinEffects = nextRoundEffects
    .filter((effect) => effect.gremlinChange !== undefined)
    .map((effect) => ({
      ...effect,
      /* Next rounds userStoryChange and capacityChange must not be active this round */
      userStoryChange: undefined,
      capacityChange: undefined,
    }));

  return roundEffects.filter(isEffect).concat(nextRoundGremlinEffects);
}
