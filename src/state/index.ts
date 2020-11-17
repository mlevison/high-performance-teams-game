import { Dispatch } from 'react';
import { Action } from './game';
import { ClosedRound as ClosedRoundType } from './round';
import { AppState as AppStateT } from './useAppState';
import {
  GameActionId as GameActionIdT,
  GameActionWithStatus as GameActionWithStatusT,
} from './gameActions';
export type ClosedRound = ClosedRoundType;
export type AppState = AppStateT;
export type GameDispatch = Dispatch<Action>;
export type GameActionId = GameActionIdT;
export type GameActionWithStatus = GameActionWithStatusT;
export { startCapacity } from './roundDescriptions';
export { getCosts } from './round';
export {
  getAvailableGameActions,
  isGameActionWithIcon,
  isGameActionWithImage,
} from './gameActions';
export { default as useAppState } from './useAppState';
export { gameReducer, INITIAL_STATE } from './game';
export { rollGremlin } from './gremlins';
