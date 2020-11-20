import { rounds, GameActionId } from '../../config';
import { GameAction } from './types';

/* create a flat list of actions from all rounds actions */
export const gameActions = Object.entries(rounds).reduce(
  (memo, [roundNumber, round]) =>
    memo.concat(
      Object.entries(round.actions).map(([actionId, action]) => ({
        ...action,
        round: parseInt(roundNumber),
        id: actionId as GameActionId,
      })),
    ),
  [] as GameAction[],
);
