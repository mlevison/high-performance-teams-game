import { AppState } from '../useAppState';
import { getGame } from '../../lib/testHelpers';

/* disable game effect to only tests single actions */
jest.mock('../effects/effects', () => ({
  gameEffectList: [],
}));

describe('roundDescriptions and effects', () => {
  describe('round 1', () => {
    it('starts with capacity 10/10 in round 1', () => {
      const game = getGame();

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

      expect(game.state.currentRound).toEqual(expectedCurrentRound);

      expect(game.state.currentRound.title).toMatch(
        /Welcome to the World’s Smallest Online Bookstore/i,
      );
    });
  });

  describe('round 3', () => {
    it('comes with a 4 capacity bump', () => {
      const game = getGame();

      game.nextRound();
      game.nextRound();
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

      expect(game.state.currentRound).toEqual(expectedCurrentRound);
      expect(game.state.currentRound.activeEffects).toHaveLength(1);
      const round3Effect = game.state.currentRound.activeEffects[0];
      expect(round3Effect.capacity).toBe(4);
      expect(round3Effect.title).toMatch(/Management is paying overtime/i);

      expect(game.state.currentRound.title).toMatch(
        /Go Live Soon/i,
      );
    });
  });
});
