import React, { useMemo } from 'react';
import { Chart } from 'react-charts';
import styles from './CapStoryChart.module.css';

type Data = { primary: number; secondary: number };
type Props = {
  rounds: {
    totalCapacity: number;
    storiesAttempted: number;
    storiesCompleted: number | undefined;
  }[];
};

export default function CapStoryChart({ rounds }: Props) {
  const data = useMemo(() => {
    const totalCapacity: Data[] = [];
    const storiesAttempted: Data[] = [];
    const storiesCompleted: Data[] = [];

    rounds.forEach((round, i) => {
      totalCapacity.push({
        primary: i + 1,
        secondary: round.totalCapacity || 0.1,
      });

      storiesAttempted.push({
        primary: i + 1,
        secondary: round.storiesAttempted || 0.1,
      });

      if (round.storiesCompleted !== undefined) {
        storiesCompleted.push({
          primary: i + 1,
          secondary: round.storiesCompleted || 0.1,
        });
      }
    });

    return [
      { label: 'Stories Completed', data: storiesCompleted },
      { label: 'Stories Attempted', data: storiesAttempted },
      { label: 'Total Capacity', data: totalCapacity },
    ];
  }, [rounds]);

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

  return (
    <div className={styles.chart}>
      <Chart data={data} axes={axes} tooltip />
    </div>
  );
}
