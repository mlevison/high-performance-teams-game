import { renderHook, act, HookResult } from '@testing-library/react-hooks';
import { GameActionId } from './gameActions/gameActions';
import { GremlinId } from './gremlins';
import useAppState, { AppState } from './useAppState';

/* disable game effect to only tests gremlin effects */
jest.mock('./effects/effects', () => ({
  gameEffectList: [],
}));

describe('Gremlins', () => {
  let result: HookResult<ReturnType<typeof useAppState>>;
  const nextRound = (gremlin?: GremlinId) => {
    act(() => {
      result.current[1]({ type: 'NEXT_ROUND', gremlin });
    });
  };
  const selectGameAction = (gameActionId: GameActionId) => {
    act(() => {
      result.current[1]({ type: 'SELECT_GAME_ACTION', payload: gameActionId });
    });
  };
});
