import { getGame } from '../lib/testHelpers';

/* disable game effect to only tests gremlin effects */
jest.mock('./roundDescriptions/roundDescriptions', () => ({
  roundDescriptions: {
    1: {
      description: null,
      effect: () => ({ capacity: 10 }),
    },
  },
}));
jest.mock('./effects/effects', () => ({
  gameEffectList: [],
}));

describe('Gremlins', () => {
  describe('emergency on another team', () => {
    it('reduces capacity by 3 for 3 rounds', () => {
      const game = getGame();

      game.nextRound('EMERGENCY_ON_ANOTHER_TEAM');
      expect(game.state.currentRound.capacity.available).toBe(7);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(7);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(7);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);
    });

    it('reduces capacity by 3 for 2 rounds when team is protected by outside distractions', () => {
      const game = getGame();

      game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound('EMERGENCY_ON_ANOTHER_TEAM');
      expect(game.state.currentRound.capacity.available).toBe(7);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(7);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);
    });

    it('reduces capacity by 2 for 3 rounds when team had informal cross training', () => {
      const game = getGame();

      game.selectAction('GAME_ACTION_INFORMAL_CROSS_TRAINING');
      game.nextRound('EMERGENCY_ON_ANOTHER_TEAM');
      expect(game.state.currentRound.capacity.available).toBe(8);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(8);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(8);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);
    });

    it('reduces capacity by 1 for 2 rounds when team has all protective actions', () => {
      const game = getGame();

      game.selectAction('GAME_ACTION_INFORMAL_CROSS_TRAINING');
      game.selectAction('GAME_ACTION_FORMAL_CROSS_TRAINING');
      game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound('EMERGENCY_ON_ANOTHER_TEAM');
      expect(game.state.currentRound.capacity.available).toBe(9);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(9);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);
    });
  });
});
