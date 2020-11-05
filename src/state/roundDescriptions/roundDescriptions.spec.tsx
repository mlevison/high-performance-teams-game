import { renderHook, HookResult } from '@testing-library/react-hooks';
import useAppState, { AppState } from '../useAppState';
import { render, screen } from '@testing-library/react';

/* disable game effect to only tests single actions */
jest.mock('../effects/effects', () => ({
  gameEffectList: [],
}));

describe('roundDescriptions and effects', () => {
  let result: HookResult<ReturnType<typeof useAppState>>;

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
});
