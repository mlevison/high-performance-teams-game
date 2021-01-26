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
    4: require('./round4').round4,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 4', () => {
  describe('Cross Skilling', () => {
    it('is hard to learn but increases capacity later, but have no effect on User Story Success', () => {
      const game = getGame();

      game.nextRound();
      game.nextRound();
      game.nextRound();
      game.nextRound();
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

      game.nextRound();
      game.nextRound();
      game.nextRound();
      game.nextRound();
      game.selectAction('NEW_TESTER');

      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
      ]);
    });
  });

  describe('Outside Course to learn testing', () => {
    it('is hard to learn but increases capacity later, but have no effect on User Story Success', () => {
      const game = getGame();

      game.nextRound();
      game.nextRound();
      game.nextRound();
      game.nextRound();
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

      game.nextRound();
      game.nextRound();
      game.nextRound();
      game.nextRound();
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
