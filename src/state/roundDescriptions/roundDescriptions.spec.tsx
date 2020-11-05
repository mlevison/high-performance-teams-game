import { renderHook, HookResult, act } from '@testing-library/react-hooks';
import useAppState, { AppState } from '../useAppState';
import { render, screen } from '@testing-library/react';

/* disable game effect to only tests single actions */
jest.mock('../effects/effects', () => ({
  gameEffectList: [],
}));

describe('roundDescriptions and effects', () => {
  let result: HookResult<ReturnType<typeof useAppState>>;
  const nextRound = () => {
    act(() => {
      result.current[1]({ type: 'NEXT_ROUND' });
    });
  };

  describe('round 1', () => {
    it('starts with capacity 10/10 in round 1', () => {
      result = renderHook(() => useAppState()).result;

      const expectedCurrentRound: AppState['currentRound'] = expect.objectContaining(
        {
          capacity: {
            total: 10,
            available: 10,
          },
          number: 1,
          activeEffects: [],
        },
      );

      expect(result.current[0].currentRound).toEqual(expectedCurrentRound);

      render(result.current[0].currentRound.description);
      expect(
        screen.getByText(/Welcome to the World’s Smallest Online Bookstore/i),
      ).toBeInTheDocument();
    });
  });

  describe('round 3', () => {
    it('comes with a 4 capacity bump', () => {
      result = renderHook(() => useAppState()).result;

      nextRound();
      nextRound();
      const expectedCurrentRound: AppState['currentRound'] = expect.objectContaining(
        {
          capacity: {
            total: 14,
            available: 14,
          },
          number: 3,
          activeEffects: expect.any(Array),
        },
      );

      expect(result.current[0].currentRound).toEqual(expectedCurrentRound);
      expect(result.current[0].currentRound.activeEffects).toHaveLength(1);
      const round3Effect = result.current[0].currentRound.activeEffects[0];
      expect(round3Effect.capacity).toBe(4);
      expect(round3Effect.title).toMatch(/Management is paying overtime/i);

      render(result.current[0].currentRound.description);
      expect(
        screen.getByText(
          /We must go live with an early version of the product/i,
        ),
      ).toBeInTheDocument();
    });
  });
});
