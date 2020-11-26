import type { AppState } from '../../state';
import { getGame, testFutureCapacities } from '../../lib/testHelpers';
import { reset, addRolls } from '../../lib/notRandom';
import { Console } from 'console';

jest.mock('../../lib/random', () => require('../../lib/notRandom'));
/* disable all other rounds */
jest.mock('./index', () => ({
  rounds: { 1: require('./round1').round1 },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 1', () => {
  beforeEach(() => {
    reset();
  });

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
        addRolls(Array(100).fill(0));
        const game = getGame();

        game.selectAction('ACTION_TEAMS_ON_SAME_FLOOR');
        game.nextRound();
        expect(game.state.currentRound.number).toEqual(2);
        expect(game.state.currentRound.capacity.total).toEqual(11);

        testFutureCapacities(game, [12, 13, 14, 15]);
      });
    });

    describe('Protected from Outside Distraction', () => {
      it('increases the chance user-stories succeed', () => {
        const game = getGame();

        game.selectAction('ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION');

        addRolls(Array(game.state.currentRound.capacity.available).fill(0.39));
        game.nextRound();
        expect(game.state.result.storiesCompleted).toEqual(9);

        expect(game.state.currentRound.capacity.available).toEqual(10);

        addRolls(Array(5).fill(0.39));
        addRolls(Array(5 + /* gremlin */ 2).fill(0.41));
        game.nextRound();
        expect(game.state.result.storiesCompleted).toEqual(14);
      });
    });

    describe('Working Agreements', () => {
      it('increases capacity, but have no effect on User Story Success', () => {
        addRolls(Array(100).fill(0));
        const game = getGame();

        game.selectAction('ACTION_WORKING_AGREEMENTS');
        game.nextRound();

        expect(game.state.currentRound.number).toEqual(2);
        expect(game.state.currentRound.capacity.total).toEqual(11);

        // TODO - Hannes - how to test the user story completiion chances haven't changed?

        // Capacity only ever increases by one in total
        testFutureCapacities(game, [11, 11, 11, 11]);
      });
    });
  });
});
