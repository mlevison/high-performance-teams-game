import { AppState } from '../../state';
import { getGame } from '../../lib/testHelpers';

/* disable all other rounds */
jest.mock('../index', () => ({
  rounds: { 1: require('./round1').round1 },
}));

/* disable game effect to only tests single actions */
jest.mock('../../state/effects/effects', () => ({
  gameEffectList: [],
}));

describe('round 1', () => {
  it('starts with capacity 10/10 in round 1', () => {
    const game = getGame();

    const expectedCurrentRound: AppState['currentRound'] = expect.objectContaining(
      {
        capacity: {
          total: 10,
          available: 10,
        },
        number: 1,
        activeEffects: [],
      },
    );

    expect(game.state.currentRound).toEqual(expectedCurrentRound);

    expect(game.state.currentRound.title).toMatch(
      /Welcome to the World’s Smallest Online Bookstore/i,
    );
  });

  describe('actions', () => {
    describe('Teams on same floor', () => {
      it('increases capacity over many rounds', () => {
        const game = getGame();

        game.selectAction('GAME_ACTION_TEAMS_ON_SAME_FLOOR');
        game.nextRound();

        expect(game.state.currentRound.number).toEqual(2);
        expect(game.state.currentRound.capacity.total).toEqual(11);

        game.nextRound();
        expect(game.state.currentRound.capacity.total).toEqual(12);
        game.nextRound();
        expect(game.state.currentRound.capacity.total).toEqual(13);
        game.nextRound();
        expect(game.state.currentRound.capacity.total).toEqual(14);
        game.nextRound();
        expect(game.state.currentRound.capacity.total).toEqual(15);
      });
    });
  });
});
