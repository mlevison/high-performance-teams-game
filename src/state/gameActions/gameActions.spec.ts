import { renderHook, act, HookResult } from '@testing-library/react-hooks';
import useAppState from '../useAppState';
import { GameActionId } from './gameActions';

/* disable game effect to only tests single actions */
jest.mock('../effects', () => ({
  gameEffectList: [],
}));

describe('GameActions', () => {
  let result: HookResult<ReturnType<typeof useAppState>>;
  const nextRound = () => {
    act(() => {
      result.current[1]({ type: 'NEXT_ROUND' });
    });
  };
  const selectGameAction = (gameActionId: GameActionId) => {
    act(() => {
      result.current[1]({ type: 'SELECT_GAME_ACTION', payload: gameActionId });
    });
  };
  const getAvailableActionIds = () => {
    return result.current[0].availableGameActions.map(({ id }) => id);
  };

  describe('Teams on same floor', () => {
    it('increases capacity over many rounds', () => {
      result = renderHook(() => useAppState()).result;

      selectGameAction('GAME_ACTION_TEAMS_ON_SAME_FLOOR');
      nextRound();

      expect(result.current[0].currentRound.number).toEqual(2);
      expect(result.current[0].currentRound.capacity.total).toEqual(11);

      nextRound();
      expect(result.current[0].currentRound.capacity.total).toEqual(12);
      nextRound();
      expect(result.current[0].currentRound.capacity.total).toEqual(13);
      nextRound();
      expect(result.current[0].currentRound.capacity.total).toEqual(14);
      nextRound();
      expect(result.current[0].currentRound.capacity.total).toEqual(15);
    });
  });

  describe('Informal Cross Training', () => {
    it('is only available from round 3 on', () => {
      result = renderHook(() => useAppState()).result;

      expect(getAvailableActionIds()).not.toContain(
        'GAME_ACTION_INFORMAL_CROSS_TRAINING',
      );
      nextRound();
      expect(getAvailableActionIds()).not.toContain(
        'GAME_ACTION_INFORMAL_CROSS_TRAINING',
      );
      nextRound();
      expect(getAvailableActionIds()).toContain(
        'GAME_ACTION_INFORMAL_CROSS_TRAINING',
      );
    });
  });

  describe('Unit Testing', () => {
    it('is only available if the BuildServer was implemented', () => {
      result = renderHook(() => useAppState()).result;

      expect(getAvailableActionIds()).not.toContain('GAME_ACTION_UNIT_TESTING');

      nextRound();
      expect(getAvailableActionIds()).not.toContain('GAME_ACTION_UNIT_TESTING');

      selectGameAction('GAME_ACTION_BUILD_SERVER');
      nextRound();
      expect(getAvailableActionIds()).toContain('GAME_ACTION_UNIT_TESTING');
    });
  });
});
