import { ReactElement } from 'react';
import { GameActionId, gremlins } from '../config';
import { rollDice } from '../lib/rollDice';
import { Effect } from './effects';
import { ClosedRound } from './round';

export type GremlinDescription = {
  name: string;
  description?: ReactElement;
};
export type GremlinId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GremlinImplementation = GremlinDescription & {
  effect: (age: number, finishedActionIds: GameActionId[]) => null | Effect;
};
export type GremlinList = { [k in GremlinId]?: GremlinImplementation };

export function isGremlinId(thing: unknown): thing is GremlinId {
  return typeof thing === 'number' && thing >= 1 && thing <= 12;
}

export function getGremlinRolls(rounds: ClosedRound[]) {
  return rounds.map((round) => round.gremlinRoll).filter(isGremlinId);
}

export function getGremlin(
  rounds: ClosedRound[],
): GremlinDescription | undefined {
  const lastRounds = [...rounds];
  const lastRound = lastRounds.pop();
  const pastRolls = getGremlinRolls(lastRounds);
  if (
    !lastRound ||
    !lastRound.gremlinRoll ||
    pastRolls.includes(lastRound.gremlinRoll)
  ) {
    return;
  }

  return gremlins[lastRound.gremlinRoll];
}

export function getGremlinEffect(
  gremlinId: GremlinId,
  age: number,
  finishedActionIds: GameActionId[],
) {
  return gremlins[gremlinId]?.effect(age, finishedActionIds) || null;
}

export function rollGremlin(currentRound: number): GremlinId | undefined {
  if (currentRound < 2) {
    return undefined;
  }
  return (rollDice() + rollDice()) as GremlinId;
}
