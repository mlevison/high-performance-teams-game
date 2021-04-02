import React from 'react';
import type { AppState } from '../../state';
import { restartGame, sumByProp, GameDispatch } from '../../lib';
import CapStoryChart from './CapStoryChart';
import Button from './Button';

type Props = {
  state: AppState;
  link: string;
  dispatch?: GameDispatch;
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
  const dispatch = props.dispatch;
  return (
    <>
      <h2>Results</h2>
      <ul>
        <li>Final Capacity {props.state.currentRound.capacity.total}</li>
        <li>Attempted {storiesAttempted} user stories</li>
        <li>Completed {storiesCompleted} user stories</li>
      </ul>
      {dispatch && (
        <>
          <Button
            onClick={() =>
              dispatch({ type: 'SET_UI_REVIEW_ACTION', payload: 0 })
            }
          >
            Review Game
          </Button>
          <Button primary onClick={restartGame(dispatch)}>
            Start New Game
          </Button>
        </>
      )}
      <CapStoryChart rounds={props.state.pastRounds} />
      <h3>Game Link</h3>
      <p>
        You can save or share this link. Opening it will restore this current
        game.
      </p>
      <pre>
        <input
          style={{ width: '100%' }}
          value={props.link}
          readOnly
          onClick={(ev) => (ev.target as HTMLInputElement).select()}
        />
      </pre>
    </>
  );
}
