import React, { useMemo, useState, ReactNode } from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineProps,
} from 'recharts';
import { GameState } from '../state';
import { AppBaseState, useStateLink } from '../lib';
import type { Results } from './index';

const results: Results = require('./results.json');

const TOTAL_CAPACITY = 'Total capacity';
const FINAL_GREMLIN_CHANCE = 'Final gremlin chance';
const FINAL_USER_STORY_CHANCE = 'Final chance of completing user stories';
const SELECTED_ACTIONS = 'Actions selected throughout game';
const OCURRED_GREMLINS = 'Gremlins ocurred throughout game';
const STORIES_ATTEMPTED = 'Total user stories attempted';
const STORIES_COMPLETED = 'Total user stories completed';
const COMBINED_SCORE = 'Combined Score';

type ScoreKey =
  | typeof TOTAL_CAPACITY
  | typeof FINAL_GREMLIN_CHANCE
  | typeof FINAL_USER_STORY_CHANCE
  | typeof SELECTED_ACTIONS
  | typeof OCURRED_GREMLINS
  | typeof STORIES_ATTEMPTED
  | typeof STORIES_COMPLETED
  | typeof COMBINED_SCORE;
const SCOREKEY_MAP: ScoreKey[] = [
  TOTAL_CAPACITY,
  FINAL_GREMLIN_CHANCE,
  FINAL_USER_STORY_CHANCE,
  SELECTED_ACTIONS,
  OCURRED_GREMLINS,
  STORIES_ATTEMPTED,
  STORIES_COMPLETED,
  COMBINED_SCORE,
];
const OPTIONS: { [K in ScoreKey]: Partial<LineProps> } = {
  [TOTAL_CAPACITY]: {
    yAxisId: 'capacity',
    stroke: '#0c79df',
  },
  [FINAL_GREMLIN_CHANCE]: {
    yAxisId: 'chances',
    stroke: '#df2c0c',
    unit: '%',
  },
  [FINAL_USER_STORY_CHANCE]: {
    yAxisId: 'chances',
    stroke: '#e2d02f',
    unit: '%',
  },
  [SELECTED_ACTIONS]: {
    yAxisId: 'actons',
    stroke: '#0cdfc3',
  },
  [OCURRED_GREMLINS]: {
    yAxisId: 'gremlins',
    stroke: '#df8b0c',
  },
  [STORIES_ATTEMPTED]: {
    yAxisId: 'stories',
    stroke: '#cd66e7',
  },
  [STORIES_COMPLETED]: {
    yAxisId: 'stories',
    stroke: '#1be400',
  },
  [COMBINED_SCORE]: {
    yAxisId: 'combinedScore',
    stroke: '#7600e4',
  },
};
const yAxis = Array.from(
  new Set(Object.values(OPTIONS).map(({ yAxisId }) => yAxisId)),
);

function GameLink({
  state,
  finished,
  children,
}: {
  state: GameState;
  finished: number;
  children: ReactNode;
}) {
  const baseState = useMemo<AppBaseState>(
    () => ({ ...state, ui: { view: 'actions', review: 0 } }),
    [state],
  );
  const href = useStateLink(baseState, finished, results.simulateConfig);
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function ResultsApp() {
  const [showAmount, setShowAmount] = useState<number>(50);
  const [sortBy, setSortBy] = useState<ScoreKey>(STORIES_COMPLETED);

  const data = useMemo(() => {
    const showQuota = Math.round(results.data.length / (showAmount - 1));
    const sortIndex = SCOREKEY_MAP.indexOf(sortBy);
    return results.data
      .map((data, id) => ({ id, data }))
      .sort((a, b) => {
        const sort = a.data[sortIndex] - b.data[sortIndex];
        const scombinedScoreSort = a.data[7] - b.data[7];
        switch (true) {
          case sort !== 0:
            return sort;
          case scombinedScoreSort !== 0:
            return scombinedScoreSort;
          default:
            return a.id - b.id;
        }
      })
      .filter((_, i) => {
        const t = i / showQuota;
        return i === 0 || i === results.data.length - 1 || t === Math.floor(t);
      })
      .map(({ id, data }) => ({
        id,
        [TOTAL_CAPACITY]: data[0],
        [FINAL_GREMLIN_CHANCE]: data[1],
        [FINAL_USER_STORY_CHANCE]: data[2],
        [SELECTED_ACTIONS]: data[3],
        [OCURRED_GREMLINS]: data[4],
        [STORIES_ATTEMPTED]: data[5],
        [STORIES_COMPLETED]: data[6],
        [COMBINED_SCORE]: data[7],
      }));
  }, [showAmount, sortBy]);

  return (
    <>
      <h1>Results</h1>
      <label>
        Show Data-Points:
        <select
          value={showAmount}
          onChange={(ev) => setShowAmount(parseInt(ev.target.value, 10))}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
        </select>
      </label>{' '}
      <label>
        Sort By:
        <select
          value={sortBy}
          onChange={(ev) => setSortBy(ev.target.value as ScoreKey)}
        >
          {SCOREKEY_MAP.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </label>{' '}
      <GameLink {...results.relevantSims[data[data.length - 1].id]}>
        Open Top Game
      </GameLink>{' '}
      <GameLink {...results.relevantSims[data[0].id]}>Open Flop Game</GameLink>
      <ResponsiveContainer height={600} width="100%">
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
          <XAxis dataKey="id" />
          {yAxis.map((id) => (
            <YAxis key={id} yAxisId={id} hide />
          ))}

          <Tooltip />
          <Legend layout="vertical" />
          {SCOREKEY_MAP.map((key) => (
            <Line
              key={key}
              dot={false}
              type="monotone"
              {...OPTIONS[key]}
              dataKey={key}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}
