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

    testCurrentRound(game, { capacityChange: 10, userStoryChange: 0 });
  });

  describe('actions', () => {
    describe('Teams on same floor', () => {
      it('increases capacity over many rounds', () => {
        const game = getGame();

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
        const game = getGame();

        game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');

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
        const game = getGame();

        game.selectAction('WORKING_AGREEMENTS');

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
        const game = getGame();

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
