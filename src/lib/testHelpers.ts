import { renderHook, act } from '@testing-library/react-hooks';
import useAppState from '../state/useAppState';
import { GameActionId } from '../state/gameActions';
import { GremlinId } from '../state/gremlins';

export function getGame() {
  const wrapper = renderHook(() => useAppState());

  return {
    get state() {
      return wrapper.result.current[0];
    },
    get availableActionIds() {
      return wrapper.result.current[0].availableGameActions.map(({ id }) => id);
    },
    nextRound: (gremlinRoll?: GremlinId) => {
      act(() => {
        wrapper.result.current[1]({
          type: 'NEXT_ROUND',
          payload: { gremlinRoll },
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
