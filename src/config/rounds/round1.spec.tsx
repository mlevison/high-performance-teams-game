import type { AppState } from '../../state';
import { getGame, testFutureCapacities, times } from '../../lib/testHelpers';

/* disable all other rounds */
jest.mock('./index', () => ({
  rounds: { 1: require('./round1').round1 },
}));
/* disable game effect to only tests single actions */
jest.mock('../gameEffects', () => ({
  gameEffects: [],
}));

describe('round 1', () => {
  it('starts with capacity 10/10 and 30% userStoryChance in round 1', () => {
    const game = getGame();

    const expectedCurrentRound: AppState['currentRound'] = expect.objectContaining(
      {
        capacity: {
          total: 10,
          available: 10,
        },
        userStoryChance: 30,
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
        expect(game.state.currentRound.userStoryChance).toEqual(40);

        times(5, () => {
          game.nextRound();
          expect(game.state.currentRound.capacity.total).toEqual(10);
          expect(game.state.currentRound.userStoryChance).toEqual(40);
        });
      });
    });

    describe('Working Agreements', () => {
      it('increases capacity, but have no effect on User Story Success', () => {
        const game = getGame();

        game.selectAction('ACTION_WORKING_AGREEMENTS');

        // Capacity only ever increases by one in total
        times(5, () => {
          game.nextRound();
          expect(game.state.currentRound.capacity.total).toEqual(11);
          expect(game.state.currentRound.userStoryChance).toEqual(30);
        });
      });
    });

    describe('Clarify Product Vision', () => {
      it('increases UserStory success and has no effect on capacity', () => {
        const game = getGame();

        game.selectAction('ACTION_CLARIFY_PRODUCT_VISION');
        expect(game.state.currentRound.userStoryChance).toEqual(45);

        // proving it had no effect on capacity
        times(5, () => {
          game.nextRound();
          expect(game.state.currentRound.capacity.total).toEqual(10);
          expect(game.state.currentRound.userStoryChance).toEqual(45);
        });
      });
    });
  });
});
