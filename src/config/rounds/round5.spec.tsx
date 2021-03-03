import {
  getGame,
  testFutureRounds,
  advanceGameToRound,
  testCurrentRound,
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
  describe('BA, Development Testing Collaboration', () => {
    it('increases productivity, improves likelihood of completing a User Story', () => {
      const game = getGame();
      advanceGameToRound(game, 4);
      expect(game.state.currentRound.number).toEqual(4);

      game.selectAction('BA_QA_DEV_COLLABORATION');

      testCurrentRound(game, { capacityChange: 0, userStoryChange: 15 });

      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 15 },
        { capacityChange: -1, userStoryChange: 15 },
        { capacityChange: 0, userStoryChange: 15 },
        { capacityChange: 1, userStoryChange: 15 },
        { capacityChange: 1, userStoryChange: 15 },
        { capacityChange: 1, userStoryChange: 15 },
      ]);
    });
  });
});
