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

    testCurrentRound(game, {
      capacity: {
        total: 10,
        available: 10,
      },
      gremlinChance: 0,
      userStoryChance: 30,
      number: 1,
      activeEffects: [],
      title: /Welcome to the World’s Smallest Online Bookstore/i,
    });
  });

  describe('actions', () => {
    describe('Teams on same floor', () => {
      it('increases capacity over many rounds', () => {
        const game = getGame();

        game.selectAction('TEAMS_ON_SAME_FLOOR');
        game.nextRound();
        testCurrentRound(game, { number: 2, capacity: { total: 11 } });

        testFutureRounds(game, [
          { capacity: { total: 12 } },
          { capacity: { total: 13 } },
          { capacity: { total: 14 } },
          { capacity: { total: 15 } },
          /* no more increase after 5 rounds */
          { capacity: { total: 15 } },
        ]);
      });
    });

    describe('Protected from Outside Distraction', () => {
      it('increases the chance user-stories succeed', () => {
        const game = getGame();

        game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');

        testFutureRounds(game, [
          { userStoryChance: 40 },
          { userStoryChance: 40 },
          { userStoryChance: 40 },
          { userStoryChance: 40 },
          { userStoryChance: 40 },
        ]);
      });
    });

    describe('Working Agreements', () => {
      it('increases capacity, but have no effect on User Story Success', () => {
        const game = getGame();

        game.selectAction('WORKING_AGREEMENTS');

        testFutureRounds(game, [
          { capacity: { total: 11 }, userStoryChance: 30 },
          { capacity: { total: 11 }, userStoryChance: 30 },
          { capacity: { total: 11 }, userStoryChance: 30 },
          { capacity: { total: 11 }, userStoryChance: 30 },
          { capacity: { total: 11 }, userStoryChance: 30 },
        ]);
      });
    });

    describe('Clarify Product Vision', () => {
      it('increases UserStory success and has no effect on capacity', () => {
        const game = getGame();

        game.selectAction('CLARIFY_PRODUCT_VISION');
        testCurrentRound(game, { userStoryChance: 40 });

        // proving it had no effect on capacity
        testFutureRounds(game, [
          { capacity: { total: 10 }, userStoryChance: 40 },
          { capacity: { total: 10 }, userStoryChance: 40 },
          { capacity: { total: 10 }, userStoryChance: 40 },
          { capacity: { total: 10 }, userStoryChance: 40 },
          { capacity: { total: 10 }, userStoryChance: 40 },
        ]);
      });
    });
  });
});
