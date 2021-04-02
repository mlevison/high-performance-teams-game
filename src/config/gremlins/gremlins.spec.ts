import { START_CAPACITY } from '../../gameConstants';
import {
  advanceGameToRound,
  getGame,
  testCurrentRound,
  testFutureRounds,
} from '../../lib/testHelpers';
import { gremlins } from './gremlins';

/* Disable round, game and action effects */
jest.mock('../../state/rounds/getRoundEffects', () => ({
  getRoundEffects: () => [{ capacityChange: 10, userStoryChange: 30 }],
}));
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));
jest.mock('../../state/gameActions/getEffects', () => ({
  getEffects: () => [],
}));

describe('Gremlins', () => {
  describe('emergency on another team', () => {
    it('has a probability of 10', () => {
      expect(
        gremlins.GREMLIN_EMERGENCY_ON_OTHER_TEAM.probability({
          currentRound: { gremlin: null, selectedGameActionIds: [] },
          pastRounds: [],
          ui: { review: false, view: 'welcome' },
          log: [],
        }),
      ).toBe(10);
    });

    it('reduces capacity by 3 for 3 rounds', () => {
      const game = getGame();

      game.nextRound('GREMLIN_EMERGENCY_ON_OTHER_TEAM');

      // TODO - Hannes - Can't tell what property to access to assert that the name is what I expect

      expect(game.state.currentRound.capacity.available).toBe(7);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(7);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(7);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);
    });

    it('reduces capacity by 3 for 2 rounds when team is protected by outside distractions', () => {
      const game = getGame();

      game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound('GREMLIN_EMERGENCY_ON_OTHER_TEAM');
      expect(game.state.currentRound.capacity.available).toBe(7);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(7);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);
    });

    it('reduces capacity by 2 for 3 rounds when team had informal cross training', () => {
      const game = getGame();

      game.selectAction('CROSS_SKILLING');
      game.nextRound('GREMLIN_EMERGENCY_ON_OTHER_TEAM');
      expect(game.state.currentRound.capacity.available).toBe(8);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(8);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(8);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);
    });

    it('reduces capacity by 1 for 2 rounds when team has all protective actions', () => {
      const game = getGame();

      game.selectAction('CROSS_SKILLING');
      game.selectAction('EXTERNAL_CROSS_TRAINING');
      game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound('GREMLIN_EMERGENCY_ON_OTHER_TEAM');
      expect(game.state.currentRound.capacity.available).toBe(9);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(9);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(10);
    });
  });

  describe('Management yells at a team member', () => {
    it('reduces capacity by 2 ', () => {
      const game = getGame();

      game.nextRound('GREMLIN_MANAGEMENT_YELLS');

      // TODO Again how to test on the name?

      expect(game.state.currentRound.capacity.available).toBe(8);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(8);

      // It never goes away by itself
      game.nextRound();
      game.nextRound();
      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(8);
    });

    it('has no effect on capacity when team is protected by outside distractions', () => {
      const game = getGame();

      game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound('GREMLIN_MANAGEMENT_YELLS');
      expect(game.state.currentRound.capacity.available).toBe(10);
    });
  });

  describe('Team Member not pulling their weight', () => {
    it('reduces capacity by 2 ', () => {
      const game = getGame();

      game.nextRound('GREMLIN_NOT_PULLING_THEIR_WEIGHT');

      // TODO Again how to test on the name?

      expect(game.state.currentRound.capacity.available).toBe(8);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(8);

      // It never goes away by itself
      game.nextRound();
      game.nextRound();
      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(8);
    });

    it('has effect reduced by 1 if ScrumMaster conducts one on ones', () => {
      const game = getGame();

      game.selectAction('ONE_ON_ONES');
      game.nextRound('GREMLIN_NOT_PULLING_THEIR_WEIGHT');
      expect(game.state.currentRound.capacity.available).toBe(9);
    });

    it('has effect reduced by 1 if the team works on Cross Skilling', () => {
      const game = getGame();

      game.selectAction('CROSS_SKILLING');
      game.nextRound('GREMLIN_NOT_PULLING_THEIR_WEIGHT');
      expect(game.state.currentRound.capacity.available).toBe(9);
    });

    it('has effect reduce by only 1 if both One on Ones and Cross Skilling', () => {
      const game = getGame();

      game.selectAction('ONE_ON_ONES');
      game.nextRound('GREMLIN_NOT_PULLING_THEIR_WEIGHT');
      expect(game.state.currentRound.capacity.available).toBe(9);
    });
  });

  describe('Team Member consistently late or misses Daily Scrum', () => {
    it('reduces capacity by 1 ', () => {
      const game = getGame();

      game.nextRound('GREMLIN_NOT_AT_DAILY_SCRUM');

      // TODO Again how to test on the name?

      expect(game.state.currentRound.capacity.available).toBe(9);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(9);

      // It never goes away by itself
      game.nextRound();
      game.nextRound();
      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(9);
    });
    it('has effect reduced to 0 if ScrumMaster conducts one on ones', () => {
      const game = getGame();

      game.selectAction('ONE_ON_ONES');
      game.nextRound('GREMLIN_NOT_AT_DAILY_SCRUM');
      expect(game.state.currentRound.capacity.available).toBe(10);
    });

    it('has effect reduced to 0 if Working Agreements in effect', () => {
      const game = getGame();

      game.selectAction('WORKING_AGREEMENTS');
      game.nextRound('GREMLIN_NOT_AT_DAILY_SCRUM');
      expect(game.state.currentRound.capacity.available).toBe(10);
    });
  });

  describe('New Story from PO MidSprint ', () => {
    it('reduces capacity by 2 and userStorySuccessChance by 10 goes away one round', () => {
      const game = getGame();
      advanceGameToRound(game, 2);

      game.nextRound('GREMLIN_NEW_STORY_MID_SPRINT');
      testCurrentRound(game, { capacityChange: -2, userStoryChange: -10 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });

    it('has reduced effect on capacity when team does Product Backlog refinement', () => {
      const game = getGame();

      game.selectAction('BACKLOG_REFINEMENT');
      game.nextRound('GREMLIN_NEW_STORY_MID_SPRINT');
      expect(game.state.currentRound.capacity.available).toBe(
        START_CAPACITY - 1,
      );

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(START_CAPACITY);
    });

    it('has reduced effect on capacity when team does Stpry Mapping to maintain a good Strategic view', () => {
      const game = getGame();

      game.selectAction('STORY_MAPPING_OR_OTHER');
      game.nextRound('GREMLIN_NEW_STORY_MID_SPRINT');
      expect(game.state.currentRound.capacity.available).toBe(
        START_CAPACITY - 1,
      );

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(START_CAPACITY);
    });

    it('has no effect on capacity when team does Product Backlog refinement and Story Mapping', () => {
      const game = getGame();

      game.selectAction('BACKLOG_REFINEMENT');
      game.selectAction('STORY_MAPPING_OR_OTHER');
      game.nextRound('GREMLIN_NEW_STORY_MID_SPRINT');
      expect(game.state.currentRound.capacity.available).toBe(START_CAPACITY);

      game.nextRound();
      expect(game.state.currentRound.capacity.available).toBe(START_CAPACITY);
    });
  });
});
