import { getGame } from '../lib/testHelpers';

jest.mock('./roundDescriptions/roundDescriptions', () => ({
  roundDescriptions: {
    1: {
      description: null,
      effect: () => ({ capacity: 10 }),
    },
  },
}));

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

  describe('Drag Effect if the team makes no engineering improvement', () => {
    it('reduces capacity', () => {
      const game = getGame();

      // Ideally Stated as a precondition
      expect(game.state.currentRound.number).toEqual(1);

      game.nextRound();
      expect(game.state.currentRound.number).toEqual(2);
      expect(game.state.currentRound.capacity.total).toEqual(9);

      game.nextRound();
      expect(game.state.currentRound.number).toEqual(3);
      expect(game.state.currentRound.capacity.total).toEqual(8);

      game.nextRound();
      expect(game.state.currentRound.number).toEqual(4);
      expect(game.state.currentRound.capacity.total).toEqual(7);
    });

    it('stops reducing capacity when team added a BuildServer', () => {
      const game = getGame();

      // Ideally Stated as a precondition
      expect(game.state.currentRound.number).toEqual(1);

      game.nextRound();
      expect(game.state.currentRound.number).toEqual(2);
      expect(game.state.currentRound.capacity.total).toEqual(9);

      game.selectAction('GAME_ACTION_BUILD_SERVER');
      expect(game.state.currentRound.capacity.available).toEqual(7);

      game.nextRound();
      expect(game.state.currentRound.number).toEqual(3);
      // Capacity unchanged because we eliminate the drag effect
      expect(game.state.currentRound.capacity.total).toEqual(9);

      game.nextRound();
      expect(game.state.currentRound.number).toEqual(4);
      // Capacity still **unchanged**
      expect(game.state.currentRound.capacity.total).toEqual(9);
    });
  });
});
