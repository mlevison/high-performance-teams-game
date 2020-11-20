import { getGame } from '../lib/testHelpers';

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
});
