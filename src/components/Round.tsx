import React, { ReactElement, useState } from 'react';
import { TOTAL_ROUNDS } from '../constants';
import { AppState, rollGremlin, GameDispatch } from '../state';

type Props = {
  currentRound: AppState['currentRound'];
  dispatch: GameDispatch;
  row1?: ReactElement;
  row2?: ReactElement;
};

export default function Round(props: Props) {
  const [view, setView] = useState<'welcome' | 'actions' | 'results'>(
    'welcome',
  );

  return (
    <>
      <h2>
        Round {props.currentRound.number} of {TOTAL_ROUNDS}
      </h2>
      {view === 'welcome' && (
        <>
          {props.currentRound.description}
          <button onClick={() => setView('actions')}>Start Round</button>
        </>
      )}
      {view === 'actions' && (
        <>
          <button onClick={() => setView('results')}>Complete Round</button>
          {props.row1}
          {props.row2}
        </>
      )}
      {view === 'results' && (
        <button
          onClick={() =>
            props.dispatch({
              type: 'NEXT_ROUND',
              payload: {
                gremlinRoll: rollGremlin(props.currentRound.number),
              },
            })
          }
        >
          Next Round
        </button>
      )}
    </>
  );
}
