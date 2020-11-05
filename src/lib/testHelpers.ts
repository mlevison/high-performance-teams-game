import { renderHook, act } from '@testing-library/react-hooks';
import useAppState from '../state/useAppState';
import { GameActionId } from '../state/gameActions';

export function getGame() {
  const wrapper = renderHook(() => useAppState());

  return {
    get state() {
      return wrapper.result.current[0];
    },
    get availableActionIds() {
      return wrapper.result.current[0].availableGameActions.map(({ id }) => id);
    },
    nextRound: () => {
      act(() => {
        wrapper.result.current[1]({ type: 'NEXT_ROUND' });
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
