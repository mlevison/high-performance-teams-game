import { renderHook, act } from '@testing-library/react-hooks';
import useAppState, { AppState } from '../state/useAppState';
import type { GameActionId, GremlinId } from '../config';
import { INITIAL_STATE } from 'state';

export function getGame() {
  const wrapper = renderHook(() => useAppState(INITIAL_STATE));

  return {
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
      return wrapper.result.current[2]();
    },
    nextRound: (gremlin: GremlinId | null = null) => {
      const closedRound = {
        ...wrapper.result.current[2](),
      };

      act(() => {
        wrapper.result.current[1]({
          type: 'NEXT_ROUND',
          payload: { closedRound, gremlin },
        });
      });
    },
    selectAction: (gameActionId: GameActionId) => {
      act(() => {
        wrapper.result.current[1]({
          type: 'SELECT_GAME_ACTION',
          payload: gameActionId,
        });
      });
    },
  };
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends string | undefined
    ? string | RegExp
    : DeepPartial<T[P]>;
};
function deepObjectContaining(input: unknown): unknown {
  if (Array.isArray(input)) {
    expect.arrayContaining(input.map((val) => deepObjectContaining(val)));
  }

  if (input instanceof RegExp) {
    return expect.stringMatching(input);
  }

  if (typeof input !== 'object' || input === null) {
    return input;
  }

  return expect.objectContaining(
    Object.fromEntries(
      Object.entries(input).map(([key, value]) => {
        return [key, deepObjectContaining(value)];
      }),
    ),
  );
}

export function testCurrentRound(
  game: ReturnType<typeof getGame>,
  round: DeepPartial<AppState['currentRound']>,
) {
  expect(game.state.currentRound).toEqual(deepObjectContaining(round));
}

export function testFutureRounds(
  game: ReturnType<typeof getGame>,
  futureRounds: DeepPartial<AppState['currentRound']>[],
) {
  futureRounds.forEach((round) => {
    game.nextRound();
    testCurrentRound(game, round);
  });
}

export function testFutureCapacities(
  game: ReturnType<typeof getGame>,
  capacitiesByRound: number[],
) {
  capacitiesByRound.forEach((capacity) => {
    game.nextRound();
    expect(game.state.currentRound.capacity.total).toEqual(capacity);
  });
}

export function testUserStoryChance(
  game: ReturnType<typeof getGame>,
  userStoryChances: number[],
) {
  userStoryChances.forEach((chance) => {
    game.nextRound();
    expect(game.state.currentRound.userStoryChance).toEqual(chance);
  });
}

export function times(n: number, callback: (i: number) => void) {
  for (let i = 0; i < n; i++) {
    callback(i);
  }
}
