import { rounds } from './index';
import {
  getGame,
  testFutureRounds,
  testCurrentRound,
  advanceGameToRound,
  config,
  defuseRounds,
} from '../../lib/testHelpers';
import { ROUND3_GREMLIN_CHANCE } from 'config';

const testConfig = config({
  rounds: [
    ...defuseRounds(rounds.slice(0, 2)),
    rounds[2],
    ...defuseRounds(rounds.slice(3)),
  ],
});

describe('round 3', () => {
  it('increases gremlinChance to ROUND3_GREMLIN_CHANCE', () => {
    const game = getGame(testConfig);

    game.nextRound();
    testFutureRounds(game, [
      {
        capacityChange: 0,
        gremlinChange: ROUND3_GREMLIN_CHANCE,
        userStoryChange: 0,
      },
      {
        capacityChange: 0,
        gremlinChange: ROUND3_GREMLIN_CHANCE,
        userStoryChange: 0,
      },
      {
        capacityChange: 0,
        gremlinChange: ROUND3_GREMLIN_CHANCE,
        userStoryChange: 0,
      },
      {
        capacityChange: 0,
        gremlinChange: ROUND3_GREMLIN_CHANCE,
        userStoryChange: 0,
      },
      {
        capacityChange: 0,
        gremlinChange: ROUND3_GREMLIN_CHANCE,
        userStoryChange: 0,
      },
    ]);
  });
});

describe('round 3 Actions', () => {
  describe('Refactoring', () => {
    it('is only available if the BuildServer was implemented', () => {
      const game = getGame(testConfig);
      advanceGameToRound(game, 3);
      expect(game.state.currentRound.number).toEqual(3);

      expect(game.availableActionIds).not.toContain('REFACTORING');

      game.selectAction('BUILD_SERVER');
      game.nextRound();
      expect(game.availableActionIds).toContain('REFACTORING');
    });

    it('increases capacity , but have no effect on User Story Success', () => {
      const game = getGame(testConfig);
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
    it('is only available if the Clarify Product Vision was implemented', () => {
      const game = getGame(testConfig);

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
      const game = getGame(testConfig);
      game.selectAction('CLARIFY_PRODUCT_VISION');
      game.nextRound();
      game.selectAction('STORY_MAPPING_OR_OTHER');

      // StoryMapping Improves by 10% and the change is permanent.
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 10 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 10 },
      ]);
    });
  });

  describe('Observe People + Relationships', () => {
    it('increases capacity, but have no effect on User Story Success', () => {
      const game = getGame(testConfig);
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
      const game = getGame(testConfig);
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
      const game = getGame(testConfig);
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
      const game = getGame(testConfig);
      advanceGameToRound(game, 3);
      expect(game.state.currentRound.number).toEqual(3);

      game.selectAction('IMPROVE_RETROSPECTIVES_CHANGE_AGENDA');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

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
