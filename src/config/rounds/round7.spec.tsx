import {
  advanceGameToRound,
  getGame,
  testCurrentRound,
  testFutureRounds,
} from '../../lib/testHelpers';

/* disable irrelevant other rounds */
jest.mock('./index', () => ({
  rounds: {
    1: require('./round1').round1,
    6: require('./round7').round7,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 7', () => {});
describe('Pre-Allocate Capacity for fires', () => {
  it('By setting aside some of the teams capacity for dealing with Production support -- no immediate effect', () => {
    const game = getGame();
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
