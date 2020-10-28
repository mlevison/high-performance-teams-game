import React from 'react';
import { useAppState } from './state';
import { TOTAL_ROUNDS } from './constants';

export default function App() {
  const [state, dispatch] = useAppState();

  return (
    <>
      <h1>High-Performance Team Game </h1>
      {state.currentRound.number > TOTAL_ROUNDS ? (
        <>
          <h2>Results</h2>
          <p>Completed {state.result.storiesCompleted} user stories</p>
        </>
      ) : (
        <>
          {state.pastRounds.length !== 0 && (
            <>
              <p>Round: {state.pastRounds.slice(-1)[0].number} results</p>
              {/* <p>Action Cost: {pastRound.costs}</p>
              <p>
                Stories Completed: {pastRound.storiesCompleted}/
                {pastRound.storiesAttempted}
              </p> */}
            </>
          )}
          <h2>Round {state.currentRound.number} of 6</h2>
          {state.availableGameActions.map((gameAction) => (
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
            Capacity: {state.currentRound.capacity.available} /{' '}
            {state.currentRound.capacity.total}
          </p>
          <button onClick={() => dispatch({ type: 'NEXT_ROUND' })}>
            Complete Round
          </button>
        </>
      )}
    </>
  );
}
