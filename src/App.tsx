import React from 'react';
import { useAppState } from './state';
import { TOTAL_ROUNDS } from './constants';
import { Results, Actions, Round, Status } from './components';

export default function App() {
  const [state, dispatch] = useAppState();

  return (
    <>
      <h1>High-Performance Team Game </h1>
      {state.currentRound.number > TOTAL_ROUNDS ? (
        <Results storiesCompleted={state.result.storiesCompleted} />
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
          <Round
            dispatch={dispatch}
            currentRound={state.currentRound}
            row1={
              <Actions
                availableGameActions={state.availableGameActions}
                dispatch={dispatch}
              />
            }
            row2={<Status {...state.currentRound} />}
          />
        </>
      )}
    </>
  );
}
