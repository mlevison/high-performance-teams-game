import { ClosedRound, GameRound, GameState } from '../state';
export function selectedActionIds<
  GameActionId extends string,
  GremlinId extends string
>(
  state: Pick<
    GameState<GameActionId, GremlinId>,
    'currentRound' | 'pastRounds'
  >,
  before?: (
    round:
      | ClosedRound<GameActionId, GremlinId>
      | GameRound<GameActionId, GremlinId>,
  ) => boolean,
) {
  const selectedActions: GameActionId[] = [];
  let stop = false;
  for (let i = 0; i < state.pastRounds.length; i++) {
    const round = state.pastRounds[i];
    stop = before?.(round) || false;
    if (stop) {
      break;
    } else {
      selectedActions.push(...round.selectedGameActionIds);
    }
  }
  if (!stop) {
    selectedActions.push(...state.currentRound.selectedGameActionIds);
  }

  return selectedActions;
}
