import {
  advanceGameToRound,
  getGame,
  testCurrentRound,
  testFutureRounds,
} from '../../lib/testHelpers';

/* disable irrelevant other rounds */
jest.mock('./index', () => ({
  rounds: {
    1: require('./round1').round1,
    3: require('./round3').round3,
    4: require('./round4').round4,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 4', () => {
  describe('Test Driven Development', () => {
    it('is only available if refactoring was implemented', () => {
      const game = getGame();

      advanceGameToRound(game, 4);
      expect(game.state.currentRound.number).toEqual(4);

      expect(game.availableActionIds).not.toContain('TEST_DRIVEN_DEVELOPMENT');

      game.selectAction('REFACTORING');
      game.nextRound();
      expect(game.availableActionIds).toContain('TEST_DRIVEN_DEVELOPMENT');
    });

    it('is hard to learn but increases capacity later, but have no effect on User Story Success', () => {
      const game = getGame();
      advanceGameToRound(game, 4);
      expect(game.state.currentRound.number).toEqual(4);

      game.selectAction('REFACTORING');
      game.nextRound();
      game.selectAction('TEST_DRIVEN_DEVELOPMENT');

      // all these tests need to take into account that Refactoring already had +1 effect
      testCurrentRound(game, { capacityChange: 1, userStoryChange: 0 });

      testFutureRounds(game, [
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 3, userStoryChange: 0 },
        { capacityChange: 4, userStoryChange: 0 },
        { capacityChange: 4, userStoryChange: 0 },
      ]);
    });
  });
  describe('Cross Skilling', () => {
    it('is hard to learn but increases capacity later, but have no effect on User Story Success', () => {
      const game = getGame();
      advanceGameToRound(game, 4);
      expect(game.state.currentRound.number).toEqual(4);

      game.selectAction('CROSS_SKILLING');

      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 3, userStoryChange: 0 },
        { capacityChange: 3, userStoryChange: 0 },
      ]);
    });
  });

  describe('New Tester', () => {
    it('sometimes helps speed up a team', () => {
      const game = getGame();
      advanceGameToRound(game, 4);
      expect(game.state.currentRound.number).toEqual(4);

      game.selectAction('NEW_TESTER');

      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
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

  describe('Outside Course to learn testing', () => {
    it('is hard to learn but increases capacity later, but have no effect on User Story Success', () => {
      const game = getGame();
      advanceGameToRound(game, 4);
      expect(game.state.currentRound.number).toEqual(4);

      game.selectAction('EXTERNAL_CROSS_TRAINING');

      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
      ]);
    });
  });

  describe('Personal Productivity Bonus', () => {
    it('increases User Story Success now harms Capacity later.', () => {
      const game = getGame();
      advanceGameToRound(game, 4);
      expect(game.state.currentRound.number).toEqual(4);

      game.selectAction('PERSONAL_PRODUCTIVITY_BONUS');

      // Improves success by 50% one round only
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 50 });

      // Then it has a detrimental effect on capacity
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
      ]);
    });
  });
});
