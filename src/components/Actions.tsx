import React from 'react';
import { GameDispatch, AppState } from '../state';

type Props = {
  availableGameActions: AppState['availableGameActions'];
  dispatch: GameDispatch;
};

export default function Actions(props: Props) {
  return (
    <>
      <h2>Available Actions</h2>
      {props.availableGameActions.map((gameAction) => (
        <div key={gameAction.id}>
          <h3>{gameAction.name}</h3>
          <p>{gameAction.description}</p>
          <p>Cost: {gameAction.cost}</p>
          <button
            onClick={() =>
              props.dispatch({
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
  );
}
