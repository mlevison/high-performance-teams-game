import { AppState } from '../../state';
import { getGame } from '../../lib/testHelpers';

/* disable irrelevant other rounds */
jest.mock('./index', () => ({
  rounds: {
    1: require('./round1').round1,
    4: require('./round4').round4,
    5: require('./round5').round5,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 4', () => {
  it('comes with a 4 capacity bump', () => {
    const game = getGame();

    game.nextRound();
    game.nextRound();
    game.nextRound();
    const expectedCurrentRound: AppState['currentRound'] = expect.objectContaining(
      {
        capacity: {
          total: 14,
          available: 14,
        },
        number: 4,
        activeEffects: expect.any(Array),
      },
    );

    expect(game.state.currentRound).toEqual(expectedCurrentRound);
    expect(game.state.currentRound.activeEffects).toHaveLength(1);
    const round4Effect = game.state.currentRound.activeEffects[0];

    /* TODO VSCode declares this be a syntax error */
    expect(round4Effect.capacity).toBe(4);
    expect(round4Effect.title).toMatch(/Management is paying overtime/i);

    expect(game.state.currentRound.title).toMatch(/Go Live Soon/i);
  });

  describe('round 5', () => {
    it('elminates round 4 capacity bump', () => {
      const game = getGame();

      game.nextRound();
      game.nextRound();
      game.nextRound();
      game.nextRound();
      const expectedCurrentRound: AppState['currentRound'] = expect.objectContaining(
        {
          capacity: {
            total: 10,
            available: 10,
          },
          number: 5,
          activeEffects: expect.any(Array),
        },
      );

      expect(game.state.currentRound).toEqual(expectedCurrentRound);
      expect(game.state.currentRound.activeEffects).toHaveLength(1);
      const round5Effect = game.state.currentRound.activeEffects[0];

      // Should this be zero because we expect the capacity or -4 because we have to undo the effect of the previous round? I've assumed zero?
      expect(round5Effect.capacity).toBe(0);
      expect(round5Effect.title).toMatch(/Management is paying overtime/i);

      expect(game.state.currentRound.title).toMatch(
        /We're live and we have real Customers/i,
      );
    });
  });

  /* Since Actions now live inside their respective rounds this test is no longer particularly meaningful */
  describe('actions', () => {
    describe('Informal Cross Training', () => {
      it('is only available from round 4 on', () => {
        const game = getGame();

        expect(game.availableActionIds).not.toContain(
          'GAME_ACTION_INFORMAL_CROSS_TRAINING',
        );
        game.nextRound();
        expect(game.availableActionIds).not.toContain(
          'GAME_ACTION_INFORMAL_CROSS_TRAINING',
        );
        game.nextRound();
        expect(game.availableActionIds).not.toContain(
          'GAME_ACTION_INFORMAL_CROSS_TRAINING',
        );
        game.nextRound();
        expect(game.availableActionIds).toContain(
          'GAME_ACTION_INFORMAL_CROSS_TRAINING',
        );
      });
    });
  });
});
