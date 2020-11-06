import React from 'react';
import { useAppState, getGremlin } from './state';
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
              <h2>Round: {state.pastRounds.slice(-1)[0].number} results</h2>
              {/* <p>Action Cost: {pastRound.costs}</p>
              <p>
                Stories Completed: {pastRound.storiesCompleted}/
                {pastRound.storiesAttempted}
              </p> */}
            </>
          )}
          <h2>Round {state.currentRound.number} of 6</h2>
          {state.currentRound.description}
          <p>
            Capacity: {state.currentRound.capacity.available} /{' '}
            {state.currentRound.capacity.total}
          </p>
          {state.currentRound.activeEffects.length !== 0 && (
            <>
              <h3>Active Effects</h3>
              {state.currentRound.activeEffects.map((effect) => (
                <>
                  <h4>{effect.title}</h4>
                  <p>Capacity: {effect.capacity}</p>
                  {effect.description && <p>{effect.description}</p>}
                </>
              ))}
            </>
          )}
          <button
            onClick={() =>
              dispatch({
                type: 'NEXT_ROUND',
                payload: { gremlin: getGremlin(state) },
              })
            }
          >
            Complete Round
          </button>

          <h2>Available Actions</h2>
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
        </>
      )}
    </>
  );
}
