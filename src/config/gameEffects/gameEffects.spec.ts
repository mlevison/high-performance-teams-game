import { gameEffects as gameEffectsMock } from './gameEffects';
import { getGame } from '../../lib/testHelpers';

const { gameEffects } = jest.requireActual('./gameEffects');
jest.mock('./gameEffects', () => ({ gameEffects: [] }));
jest.mock('../rounds', () => {
  return {
    rounds: {
      1: {
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
    },
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

      game.selectAction('BUILD_SERVER');
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

  describe('Drag Effect if the team makes no Communication improvement', () => {
    beforeEach(() => {
      gameEffectsMock.communicationDebtDrag = gameEffects.communicationDebtDrag;
    });

    it('reduces capacity', () => {
      const game = getGame();

      // Precondition
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

    it('stops reducing capacity when team added a Working Agreement', () => {
      const game = getGame();

      // Ideally Stated as a precondition
      expect(game.state.currentRound.number).toEqual(1);

      game.nextRound();
      expect(game.state.currentRound.number).toEqual(2);
      expect(game.state.currentRound.capacity.total).toEqual(9);

      game.selectAction('WORKING_AGREEMENTS');
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
