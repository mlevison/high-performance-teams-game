import { renderHook, act } from '@testing-library/react-hooks';
import useAppState from '../state/useAppState';
import type { GameActionId, GremlinId } from '../config';
import { BaseEffect, INITIAL_STATE } from 'state';
import {
  START_CAPACITY,
  START_GREMLIN_CHANCE,
  START_USER_STORY_CHANCE,
} from '../gameConstants';

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

export function advanceGameToRound(
  game: ReturnType<typeof getGame>,
  desiredRound: number,
) {
  while (game.state.currentRound.number < desiredRound) {
    game.nextRound();
  }
}
export function testCurrentRound(
  game: ReturnType<typeof getGame>,
  round: BaseEffect,
) {
  if (round.userStoryChange !== undefined) {
    expect(game.state.currentRound).toHaveUserStoryChance(
      round.userStoryChange + START_USER_STORY_CHANCE,
    );
  }
  if (round.capacityChange !== undefined) {
    expect(game.state.currentRound).toHaveTotalCapacity(
      round.capacityChange + START_CAPACITY,
    );
  }
  if (round.gremlinChange !== undefined) {
    expect(game.state.currentRound).toHaveGremlinChance(
      round.gremlinChange + START_GREMLIN_CHANCE,
    );
  }
}

export function testFutureRounds(
  game: ReturnType<typeof getGame>,
  futureRounds: BaseEffect[],
) {
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
