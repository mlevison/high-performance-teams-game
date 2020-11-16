import { getGame } from '../../lib/testHelpers';

/* disable game effect to only tests single actions */
jest.mock('../effects/effects', () => ({
  gameEffectList: [],
}));
jest.mock('../roundDescriptions/roundDescriptions', () => ({
  roundDescriptions: {
    1: {
      description: null,
      effect: () => ({ capacity: 10 }),
    },
  },
}));

describe('GameActions', () => {
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

  describe('Informal Cross Training', () => {
    it('is only available from round 4 on', () => {
      const game = getGame();

      expect(game.availableActionIds).not.toContain(
        'GAME_ACTION_INFORMAL_CROSS_TRAINING',
      );
      game.nextRound();
      expect(game.availableActionIds).not.toContain(
        'GAME_ACTION_INFORMAL_CROSS_TRAINING',
      );
      game.nextRound();
      expect(game.availableActionIds).not.toContain(
        'GAME_ACTION_INFORMAL_CROSS_TRAINING',
      );
      game.nextRound();
      expect(game.availableActionIds).toContain(
        'GAME_ACTION_INFORMAL_CROSS_TRAINING',
      );
    });
  });

  describe('Unit Testing', () => {
    it('is only available if the BuildServer was implemented', () => {
      const game = getGame();

      expect(game.availableActionIds).not.toContain('GAME_ACTION_UNIT_TESTING');

      game.nextRound();
      expect(game.availableActionIds).not.toContain('GAME_ACTION_UNIT_TESTING');

      game.selectAction('GAME_ACTION_BUILD_SERVER');
      game.nextRound();
      expect(game.availableActionIds).toContain('GAME_ACTION_UNIT_TESTING');
    });
  });
});
