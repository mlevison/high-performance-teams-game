import React, { useState, MutableRefObject } from 'react';
import { GameActionId } from '../../config';
import { GameDispatch, AppState, GameActionWithStatus } from '../../state';
import styles from './Actions.module.css';
import RoundActions from './RoundActions';

function onlyRound(number: number) {
  return (actionWithStatus: GameActionWithStatus): boolean =>
    actionWithStatus.gameAction.round === number;
}

type Props = {
  currentRound: number;
  availableGameActions: AppState['availableGameActions'];
  dispatch: GameDispatch;
  availableCapacity: number;
  overlay: MutableRefObject<HTMLElement | null>;
};

export default function Actions(props: Props) {
  const [openActionId, setOpenActionId] = useState<GameActionId>();

  return (
    <>
      <h2>Available Actions</h2>
      <p>
        Select one or more actions to take this round.<br></br>Previous rounds
        actions are still available, click the &#9658; to open the round
      </p>
      <ul className={styles.roundList}>
        {Array(props.currentRound)
          .fill('')
          .map((_, i) => {
            const round = props.currentRound - i;
            return (
              <RoundActions
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
