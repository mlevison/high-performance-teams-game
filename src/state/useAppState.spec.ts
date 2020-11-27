import { getGame } from '../lib/testHelpers';
import { storySucceeds } from '../lib';

jest.mock('../lib/storySucceeds');

describe('AppState', () => {
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
    it('uses storySucceeds to test which story succeeds', () => {
      const game = getGame();

      (storySucceeds as jest.Mock).mockImplementation(() => true);
      expect(game.closeRound().storiesCompleted).toBe(10);

      (storySucceeds as jest.Mock).mockImplementation(() => false);
      expect(game.closeRound().storiesCompleted).toBe(0);

      expect(storySucceeds).toHaveBeenCalledTimes(20);
    });
  });
});
