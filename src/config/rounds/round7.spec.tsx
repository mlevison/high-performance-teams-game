import { rounds } from './index';
import {
  advanceGameToRound,
  getGame,
  testCurrentRound,
  testFutureRounds,
  config,
  defuseRounds,
} from '../../lib/testHelpers';

const testConfig = config({
  rounds: [
    ...defuseRounds(rounds.slice(0, 6)),
    rounds[6],
    ...defuseRounds(rounds.slice(7)),
  ],
});

describe('round 7', () => {
  describe('Pre-Allocate Capacity for fires', () => {
    it('By setting aside some of the teams capacity for dealing with Production support -- no immediate effect', () => {
      const game = getGame(testConfig);
      advanceGameToRound(game, 7);
      expect(game.state.currentRound.number).toEqual(7);

      game.selectAction('PREALLOCATE_CAPACITY_FOR_PRODUCTION_SUPPORT');
      // round capacity bump still in effect
      testCurrentRound(game, {
        capacityChange: 0,
        userStoryChange: 0,
      });

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });
  });
  describe('Sacrifice One Team Member for fires', () => {
    it('By finding one team member who is willing to be point person for a defect the rest of the team is able to focus', () => {
      const game = getGame(testConfig);
      advanceGameToRound(game, 7);
      expect(game.state.currentRound.number).toEqual(7);

      game.selectAction('ONE_PERSON_DEALS_WITH_DEFECTS');
      // round capacity bump still in effect
      testCurrentRound(game, {
        capacityChange: 0,
        userStoryChange: 0,
      });

      testFutureRounds(game, [
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
        { capacityChange: 0, userStoryChange: 0 },
      ]);
    });
  });
});
