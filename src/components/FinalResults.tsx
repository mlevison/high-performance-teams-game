import React from 'react';
import { AppState } from 'state';
import CapStoryChart from './CapStoryChart';

type Props = {
  state: AppState;
};

export default function Results(props: Props) {
  return (
    <>
      <h2>Results</h2>
      <p>Completed {props.state.result.storiesCompleted} user stories</p>
      <CapStoryChart rounds={props.state.pastRounds} />
    </>
  );
}
