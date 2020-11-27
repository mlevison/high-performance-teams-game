import { findGameActionById, GameEffect } from '../../state';

export const gameEffects: { [key: string]: GameEffect } = {
  technicalDebtDrag(rounds) {
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
      capacityChange: -roundsWithoutEngAction,
      title: 'TechnicalDebt Drag Effect Title',
      description: `No Engineering improvement for ${roundsWithoutEngAction} round${
        roundsWithoutEngAction > 1 ? 's' : ''
      }`,
    };
  },
  communicationDebtDrag(rounds) {
    let roundsWithoutCommunicationAction = 0;

    for (const round of rounds) {
      const roundsGameActions = round.selectedGameActionIds.map(
        findGameActionById,
      );
      const communicationAction = roundsGameActions.find(
        ({ type }) => type === 'COMMUNICATION',
      );

      if (communicationAction) {
        break;
      }

      roundsWithoutCommunicationAction += 1;
    }

    if (roundsWithoutCommunicationAction === 0) {
      return null;
    }

    return {
      capacityChange: -roundsWithoutCommunicationAction,
      title: 'Communication Drag Effect Title',
      description: `No Communication improvement for ${roundsWithoutCommunicationAction} round${
        roundsWithoutCommunicationAction > 1 ? 's' : ''
      }`,
    };
  },
};
