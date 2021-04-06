import { gameEffects } from './gameEffects';
import {
  round,
  getGame,
  testFutureRounds,
  action,
  config,
} from '../../lib/testHelpers';

describe('game effects', () => {
  describe('Drag Effect if the team makes no engineering improvement', () => {
    const dragEffectConfig = config(
      {
        rounds: [
          round({ actions: { BUILD_SERVER: action({ type: 'ENGINEERING' }) } }),
        ],
        gameEffects: {
          technicalDebtDrag: gameEffects.technicalDebtDrag,
        },
      },
      6,
    );

    it('reduces capacity', () => {
      const game = getGame(dragEffectConfig);

      // Precondition
      expect(game.state.currentRound.number).toEqual(1);

      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -3, userStoryChange: 0 },
        { capacityChange: -4, userStoryChange: 0 },
        { capacityChange: -5, userStoryChange: 0 },
      ]);
    });

    it('stops reducing capacity when team added a BuildServer', () => {
      const game = getGame(dragEffectConfig);
      // precondition
      expect(game.state.currentRound.number).toEqual(1);

      testFutureRounds(game, [{ capacityChange: -1, userStoryChange: 0 }]);

      game.selectAction('BUILD_SERVER');
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
      ]);
    });
  });

  describe('Drag Effect if the team makes no Communication improvement', () => {
    const dragEffectConfig = config(
      {
        rounds: [
          round({
            actions: { WORKING_AGREEMENTS: action({ type: 'COMMUNICATION' }) },
          }),
        ],
        gameEffects: {
          communicationDebtDrag: gameEffects.communicationDebtDrag,
        },
      },
      6,
    );

    it('reduces capacity', () => {
      const game = getGame(dragEffectConfig);

      // Precondition
      expect(game.state.currentRound.number).toEqual(1);

      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -2, userStoryChange: 0 },
        { capacityChange: -3, userStoryChange: 0 },
        { capacityChange: -4, userStoryChange: 0 },
        { capacityChange: -5, userStoryChange: 0 },
      ]);
    });

    it('stops reducing capacity when team added a Working Agreement', () => {
      const game = getGame(dragEffectConfig);

      // Ideally Stated as a precondition
      expect(game.state.currentRound.number).toEqual(1);

      testFutureRounds(game, [{ capacityChange: -1, userStoryChange: 0 }]);

      game.selectAction('WORKING_AGREEMENTS');
      testFutureRounds(game, [
        { capacityChange: -1, userStoryChange: 0 },
        { capacityChange: -1, userStoryChange: 0 },
      ]);
    });
  });
});
