import React, { useReducer } from 'react';
import { storySucceeds } from './lib';

type RoundState = {
  round: number;
  storiesCompleted: number;
};
const INITIAL_STATE: RoundState = { round: 1, storiesCompleted: 0 };
const RESULTS_ROUND = 7;

export default function App() {
  const [{ round, storiesCompleted }, nextRound] = useReducer(
    (state: RoundState) => {
      return {
        round: state.round + 1,
        storiesCompleted:
          state.storiesCompleted +
          Array(10).fill('').filter(storySucceeds).length,
      };
    },
    INITIAL_STATE,
  );

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
          <h2>Round {round} of 6</h2>
          <button onClick={nextRound}>Complete Round</button>
        </>
      )}
    </>
  );
}
