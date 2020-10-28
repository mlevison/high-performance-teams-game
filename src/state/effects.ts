import { findGameActionById } from './gameActions';
import { Round } from './round';

export type Effect = {
  capacity: number;
  title: string;
  description?: string;
};

type GameEffect = (rounds: Round[]) => Effect | null;

export const gameEffectList: GameEffect[] = [
  function technicalDebtDrag(rounds) {
    let roundsWithoutEngAction = 0;
    let hadEngineeringAction = false;

    rounds.forEach((round) => {
      if (hadEngineeringAction) {
        return;
      }

      const roundsGameActions = round.selectedGameActionIds.map(
        findGameActionById,
      );
      const engineeringAction = roundsGameActions.find(
        ({ type }) => type === 'ENGINEERING',
      );

      if (!engineeringAction) {
        roundsWithoutEngAction += 1;
      } else {
        hadEngineeringAction = true;
      }
    });

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
