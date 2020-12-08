import { sumByProp } from 'lib';
import { random } from 'lib/random';
import { ReactElement } from 'react';
import { GameActionId, GremlinId, gremlins } from '../config';
import { Effect, isGremlinChanceEffect } from './effects';
import { GameState, getAllEffects } from './game';
import { Round } from './round';

export type GremlinDescription = {
  name: string;
  description?: ReactElement;
};
type GremlinImplementation = GremlinDescription & {
  probability: (state: GameState) => number;
  effect: (
    age: number,
    finishedActionIds: GameActionId[],
  ) => null | Effect | Effect[];
};
export type GremlinList<K extends string> = {
  [k in K]: GremlinImplementation;
};

export function rollGremlin(state: GameState): GremlinId | null {
  const gremlinArray = Object.entries(gremlins).map(([id, gremlin]) => ({
    id: id as GremlinId,
    ...gremlin,
  }));

  const gremlinChanceEffects = getAllEffects(state).filter(
    isGremlinChanceEffect,
  );
  const gremlinChance = sumByProp(gremlinChanceEffects, 'gremlinChange');

  if (random() * 100 > gremlinChance) {
    return null;
  }

  const pastGremlinIds = [state.currentRound, ...state.pastRounds]
    .map((round) => round.gremlin)
    .filter(isGremlinId);

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

export function isGremlinId(thing: GremlinId | null): thing is GremlinId {
  return thing !== null;
}

export function getGremlinEffects(
  round: Round,
  age: number,
  finishedActionIds: GameActionId[],
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
  round: Round,
): (GremlinDescription & GremlinImplementation) | undefined {
  if (!round.gremlin) {
    return;
  }

  return gremlins[round.gremlin];
}
