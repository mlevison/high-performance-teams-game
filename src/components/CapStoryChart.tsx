import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './CapStoryChart.module.css';

const USC = 'Chance of completing User Stories';
const SA = 'User Stories Attempted';
const SC = 'User Stories Completed';
const TC = 'Total Capacity';

type Data = {
  name: string;
  [USC]: number;
  [TC]: number;
  [SA]: number;
  [SC]?: number;
};
type Props = {
  rounds: {
    userStoryChance: number;
    totalCapacity: number;
    storiesAttempted: number;
    storiesCompleted: number | undefined;
  }[];
};

export default function CapStoryChart({ rounds }: Props) {
  const [data, userStorySteps] = useMemo(() => {
    const data: Data[] = [];
    let maxUserStoryChance = 100;

    rounds.forEach((round, i) => {
      maxUserStoryChance = Math.max(
        maxUserStoryChance,
        Math.ceil(round.userStoryChance / 10) * 10,
      );
      data.push({
        name: `Round ${i + 1}`,
        [USC]: round.userStoryChance,
        [TC]: round.totalCapacity,
        [SA]: round.storiesAttempted,
        [SC]: round.storiesCompleted,
      });
    });
    return [
      data,
      Array.from({ length: 1 + maxUserStoryChance / 10 }).map((_, i) => i * 10),
    ];
  }, [rounds]);

  return (
    <ResponsiveContainer className={styles.chart} height={300} width="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis
          yAxisId="right"
          orientation="right"
          unit="%"
          ticks={userStorySteps}
        />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey={TC} stroke="#0c79df" />
        <Line yAxisId="left" type="monotone" dataKey={SA} stroke="#e2d02f" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={USC}
          stroke="#cd66e7"
          activeDot={{ r: 8 }}
        />
        <Line yAxisId="left" type="monotone" dataKey={SC} stroke="#1be400" />
      </LineChart>
    </ResponsiveContainer>
  );
}
