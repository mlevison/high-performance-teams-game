import { Effect } from './effects';
import { GameActionId } from './gameActions';

export type GremlinId = 'EMERGENCY_ON_ANOTHER_TEAM';
type Gremlin = {
  title: string;
  occurs: () => boolean;
  effect: (age: number, finishedActionIds: GameActionId[]) => null | Effect;
};
type GremlinList = { [k in GremlinId]: Gremlin };

export const gremlinList: GremlinList = {
  EMERGENCY_ON_ANOTHER_TEAM: {
    title:
      'We’ve had an emergency on another team, we need your best tester for a while.',
    occurs: () => Math.random() <= 0.1,
    effect(age, finishedActionIds) {
      if (
        age >= 3 ||
        (finishedActionIds.includes('PROTECTED_FROM_OUTSIDE_DISTRACTION') &&
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

      return { capacity, title: 'TODO: Best tester not available' };
    },
  },
};

export function getGremlinEffect(
  gremlinId: GremlinId | undefined,
  age: number,
  finishedActionIds: GameActionId[],
) {
  if (!gremlinId) {
    return null;
  }
  return gremlinList[gremlinId].effect(age, finishedActionIds);
}
