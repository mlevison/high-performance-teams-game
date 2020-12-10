import React, { useMemo, useState } from 'react';
import { Chart } from 'react-charts';
import { GremlinId } from '../../config';
import { START_USER_STORY_CHANCE } from '../../constants';
import {
  AppState,
  GameDispatch,
  ClosedRound,
  isUserStoryChanceEffect,
} from '../../state';
import Button from '../Button';
import styles from './Round.module.css';

type Data = { primary: number; secondary: number };

type Props = {
  pastRounds: AppState['pastRounds'];
  currentRound: AppState['currentRound'];
  closeRound: () => ClosedRound;
  rollGremlin: () => GremlinId | null;
  dispatch: GameDispatch;
};
export default function Results(props: Props) {
  const [closedRound, setClosedRound] = useState<ClosedRound>();
  const pastRounds = props.pastRounds;
  const currentRound = props.currentRound;
  const data = useMemo(() => {
    const totalCapacity: Data[] = [];
    const storiesCompleted: Data[] = [];

    pastRounds.forEach((round, i) => {
      totalCapacity.push({
        primary: i + 1,
        secondary: round.totalCapacity,
      });

      storiesCompleted.push({
        primary: i + 1,
        secondary: round.storiesCompleted,
      });
    });

    totalCapacity.push({
      primary: currentRound.number,
      secondary: currentRound.capacity.total,
    });
    if (closedRound) {
      storiesCompleted.push({
        primary: currentRound.number,
        secondary: closedRound.storiesCompleted,
      });
    }

    return [
      { label: 'Stories Completed', data: storiesCompleted },
      { label: 'Total Capacity', data: totalCapacity },
    ];
  }, [pastRounds, currentRound, closedRound]);

  const axes = useMemo(
    () => [
      {
        primary: true,
        type: 'ordinal',
        position: 'bottom',
        format(val: any) {
          return `Round ${val}`;
        },
      },
      {
        type: 'linear',
        position: 'left',
        tickSizeInner: 1,
        base: 0,
      },
    ],
    [],
  );
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
        {!closedRound && (
          <>
            <li>
              x &nbsp; {props.currentRound.capacity.available} capacity to spend
              on user stories
            </li>
            <li>&nbsp;</li>
          </>
        )}
        {closedRound && (
          <>
            <li>
              {props.currentRound.capacity.available} user stories attempted
            </li>
            <li>{closedRound.storiesCompleted} user stories completed</li>
          </>
        )}
      </ul>

      <ul className={styles.userStoryIcons}>
        {Array(props.currentRound.capacity.available)
          .fill('')
          .map((_, i) => (
            <li key={i}>
              {!closedRound
                ? '❓'
                : i < closedRound.storiesCompleted
                ? '✅'
                : '❌'}
            </li>
          ))}
      </ul>
      <div className={styles.center}>
        <Button
          disabled={!!closedRound}
          onClick={() => {
            setClosedRound(props.closeRound());
          }}
        >
          Roll for User Stories
        </Button>
        <Button
          primary
          disabled={!closedRound}
          onClick={() => {
            if (!closedRound) {
              throw new Error(
                'Can not go to next round without closing this one',
              );
            }
            props.dispatch({
              type: 'NEXT_ROUND',
              payload: {
                closedRound,
                gremlin: props.rollGremlin(),
              },
            });
          }}
        >
          Next Round
        </Button>
      </div>

      <div className={styles.chart}>
        <Chart data={data} axes={axes} tooltip />
      </div>
    </>
  );
}
