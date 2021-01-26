import {
  getGame,
  testCurrentRound,
  testFutureRounds,
  times,
} from '../../lib/testHelpers';

/* disable irrelevant other rounds */
jest.mock('./index', () => ({
  rounds: {
    1: require('./round1').round1,
    2: require('./round2').round2,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round2', () => {
  it('does not enable gremlins', () => {
    const game = getGame();

    testFutureRounds(game, [
      { capacityChange: 0, gremlinChange: 0, userStoryChange: 0 },
      { capacityChange: 0, gremlinChange: 0, userStoryChange: 0 },
      { capacityChange: 0, gremlinChange: 0, userStoryChange: 0 },
      { capacityChange: 0, gremlinChange: 0, userStoryChange: 0 },
      { capacityChange: 0, gremlinChange: 0, userStoryChange: 0 },
    ]);
  });
});

describe('round 2 Actions', () => {
  describe('Unit Testing', () => {
    it('is only available if the BuildServer was implemented', () => {
      const game = getGame();

      expect(game.availableActionIds).not.toContain('UNIT_TESTING');

      game.nextRound();
      expect(game.availableActionIds).not.toContain('UNIT_TESTING');

      game.selectAction('BUILD_SERVER');
      game.nextRound();
      expect(game.availableActionIds).toContain('UNIT_TESTING');
    });

    it('increases capacity, but have no effect on User Story Success', () => {
      const game = getGame();
      game.selectAction('BUILD_SERVER');
      game.nextRound();
      game.selectAction('UNIT_TESTING');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

      // Capacity only ever increases by one in total
      testFutureRounds(game, [
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
      ]);
    });
  });

  describe('Remote Avatars', () => {
    it('increases capacity, but have no effect on User Story Success', () => {
      const game = getGame();

      game.selectAction('REMOTE_TEAM_AVATARS');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

      // Capacity only ever increases by one in total
      testFutureRounds(game, [
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
      ]);
    });
  });

  describe('Eliminate Long Lived Feature Branches', () => {
    it('increases capacity, but have no effect on User Story Success', () => {
      const game = getGame();

      game.selectAction('ELIMINATE_LONG_LIVED_FEATURE_BRANCHES');

      // Capacity only ever increases by one in total
      testFutureRounds(game, [
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
      ]);
    });
  });

  describe('Social Time', () => {
    it('increases capacity, but have no effect on User Story Success', () => {
      const game = getGame();

      game.selectAction('SOCIAL_TIME');

      // Capacity only ever increases by one in total
      testFutureRounds(game, [
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
      ]);
    });
  });

  describe('Problem Solving Bonus', () => {
    it('increases capacity now at first but harms it in the future', () => {
      const game = getGame();

      game.selectAction('PROBLEM_SOLVING_BONUS');

      testFutureRounds(game, [
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });
  });

  describe('Product Backlog Refinement', () => {
    it('increases User Story Success, but have no effect on increases capacity', () => {
      const game = getGame();

      game.selectAction('BACKLOG_REFINEMENT');
      expect(game.state.currentRound.userStoryChance).toEqual(45);

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 15 },
        { capacityChange: 0, userStoryChange: 15 },
        { capacityChange: 0, userStoryChange: 15 },
        { capacityChange: 0, userStoryChange: 15 },
        { capacityChange: 0, userStoryChange: 15 },
      ]);
    });
  });
});
