import { renderHook, act } from '@testing-library/react-hooks';
import { useAppState } from './useAppState';
import { createInitialState } from './initialState';
import { AppState, BaseEffect, GameConfig, RoundDescription } from '../state';
import { ClosedGameRound } from '../state/round';
import { Icon, GameActionImplementation } from '../state/gameActions/types';

export function config<A extends string, G extends string>(
  opts: Partial<GameConfig<A, G>> = {},
  interactiveRounds: number = 0,
): GameConfig<A, G> {
  const rounds = opts.rounds || [];
  while (rounds.length < interactiveRounds) {
    rounds.push(round());
  }
  return {
    trailingRounds: opts.trailingRounds || 0,
    initialScores: {
      userStoryChange: 7,
      capacityChange: 7,
      ...opts.initialScores,
    },
    rounds,
    gremlins: {
      ...(opts.gremlins as any),
    },
    gameEffects: {
      ...opts.gameEffects,
    },
  };
}

export function round<K extends string>(
  opts: Partial<RoundDescription<K, any, any>> = {},
) {
  return {
    title: 'EmptyRound',
    description: null,
    ...opts,
    actions: {
      ...opts.actions,
    },
  };
}

export function action<A extends string>(
  opts: Partial<GameActionImplementation<A>> = {},
): GameActionImplementation<A> & Icon {
  return {
    icon: '🤷',
    name: 'Some Action',
    cost: 0,
    description: null,
    ...opts,
  };
}

type GameHelper<GameActionId extends string, GremlinId extends string> = {
  config: GameConfig<GameActionId, GremlinId>;
  readonly state: AppState<GameActionId, GremlinId>;
  readonly availableActionIds: GameActionId[];
  closeRound: () => ClosedGameRound<GameActionId, GremlinId>;
  nextRound: (GremlinId?: GremlinId | null) => void;
  selectAction: (gameActionId: GameActionId) => void;
};
export function getGame<GameActionId extends string, GremlinId extends string>(
  config: GameConfig<GameActionId, GremlinId>,
): GameHelper<GameActionId, GremlinId> {
  const wrapper = renderHook(() => useAppState(config, createInitialState()));

  return {
    config,
    get state() {
      return wrapper.result.current[0];
    },
    get availableActionIds() {
      return wrapper.result.current[0].availableGameActions
        .filter(
          (actionWithStatus) => actionWithStatus.status.type === 'AVAILABLE',
        )
        .map((actionWithStatus) => actionWithStatus.gameAction.id);
    },
    closeRound: () => {
      return wrapper.result.current[1]();
    },
    nextRound: (gremlin: GremlinId | null = null) => {
      const closedRound = {
        ...wrapper.result.current[1](),
      };

      act(() => {
        wrapper.result.current[4]({
          type: 'NEXT_ROUND',
          payload: { closedRound, gremlin },
        });
      });
    },
    selectAction: (gameActionId: GameActionId) => {
      act(() => {
        wrapper.result.current[4]({
          type: 'SELECT_GAME_ACTION',
          payload: gameActionId,
        });
      });
    },
  };
}

export function defuseRounds<
  GameActionId extends string,
  GremlinId extends string
>(
  rounds: RoundDescription<string, GameActionId, GremlinId>[],
): RoundDescription<string, GameActionId, GremlinId>[] {
  return rounds.map((roundDescription) =>
    round({
      actions: Object.fromEntries(
        Object.keys(roundDescription.actions).map((id) => {
          return [id, action()];
        }),
      ),
    }),
  );
}

export function advanceGameToRound<
  GameActionId extends string,
  GremlinId extends string
>(game: GameHelper<GameActionId, GremlinId>, desiredRound: number) {
  while (game.state.currentRound.number < desiredRound) {
    game.nextRound();
  }
}
export function testCurrentRound<
  GameActionId extends string,
  GremlinId extends string
>(game: GameHelper<GameActionId, GremlinId>, round: BaseEffect) {
  if (round.userStoryChange !== undefined) {
    expect(game.state.currentRound).toHaveUserStoryChance(
      round.userStoryChange + (game.config.initialScores.userStoryChange || 0),
    );
  }
  if (round.capacityChange !== undefined) {
    expect(game.state.currentRound).toHaveTotalCapacity(
      round.capacityChange + (game.config.initialScores.capacityChange || 0),
    );
  }
  if (round.gremlinChange !== undefined) {
    expect(game.state.currentRound).toHaveGremlinChance(round.gremlinChange);
  }
}

export function testFutureRounds<
  GameActionId extends string,
  GremlinId extends string
>(game: GameHelper<GameActionId, GremlinId>, futureRounds: BaseEffect[]) {
  futureRounds.forEach((round) => {
    game.nextRound();
    testCurrentRound(game, round);
  });
}

function matchRound(
  matcherName: string,
  propName: string,
  extractValue: (round: any) => any,
): jest.CustomMatcher {
  return function (received: any, expected: any) {
    const matcherHint = `${this.utils.matcherHint(
      matcherName,
      undefined,
      undefined,
      {
        isNot: this.isNot,
        promise: this.promise,
      },
    )}\n\n`;

    try {
      var actual = extractValue(received);
      if (typeof received.number !== 'number') {
        throw new TypeError();
      }
      var pass = actual === expected;
    } catch (err) {
      if (err.name === 'TypeError') {
        return {
          pass: false,
          message: () =>
            `${matcherHint}Expected: ${this.utils.printReceived(
              received,
            )} to be of type AppRound`,
        };
      }
      throw err;
    }

    return {
      message: () =>
        `${matcherHint}Expected ${propName} ${this.utils.printReceived(
          actual,
        )} of round ${received.number} ${
          pass ? 'not ' : ''
        }to be ${this.utils.printExpected(expected)}`,
      pass,
    };
  };
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveUserStoryChance(chance: number): R;
      toHaveGremlinChance(chance: number): R;
      toHaveTotalCapacity(chance: number): R;
    }
  }
}
expect.extend({
  toHaveGremlinChance: matchRound(
    'toHaveGremlinChance',
    'gremlinChance',
    (round) => round.gremlinChance,
  ),
  toHaveUserStoryChance: matchRound(
    'toHaveUserStoryChance',
    'userStoryChance',
    (round) => round.userStoryChance,
  ),
  toHaveTotalCapacity: matchRound(
    'toHaveTotalCapacity',
    'capacity.total',
    (round) => round.capacity.total,
  ),
});
