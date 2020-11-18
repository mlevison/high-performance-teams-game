import { rollDice } from 'lib/rollDice';
import React, { ReactElement } from 'react';
import { Effect } from './effects';
import { GameActionId } from './gameActions';
import { ClosedRound } from './round';

export type GremlinDescription = {
  name: string;
  description?: ReactElement;
};
export type GremlinId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GremlinImplementation = GremlinDescription & {
  effect: (age: number, finishedActionIds: GameActionId[]) => null | Effect;
};
type GremlinList = { [k in GremlinId]?: GremlinImplementation };

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

  return gremlinList[lastRound.gremlinRoll];
}

export const gremlinList: GremlinList = {
  4: {
    name: 'Emergency on other team',
    description: (
      <p>
        TODO description: Your best tester is needed by another team for a
        while. Cross training and protection from outside distraction will
        reduce effects
      </p>
    ),
    effect(age, finishedActionIds) {
      if (
        age >= 3 ||
        (finishedActionIds.includes(
          'GAME_ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION',
        ) &&
          age >= 2)
      ) {
        return null;
      }

      let capacity = -3;

      if (finishedActionIds.includes('GAME_ACTION_INFORMAL_CROSS_TRAINING')) {
        capacity += 1;
      }
      if (finishedActionIds.includes('GAME_ACTION_FORMAL_CROSS_TRAINING')) {
        capacity += 1;
      }

      return {
        capacity,
        title:
          'We’ve had an emergency on another team, we need your best tester for a while.',
      };
    },
  },
};

export function getGremlinEffect(
  gremlinId: GremlinId,
  age: number,
  finishedActionIds: GameActionId[],
) {
  return gremlinList[gremlinId]?.effect(age, finishedActionIds) || null;
}

export function rollGremlin(currentRound: number): GremlinId | undefined {
  if (currentRound < 2) {
    return undefined;
  }
  return (rollDice() + rollDice()) as GremlinId;
}
