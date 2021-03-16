import {
  getGame,
  testFutureRounds,
  testCurrentRound,
  advanceGameToRound,
} from '../../lib/testHelpers';

/* disable irrelevant other rounds */
jest.mock('./index', () => ({
  rounds: {
    1: require('./round1').round1,
    3: require('./round3').round3,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 3', () => {
  it('increases gremlinChance to 50', () => {
    const game = getGame();

    game.nextRound();
    testFutureRounds(game, [
      { capacityChange: 0, gremlinChange: 50, userStoryChange: 0 },
      { capacityChange: 0, gremlinChange: 50, userStoryChange: 0 },
      { capacityChange: 0, gremlinChange: 50, userStoryChange: 0 },
      { capacityChange: 0, gremlinChange: 50, userStoryChange: 0 },
      { capacityChange: 0, gremlinChange: 50, userStoryChange: 0 },
    ]);
  });
});

describe('round 3 Actions', () => {
  describe('Refactoring', () => {
    it('is only available if the BuildServer was implemented', () => {
      const game = getGame();
      advanceGameToRound(game, 3);
      expect(game.state.currentRound.number).toEqual(3);

      expect(game.availableActionIds).not.toContain('REFACTORING');

      game.selectAction('BUILD_SERVER');
      game.nextRound();
      expect(game.availableActionIds).toContain('REFACTORING');
    });

    it('increases capacity , but have no effect on User Story Success', () => {
      const game = getGame();
      advanceGameToRound(game, 3);
      expect(game.state.currentRound.number).toEqual(3);

      game.selectAction('REFACTORING');
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
  describe('Story Mapping or other Strategic tools', () => {
    it('is only available if the BuildServer was implemented', () => {
      const game = getGame();

      expect(game.availableActionIds).not.toContain('');

      // Advancing the test to round 3 so that we're testing whether StoryMapping is really available.
      game.nextRound();
      game.nextRound();
      game.nextRound();
      expect(game.availableActionIds).not.toContain('STORY_MAPPING_OR_OTHER');

      game.selectAction('CLARIFY_PRODUCT_VISION');
      game.nextRound();
      expect(game.availableActionIds).toContain('STORY_MAPPING_OR_OTHER');
    });

    it('has an effect on User Story Success', () => {
      const game = getGame();
      game.selectAction('CLARIFY_PRODUCT_VISION');
      game.nextRound();
      game.selectAction('STORY_MAPPING_OR_OTHER');

      // StoryMapping Improves by 10% and the change is permanent.
      //   Test is for +20% since we account for CLARIFY_PRODUCT_VISION as well
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 20 });

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 20 },
        { capacityChange: 0, userStoryChange: 20 },
        { capacityChange: 0, userStoryChange: 20 },
        { capacityChange: 0, userStoryChange: 20 },
        { capacityChange: 0, userStoryChange: 20 },
      ]);
    });
  });

  describe('Observe People + Relationships', () => {
    it('increases capacity, but have no effect on User Story Success', () => {
      const game = getGame();
      advanceGameToRound(game, 3);
      expect(game.state.currentRound.number).toEqual(3);

      game.selectAction('OBSERVE_PEOPLE_AND_RELATIONSHIPS');
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

  describe('One on Ones', () => {
    it('no effect on capacity or User Story Success', () => {
      const game = getGame();
      advanceGameToRound(game, 3);
      expect(game.state.currentRound.number).toEqual(3);

      game.selectAction('ONE_ON_ONES');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });
  });

  describe('Pair Programming', () => {
    it('increases capacity, but have no effect on User Story Success', () => {
      const game = getGame();
      advanceGameToRound(game, 3);
      expect(game.state.currentRound.number).toEqual(3);

      game.selectAction('PAIR_PROGRAMMING');

      testFutureRounds(game, [
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
      ]);
    });
  });
  describe('Improve Retrospective', () => {
    it('increases capacity', () => {
      const game = getGame();
      advanceGameToRound(game, 3);
      expect(game.state.currentRound.number).toEqual(3);

      game.selectAction('IMPROVE_RETROSPECTIVES_CHANGE_AGENDA');

      testFutureRounds(game, [
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 3, userStoryChange: 0 },
        { capacityChange: 3, userStoryChange: 0 },
      ]);
    });
  });
});
