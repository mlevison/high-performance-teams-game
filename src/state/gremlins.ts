import { Effect } from './effects';
import { GameActionId } from './gameActions';
import { AppState } from './useAppState';

export type GremlinId = 'EMERGENCY_ON_ANOTHER_TEAM';
type GremlinImplementation = {
  occurs: () => boolean;
  effect: (age: number, finishedActionIds: GameActionId[]) => null | Effect;
};
type Gremlin = GremlinImplementation & { id: GremlinId };
type GremlinList = { [k in GremlinId]: GremlinImplementation };

export const gremlinList: GremlinList = {
  EMERGENCY_ON_ANOTHER_TEAM: {
    occurs() {
      return Math.random() <= 0.1;
    },
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

      return {
        capacity,
        title:
          'We’ve had an emergency on another team, we need your best tester for a while.',
      };
    },
  },
};

export const gremlins: Gremlin[] = Object.entries(
  gremlinList,
).map(([id, gremlin]) => ({ ...gremlin, id: id as GremlinId }));

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

export function getGremlin(state: AppState): GremlinId | undefined {
  if (state.currentRound.number < 2) {
    return undefined;
  }

  const occurringGremlins = gremlins.filter((gremlin) => {
    return gremlin.occurs();
  });

  return occurringGremlins.sort(() => Math.random() - 0.5)[0]?.id;
}
