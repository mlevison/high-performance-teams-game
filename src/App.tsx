import React, { useReducer } from 'react';
import {
  INITIAL_STATE,
  gameReducer,
  getRoundCapacity,
  getCosts,
  getAvailableGameActions,
} from './state';
import { TOTAL_ROUNDS } from './constants';
import { concatByProp, sumByProp } from 'lib';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const pastRound = state.pastRounds[state.pastRounds.length - 1];
  const roundCapacity = getRoundCapacity(state.pastRounds);
  const costs = getCosts(state.currentRound);
  const capacityAvailable = roundCapacity - costs;
  const availableGameActions = getAvailableGameActions(
    state.pastRounds.length + 1,
    concatByProp(state.pastRounds, 'selectedGameActionIds'),
    state.currentRound.selectedGameActionIds,
  );

  return (
    <>
      <h1>High-Performance Team Game </h1>
      {state.pastRounds.length === TOTAL_ROUNDS ? (
        <>
          <h2>Results</h2>
          <p>
            Completed {sumByProp(state.pastRounds, 'storiesCompleted')} user
            stories
          </p>
        </>
      ) : (
        <>
          {pastRound && (
            <>
              <p>Round: {state.pastRounds.length} results</p>
              {/* <p>Action Cost: {pastRound.costs}</p>
              <p>
                Stories Completed: {pastRound.storiesCompleted}/
                {pastRound.storiesAttempted}
              </p> */}
            </>
          )}
          <h2>Round {state.pastRounds.length + 1} of 6</h2>
          {availableGameActions.map((gameAction) => (
            <div key={gameAction.id}>
              <h3>{gameAction.name}</h3>
              <p>{gameAction.description}</p>
              <p>Cost: {gameAction.cost}</p>
              <button
                onClick={() =>
                  dispatch({
                    type: 'SELECT_GAME_ACTION',
                    payload: gameAction.id,
                  })
                }
              >
                Commit
              </button>
            </div>
          ))}

          <p>
            Capacity: {capacityAvailable} / {roundCapacity}
          </p>
          <button onClick={() => dispatch({ type: 'NEXT_ROUND' })}>
            Complete Round
          </button>
        </>
      )}
    </>
  );
}
