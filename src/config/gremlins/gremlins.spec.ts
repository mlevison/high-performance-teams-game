import { getGame, NextRoundOpts } from '../../lib/testHelpers';
import { rollGremlin } from '../../state/gremlins';

/* Disable round, game and action effects */
jest.mock('../../state/rounds/getRoundEffects', () => ({
  getRoundEffects: () => [{ capacity: 10 }],
}));
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));
jest.mock('../../state/gameActions/getEffect', () => ({
  getEffect: () => null,
}));

describe('Gremlins', () => {
  describe('roll gremlin', () => {
    it('does not roll in round 1', () => {
      expect(rollGremlin(1)).toBe(undefined);
      const roll2 = rollGremlin(2);
      expect(roll2).toEqual(expect.any(Number));
      expect(roll2).toBeGreaterThanOrEqual(1);
      expect(roll2).toBeLessThanOrEqual(12);
    });
  });

  it('take only first gremlin roll into account', () => {
    const game = getGame();
    const gremlinRoll = 4;

    game.nextRound({ gremlinRoll });
    expect(game.state.currentRound.capacity.available).toBe(7);

    game.nextRound({ gremlinRoll });
    expect(game.state.currentRound.capacity.available).toBe(7);

    game.nextRound({ gremlinRoll });
    expect(game.state.currentRound.capacity.available).toBe(7);

    game.nextRound({ gremlinRoll });
    expect(game.state.currentRound.capacity.available).toBe(10);
  });

  describe('emergency on another team', () => {
    const NEXT_ROUND_OPTS: NextRoundOpts = { gremlinRoll: 4 };
    it('reduces capacity by 3 for 3 rounds', () => {
      const game = getGame();

      game.nextRound(NEXT_ROUND_OPTS);

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

      game.selectAction('ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound(NEXT_ROUND_OPTS);
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

      game.selectAction('ACTION_INFORMAL_CROSS_TRAINING');
      game.nextRound(NEXT_ROUND_OPTS);
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

      game.selectAction('ACTION_INFORMAL_CROSS_TRAINING');
      game.selectAction('ACTION_FORMAL_CROSS_TRAINING');
      game.selectAction('ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound(NEXT_ROUND_OPTS);
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
    const MANAGEMENT_YELLS_GREMLIN: NextRoundOpts = { gremlinRoll: 3 };
    it('reduces capacity by 2 ', () => {
      const game = getGame();

      game.nextRound(MANAGEMENT_YELLS_GREMLIN);

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

      game.selectAction('ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION');
      game.nextRound(MANAGEMENT_YELLS_GREMLIN);
      expect(game.state.currentRound.capacity.available).toBe(10);
    });
  });

  describe('Team Member not pulling their weight', () => {
    const NOT_PULLING_THEIR_WEIGHT_GREMLIN: NextRoundOpts = { gremlinRoll: 5 };
    it('reduces capacity by 2 ', () => {
      const game = getGame();

      game.nextRound(NOT_PULLING_THEIR_WEIGHT_GREMLIN);

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

      game.selectAction('ACTION_ONE_ON_ONES');
      game.nextRound(NOT_PULLING_THEIR_WEIGHT_GREMLIN);
      expect(game.state.currentRound.capacity.available).toBe(9);
    });

    it('has effect reduced by 1 if the team works on Cross Skilling', () => {
      const game = getGame();

      game.selectAction('ACTION_INFORMAL_CROSS_TRAINING');
      game.nextRound(NOT_PULLING_THEIR_WEIGHT_GREMLIN);
      expect(game.state.currentRound.capacity.available).toBe(9);
    });

    it('has effect reduce by only 1 if both One on Ones and Cross Skilling', () => {
      const game = getGame();

      game.selectAction('ACTION_ONE_ON_ONES');
      game.nextRound(NOT_PULLING_THEIR_WEIGHT_GREMLIN);
      expect(game.state.currentRound.capacity.available).toBe(9);
    });
  });

  describe('Team Member consistently late or misses Daily Scrum', () => {
    const NOT_AT_DAILY_SCRUM_GREMLIN: NextRoundOpts = { gremlinRoll: 8 };
    it('reduces capacity by 1 ', () => {
      const game = getGame();

      game.nextRound(NOT_AT_DAILY_SCRUM_GREMLIN);

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

      game.selectAction('ACTION_ONE_ON_ONES');
      game.nextRound(NOT_AT_DAILY_SCRUM_GREMLIN);
      expect(game.state.currentRound.capacity.available).toBe(10);
    });

    it('has effect reduced to 0 if Working Agreements in effect', () => {
      const game = getGame();

      game.selectAction('ACTION_WORKING_AGREEMENTS');
      game.nextRound(NOT_AT_DAILY_SCRUM_GREMLIN);
      expect(game.state.currentRound.capacity.available).toBe(10);
    });
  });
});
