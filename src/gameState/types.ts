export type GameAction = {
  effect: number;
  cost: number;
};
export type GameState = {
  selectedGameActions: GameAction[];
  round: number;
  capacity: number;
  actionCostThisRound: number;
  /* TODO don't love the name - really  stories that could still be completed this round */
  // storiesCompletedThisRound: number;
  storiesCompleted: number;
};
export type NextRoundAction = { type: 'NEXT_ROUND' };
export type AddGameActionAction = {
  type: 'ADD_GAME_ACTION';
  payload: GameAction;
};
export type Action = NextRoundAction | AddGameActionAction;
