import { GameActionId } from '../config';
import { AppRound, GameState, GameAction } from '../state';

type ActionSelector = (
  selectableGameActions: GameAction<GameActionId>[],
  round: AppRound<GameActionId>,
  state: GameState<GameActionId>,
) => GameAction<GameActionId> | null;

/**
 * Select 3 random actions each round when possible
 */
export const always3: ActionSelector = (selectableGameActions, round) => {
  if (round.selectedGameActions.length < 3 && selectableGameActions.length) {
    return selectableGameActions[
      Math.floor(Math.random() * selectableGameActions.length)
    ];
  }

  return null;
};

export const atMost3: ActionSelector = (selectableGameActions, round) => {
  if (round.selectedGameActions.length >= 3) {
    return null;
  }

  if (Math.random() > 0.35 && selectableGameActions.length) {
    return selectableGameActions[
      Math.floor(Math.random() * selectableGameActions.length)
    ];
  }

  return null;
};

export const atLeast1andAtMost3: ActionSelector = (
  selectableGameActions,
  round,
) => {
  if (round.selectedGameActions.length >= 3) {
    return null;
  }

  if (round.selectedGameActions.length == 0) {
    return selectableGameActions[
      Math.floor(Math.random() * selectableGameActions.length)
    ];
  }

  if (Math.random() > 0.35 && selectableGameActions.length) {
    return selectableGameActions[
      Math.floor(Math.random() * selectableGameActions.length)
    ];
  }

  return null;
};

/**
 * Select actions when possible and move to next round with
 * the same chance of selecting a single action
 */
export const greedy: ActionSelector = (selectableGameActions, round) => {
  return (
    selectableGameActions[
      Math.floor(Math.random() * (selectableGameActions.length + 1))
    ] || null
  );
};

/**
 * Always spend 30% of capacity on improvements
 */
export const byPercent: ActionSelector = (selectableGameActions, round) => {
  const targetPercent = 0.3;
  const targetPointsForActions = Math.round(
    round.capacity.total * targetPercent,
  );
  const spendOnActions = round.capacity.total - round.capacity.available;
  const availableForActions = targetPointsForActions - spendOnActions;

  const potentialActions = selectableGameActions.filter(
    ({ cost }) => cost <= availableForActions,
  );

  if (!potentialActions.length) {
    return null;
  }

  return potentialActions[Math.floor(Math.random() * potentialActions.length)];
};

/**
 * 30% chance to to to next round with each decision
 */
export const byChance: ActionSelector = (selectableGameActions) => {
  if (Math.random() > 0.35 && selectableGameActions.length) {
    return selectableGameActions[
      Math.floor(Math.random() * selectableGameActions.length)
    ];
  }
  return null;
};
