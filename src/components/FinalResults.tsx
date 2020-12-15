import { restartGame, sumByProp } from 'lib';
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
    props.state.pastRounds.map((round) => ({
      storiesAttempted: round.capacity.available,
    })),
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
        onClick={() =>
          props.dispatch({ type: 'SET_UI_REVIEW_ACTION', payload: 0 })
        }
      >
        Review Game
      </Button>
      <Button primary onClick={restartGame(props.dispatch)}>
        Start New Game
      </Button>
      <CapStoryChart rounds={props.state.pastRounds} />
    </>
  );
}
