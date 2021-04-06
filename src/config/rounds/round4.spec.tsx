import { rounds } from './index';
import {
  advanceGameToRound,
  getGame,
  testCurrentRound,
  testFutureRounds,
  config,
  defuseRounds,
} from '../../lib/testHelpers';

const testConfig = config({
  rounds: [
    ...defuseRounds(rounds.slice(0, 3)),
    rounds[3],
    ...defuseRounds(rounds.slice(4)),
  ],
});

describe('round 4', () => {
  describe('Test Driven Development', () => {
    it('is only available if refactoring was implemented', () => {
      const game = getGame(testConfig);

      advanceGameToRound(game, 4);
      expect(game.state.currentRound.number).toEqual(4);

      expect(game.availableActionIds).not.toContain('TEST_DRIVEN_DEVELOPMENT');

      game.selectAction('REFACTORING');
      game.nextRound();
      expect(game.availableActionIds).toContain('TEST_DRIVEN_DEVELOPMENT');
    });

    it('is hard to learn but increases capacity later, but have no effect on User Story Success', () => {
      const game = getGame(testConfig);
      advanceGameToRound(game, 4);
      expect(game.state.currentRound.number).toEqual(4);

      game.selectAction('REFACTORING');
      game.nextRound();
      game.selectAction('TEST_DRIVEN_DEVELOPMENT');

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
  describe('Cross Skilling', () => {
    it('is hard to learn but increases capacity later, but have no effect on User Story Success', () => {
      const game = getGame(testConfig);
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
      const game = getGame(testConfig);
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

  describe('Outside Course to learn testing', () => {
    it('is hard to learn but increases capacity later, but have no effect on User Story Success', () => {
      const game = getGame(testConfig);
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
      const game = getGame(testConfig);
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

  describe('Limit WIP', () => {
    it('Slows us down at first but eventually speeds us up', () => {
      const game = getGame(testConfig);
      advanceGameToRound(game, 4);
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
