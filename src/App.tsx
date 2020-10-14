import React, { useReducer } from 'react';
import gameReducer, { INITIAL_STATE } from './gameState';

const RESULTS_ROUND = 7;

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  // I don't understand this declaration its like magic.
  const { round, storiesCompleted, capacity, actionCostThisRound } = state;

  return (
    <>
      <h1>High-Performance Team Game </h1>
      {round === RESULTS_ROUND ? (
        <>
          <h2>Results</h2>
          <p>Completed {storiesCompleted} user stories</p>
        </>
      ) : (
        <>
          <p>Round: {round - 1} results</p>
          <p>Action Cost: {actionCostThisRound} </p>
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
          <p>Capacity: {capacity}</p>
          <h2>Round {round} of 6</h2>
          <button onClick={() => dispatch({ type: 'NEXT_ROUND' })}>
            Complete Round
          </button>
        </>
      )}
    </>
  );
}
