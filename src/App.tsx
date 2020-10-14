import React, { useReducer } from 'react';
import gameReducer, { INITIAL_STATE } from './gameState';

const RESULTS_ROUND = 7;

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  return (
    <>
      <h1>High-Performance Team Game </h1>
      {state.round === RESULTS_ROUND ? (
        <>
          <h2>Results</h2>
          <p>Completed {state.storiesCompleted} user stories</p>
        </>
      ) : (
        <>
          <p>Round: {state.round - 1} results</p>
          <p>Action Cost: {state.actionCostThisRound} </p>
          <button
            onClick={() =>
              dispatch({
                type: 'ADD_GAME_ACTION',
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
          <h2>Round {state.round} of 6</h2>
          <button onClick={() => dispatch({ type: 'NEXT_ROUND' })}>
            Complete Round
          </button>
        </>
      )}
    </>
  );
}
