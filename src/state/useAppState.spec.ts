import { getGame } from '../lib/testHelpers';
import { reset, addRolls } from '../lib/notRandom';

jest.mock('../lib/random', () => require('../lib/notRandom'));

describe('AppState', () => {
  beforeEach(() => {
    reset();
  });

  it('starts with no past rounds', () => {
    const game = getGame();

    expect(game.state.pastRounds).toEqual([]);
  });

  it('starts with 0 completed stories', () => {
    const game = getGame();

    expect(game.state.result).toEqual({
      storiesCompleted: 0,
    });
  });

  describe('closeRound', () => {
    it('succeeds all stories when all roll 0', () => {
      const game = getGame();
      addRolls(Array.from({ length: 10 }).map(() => 0));

      expect(game.closeRound().storiesCompleted).toBe(10);
    });

    it('succeeds only stories below 30%', () => {
      const game = getGame();
      addRolls(Array.from({ length: 9 }).map(() => 0.31));
      addRolls([0.29]);

      expect(game.closeRound().storiesCompleted).toBe(1);
    });
  });
});
