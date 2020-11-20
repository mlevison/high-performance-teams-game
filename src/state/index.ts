import { Dispatch } from 'react';
import { Action } from './game';
import { ClosedRound as ClosedRoundType } from './round';
import { AppState as AppStateT } from './useAppState';
import { GameActionWithStatus as GameActionWithStatusT } from './gameActions';
import { RoundDescription as RoundDescriptionT } from './rounds';

export type RoundDescription<T extends string> = RoundDescriptionT<T>;
export type ClosedRound = ClosedRoundType;
export type AppState = AppStateT;
export type GameDispatch = Dispatch<Action>;
export type GameActionWithStatus = GameActionWithStatusT;
export { startCapacity } from './rounds';
export { getCosts, closeRound } from './round';
export {
  getAvailableGameActions,
  isGameActionWithIcon,
  isGameActionWithImage,
  UNIQUE_ACTION,
} from './gameActions';
export { default as useAppState } from './useAppState';
export { gameReducer, INITIAL_STATE } from './game';
export { rollGremlin } from './gremlins';
