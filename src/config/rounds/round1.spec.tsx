import { BaseEffect } from 'state';
import {
  getGame,
  testCurrentRound,
  testFutureRounds,
} from '../../lib/testHelpers';

/* disable all other rounds */
jest.mock('./index', () => ({
  rounds: { 1: require('./round1').round1 },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 1', () => {
  it('starts with capacity 10/10 and 30% userStoryChance in round 1', () => {
    const game = getGame();

    testCurrentRound(game, { capacityChange: 10, userStoryChange: 30 });
  });

  describe('actions', () => {
    describe('Teams on same floor', () => {
      it('increases capacity over many rounds', () => {
        const game = getGame();

        game.selectAction('TEAMS_ON_SAME_FLOOR');
        game.nextRound();
        testCurrentRound(game, { capacityChange: 11, userStoryChange: 30 });

        testFutureRounds(game, [
          { capacityChange: 12, userStoryChange: 30 },
          { capacityChange: 13, userStoryChange: 30 },
          { capacityChange: 14, userStoryChange: 30 },
          { capacityChange: 15, userStoryChange: 30 },
          /* no more increase after 5 rounds */
          { capacityChange: 15, userStoryChange: 30 },
        ]);
      });
    });

    describe('Protected from Outside Distraction', () => {
      it('increases the chance user-stories succeed', () => {
        const game = getGame();

        game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');

        testFutureRounds(game, [
          { capacityChange: 10, userStoryChange: 40 },
          { capacityChange: 10, userStoryChange: 40 },
          { capacityChange: 10, userStoryChange: 40 },
          { capacityChange: 10, userStoryChange: 40 },
        ]);
      });
    });

    describe('Working Agreements', () => {
      it('increases capacity, but have no effect on User Story Success', () => {
        const game = getGame();

        game.selectAction('WORKING_AGREEMENTS');

        testFutureRounds(game, [
          { capacityChange: 11, userStoryChange: 30 },
          { capacityChange: 11, userStoryChange: 30 },
          { capacityChange: 11, userStoryChange: 30 },
          { capacityChange: 11, userStoryChange: 30 },
          { capacityChange: 11, userStoryChange: 30 },
        ]);
      });
    });

    describe('Clarify Product Vision', () => {
      it('increases UserStory success and has no effect on capacity', () => {
        const game = getGame();

        game.selectAction('CLARIFY_PRODUCT_VISION');
        testCurrentRound(game, { capacityChange: 10, userStoryChange: 40 });

        // proving it had no effect on capacity
        testFutureRounds(game, [
          { capacityChange: 10, userStoryChange: 40 },
          { capacityChange: 10, userStoryChange: 40 },
          { capacityChange: 10, userStoryChange: 40 },
          { capacityChange: 10, userStoryChange: 40 },
        ]);
      });
    });
  });
});
