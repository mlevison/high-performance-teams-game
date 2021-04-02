import React, { useState } from 'react';
import type {
  GameDispatch,
  AppState,
  GameActionWithStatus,
} from '../../../state';
import styles from './Actions.module.css';
import RoundActions from './RoundActions';

function onlyRound(number: number) {
  return (actionWithStatus: GameActionWithStatus): boolean =>
    actionWithStatus.gameAction.round === number;
}

type Props = {
  currentRound: number;
  ui: AppState['ui'];
  availableGameActions: AppState['availableGameActions'];
  dispatch: GameDispatch;
  availableCapacity: number;
};

export default function Actions(props: Props) {
  const [openActionId, setOpenActionId] = useState<string>();

  return (
    <>
      <h2>Available Actions</h2>
      <p>
        Select Improvements or Actions that will affect the team. Once selected,
        the Actions cost will be deducted from the team's Working Capacity.
      </p>
      <p>
        Previous rounds actions are still available, click the &#9658; to open
        prior rounds.
      </p>
      <ul className={styles.roundList}>
        {Array(props.currentRound)
          .fill('')
          .map((_, i) => {
            const round = props.currentRound - i;
            return (
              <RoundActions
                review={props.ui.review !== false}
                availableCapacity={props.availableCapacity}
                onOpen={(open, actionId) => {
                  setOpenActionId(open ? actionId : undefined);
                }}
                openGameActionId={openActionId}
                onSelect={(selected, actionId) =>
                  props.dispatch(
                    selected
                      ? {
                          type: 'SELECT_GAME_ACTION',
                          payload: actionId,
                        }
                      : {
                          type: 'UNSELECT_GAME_ACTION',
                          payload: actionId,
                        },
                  )
                }
                key={round}
                initialVisible={round === props.currentRound}
                round={round}
                actionsWithStatus={props.availableGameActions.filter(
                  onlyRound(round),
                )}
              />
            );
          })}
      </ul>
    </>
  );
}
