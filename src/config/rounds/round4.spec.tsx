import { AppState, isCapacityEffect } from '../../state';
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

    if (!isCapacityEffect(round4Effect)) {
      throw new Error('Expected effect of round 4 to be a capacity effect');
    }
    expect(round4Effect.capacity).toBe(4);
    expect(round4Effect.title).toMatch(/Management is paying overtime/i);

    expect(game.state.currentRound.title).toMatch(/Go Live Soon/i);

    /* make sure bump only lasts for 1 round*/
    game.nextRound();
    expect(game.state.currentRound.activeEffects).toHaveLength(0);
  });
});
