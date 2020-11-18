import React, { useState, MutableRefObject } from 'react';
import {
  GameDispatch,
  AppState,
  GameActionId,
  GameActionWithStatus,
} from '../../state';
import styles from './Actions.module.css';
import RoundActions from './RoundActions';
import Overlay from './Overlay';
import { Button } from '../../components';

function onlyRound(number: number) {
  return (actionWithStatus: GameActionWithStatus): boolean =>
    actionWithStatus.gameAction.available.round === number;
}

function toggle(
  actionWithStatus: GameActionWithStatus,
  dispatch: GameDispatch,
) {
  return () => {
    dispatch(
      actionWithStatus.status.type === 'SELECTED'
        ? {
            type: 'UNSELECT_GAME_ACTION',
            payload: actionWithStatus.gameAction.id,
          }
        : {
            type: 'SELECT_GAME_ACTION',
            payload: actionWithStatus.gameAction.id,
          },
    );
  };
}

type Props = {
  currentRound: number;
  availableGameActions: AppState['availableGameActions'];
  dispatch: GameDispatch;
  overlay: MutableRefObject<HTMLElement | null>;
};

export default function Actions(props: Props) {
  const [selectedActionId, setSelectedAction] = useState<GameActionId>();
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );
  const selectedAction =
    selectedActionId &&
    props.availableGameActions.find(
      (actionWithStatus) => actionWithStatus.gameAction.id === selectedActionId,
    );

  return (
    <>
      <h2>Available Actions</h2>
      <ul className={styles.roundList}>
        {Array(props.currentRound)
          .fill('')
          .map((_, i) => {
            const round = props.currentRound - i;
            return (
              <RoundActions
                onOpen={(elm, actionId) => {
                  setReferenceElement(elm);
                  setSelectedAction(actionId);
                }}
                onSelect={(actionWithState) =>
                  toggle(actionWithState, props.dispatch)()
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
      {selectedAction && (
        <Overlay
          referenceElement={referenceElement}
          title={selectedAction.gameAction.name}
          onClose={() => setSelectedAction(undefined)}
        >
          <p>{selectedAction.gameAction.description}</p>
          <p>
            <b>Cost</b>: {selectedAction.gameAction.cost}
          </p>
          <Button
            primary={selectedAction.status.type === 'AVAILABLE'}
            onClick={toggle(selectedAction, props.dispatch)}
          >
            {selectedAction.status.type === 'SELECTED' ? 'Remove' : 'Select'}
          </Button>
        </Overlay>
      )}
    </>
  );
}
