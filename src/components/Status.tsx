import React from 'react';
import { AppState } from '../state';

type Props = AppState['currentRound'];

export default function Status(props: Props) {
  return (
    <>
      <p>
        Capacity: {props.capacity.available} / {props.capacity.total}
      </p>
      {props.activeEffects.length !== 0 && (
        <>
          <h3>Active Effects</h3>
          {props.activeEffects.map((effect) => (
            <>
              <h4>{effect.title}</h4>
              <p>Capacity: {effect.capacity}</p>
              {effect.description && <p>{effect.description}</p>}
            </>
          ))}
        </>
      )}
    </>
  );
}
