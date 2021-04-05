import { createInitialState } from '../lib';
import { emptyRound } from '../lib/testHelpers';
import { rollGremlin } from './gremlins';
import { reset, addRolls } from '../lib/notRandom';
import type { GameConfig } from './game';

jest.mock('../lib/random', () => require('../lib/notRandom'));

describe('rollGremlin', () => {
  const INITIAL_STATE = createInitialState();
  let config: GameConfig;
  beforeEach(() => {
    reset();
    config = {
      initialScores: { gremlinChange: 50, userStoryChange: 30 },
      rounds: [emptyRound(), emptyRound()],
      trailingRounds: 0,
      gameEffects: {},
      gremlins: {
        MY_GREMLIN: {
          name: 'Example Gremlin',
          probability: () => 0,
          effect: () => null,
        },
      },
    };
  });

  it('rolls nothing when occur roll does not meet gremlinChance', () => {
    addRolls([0.51]);
    config.gremlins.MY_GREMLIN.probability = jest.fn(() => 0);

    expect(rollGremlin(INITIAL_STATE, config)).toBe(null);
    expect(config.gremlins.MY_GREMLIN.probability).not.toHaveBeenCalled();
  });

  it('has a gremlin when roll meets chance', () => {
    addRolls([0.49, 0.5]);
    config.gremlins.MY_GREMLIN.probability = jest.fn(() => 10);

    expect(rollGremlin(INITIAL_STATE, config)).toBe('MY_GREMLIN');
    expect(config.gremlins.MY_GREMLIN.probability).toHaveBeenCalledTimes(1);
  });

  it('returns nothing when no gremlin has probability', () => {
    addRolls([0.49, 0.5]);
    config.gremlins.MY_GREMLIN.probability = jest.fn(() => 0);

    expect(rollGremlin(INITIAL_STATE, config)).toBe(null);
    expect(config.gremlins.MY_GREMLIN.probability).toHaveBeenCalledTimes(1);
  });

  it('rolls the gremlin with probability', () => {
    config.gremlins.MY_GREMLIN.probability = jest.fn(() => 0);
    config.gremlins.MY_OTHER_GREMLIN = {
      name: 'Other Gremlin',
      probability: jest.fn(() => 1),
      effect: () => null,
    };

    addRolls([0.49, 0.5]);
    expect(rollGremlin(INITIAL_STATE, config)).toBe('MY_OTHER_GREMLIN');
    expect(config.gremlins.MY_OTHER_GREMLIN.probability).toHaveBeenCalledWith(
      INITIAL_STATE,
    );
  });
});
