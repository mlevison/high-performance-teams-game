import * as game from './game';
import { config } from '../config';
import { rollGremlin } from './gremlins';
import { reset, addRolls } from '../lib/notRandom';
import { EFFECT_HIDDEN } from '../gameConstants';

jest.mock('../lib/random', () => require('../lib/notRandom'));

describe('rollGremlin', () => {
  beforeEach(() => {
    reset();

    jest
      .spyOn(game, 'getAllEffects')
      .mockImplementation(() => [{ gremlinChange: 50, title: EFFECT_HIDDEN }]);
  });

  it('rolls nothing when occur roll does not meet gremlinChance', () => {
    addRolls([0.51]);
    expect(rollGremlin(game.INITIAL_STATE, config)).toBe(null);
  });

  it('has a gremlin when roll meets chance', () => {
    addRolls([0.49, 0.5]);
    expect(rollGremlin(game.INITIAL_STATE, config)).toEqual(expect.any(String));
  });

  it('rolls nothing when no gremlin has probability', () => {
    Object.values(config.gremlins).forEach((gremlin) => {
      jest.spyOn(gremlin, 'probability').mockImplementation(() => 0);
    });

    addRolls([0.49, 0.5]);
    expect(rollGremlin(game.INITIAL_STATE, config)).toBe(null);
  });

  it('rolls the gremlin with probability', () => {
    Object.values(config.gremlins).forEach((gremlin) => {
      jest.spyOn(gremlin, 'probability').mockImplementation(() => 0);
    });

    jest
      .spyOn(config.gremlins.GREMLIN_MANAGEMENT_YELLS, 'probability')
      .mockImplementation(() => 1);

    addRolls([0.49, 0.5]);
    expect(rollGremlin(game.INITIAL_STATE, config)).toBe(
      'GREMLIN_MANAGEMENT_YELLS',
    );
    expect(
      config.gremlins.GREMLIN_MANAGEMENT_YELLS.probability,
    ).toHaveBeenCalledWith(game.INITIAL_STATE);
  });
});
