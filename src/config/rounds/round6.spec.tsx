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
    6: require('./round6').round6,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 6', () => {
  it('comes with a 4 capacity bump', () => {
    const game = getGame();

    advanceGameToRound(game, 6);
    expect(game.state.currentRound.number).toEqual(6);

    testCurrentRound(game, { capacityChange: 4 });

    // ensure that the effect only lasts one round
    testFutureRounds(game, [
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
    ]);
  });
});
describe('Improve Forecasting', () => {
  it("Doesn't have an immediate effect instead it protects against later gremlins since you can help people make better product decisions", () => {
    const game = getGame();
    advanceGameToRound(game, 6);
    expect(game.state.currentRound.number).toEqual(6);

    game.selectAction('IMPROVE_FORECASTING');
    // round capacity bump still in effect
    testCurrentRound(game, { capacityChange: 4, userStoryChange: 0 });

    testFutureRounds(game, [
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
    ]);
  });
});
describe('Teams that take ownership of their Sprint Backlog', () => {
  it('Will make better use of the board improving both productivity and completion percentage by a bit', () => {
    const game = getGame();
    advanceGameToRound(game, 6);
    expect(game.state.currentRound.number).toEqual(6);

    game.selectAction('SPRINT_BACKLOG_IMPROVEMENT');
    testCurrentRound(game, { capacityChange: 4, userStoryChange: 0 });

    testFutureRounds(game, [
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 1, userStoryChange: 5 },
      { capacityChange: 1, userStoryChange: 5 },
      { capacityChange: 1, userStoryChange: 5 },
      { capacityChange: 1, userStoryChange: 5 },
      { capacityChange: 1, userStoryChange: 5 },
    ]);
  });
});
