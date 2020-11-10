import React, { ReactElement } from 'react';
import { TOTAL_ROUNDS } from '../constants';
import { AppState, rollGremlin, GameDispatch } from '../state';

type Props = {
  currentRound: AppState['currentRound'];
  dispatch: GameDispatch;
  row1?: ReactElement;
  row2?: ReactElement;
};

export default function Round(props: Props) {
  return (
    <>
      <h2>
        Round {props.currentRound.number} of {TOTAL_ROUNDS}
      </h2>
      {props.currentRound.description}
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
        Complete Round
      </button>
      <hr />
      {props.row1}
      <hr />
      {props.row2}
    </>
  );
}
