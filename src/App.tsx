import React, { useState } from 'react';
import { useAppState } from './state';
import { TOTAL_ROUNDS } from './constants';
import {
  Results,
  Actions,
  Round,
  Status,
  Header,
  Rules,
  Tabs,
  Tab,
} from './components';

export default function App() {
  const [state, dispatch] = useAppState();
  const [tab, setTab] = useState<'play' | 'rules'>('play');

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
      {tab === 'play' && (
        <>
          {state.currentRound.number > TOTAL_ROUNDS ? (
            <Results storiesCompleted={state.result.storiesCompleted} />
          ) : (
            <>
              {state.pastRounds.length !== 0 && (
                <>
                  <h2>Round: {state.pastRounds.slice(-1)[0].number} results</h2>
                  {/* <p>Action Cost: {pastRound.costs}</p>
              <p>
                Stories Completed: {pastRound.storiesCompleted}/
                {pastRound.storiesAttempted}
              </p> */}
                </>
              )}
              <Round
                key={state.currentRound.number}
                dispatch={dispatch}
                currentRound={state.currentRound}
                row1={
                  <Actions
                    availableGameActions={state.availableGameActions}
                    dispatch={dispatch}
                  />
                }
                row2={<Status {...state.currentRound} />}
              />
            </>
          )}
        </>
      )}
      {tab === 'rules' && <Rules />}
    </>
  );
}
