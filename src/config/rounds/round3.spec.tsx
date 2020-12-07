import { getGame, times, testFutureCapacities } from '../../lib/testHelpers';

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
    times(5, () => {
      game.nextRound();

      expect(game.state.currentRound.capacity.total).toEqual(10);
      expect(game.state.currentRound.gremlinChance).toEqual(50);
      expect(game.state.currentRound.userStoryChance).toEqual(30);
    });
  });
});

describe('round 3 Actions', () => {
  describe('Test Driven Development', () => {
    it('is only available if the BuildServer was implemented', () => {
      const game = getGame();

      expect(game.availableActionIds).not.toContain('TEST_DRIVEN_DEVELOPMENT');

      game.nextRound();
      expect(game.availableActionIds).not.toContain('TEST_DRIVEN_DEVELOPMENT');

      game.selectAction('BUILD_SERVER');
      game.nextRound();
      expect(game.availableActionIds).toContain('TEST_DRIVEN_DEVELOPMENT');
    });

    it('is hard to learn but increases capacity later, but have no effect on User Story Success', () => {
      const game = getGame();
      game.selectAction('BUILD_SERVER');
      game.nextRound();
      game.selectAction('TEST_DRIVEN_DEVELOPMENT');

      testFutureCapacities(game, [10, 11, 12, 12, 12]);
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

      // Improves by 10% and the change is effectively permanent
      expect(game.state.currentRound.userStoryChance).toEqual(50);
      game.nextRound();
      expect(game.state.currentRound.userStoryChance).toEqual(50);
      game.nextRound();
      expect(game.state.currentRound.userStoryChance).toEqual(50);
    });
  });

  describe('Observe People + Relationships', () => {
    it('increases capacity, but have no effect on User Story Success', () => {
      const game = getGame();

      game.selectAction('OBSERVE_PEOPLE_AND_RELATIONSHIPS');

      // Capacity only ever increases by one in total
      times(5, () => {
        game.nextRound();
        expect(game.state.currentRound.capacity.total).toEqual(11);
        expect(game.state.currentRound.userStoryChance).toEqual(30);
      });
    });
  });

  describe('One on Ones', () => {
    it('no effect on capacity or User Story Success', () => {
      const game = getGame();

      game.selectAction('ONE_ON_ONES');

      // Capacity only ever increases by one in total
      times(5, () => {
        game.nextRound();
        expect(game.state.currentRound.capacity.total).toEqual(10);
        expect(game.state.currentRound.userStoryChance).toEqual(30);
      });
    });
  });

  describe('Pair Programming', () => {
    it('increases capacity, but have no effect on User Story Success', () => {
      const game = getGame();

      game.selectAction('PAIR_PROGRAMMING');

      // Capacity only ever increases by one in total
      times(5, () => {
        game.nextRound();
        expect(game.state.currentRound.capacity.total).toEqual(11);
        expect(game.state.currentRound.userStoryChance).toEqual(30);
      });
    });
  });
});
