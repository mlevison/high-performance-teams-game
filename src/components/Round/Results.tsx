import React from 'react';
import { GremlinId } from '../../config';
import { START_USER_STORY_CHANCE, TOTAL_ROUNDS } from '../../constants';
import {
  AppState,
  GameDispatch,
  ClosedRound,
  isUserStoryChanceEffect,
} from '../../state';
import Button from '../Button';
import CapStoryChart from '../CapStoryChart';
import styles from './Round.module.css';

type Props = {
  ui: AppState['ui'];
  pastRounds: AppState['pastRounds'];
  currentRound: AppState['currentRound'];
  closeRound: () => ClosedRound;
  rollGremlin: () => GremlinId | null;
  dispatch: GameDispatch;
};
export default function Results(props: Props) {
  const userStoryEffects = props.currentRound.activeEffects.filter(
    isUserStoryChanceEffect,
  );

  return (
    <>
      <p>What is the chance that each User Story will successfully be built?</p>
      <h3>Calculation</h3>
      <ul className={styles.userStoryChanceList}>
        <li>&nbsp;&nbsp;&nbsp;{START_USER_STORY_CHANCE}% base chance</li>
        {userStoryEffects.map((effect) => (
          <li key={effect.title}>
            {effect.userStoryChange > 0 ? '+' : '-'}{' '}
            {effect.userStoryChange.toString().replace(/^-/, '')}%{' '}
            {effect.title}
          </li>
        ))}
        <li>
          = {props.currentRound.userStoryChance}% chance to successful finish
          user-story
        </li>
        <li>---</li>
        {!props.ui.closedRound && (
          <>
            <li>
              x &nbsp; {props.currentRound.capacity.available} capacity to spend
              on user stories
            </li>
            <li>&nbsp;</li>
          </>
        )}
        {props.ui.closedRound && (
          <>
            <li>
              {props.currentRound.capacity.available} user stories attempted
            </li>
            <li>
              {props.ui.closedRound.storiesCompleted} user stories completed
            </li>
          </>
        )}
      </ul>

      <ul className={styles.userStoryIcons}>
        {Array(props.currentRound.capacity.available)
          .fill('')
          .map((_, i) => (
            <li key={i}>
              {!props.ui.closedRound
                ? '❓'
                : i < props.ui.closedRound.storiesCompleted
                ? '✅'
                : '❌'}
            </li>
          ))}
      </ul>
      <div className={styles.center}>
        {props.ui.review === false ? (
          <Button
            disabled={!!props.ui.closedRound}
            onClick={() => {
              props.dispatch({
                type: 'SET_UI_CLOSED_ROUND_ACTION',
                payload: props.closeRound(),
              });
            }}
          >
            Roll for User Stories
          </Button>
        ) : (
          <Button
            onClick={() => {
              props.dispatch({
                type: 'SET_UI_VIEW_ACTION',
                payload: 'actions',
              });
            }}
          >
            ◀ Back
          </Button>
        )}
        <Button
          primary
          disabled={!props.ui.closedRound}
          onClick={() => {
            if (props.ui.review !== false) {
              const nextRound = props.ui.review + 1;
              props.dispatch({
                type: 'SET_UI_REVIEW_ACTION',
                payload: nextRound < TOTAL_ROUNDS ? nextRound : false,
              });

              return;
            }
            if (!props.ui.closedRound) {
              throw new Error(
                'Can not go to next round without closing this one',
              );
            }
            props.dispatch({
              type: 'NEXT_ROUND',
              payload: {
                closedRound: props.ui.closedRound,
                gremlin: props.rollGremlin(),
              },
            });
          }}
        >
          {props.ui.review && props.ui.review + 1 >= TOTAL_ROUNDS
            ? 'Close Review'
            : props.pastRounds.length + 1 === TOTAL_ROUNDS
            ? 'End Game'
            : 'Next Round'}
        </Button>
      </div>
      <CapStoryChart
        rounds={[
          ...props.pastRounds,
          {
            ...props.currentRound,
            storiesCompleted: props.ui.closedRound?.storiesCompleted,
          },
        ]}
      />
    </>
  );
}
