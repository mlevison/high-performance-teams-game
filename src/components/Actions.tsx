import React, {
  useState,
  useRef,
  SetStateAction,
  Dispatch,
  MutableRefObject,
  useEffect,
} from 'react';
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
import { createPortal } from 'react-dom';
import Content from './Content';

function onlyRound(number: number) {
  return (actionWithStatus: GameActionWithStatus): boolean =>
    actionWithStatus.gameAction.available.round === number;
}

type ActionProps = GameActionWithStatus & {
  onClick: () => void;
  onDoubleClick: () => void;
};

function Action(props: ActionProps) {
  const clickTimer = useRef<NodeJS.Timeout>();
  const gameAction = props.gameAction;

  return (
    <button
      onClick={() => {
        if (clickTimer.current) {
          clearTimeout(clickTimer.current);
        }
        clickTimer.current = setTimeout(() => props.onClick(), 300);
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
  setSelectedAction: Dispatch<SetStateAction<GameActionId | undefined>>;
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
                    onClick={() =>
                      props.setSelectedAction(actionWithStatus.gameAction.id)
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
                setSelectedAction={setSelectedAction}
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
      {props.overlay.current &&
        createPortal(
          selectedAction ? (
            <>
              <div className={styles.overlayWrap}>
                <Content>
                  <div className={styles.overlay} ref={overlayRef}>
                    <h3>{selectedAction.gameAction.name}</h3>
                    <p>{selectedAction.gameAction.description}</p>
                    <p>
                      <b>Cost</b>: {selectedAction.gameAction.cost}
                    </p>
                    <Button
                      primary={selectedAction.status.type === 'AVAILABLE'}
                      onClick={toggle(selectedAction, props.dispatch)}
                    >
                      {selectedAction.status.type === 'SELECTED'
                        ? 'Remove'
                        : 'Select'}
                    </Button>
                  </div>
                </Content>
              </div>
            </>
          ) : null,
          props.overlay.current,
        )}
    </>
  );
}
