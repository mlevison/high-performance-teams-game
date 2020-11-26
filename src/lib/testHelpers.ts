import { renderHook, act } from '@testing-library/react-hooks';
import useAppState, { AppState } from '../state/useAppState';
import type { GameActionId } from '../config/rounds';
import { GremlinId } from '../state/gremlins';
import { ClosedRound } from 'state';

// TODO Hannes confused as to my this called NextRoundOpts
export type NextRoundOpts = { gremlinRoll?: GremlinId };

export function getGame() {
  const wrapper = renderHook(() => useAppState());

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
    nextRound: (opts?: NextRoundOpts) => {
      const closedRound = {
        ...wrapper.result.current[2](),
        gremlinRoll: opts?.gremlinRoll,
      };

      act(() => {
        wrapper.result.current[1]({
          type: 'NEXT_ROUND',
          payload: closedRound,
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
  game: {
    readonly state: AppState;
    readonly availableActionIds: GameActionId[];
    closeRound: () => ClosedRound;
    nextRound: (opts?: NextRoundOpts | undefined) => void;
    selectAction: (
      gameActionId: import('c:/Users/mark/Documents/GitHub/high-performance-teams-game/src/config/rounds/index').GameActionId,
    ) => void;
  },
  capacities: number[],
) {
  capacities.forEach((capacity) => {
    game.nextRound();
    expect(game.state.currentRound.capacity.total).toEqual(capacity);
  });
}
