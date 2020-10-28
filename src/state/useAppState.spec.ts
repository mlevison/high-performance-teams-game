import { renderHook } from '@testing-library/react-hooks';
import useAppState, { AppState } from './useAppState';

describe('AppState', () => {
  it('starts with capacity 10/10 in round 1', () => {
    const { result } = renderHook(() => useAppState());

    const expectedCurrentRound: AppState['currentRound'] = {
      capacity: {
        total: 10,
        available: 10,
      },
      number: 1,
    };

    expect(result.current[0].currentRound).toEqual(expectedCurrentRound);
  });

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
});
