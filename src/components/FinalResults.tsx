import { sumByProp } from 'lib';
import React from 'react';
import { AppState } from 'state';
import CapStoryChart from './CapStoryChart';

type Props = {
  state: AppState;
};

export default function Results(props: Props) {
  const storiesAttempted = sumByProp(
    props.state.pastRounds,
    'storiesAttempted',
  );
  const storiesCompleted = sumByProp(
    props.state.pastRounds,
    'storiesCompleted',
  );
  return (
    <>
      <h2>Results</h2>
      <ul>
        <li>Final Capacity {props.state.currentRound.capacity.total}</li>
        <li>Attempted {storiesAttempted} user stories</li>
        <li>Completed {storiesCompleted} user stories</li>
      </ul>
      <CapStoryChart rounds={props.state.pastRounds} />
    </>
  );
}
