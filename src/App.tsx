import React, { useState } from 'react';
import { useAppState, GameState, INITIAL_STATE } from './state';
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
  Button,
  Welcome,
  Rows,
  Container,
  Row,
  Log,
} from './components';
import { GAME_STATE_OK, InitialStateWithStatus, restartGame } from 'lib';

type Props = { initialState: GameState };
export function App(props: Props) {
  const [state, dispatch, closeRound, rollGremlin] = useAppState(
    props.initialState,
  );
  const [tab, setTab] = useState<'play' | 'rules' | 'log'>(
    props.initialState === INITIAL_STATE ? 'rules' : 'play',
  );

  return (
    <Container
      review={state.ui.review !== false}
      onClose={() => dispatch({ type: 'SET_UI_REVIEW_ACTION', payload: false })}
    >
      <Header>
        <Tabs>
          <Tab
            active={false}
            onClick={restartGame(dispatch)}
            style={{ maxWidth: '2rem' }}
            title="Restart Game"
          >
            ↩
          </Tab>
          <Tab active={tab === 'play'} onClick={() => setTab('play')}>
            Play
          </Tab>
          <Tab active={tab === 'rules'} onClick={() => setTab('rules')}>
            Rules
          </Tab>
          <Tab active={tab === 'log'} onClick={() => setTab('log')}>
            Log
          </Tab>
        </Tabs>
      </Header>
      <Content>
        <div style={{ display: tab === 'play' ? 'block' : 'none' }}>
          {state.ui.review === false &&
          state.currentRound.number > TOTAL_ROUNDS ? (
            <FinalResults state={state} dispatch={dispatch} />
          ) : (
            <Round
              ui={state.ui}
              key={state.currentRound.number}
              currentRound={state.currentRound}
              welcome={
                <Welcome
                  review={state.ui.review}
                  dispatch={dispatch}
                  gremlin={state.currentRound.gremlin}
                >
                  {state.currentRound.description}
                </Welcome>
              }
              actions={
                <>
                  <Button
                    onClick={() =>
                      dispatch({
                        type: 'SET_UI_VIEW_ACTION',
                        payload: 'welcome',
                      })
                    }
                  >
                    ◀ Back
                  </Button>
                  <Button
                    primary
                    onClick={() =>
                      dispatch({
                        type: 'SET_UI_VIEW_ACTION',
                        payload: 'results',
                      })
                    }
                  >
                    {state.ui.review === false
                      ? 'Complete Round'
                      : 'Show User Stories'}
                  </Button>
                  {state.currentRound.gremlin && (
                    <p>
                      ⚠️ Gremlin just happened:&nbsp;
                      <strong>{state.currentRound.gremlin.name}</strong>
                    </p>
                  )}
                  <Rows>
                    <Row>
                      <Actions
                        ui={state.ui}
                        currentRound={state.currentRound.number}
                        availableCapacity={
                          state.currentRound.capacity.available
                        }
                        availableGameActions={state.availableGameActions}
                        dispatch={dispatch}
                      />
                    </Row>
                    <Row>
                      <Status {...state.currentRound} />
                    </Row>
                  </Rows>
                </>
              }
              results={
                <Results
                  ui={state.ui}
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
        {tab === 'log' && <Log state={state} />}
      </Content>
    </Container>
  );
}

export default function OutdatedStateWarning(props: {
  initialState: InitialStateWithStatus;
}) {
  const [initialState, setInitialState] = useState(props.initialState);
  if (initialState.status === GAME_STATE_OK) {
    return <App initialState={initialState.state} />;
  }

  return (
    <>
      <Header>
        <br />
      </Header>
      <Content style={{ textAlign: 'center' }}>
        <br />
        <h2>The game has been updated.</h2>
        <h4>Your currently saved game might not work as expected</h4>
        <Button
          onClick={() =>
            setInitialState({
              state: initialState.state,
              status: GAME_STATE_OK,
            })
          }
        >
          Continue anyways
        </Button>
        <Button
          onClick={() =>
            setInitialState({ state: INITIAL_STATE, status: GAME_STATE_OK })
          }
          primary
        >
          Restart Game
        </Button>
      </Content>
    </>
  );
}
