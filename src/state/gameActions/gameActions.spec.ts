import { renderHook, act, HookResult } from '@testing-library/react-hooks';
import useAppState from '../useAppState';
import { GameActionId } from './gameActions';

/* disable game effect to only tests single actions */
jest.mock('../effects', () => ({
  gameEffectList: [],
}));

describe('Teams on same floor', () => {
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
