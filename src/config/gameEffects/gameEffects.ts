import type { GameEffect } from '../../state';
import type { GameActionId } from '../rounds';
import type { GremlinId } from '../gremlins';
import { rounds as roundConfigs } from '../rounds';
import { findGameActionById } from '../../lib';

export const gameEffects: {
  [key: string]: GameEffect<GameActionId, GremlinId>;
} = {
  technicalDebtDrag(rounds) {
    let roundsWithoutEngAction = 0;

    for (const round of rounds) {
      const roundsGameActions = round.selectedGameActionIds.map((id) =>
        findGameActionById(id, roundConfigs),
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
      title: 'TechnicalDebt Drag Effect',
      description: `No Engineering improvement for ${roundsWithoutEngAction} round${
        roundsWithoutEngAction > 1 ? 's' : ''
      }`,
    };
  },
  communicationDebtDrag(rounds) {
    let roundsWithoutCommunicationAction = 0;

    for (const round of rounds) {
      const roundsGameActions = round.selectedGameActionIds.map((id) =>
        findGameActionById(id, roundConfigs),
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
