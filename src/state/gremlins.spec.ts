import { renderHook, act, HookResult } from '@testing-library/react-hooks';
import { GameActionId } from './gameActions/gameActions';
import { GremlinId } from './gremlins';
import useAppState, { AppState } from './useAppState';

/* disable game effect to only tests gremlin effects */
jest.mock('../effects', () => ({
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

  describe('Team Member/Management Relationship', () => {
    it('reduces capacity by 2 for first, 3 for future rounds until something is done', () => {
      result = renderHook(() => useAppState()).result;

      nextRound('TEAM_MEMBER_MANAGEMENT_RELATION');
      expect(result.current[0].currentRound.capacity.total).toEqual(8);

      nextRound();
      expect(result.current[0].currentRound.capacity.total).toEqual(7);

      nextRound();
      expect(result.current[0].currentRound.capacity.total).toEqual(7);

      selectGameAction('WORKING_AGREEMENTS');
      nextRound();
      expect(result.current[0].currentRound.capacity.total).toEqual(11);
    });

    it('reduces capacity by 1 until something is done when team established social interaction', () => {
      result = renderHook(() => useAppState()).result;

      // TODO: established social interaction === SOCIAL_TIME GameAction?
      // TODO: Implement SOCIAL_TIME GameAction.
      //selectGameAction('SOCIAL_TIME');

      nextRound('TEAM_MEMBER_MANAGEMENT_RELATION');
      /* +1 from SOCIAL_TIME, -1 from gremlin */
      expect(result.current[0].currentRound.capacity.total).toEqual(10);

      nextRound();
      expect(result.current[0].currentRound.capacity.total).toEqual(10);

      nextRound();
      expect(result.current[0].currentRound.capacity.total).toEqual(10);

      selectGameAction('WORKING_AGREEMENTS');
      nextRound();
      /* +1 from SOCIAL_TIME, +1 from WORKING_AGREEMENTS */
      expect(result.current[0].currentRound.capacity.total).toEqual(12);
    });
  });
});
