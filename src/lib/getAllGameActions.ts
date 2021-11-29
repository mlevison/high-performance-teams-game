import { GameConfig, GameAction } from '../state/game';

const cache = new WeakMap();

export function getAllGameActions<
  GameActionId extends string,
  GremlinId extends string,
>(
  rounds: GameConfig<GameActionId, GremlinId>['rounds'],
): GameAction<GameActionId>[] {
  if (!cache.has(rounds)) {
    const actions: GameAction<GameActionId>[] = rounds
      .map((round, i) => {
        return Object.entries(round.actions).map(([actionId, action]) => ({
          ...action,
          round: i + 1,
          id: actionId as GameActionId,
        }));
      })
      .flat();

    cache.set(rounds, actions);
  }

  return cache.get(rounds);
}
