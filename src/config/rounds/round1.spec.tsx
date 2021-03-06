import { rounds } from './index';
import {
  getGame,
  config,
  testCurrentRound,
  testFutureRounds,
  defuseRounds,
} from '../../lib/testHelpers';

const testConfig = config({
  rounds: [rounds[0], ...defuseRounds(rounds).slice(1)],
});

describe('round 1', () => {
  it('starts with capacity 10/10 and 30% userStoryChance in round 1', () => {
    const game = getGame(testConfig);

    // Since the base capacity and userStory chance are embedded in the test helper we just pass in the change
    testCurrentRound(game, {
      capacityChange: 0,
      userStoryChange: 0,
      gremlinChange: 0,
    });
  });

  describe('actions', () => {
    describe('Teams on same floor', () => {
      it('increases capacity over many rounds', () => {
        const game = getGame(testConfig);

        game.selectAction('TEAMS_ON_SAME_FLOOR');
        game.nextRound();
        testCurrentRound(game, { capacityChange: 1, userStoryChange: 0 });

        testFutureRounds(game, [
          { capacityChange: 2, userStoryChange: 0 },
          { capacityChange: 3, userStoryChange: 0 },
          { capacityChange: 4, userStoryChange: 0 },
          { capacityChange: 5, userStoryChange: 0 },
          /* no more increase after 5 rounds */
          { capacityChange: 5, userStoryChange: 0 },
        ]);
      });
    });

    describe('Protected from Outside Distraction', () => {
      it('increases the chance user-stories succeed', () => {
        const game = getGame(testConfig);

        game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');
        testCurrentRound(game, { capacityChange: 0, userStoryChange: 10 });

        testFutureRounds(game, [
          { capacityChange: 0, userStoryChange: 10 },
          { capacityChange: 0, userStoryChange: 10 },
          { capacityChange: 0, userStoryChange: 10 },
          { capacityChange: 0, userStoryChange: 10 },
        ]);
      });
    });

    describe('Working Agreements', () => {
      it('increases capacity, but have no effect on User Story Success', () => {
        const game = getGame(testConfig);

        game.selectAction('WORKING_AGREEMENTS');
        testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

        testFutureRounds(game, [
          { capacityChange: 1, userStoryChange: 0 },
          { capacityChange: 1, userStoryChange: 0 },
          { capacityChange: 1, userStoryChange: 0 },
          { capacityChange: 1, userStoryChange: 0 },
          { capacityChange: 1, userStoryChange: 0 },
        ]);
      });
    });

    describe('Clarify Product Vision', () => {
      it('increases UserStory success and has no effect on capacity', () => {
        const game = getGame(testConfig);

        game.selectAction('CLARIFY_PRODUCT_VISION');
        testCurrentRound(game, { capacityChange: 0, userStoryChange: 10 });

        // proving it had no effect on capacity
        testFutureRounds(game, [
          { capacityChange: 0, userStoryChange: 10 },
          { capacityChange: 0, userStoryChange: 10 },
          { capacityChange: 0, userStoryChange: 10 },
          { capacityChange: 0, userStoryChange: 10 },
        ]);
      });
    });
  });
});
