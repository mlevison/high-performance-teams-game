import {
  getGame,
  testFutureRounds,
  advanceGameToRound,
  testCurrentRound,
} from '../../lib/testHelpers';
import { BR_USER_STORY_CHANGE } from './round2';

/* disable irrelevant other rounds */
jest.mock('./index', () => ({
  rounds: {
    1: require('./round1').round1,
    2: require('./round2').round2,
    5: require('./round5').round5,
  },
}));

/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 5', () => {
  describe('Bypass Definition of Done', () => {
    it('This might seem like a good idea but always comes back to cause harm later', () => {
      const game = getGame();
      advanceGameToRound(game, 5);
      game.selectAction('BYPASS_DEFINITION_OF_DONE');

      testFutureRounds(game, [
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: -10 },
        { capacityChange: 0, userStoryChange: -10 },
        { capacityChange: 0, userStoryChange: -10 },
        { capacityChange: 0, userStoryChange: -10 },
      ]);
    });
  });
  describe('Include Stakeholders in updating Vision', () => {
    it('Time consuming but improves the likelihood that we will build the right product', () => {
      const game = getGame();
      advanceGameToRound(game, 5);
      game.selectAction('INCLUDE_STAKEHOLDERS_IN_VISION_UPDATE');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 10 },
      ]);
    });
  });
  describe('Adopting BDD', () => {
    it('increases productivity by increasing collaboration between ppl on the team, improves likelihood of completing a User Story', () => {
      const game = getGame();
      advanceGameToRound(game, 5);
      expect(game.state.currentRound.number).toEqual(5);

      game.selectAction('ADOPT_BDD');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 10 });

      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 10 },
        { capacityChange: -1, userStoryChange: 10 },
        { capacityChange: 0, userStoryChange: 15 },
        { capacityChange: 0, userStoryChange: 15 },
        { capacityChange: 1, userStoryChange: 20 },
        { capacityChange: 1, userStoryChange: 20 },
      ]);
    });
  });
  describe('Limit Product Backlog size', () => {
    it('By Limiting Product Backlog Size the PO avoids making unrealistic promise', () => {
      const game = getGame();
      advanceGameToRound(game, 5);
      expect(game.state.currentRound.number).toEqual(5);

      game.selectAction('WORK_WITH_PO_LIMIT_PB_SIZE');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
      ]);
    });
  });
  describe('Establish Sprint Goals', () => {
    it('is only available if refactoring was Backlog Refinement was implemented', () => {
      const game = getGame();

      advanceGameToRound(game, 5);
      expect(game.state.currentRound.number).toEqual(5);

      expect(game.availableActionIds).not.toContain('ESTABLISH_SPRINT_GOALS');

      game.selectAction('BACKLOG_REFINEMENT');
      game.nextRound();
      expect(game.availableActionIds).toContain('ESTABLISH_SPRINT_GOALS');
    });
    it('By Establishing Sprint Goals', () => {
      const game = getGame();
      advanceGameToRound(game, 4);
      game.selectAction('BACKLOG_REFINEMENT');
      game.nextRound();
      expect(game.state.currentRound.number).toEqual(5);

      game.selectAction('ESTABLISH_SPRINT_GOALS');
      testCurrentRound(game, {
        capacityChange: 0,
        userStoryChange: 5 + BR_USER_STORY_CHANGE,
      });

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 5 + BR_USER_STORY_CHANGE },
        { capacityChange: 0, userStoryChange: 10 + BR_USER_STORY_CHANGE },
        { capacityChange: 0, userStoryChange: 10 + BR_USER_STORY_CHANGE },
        { capacityChange: 0, userStoryChange: 15 + BR_USER_STORY_CHANGE },
        { capacityChange: 0, userStoryChange: 15 + BR_USER_STORY_CHANGE },
        { capacityChange: 0, userStoryChange: 15 + BR_USER_STORY_CHANGE },
      ]);
    });
  });
  describe('Post a public impediments list', () => {
    it('By making the teams impediments public', () => {
      const game = getGame();
      advanceGameToRound(game, 5);
      expect(game.state.currentRound.number).toEqual(5);

      game.selectAction('MAKE_IMPEDIMENTS_LIST_PUBLIC');
      testCurrentRound(game, { capacityChange: 0, userStoryChange: 0 });

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 1, userStoryChange: 0 },
        { capacityChange: 2, userStoryChange: 0 },
        { capacityChange: 3, userStoryChange: 0 },
        { capacityChange: 3, userStoryChange: 0 },
        { capacityChange: 3, userStoryChange: 0 },
      ]);
    });
  });
});
