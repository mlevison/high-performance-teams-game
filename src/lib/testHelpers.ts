import { renderHook, act } from '@testing-library/react-hooks';
import useAppState from '../state/useAppState';
import type { GameActionId, GremlinId } from '../config';
import { BaseEffect, INITIAL_STATE } from 'state';
import {
  START_CAPACITY,
  START_GREMLIN_CHANCE,
  START_USER_STORY_CHANCE,
} from '../constants';
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

export function testCurrentRound(
  game: ReturnType<typeof getGame>,
  round: BaseEffect,
) {
  if (round.userStoryChange !== undefined) {
    expect(game.state.currentRound.userStoryChance).toEqual(
      round.userStoryChange + START_USER_STORY_CHANCE,
    );
  }
  if (round.capacityChange !== undefined) {
    expect(game.state.currentRound.capacity.total).toEqual(
      round.capacityChange + START_CAPACITY,
    );
  }
  if (round.gremlinChange !== undefined) {
    expect(game.state.currentRound.gremlinChance).toEqual(
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
