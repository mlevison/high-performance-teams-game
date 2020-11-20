import React, { useState, useRef } from 'react';
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
  Content,
} from './components';

export default function App() {
  const [state, dispatch, closeRound] = useAppState();
  const [tab, setTab] = useState<'play' | 'rules'>('rules');
  const overlayRef = useRef<HTMLDivElement | null>(null);

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
        {tab === 'play' && (
          <>
            {state.currentRound.number > TOTAL_ROUNDS ? (
              <Results storiesCompleted={state.result.storiesCompleted} />
            ) : (
              <Round
                key={state.currentRound.number}
                dispatch={dispatch}
                currentRound={state.currentRound}
                closeRound={closeRound}
                overlayRef={overlayRef}
                row1={
                  <Actions
                    overlay={overlayRef}
                    currentRound={state.currentRound.number}
                    availableGameActions={state.availableGameActions}
                    dispatch={dispatch}
                  />
                }
                row2={<Status {...state.currentRound} />}
              />
            )}
          </>
        )}
        {tab === 'rules' && <Rules />}
      </Content>
    </>
  );
}
