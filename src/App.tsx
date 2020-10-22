import React, { useReducer } from 'react';
import { INITIAL_STATE, gameReducer, ClosedRound } from './state';
import { TOTAL_ROUNDS } from './constants';
import { sumByProp } from 'lib';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const pastRound: ClosedRound | undefined =
    state.pastRounds[state.pastRounds.length - 1];

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
              <p>Action Cost: {pastRound.costs}</p>
              <p>
                Stories Completed: {pastRound.storiesCompleted}/
                {pastRound.storiesAttempted}
              </p>
            </>
          )}
          <h2>Round {state.pastRounds.length + 1} of 6</h2>
          <button
            onClick={() =>
              dispatch({
                type: 'ROUND_ADD_GAME_ACTION',
                payload: {
                  effect: 1,
                  cost: 2, // TODO - want to use this cost to display on the button
                },
              })
            }
          >
            BuildServer Cost
          </button>
          <p>Capacity: {state.capacity}</p>
          <button onClick={() => dispatch({ type: 'GAME_NEXT_ROUND' })}>
            Complete Round
          </button>
        </>
      )}
    </>
  );
}
