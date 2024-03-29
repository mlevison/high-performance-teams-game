import React from 'react';
import type { AppState, ClosedRound } from '../../../state';
import type { GameDispatch } from '../../../lib';
import Button from '../Button';
import CapStoryChart from '../CapStoryChart';
import styles from './Round.module.css';

type Props = Pick<AppState, 'ui' | 'pastRounds' | 'currentRound'> & {
  closeRound: () => ClosedRound;
  rollGremlin: () => string | null;
  dispatch: GameDispatch;
  initialUserStoryChance: number;
  totalRounds: number;
  interactiveRounds: number;
};
export default function Results(props: Props) {
  const userStoryEffects = props.currentRound.activeEffects.filter(
    (effect) => effect.userStoryChange !== undefined,
  );

  return (
    <>
      <p>
        What is the chance that each User Story will successfully be built?Life
        is unpredictable but, based on the choices that you made for
        Actions/Improvements, this is what we calculate your chances are for
        successfully completing a user story.
      </p>
      <p>
        Roll the dice to see how many User Stories you actually complete. When
        you have reviewed the results click: “Begin Next Round".
      </p>
      <h3>Calculation</h3>
      <ul className={styles.userStoryChanceList}>
        <li>&nbsp;&nbsp;&nbsp;{props.initialUserStoryChance}% base chance</li>
        {userStoryEffects.map((effect) => (
          <li key={effect.title}>
            {effect.userStoryChange! > 0 ? '+' : '-'}{' '}
            {effect.userStoryChange!.toString().replace(/^-/, '')}%{' '}
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
              x &nbsp; {props.currentRound.capacity.available} working capacity
              that you elected to spend on user stories
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
        {props.pastRounds.length + 1 < props.totalRounds ? (
          <Button
            primary
            disabled={!props.ui.closedRound}
            onClick={() => {
              if (props.ui.review !== false) {
                props.dispatch({
                  type: 'SET_UI_REVIEW_ACTION',
                  payload: props.ui.review + 1,
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
            Next Round
          </Button>
        ) : null}
        {!props.ui.review &&
        props.pastRounds.length + 1 >= props.interactiveRounds ? (
          <Button
            primary
            disabled={!props.ui.closedRound}
            onClick={() => {
              if (!props.ui.closedRound) {
                throw new Error(
                  'Can not go to next round without closing this one',
                );
              }

              props.dispatch({
                type: 'FINISH_GAME',
                payload: {
                  closedRound: props.ui.closedRound,
                },
              });
            }}
          >
            {props.pastRounds.length + 1 >= props.totalRounds
              ? 'Finish Game'
              : 'Finish Game (simulate remaining rounds)'}
          </Button>
        ) : null}
        {props.ui.review && props.ui.review + 1 >= props.totalRounds ? (
          <Button
            primary
            onClick={() => {
              props.dispatch({
                type: 'SET_UI_REVIEW_ACTION',
                payload: false,
              });
            }}
          >
            Close Review
          </Button>
        ) : null}
      </div>
      <h3>Summary of all rounds</h3>
      <p>
        The graph will make more sense and show the overall results of choices
        made, as more rounds get completed and are shown.
      </p>
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
