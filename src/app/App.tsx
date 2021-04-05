import React, { useMemo, useState } from 'react';
import type { GameState, GameConfig, Effect } from '../state';
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
import {
  createInitialState,
  GAME_STATE_OK,
  InitialStateWithStatus,
  restartGame,
  useVersion,
  saveToLocalStorage,
  sumByProp,
  useAppState,
} from '../lib';

type Props = { initialState: GameState; config: GameConfig };
export function App(props: Props) {
  const [state, closeRound, rollGremlin, link, dispatch] = useAppState(
    props.config,
    props.initialState,
  );
  const {
    rounds: [firstRound],
  } = props.config;
  const interactiveRounds = props.config.rounds.length;
  const totalRounds = interactiveRounds + props.config.trailingRounds;
  const [initialCapacity, initialUserStoryChance] = useMemo(() => {
    const initialEffects = ([] as Effect[]).concat(
      (!firstRound.effect ? null : firstRound.effect([], 1)) || [],
    );

    return [
      sumByProp(initialEffects, 'capacityChange'),
      sumByProp(initialEffects, 'userStoryChange'),
    ];
  }, [firstRound]);
  const [tab, setTab] = useState<'play' | 'rules' | 'log'>(
    props.initialState.log.length === 0 ? 'rules' : 'play',
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
          state.currentRound.number > totalRounds ? (
            <FinalResults state={state} dispatch={dispatch} link={link} />
          ) : (
            <Round
              ui={state.ui}
              key={state.currentRound.number}
              currentRound={state.currentRound}
              totalRounds={totalRounds}
              welcome={
                <Welcome
                  review={state.ui.review}
                  dispatch={dispatch}
                  totalRounds={totalRounds}
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
                      ? 'Begin Development'
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
                      <Status
                        {...state.currentRound}
                        startCapacity={initialCapacity}
                      />
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
                  initialUserStoryChance={initialUserStoryChance}
                  totalRounds={totalRounds}
                  interactiveRounds={interactiveRounds}
                />
              }
            />
          )}
        </div>
        {tab === 'rules' && <Rules />}
        {tab === 'log' && (
          <Log
            state={state}
            config={props.config}
            totalRounds={totalRounds}
            link={link}
          />
        )}
      </Content>
    </Container>
  );
}

export default function OutdatedStateWarning(props: {
  initialState: InitialStateWithStatus;
  config: GameConfig<any, any>;
}) {
  const version = useVersion();
  const [initialState, setInitialState] = useState(props.initialState);
  if (!version) {
    return null;
  }

  if (initialState.restored) {
    return (
      <>
        <Header>
          <br />
        </Header>
        <Content style={{ textAlign: 'center' }}>
          <br />
          <h2>Do you want to load the game encoded in the link?</h2>
          <p>This will overwrite any currently running game</p>
          {initialState.status !== GAME_STATE_OK ? (
            <p>
              ⚠️ The saved game to be restored might not work as expected
              because the game has been updated since then
            </p>
          ) : null}
          <Button
            onClick={() => {
              window.location.href = window.location.href.split('?')[0];
            }}
          >
            Continue to my previous game
          </Button>
          <Button
            onClick={() => {
              saveToLocalStorage(initialState.state, version);
              window.location.href = window.location.href.split('?')[0];
            }}
            primary
          >
            Restore Game from {initialState.restored.toLocaleString()}
          </Button>
        </Content>
      </>
    );
  }

  if (initialState.status === GAME_STATE_OK) {
    return <App initialState={initialState.state} config={props.config} />;
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
            setInitialState({
              state: createInitialState(),
              status: GAME_STATE_OK,
            })
          }
          primary
        >
          Restart Game
        </Button>
      </Content>
    </>
  );
}
