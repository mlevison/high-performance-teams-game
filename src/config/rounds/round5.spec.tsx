import {
  getGame,
  testFutureRounds,
  advanceGameToRound,
} from '../../lib/testHelpers';

/* disable irrelevant other rounds */
jest.mock('./index', () => ({
  rounds: {
    1: require('./round1').round1,
    5: require('./round5').round3,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 5', () => {
  describe('Bypass Definition of Done', () => {
    it('is hard to learn but increases capacity later, but have no effect on User Story Success', () => {
      const game = getGame();
      advanceGameToRound(game, 5);
      game.selectAction('BYPASS_DEFINITION_OF_DONE');

      testFutureRounds(game, [
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: -10 },
        { capacityChange: 0, userStoryChange: -10 },
        { capacityChange: 0, userStoryChange: -10 },
        { capacityChange: 0, userStoryChange: -10 },
      ]);
    });
  });
});
