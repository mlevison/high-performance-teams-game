import { AppState } from '../../state';
import { getGame } from '../../lib/testHelpers';

/* disable irrelevant other rounds */
jest.mock('./index', () => ({
  rounds: {
    1: require('./round1').round1,
    4: require('./round4').round4,
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
    expect(round4Effect.capacity).toBe(4);
    expect(round4Effect.title).toMatch(/Management is paying overtime/i);

    expect(game.state.currentRound.title).toMatch(/Go Live Soon/i);
  });

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
