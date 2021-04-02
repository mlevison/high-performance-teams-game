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
type GremlinImplementation = GremlinDescription & {
  probability: (state: GameState) => number;
  effect: (
    age: number,
    finishedActionIds: string[],
  ) => null | Effect | Effect[];
};
export type GremlinList = {
  [key: string]: GremlinImplementation;
};

export function rollGremlin(
  state: GameState,
  config: GameConfig,
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

export function getGremlinEffects(
  round: GameRound,
  age: number,
  finishedActionIds: string[],
  gremlins: GameConfig['gremlins'],
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

export function getGremlin(
  round: GameRound,
  gremlins: GameConfig['gremlins'],
): (GremlinDescription & GremlinImplementation) | undefined {
  if (!round.gremlin) {
    return;
  }

  return gremlins[round.gremlin];
}
