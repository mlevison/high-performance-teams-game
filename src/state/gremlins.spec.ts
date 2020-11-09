import { getGame } from '../lib/testHelpers';

/* Disable roundDescription, game and action effects */
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
jest.mock('./gameActions/getEffect', () => ({ getEffect: () => null }));

describe('Gremlins', () => {
  it('take only first gremlin roll into account', () => {
    const game = getGame();
    const gremlinRoll = 4;

    game.nextRound(gremlinRoll);
    expect(game.state.currentRound.capacity.available).toBe(7);

    game.nextRound(gremlinRoll);
    expect(game.state.currentRound.capacity.available).toBe(7);

    game.nextRound(gremlinRoll);
    expect(game.state.currentRound.capacity.available).toBe(7);

    game.nextRound(gremlinRoll);
    expect(game.state.currentRound.capacity.available).toBe(10);
  });

  describe('emergency on another team', () => {
    const GREMLIN_ROLL = 4;
    it('reduces capacity by 3 for 3 rounds', () => {
      const game = getGame();

      game.nextRound(GREMLIN_ROLL);
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
      game.nextRound(GREMLIN_ROLL);
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
      game.nextRound(GREMLIN_ROLL);
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
      game.nextRound(GREMLIN_ROLL);
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
