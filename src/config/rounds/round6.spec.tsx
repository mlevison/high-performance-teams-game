import { AppState } from '../../state';
import {
  getGame,
  testCurrentRound,
  testFutureRounds,
} from '../../lib/testHelpers';

/* disable irrelevant other rounds */
jest.mock('./index', () => ({
  rounds: {
    1: require('./round1').round1,
    6: require('./round6').round6,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 6', () => {
  it('comes with a 4 capacity bump', () => {
    const game = getGame();

    game.nextRound();
    game.nextRound();
    game.nextRound();
    game.nextRound();
    game.nextRound();

    testCurrentRound(game, { capacityChange: 4 });

    // ensure that the effect only lasts one round
    testFutureRounds(game, [
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
    ]);
  });
});
