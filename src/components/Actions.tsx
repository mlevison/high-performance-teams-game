import React from 'react';
import { GameActionWithStatus } from 'state/gameActions/getAvailableGameActions';
import { GameDispatch, AppState } from '../state';

type Props = {
  currentRound: number;
  availableGameActions: AppState['availableGameActions'];
  dispatch: GameDispatch;
};

function onlyRound(number: number) {
  return (gaws: GameActionWithStatus): boolean =>
    gaws.gameAction.available.round === number;
}

export default function Actions(props: Props) {
  return (
    <>
      <h2>Available Actions</h2>
      <ul>
        {Array(props.currentRound)
          .fill('')
          .map((_, i) => {
            const round = i + 1;
            return (
              <li key={round}>
                <span>{round}</span>
                <ul>
                  {props.availableGameActions.filter(onlyRound(round)).map(
                    /* eslint-disable-next-line array-callback-return */
                    ({ status, gameAction }): JSX.Element => {
                      switch (status.type) {
                        case 'AVAILABLE':
                          return (
                            <li key={gameAction.id}>
                              "Available"
                              {gameAction.name} ({gameAction.cost})
                            </li>
                          );
                        case 'SELECTED':
                          return (
                            <li key={gameAction.id}>
                              "Selected"
                              {gameAction.name} ({gameAction.cost})
                            </li>
                          );
                        case 'MULTI_SELECT':
                          return (
                            <li key={gameAction.id}>
                              "Selected times {status.times}" {gameAction.name}{' '}
                              ({gameAction.cost})
                            </li>
                          );
                        case 'MISSING_DEP':
                          return (
                            <li key={gameAction.id}>
                              "Unmet Dependencies {status.unmetDependencies}"{' '}
                              {gameAction.name} ({gameAction.cost})
                            </li>
                          );
                      }
                    },
                  )}
                </ul>
              </li>
            );
          })}
      </ul>
    </>
  );
}
