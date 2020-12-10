import React, { useState } from 'react';
import { useAppState } from './state';
import { TOTAL_ROUNDS } from './constants';
import {
  Results,
  FinalResults,
  Actions,
  Round,
  Status,
  Header,
  Rules,
  Tabs,
  Tab,
  Content,
} from './components';

export default function App() {
  const [state, dispatch, closeRound, rollGremlin] = useAppState();
  const [tab, setTab] = useState<'play' | 'rules'>('rules');

  return (
    <>
      <Header>
        <Tabs>
          <Tab active={tab === 'play'} onClick={() => setTab('play')}>
            Play
          </Tab>
          <Tab active={tab === 'rules'} onClick={() => setTab('rules')}>
            Rules
          </Tab>
        </Tabs>
      </Header>
      <Content>
        <div style={{ display: tab === 'play' ? 'block' : 'none' }}>
          {state.currentRound.number > TOTAL_ROUNDS ? (
            <FinalResults state={state} dispatch={dispatch} />
          ) : (
            <Round
              key={state.currentRound.number}
              currentRound={state.currentRound}
              row1={
                <Actions
                  currentRound={state.currentRound.number}
                  availableCapacity={state.currentRound.capacity.available}
                  availableGameActions={state.availableGameActions}
                  dispatch={dispatch}
                />
              }
              row2={<Status {...state.currentRound} />}
              results={
                <Results
                  pastRounds={state.pastRounds}
                  currentRound={state.currentRound}
                  dispatch={dispatch}
                  closeRound={closeRound}
                  rollGremlin={rollGremlin}
                />
              }
            />
          )}
        </div>
        {tab === 'rules' && <Rules />}
      </Content>
    </>
  );
}
