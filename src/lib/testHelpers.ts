import { renderHook, act } from '@testing-library/react-hooks';
import useAppState from '../state/useAppState';
import { GameActionId } from '../state/gameActions';
import { GremlinId } from 'state/gremlins';

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
