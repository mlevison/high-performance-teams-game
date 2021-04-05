import { rounds } from './index';
import {
  advanceGameToRound,
  getGame,
  testCurrentRound,
  testFutureRounds,
  config,
  defuseRounds,
} from '../../lib/testHelpers';
import { overtimeCapacityBump, overtimeUserStoryChance } from './round6';

const testConfig = config({
  rounds: [
    ...defuseRounds(rounds.slice(0, 5)),
    rounds[5],
    ...defuseRounds(rounds.slice(6)),
  ],
});

describe('round 6', () => {
  it('comes with a 4 capacity bump', () => {
    const game = getGame(testConfig);

    advanceGameToRound(game, 6);
    expect(game.state.currentRound.number).toEqual(6);
    testCurrentRound(game, { capacityChange: overtimeCapacityBump });

    // ensure that the effect only lasts one round
    testFutureRounds(game, [
      { capacityChange: 0, userStoryChange: overtimeUserStoryChance },
      { capacityChange: 0, userStoryChange: overtimeUserStoryChance },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
    ]);
  });
});
describe('Improve Forecasting', () => {
  it("Doesn't have an immediate effect instead it protects against later gremlins since you can help people make better product decisions", () => {
    const game = getGame(testConfig);
    advanceGameToRound(game, 6);
    expect(game.state.currentRound.number).toEqual(6);

    game.selectAction('IMPROVE_FORECASTING');
    // round capacity bump still in effect
    testCurrentRound(game, {
      capacityChange: overtimeCapacityBump,
      userStoryChange: 0,
    });

    testFutureRounds(game, [
      { capacityChange: 0, userStoryChange: 0 + overtimeUserStoryChance },
      { capacityChange: 0, userStoryChange: 0 + overtimeUserStoryChance },
      { capacityChange: 0, userStoryChange: 0 },
      { capacityChange: 0, userStoryChange: 0 },
    ]);
  });
});
describe('Teams that take ownership of their Sprint Backlog', () => {
  it('Will make better use of the board improving both productivity and completion percentage by a bit', () => {
    const game = getGame(testConfig);
    advanceGameToRound(game, 6);
    expect(game.state.currentRound.number).toEqual(6);

    game.selectAction('SPRINT_BACKLOG_IMPROVEMENT');
    testCurrentRound(game, {
      capacityChange: overtimeCapacityBump,
      userStoryChange: 0,
    });

    testFutureRounds(game, [
      { capacityChange: 0, userStoryChange: 0 + overtimeUserStoryChance },
      { capacityChange: 1, userStoryChange: 5 + overtimeUserStoryChance },
      { capacityChange: 1, userStoryChange: 5 },
      { capacityChange: 1, userStoryChange: 5 },
      { capacityChange: 1, userStoryChange: 5 },
      { capacityChange: 1, userStoryChange: 5 },
    ]);
  });
});
describe('Daily Scrum', () => {
  it('When daily Scrum is more effective problems get solved sooner and the team collaborates more', () => {
    const game = getGame(testConfig);
    advanceGameToRound(game, 6);
    expect(game.state.currentRound.number).toEqual(6);

    game.selectAction('DAILY_SCRUM_MORE_EFFECTIVE');
    testCurrentRound(game, {
      capacityChange: overtimeCapacityBump,
      userStoryChange: 0,
    });

    testFutureRounds(game, [
      { capacityChange: 0, userStoryChange: 0 + overtimeUserStoryChance },
      { capacityChange: 1, userStoryChange: 5 + overtimeUserStoryChance },
      { capacityChange: 2, userStoryChange: 10 },
      { capacityChange: 2, userStoryChange: 10 },
      { capacityChange: 2, userStoryChange: 10 },
      { capacityChange: 2, userStoryChange: 10 },
    ]);
  });
});
describe('Improve Retrospectives', () => {
  it('Teams that make their retrospective action items concrete succeed in making more of their improvements', () => {
    const game = getGame(testConfig);
    advanceGameToRound(game, 6);
    expect(game.state.currentRound.number).toEqual(6);

    game.selectAction('IMPROVE_RETROSPECTIVES_CONCRETE_ACTIONS');
    testCurrentRound(game, {
      capacityChange: overtimeCapacityBump,
      userStoryChange: 0,
    });

    testFutureRounds(game, [
      { capacityChange: 0, userStoryChange: 0 + overtimeUserStoryChance },
      { capacityChange: 1, userStoryChange: 0 + overtimeUserStoryChance },
      { capacityChange: 2, userStoryChange: 0 },
      { capacityChange: 2, userStoryChange: 0 },
      { capacityChange: 2, userStoryChange: 0 },
      { capacityChange: 2, userStoryChange: 0 },
    ]);
  });
});
describe('Learing Time', () => {
  it('Teams that take a limited amount of time to learn every Sprint grow', () => {
    const game = getGame(testConfig);
    advanceGameToRound(game, 6);
    expect(game.state.currentRound.number).toEqual(6);

    game.selectAction('LEARNING_TIME');
    testCurrentRound(game, {
      capacityChange: overtimeCapacityBump,
      userStoryChange: 0,
    });

    testFutureRounds(game, [
      {
        capacityChange: 1,
        userStoryChange: 0 + overtimeUserStoryChance,
      },
      { capacityChange: 2, userStoryChange: 0 + overtimeUserStoryChance },
      { capacityChange: 2, userStoryChange: 0 },
      { capacityChange: 3, userStoryChange: 0 },
      { capacityChange: 3, userStoryChange: 0 },
    ]);
  });
});
