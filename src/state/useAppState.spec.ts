import { renderHook, act } from '@testing-library/react-hooks';
import useAppState from './useAppState';

jest.mock('./roundDescriptions/roundDescriptions', () => ({
  roundDescriptions: {
    1: {
      description: null,
      effect: () => ({ capacity: 10 }),
    },
  },
}));

describe('AppState', () => {
  it('starts with no past rounds', () => {
    const { result } = renderHook(() => useAppState());

    expect(result.current[0].pastRounds).toEqual([]);
  });

  it('starts with 0 completed stories', () => {
    const { result } = renderHook(() => useAppState());

    expect(result.current[0].result).toEqual({
      storiesCompleted: 0,
    });
  });

  describe('Drag Effect if the team makes no engineering improvement', () => {
    it('reduces capacity', () => {
      const { result } = renderHook(() => useAppState());
      const nextRound = () => {
        act(() => {
          result.current[1]({ type: 'NEXT_ROUND' });
        });
      };
      // Ideally Stated as a precondition
      expect(result.current[0].currentRound.number).toEqual(1);

      nextRound();
      expect(result.current[0].currentRound.number).toEqual(2);
      expect(result.current[0].currentRound.capacity.total).toEqual(9);

      nextRound();
      expect(result.current[0].currentRound.number).toEqual(3);
      expect(result.current[0].currentRound.capacity.total).toEqual(8);

      nextRound();
      expect(result.current[0].currentRound.number).toEqual(4);
      expect(result.current[0].currentRound.capacity.total).toEqual(7);
    });

    it('stops reducing capacity when team added a BuildServer', () => {
      const { result } = renderHook(() => useAppState());
      const nextRound = () => {
        act(() => {
          result.current[1]({ type: 'NEXT_ROUND' });
        });
      };

      // Ideally Stated as a precondition
      expect(result.current[0].currentRound.number).toEqual(1);

      nextRound();
      expect(result.current[0].currentRound.number).toEqual(2);
      expect(result.current[0].currentRound.capacity.total).toEqual(9);

      act(() => {
        result.current[1]({
          type: 'SELECT_GAME_ACTION',
          payload: 'GAME_ACTION_BUILD_SERVER',
        });
      });
      expect(result.current[0].currentRound.capacity.available).toEqual(7);

      nextRound();
      expect(result.current[0].currentRound.number).toEqual(3);
      // Capacity unchanged because we eliminate the drag effect
      expect(result.current[0].currentRound.capacity.total).toEqual(9);

      nextRound();
      expect(result.current[0].currentRound.number).toEqual(4);
      // Capacity still **unchanged**
      expect(result.current[0].currentRound.capacity.total).toEqual(9);
    });
  });
});
