import { sumByProp } from 'lib';
import { random } from 'lib/random';
import { ReactElement } from 'react';
import { Effect } from './effects';
import { GameConfig, GameState, getAllEffects } from './game';
import { GameRound } from './round';

export type GremlinDescription = {
  name: string;
  description?: ReactElement;
};
type GremlinImplementation<GameActionId extends string> = GremlinDescription & {
  probability: (state: GameState<GameActionId>) => number;
  effect: (
    age: number,
    finishedActionIds: GameActionId[],
  ) => null | Effect | Effect[];
};
export type GremlinList<GameActionId extends string> = {
  [key: string]: GremlinImplementation<GameActionId>;
};

export function rollGremlin<GameActionId extends string>(
  state: GameState<GameActionId>,
  config: GameConfig<GameActionId>,
): string | null {
  /* No gremlins in trailing rounds */
  if (state.pastRounds.length + 1 >= config.rounds.length) {
    return null;
  }

  const gremlinArray = Object.entries(config.gremlins).map(([id, gremlin]) => ({
    id,
    ...gremlin,
  }));

  const allEffects = getAllEffects(state, config);
  const gremlinChance = sumByProp(allEffects, 'gremlinChange');

  if (random() * 100 > gremlinChance) {
    return null;
  }

  const pastGremlinIds = [state.currentRound, ...state.pastRounds]
    .map((round) => round.gremlin)
    .filter((id: string | null): id is string => Boolean(id));

  const newGremlinsWithProbability = gremlinArray
    .map((gremlin) => ({
      ...gremlin,
      currentProbability: gremlin.probability(state),
    }))
    .filter(
      (gremlin) =>
        !pastGremlinIds.includes(gremlin.id) && gremlin.currentProbability > 0,
    );

  const totalProbability = sumByProp(
    newGremlinsWithProbability,
    'currentProbability',
  );

  if (totalProbability === 0) {
    return null;
  }

  let roll = random() * totalProbability;
  let gremlin = newGremlinsWithProbability.shift();
  while (roll > (gremlin?.currentProbability || Infinity)) {
    roll -= gremlin?.currentProbability || Infinity;
    gremlin = newGremlinsWithProbability.shift();
  }

  return gremlin?.id || null;
}

export function getGremlinEffects<GameActionId extends string>(
  round: GameRound<GameActionId>,
  age: number,
  finishedActionIds: GameActionId[],
  gremlins: GameConfig<GameActionId>['gremlins'],
): Effect[] {
  if (round.gremlin) {
    const effect = gremlins[round.gremlin].effect(age, finishedActionIds);
    if (Array.isArray(effect)) {
      return effect;
    }
    if (effect) {
      return [effect];
    }
  }

  return [];
}

export function getGremlin<GameActionId extends string>(
  round: GameRound<GameActionId>,
  gremlins: GameConfig<GameActionId>['gremlins'],
): (GremlinDescription & GremlinImplementation<GameActionId>) | undefined {
  if (!round.gremlin) {
    return;
  }

  return gremlins[round.gremlin];
}
