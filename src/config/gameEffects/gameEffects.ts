import { findGameActionById, GameEffect } from '../../state';

export const gameEffects: GameEffect[] = [
  function technicalDebtDrag(rounds) {
    let roundsWithoutEngAction = 0;

    for (const round of rounds) {
      const roundsGameActions = round.selectedGameActionIds.map(
        findGameActionById,
      );
      const engineeringAction = roundsGameActions.find(
        ({ type }) => type === 'ENGINEERING',
      );

      if (engineeringAction) {
        break;
      }

      roundsWithoutEngAction += 1;
    }

    if (roundsWithoutEngAction === 0) {
      return null;
    }

    return {
      capacity: -roundsWithoutEngAction,
      title: 'TODO: TechnicalDebt Drag Effect Title',
      description: `No Engineering improvement for ${roundsWithoutEngAction} round${
        roundsWithoutEngAction > 1 ? 's' : ''
      }`,
    };
  },
];
