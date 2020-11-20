import { getGame } from '../../lib/testHelpers';

/* disable irrelevant other rounds */
jest.mock('../index', () => ({
  rounds: {
    1: require('./round1').round1,
    2: require('./round2').round2,
  },
}));
/* disable game effect to only tests single actions */
jest.mock('../../state/effects/effects', () => ({
  gameEffectList: [],
}));

describe('round 2', () => {
  describe('actions', () => {
    describe('Unit Testing', () => {
      it('is only available if the BuildServer was implemented', () => {
        const game = getGame();

        expect(game.availableActionIds).not.toContain(
          'GAME_ACTION_UNIT_TESTING',
        );

        game.nextRound();
        expect(game.availableActionIds).not.toContain(
          'GAME_ACTION_UNIT_TESTING',
        );

        game.selectAction('GAME_ACTION_BUILD_SERVER');
        game.nextRound();
        expect(game.availableActionIds).toContain('GAME_ACTION_UNIT_TESTING');
      });
    });
  });
});
