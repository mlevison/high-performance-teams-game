import { renderHook, act } from '@testing-library/react-hooks';
import useAppState from '../state/useAppState';
import type { GameActionId, GremlinId } from '../config';
import { INITIAL_STATE } from 'state';

export function getGame() {
  const wrapper = renderHook(() => useAppState(INITIAL_STATE));

  return {
    get state() {
      return wrapper.result.current[0];
    },
    get availableActionIds() {
      return wrapper.result.current[0].availableGameActions
        .filter(
          (actionWithStatus) => actionWithStatus.status.type === 'AVAILABLE',
        )
        .map((actionWithStatus) => actionWithStatus.gameAction.id);
    },
    closeRound: () => {
      return wrapper.result.current[2]();
    },
    nextRound: (gremlin: GremlinId | null = null) => {
      const closedRound = {
        ...wrapper.result.current[2](),
      };

      act(() => {
        wrapper.result.current[1]({
          type: 'NEXT_ROUND',
          payload: { closedRound, gremlin },
        });
      });
    },
    selectAction: (gameActionId: GameActionId) => {
      act(() => {
        wrapper.result.current[1]({
          type: 'SELECT_GAME_ACTION',
          payload: gameActionId,
        });
      });
    },
  };
}

export function testFutureCapacities(
  game: ReturnType<typeof getGame>,
  capacities: number[],
) {
  // TODO Am always bugged when two variables differ only on the use of plurals
  capacities.forEach((capacity) => {
    game.nextRound();
    expect(game.state.currentRound.capacity.total).toEqual(capacity);
  });
}

export function testUserStoryChance(
  game: ReturnType<typeof getGame>,
  userStoryChances: number[],
) {
  userStoryChances.forEach((chance) => {
    game.nextRound();
    expect(game.state.currentRound.userStoryChance).toEqual(chance);
  });
}

export function times(n: number, callback: (i: number) => void) {
  for (let i = 0; i < n; i++) {
    callback(i);
  }
}
