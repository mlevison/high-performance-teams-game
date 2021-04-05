import { gameEffects as gameEffectsMock } from './gameEffects';
import { getGame, testFutureRounds } from '../../lib/testHelpers';

jest.mock('../../state/rounds/getRoundEffects', () => ({
  getRoundEffects: () => [],
}));
const { gameEffects } = jest.requireActual('./gameEffects');
jest.mock('./gameEffects', () => ({ gameEffects: [] }));
jest.mock('../rounds', () => {
  return {
    rounds: [
      {
        actions: {
          BUILD_SERVER: {
            type: 'ENGINEERING',
            cost: 2,
          },
          WORKING_AGREEMENTS: {
            type: 'COMMUNICATION',
            cost: 2,
          },
        },
        effect: () => ({ capacityChange: 10 }),
      },
    ],
  };
});

describe('game effects', () => {
  beforeEach(() => {
    Object.keys(gameEffectsMock).forEach((key) => {
      delete gameEffectsMock[key];
    });
  });
  describe('Drag Effect if the team makes no engineering improvement', () => {
    beforeEach(() => {
      gameEffectsMock.technicalDebtDrag = gameEffects.technicalDebtDrag;
    });

    it('reduces capacity', () => {
      const game = getGame();

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
      const game = getGame();
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
    beforeEach(() => {
      gameEffectsMock.communicationDebtDrag = gameEffects.communicationDebtDrag;
    });

    it('reduces capacity', () => {
      const game = getGame();

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
      const game = getGame();

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
