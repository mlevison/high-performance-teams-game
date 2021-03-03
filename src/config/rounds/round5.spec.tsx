import {
  getGame,
  testFutureRounds,
  advanceGameToRound,
} from '../../lib/testHelpers';

/* disable irrelevant other rounds */
jest.mock('./index', () => ({
  rounds: {
    1: require('./round1').round1,
    5: require('./round5').round5,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 5', () => {
  describe('Bypass Definition of Done', () => {
    it('This might seem like a good idea but always comes back to cause harm later', () => {
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
  describe('Include Stakeholders in updating Vision', () => {
    it('Time consuming but improves the likelihood that we will build the right product', () => {
      const game = getGame();
      advanceGameToRound(game, 5);
      game.selectAction('INCLUDE_STAKEHOLDERS_IN_VISION_UPDATE');

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 10 },
      ]);
    });
  });
  describe('Limit WIP', () => {
    it('Slows us down at first but eventually speeds us up', () => {
      const game = getGame();
      advanceGameToRound(game, 5);
      game.selectAction('LIMIT_WIP');

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 3, userStoryChange: 0 },
        { capacityChange: 3, userStoryChange: 0 },
      ]);
    });
  });
});
