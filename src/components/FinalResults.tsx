import { sumByProp } from 'lib';
import React from 'react';
import { AppState, GameDispatch } from 'state';
import CapStoryChart from './CapStoryChart';
import Button from './Button';

type Props = {
  state: AppState;
  dispatch: GameDispatch;
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
      <Button
        primary
        onClick={() => {
          if (
            window.confirm(
              'Do you really want to start a new Game? You can not come back to this one afterwards.',
            )
          ) {
            props.dispatch({ type: 'RESTART_GAME' });
          }
        }}
      >
        Start New Game
      </Button>
      <CapStoryChart rounds={props.state.pastRounds} />
    </>
  );
}
