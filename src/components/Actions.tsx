import React, { useState, useRef, MutableRefObject, useEffect } from 'react';
import cx from 'classnames';
import {
  GameDispatch,
  AppState,
  GameActionId,
  GameActionWithStatus,
  isGameActionWithIcon,
  isGameActionWithImage,
} from '../state';
import styles from './Actions.module.css';
import { Button } from 'components';
import { usePopper } from 'react-popper';

function onlyRound(number: number) {
  return (actionWithStatus: GameActionWithStatus): boolean =>
    actionWithStatus.gameAction.available.round === number;
}

type ActionProps = GameActionWithStatus & {
  onClick: (elm: HTMLButtonElement) => void;
  onDoubleClick: () => void;
};

function Action(props: ActionProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const clickTimer = useRef<NodeJS.Timeout>();
  const gameAction = props.gameAction;

  return (
    <button
      ref={ref}
      onClick={() => {
        if (clickTimer.current) {
          clearTimeout(clickTimer.current);
        }
        clickTimer.current = setTimeout(() => props.onClick(ref.current!), 300);
      }}
      onDoubleClick={() => {
        if (clickTimer.current) {
          clearTimeout(clickTimer.current);
        }
        props.onDoubleClick();
      }}
      className={cx(
        styles.action,
        ['SELECTED', 'FINISHED'].includes(props.status.type) &&
          styles.actionSelected,
      )}
      disabled={['MISSING_DEP', 'FINISHED'].includes(props.status.type)}
    >
      {isGameActionWithImage(gameAction) && (
        <span
          className={styles.actionImage}
          style={{ backgroundImage: `url(${gameAction.image})` }}
        ></span>
      )}
      {isGameActionWithIcon(gameAction) && (
        <span className={styles.actionIcon}>{gameAction.icon}</span>
      )}

      <span>{props.gameAction.name}</span>
    </button>
  );
}

type RoundActionsProps = {
  round: number;
  dispatch: GameDispatch;
  initialVisible: boolean;
  onOpen: (elm: HTMLElement, id: GameActionId) => void;
  actionsWithStatus: GameActionWithStatus[];
};

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

function RoundActions(props: RoundActionsProps) {
  const [visible, setVisible] = useState(props.initialVisible);
  return (
    <>
      <li>
        <button
          className={styles.roundVisibleToggle}
          onClick={() => setVisible(!visible)}
        >
          Round {props.round} {visible ? '▲' : '▼'}
        </button>
        {visible && (
          <ul className={styles.roundActionList}>
            {props.actionsWithStatus.map(
              /* eslint-disable-next-line array-callback-return */
              (actionWithStatus): JSX.Element => {
                return (
                  <li key={actionWithStatus.gameAction.id}>
                    <Action
                      {...actionWithStatus}
                      onClick={(ev) =>
                        props.onOpen(ev, actionWithStatus.gameAction.id)
                      }
                      onDoubleClick={toggle(actionWithStatus, props.dispatch)}
                    />
                  </li>
                );
              },
            )}
          </ul>
        )}
      </li>
    </>
  );
}

type Props = {
  currentRound: number;
  availableGameActions: AppState['availableGameActions'];
  dispatch: GameDispatch;
  overlay: MutableRefObject<HTMLElement | null>;
};

export default function Actions(props: Props) {
  const [selectedActionId, setSelectedAction] = useState<GameActionId>();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handler = (ev: MouseEvent) => {
      if (!selectedActionId || !overlayRef.current || !ev.target) {
        return;
      }
      if (!overlayRef.current.contains(ev.target as any)) {
        setSelectedAction(undefined);
      }
    };
    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  });
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  overlayRef.current = popperElement;
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const popper = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: [
            'bottom',
            'bottom-start',
            'top-end',
            'top',
            'top-start',
            'right',
          ],
        },
      },
      { name: 'preventOverflow' },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  });

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
                dispatch={props.dispatch}
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
        <div
          data-popper-placement={popper.state?.placement}
          ref={setPopperElement}
          className={styles.overlay}
          style={popper.styles.popper}
          {...popper.attributes}
        >
          <div
            ref={setArrowElement}
            style={popper.styles.arrow}
            className={styles.arrow}
          />
          <div className={styles.overlayInner}>
            <button
              className={styles.closeOverlay}
              onClick={() => setSelectedAction(undefined)}
            >
              ╳
            </button>
            <h3 className={styles.overlayTitle}>
              {selectedAction.gameAction.name}
            </h3>
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
          </div>
        </div>
      )}
    </>
  );
}
