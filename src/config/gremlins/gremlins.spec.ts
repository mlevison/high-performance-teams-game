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
      testCurrentRound(game, { capacityChange: -3, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -3, userStoryChange: 0 },
        { capacityChange: -3, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });

    it('reduces capacity by 3 for 2 rounds when team is protected by outside distractions', () => {
      const game = getGame();

      game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound('GREMLIN_EMERGENCY_ON_OTHER_TEAM');
      testCurrentRound(game, { capacityChange: -3, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -3, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });

    it('reduces capacity by 2 for 3 rounds when team had informal cross training', () => {
      const game = getGame();

      game.selectAction('CROSS_SKILLING');
      game.nextRound('GREMLIN_EMERGENCY_ON_OTHER_TEAM');
      testCurrentRound(game, { capacityChange: -2, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });

    it('reduces capacity by 1 for 2 rounds when team has all protective actions', () => {
      const game = getGame();

      game.selectAction('CROSS_SKILLING');
      game.selectAction('EXTERNAL_CROSS_TRAINING');
      game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound('GREMLIN_EMERGENCY_ON_OTHER_TEAM');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });
  });

  describe('Management yells at a team member', () => {
    it('reduces capacity by 2 ', () => {
      const game = getGame();

      game.nextRound('GREMLIN_MANAGEMENT_YELLS');
      testCurrentRound(game, { capacityChange: -2, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
      ]);
    });

    it('has less effect on capacity when team is protected by outside distractions', () => {
      const game = getGame();

      game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound('GREMLIN_MANAGEMENT_YELLS');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
      ]);
    });

    // it('adding protected by outside distractions after the fact has no effect', () => {
    //   const game = getGame();

    //   game.nextRound('GREMLIN_MANAGEMENT_YELLS');
    //   testCurrentRound(game, { capacityChange: -2, userStoryChange: 0 });
    //   game.nextRound();
    //   game.selectAction('PROTECTED_FROM_OUTSIDE_DISTRACTION');

    //   testFutureRounds(game, [
    //     { capacityChange: -2, userStoryChange: 0 },
    //     { capacityChange: -2, userStoryChange: 0 },
    //   ]);
    // });
  });

  describe('Team Member not pulling their weight', () => {
    it('reduces capacity by 2 ', () => {
      const game = getGame();

      game.nextRound('GREMLIN_NOT_PULLING_THEIR_WEIGHT');
      testCurrentRound(game, { capacityChange: -2, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
      ]);
    });

    it('has effect reduced by 1 if ScrumMaster conducts one on ones', () => {
      const game = getGame();

      game.selectAction('ONE_ON_ONES');
      game.nextRound('GREMLIN_NOT_PULLING_THEIR_WEIGHT');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
      ]);
    });

    it('has effect reduced by 1 if the team works on Cross Skilling', () => {
      const game = getGame();

      game.selectAction('CROSS_SKILLING');
      game.nextRound('GREMLIN_NOT_PULLING_THEIR_WEIGHT');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
      ]);
    });

    it('has effect reduce by only 1 if both One on Ones and Cross Skilling', () => {
      const game = getGame();

      game.selectAction('ONE_ON_ONES');
      game.nextRound('GREMLIN_NOT_PULLING_THEIR_WEIGHT');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
      ]);
    });
  });

  describe('Team Member consistently late or misses Daily Scrum', () => {
    it('reduces capacity by 1 ', () => {
      const game = getGame();

      game.nextRound('GREMLIN_NOT_AT_DAILY_SCRUM');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
      ]);
    });
    it('has effect reduced to 0 if ScrumMaster conducts one on ones', () => {
      const game = getGame();

      game.selectAction('ONE_ON_ONES');
      game.nextRound('GREMLIN_NOT_AT_DAILY_SCRUM');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });

    it('has effect reduced to 0 if Working Agreements in effect', () => {
      const game = getGame();

      game.selectAction('WORKING_AGREEMENTS');
      game.nextRound('GREMLIN_NOT_AT_DAILY_SCRUM');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
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
      testCurrentRound(game, { capacityChange: -1, userStoryChange: -10 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });

    it('has reduced effect on capacity when team does Story Mapping to maintain a good Strategic view', () => {
      const game = getGame();

      game.selectAction('STORY_MAPPING_OR_OTHER');
      game.nextRound('GREMLIN_NEW_STORY_MID_SPRINT');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: -10 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });

    it('has no effect on capacity when team does Product Backlog refinement and Story Mapping', () => {
      const game = getGame();

      game.selectAction('BACKLOG_REFINEMENT');
      game.selectAction('STORY_MAPPING_OR_OTHER');
      game.nextRound('GREMLIN_NEW_STORY_MID_SPRINT');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });
  });
  describe('Messy Code Found', () => {
    it('Unreadable code has a -ve effect on speed since we have to spend time on rereading it.', () => {
      const game = getGame();

      game.nextRound('GREMLIN_UNREADABLE_CODE');
      testCurrentRound(game, { capacityChange: -2, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
      ]);
    });
    it('has effect reduced if Pair Programming is done', () => {
      const game = getGame();

      game.selectAction('PAIR_PROGRAMMING');
      game.nextRound('GREMLIN_UNREADABLE_CODE');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
      ]);
    });
    it('has effect reduced if TDD is done', () => {
      const game = getGame();

      game.selectAction('TEST_DRIVEN_DEVELOPMENT');
      game.nextRound('GREMLIN_UNREADABLE_CODE');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
      ]);
    });
    it('has no effect if TDD and Pair Programming is done', () => {
      const game = getGame();

      game.selectAction('TEST_DRIVEN_DEVELOPMENT');
      game.selectAction('PAIR_PROGRAMMING');
      game.nextRound('GREMLIN_UNREADABLE_CODE');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });
  });

  describe('Product Backlog is a Mess ', () => {
    it('reduces capacity by 1 and userStorySuccessChance by 20 goes away one round', () => {
      const game = getGame();
      advanceGameToRound(game, 2);

      game.nextRound('GREMLIN_PRODUCT_BACKLOG_MESS');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: -20 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: -20 },
        { capacityChange: -1, userStoryChange: -20 },
      ]);
    });

    it('has reduced effect on capacity when team does Product Backlog refinement', () => {
      const game = getGame();

      game.selectAction('BACKLOG_REFINEMENT');
      game.nextRound('GREMLIN_PRODUCT_BACKLOG_MESS');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: -10 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: -10 },
        { capacityChange: -1, userStoryChange: -10 },
      ]);
    });

    it('has reduced effect on capacity when team does Story Mapping to maintain a good Strategic view', () => {
      const game = getGame();

      game.selectAction('STORY_MAPPING_OR_OTHER');
      game.nextRound('GREMLIN_PRODUCT_BACKLOG_MESS');
      testCurrentRound(game, { capacityChange: -1, userStoryChange: -10 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: -10 },
        { capacityChange: -1, userStoryChange: -10 },
      ]);
    });

    it('has no effect on capacity when team does Product Backlog refinement and Story Mapping', () => {
      const game = getGame();

      game.selectAction('WORK_WITH_PO_LIMIT_PB_SIZE');
      game.nextRound('GREMLIN_PRODUCT_BACKLOG_MESS');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });
  });

  describe('Skip a Retro', () => {
    it('reduces capacity by -1 per round', () => {
      const game = getGame();

      game.nextRound('GREMLIN_SKIP_RETRO');
      // no effect in the current round since the damage is in the future
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -3, userStoryChange: 0 },
        { capacityChange: -4, userStoryChange: 0 },
        { capacityChange: -4, userStoryChange: 0 },
      ]);
    });

    it('avoided if the agenda is changed', () => {
      const game = getGame();

      game.selectAction('IMPROVE_RETROSPECTIVES_CHANGE_AGENDA');
      game.nextRound('GREMLIN_SKIP_RETRO');
      // no effect in the current round since the damage is in the future
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });

    it('avoided if Retrospectives implement Concrete actions', () => {
      const game = getGame();

      game.selectAction('IMPROVE_RETROSPECTIVES_CONCRETE_ACTIONS');
      game.nextRound('GREMLIN_SKIP_RETRO');
      // no effect in the current round since the damage is in the future
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });

    it('If improvements are implemented later they still help', () => {
      const game = getGame();

      game.nextRound('GREMLIN_SKIP_RETRO');
      // no effect in the current round since the damage is in the future
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
      ]);
      game.selectAction('IMPROVE_RETROSPECTIVES_CONCRETE_ACTIONS');
      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });
  });
});
