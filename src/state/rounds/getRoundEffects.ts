import { Effect, isEffect } from '../effects';
import { GameState, GameConfig } from '../game';

export function getRoundEffects<GameActionId extends string>(
  state: Pick<GameState<GameActionId>, 'currentRound' | 'pastRounds'>,
  rounds: GameConfig<GameActionId>['rounds'],
): Effect[] {
  const currentRoundIndex = state.pastRounds.length;
  const roundEffects: (null | Effect)[] = [];

  for (let i = 0; i <= currentRoundIndex; i++) {
    const desc = rounds[i];
    if (!desc) {
      continue;
    }
    const previousRounds = state.pastRounds.slice(0, i);
    const effect = desc.effect?.(previousRounds, currentRoundIndex + 1) || null;

    if (Array.isArray(effect)) {
      roundEffects.push(...effect);
    } else {
      roundEffects.push(effect);
    }
  }

  /* Since gremlins are rolled at the end of previous round we need to look
   * at the next rounds effect for gremlin modification */
  const nextRoundEffect =
    rounds[currentRoundIndex + 1]?.effect?.(
      [...state.pastRounds, state.currentRound],
      currentRoundIndex + 1,
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
