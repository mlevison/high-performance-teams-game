import { useMemo, useState, ReactNode } from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { GameState } from '../state';
import { AppBaseState, useStateLink } from '../lib';
import type { Results } from './index';

const results: Results = require('./results.json');
type ScoringKey = keyof typeof results.scoringConfig;
const yAxis = Object.keys(results.scoringConfig) as ScoringKey[];

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
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function ResultsApp() {
  const [showAmount, setShowAmount] = useState<number>(50);
  const [sortBy, setSortBy] = useState<ScoringKey>(yAxis[0]);

  const data = useMemo(() => {
    const showQuota = Math.round(results.data.length / (showAmount - 1));

    const sort = { ...(results.customSort[sortBy] || results.defaultSort) };
    const sortKeys = [
      sortBy,
      ...(Object.keys(sort) as (keyof typeof sort)[]).filter(
        (k) => k !== sortBy,
      ),
    ];
    sort[sortBy] = 'desc';
    const sortIndexes = sortKeys.map((key) => yAxis.indexOf(key));

    return results.data
      .map((data, id) => ({ id, data }))
      .sort((a, b) => {
        for (let i = 0; i < sortIndexes.length; i++) {
          const sortIndex = sortIndexes[i];
          const sortKey = sortKeys[i];
          const scoreA = a.data[sortIndex];
          const scoreB = b.data[sortIndex];
          if (scoreA === scoreB) {
            /* scores are same, use next key */
            continue;
          }

          return sort[sortKey] === 'desc' ? scoreA - scoreB : scoreB - scoreA;
        }
        return a.id - b.id;
      })
      .filter((_, i) => {
        const t = i / showQuota;
        return i === 0 || i === results.data.length - 1 || t === Math.floor(t);
      })
      .map(({ id, data }) => ({
        id,
        ...Object.fromEntries(
          sortKeys.map((key, i) => [
            results.scoringConfig[key].name,
            data[sortIndexes[i]],
          ]),
        ),
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
          onChange={(ev) => setSortBy(ev.target.value as ScoringKey)}
        >
          {Object.entries(results.scoringConfig).map(([key, { name }]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </label>{' '}
      <GameLink {...results.relevantSims[data[data.length - 1].id]}>
        Open Best
      </GameLink>{' '}
      <GameLink {...results.relevantSims[data[0].id]}>Open Worst</GameLink>
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
          {Object.entries(results.scoringConfig).map(([key, { name }]) => (
            <YAxis key={key} yAxisId={name} hide />
          ))}

          <Tooltip />
          <Legend layout="vertical" />
          {Object.entries(results.scoringConfig).map(
            ([key, { name, config }]) => (
              <Line
                key={key}
                dot={false}
                type="monotone"
                yAxisId={name}
                {...config}
                dataKey={name}
              />
            ),
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}
