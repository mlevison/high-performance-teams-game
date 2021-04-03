import React, { useMemo } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { AppRound } from '../../state';
import styles from './CapStoryChart.module.css';

const USC = 'Chance of completing User Stories';
const SA = 'Total User Stories Attempted this round';
const SC = 'Total User Stories Completed this round';
const TC = 'Round Capacity';

type Data = {
  name: string;
  [USC]: number;
  [TC]: number;
  [SA]: number;
  [SC]?: number;
};
type Props = {
  rounds: (AppRound & {
    storiesCompleted: number | undefined;
  })[];
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
        [TC]: round.capacity.total,
        [SA]: round.capacity.available,
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
      <ComposedChart
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
        <YAxis yAxisId="right" orientation="right" />
        <YAxis
          yAxisId="left"
          orientation="left"
          unit="%"
          ticks={userStorySteps}
        />
        <Tooltip />
        <Legend layout="vertical" />
        <Bar
          yAxisId="left"
          dataKey={USC}
          fill="#e2d02f"
          unit="%"
          barSize={30}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={TC}
          strokeWidth={3}
          legendType="star"
          stroke="#0c79df"
        />
        <Line yAxisId="right" type="monotone" dataKey={SA} stroke="#cd66e7" />
        <Line yAxisId="right" type="monotone" dataKey={SC} stroke="#1be400" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
