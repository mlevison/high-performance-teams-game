import React, { useReducer } from 'react';
import { storySucceeds } from './lib';

type GameAction = {
  effect: number;
  cost: number;
};

type RoundState = {
  selectedGameActions: GameAction[];
  round: number;
  capacity: number;
  actionCostThisRound: number;
  /* TODO don't love the name - really  stories that could still be completed this round */
  // storiesCompletedThisRound: number;
  storiesCompleted: number;
};
const INITIAL_STATE: RoundState = {
  selectedGameActions: [],
  round: 1,
  capacity: 10,
  actionCostThisRound: 0,
  // storiesCompletedThisRound: 0,
  storiesCompleted: 0
};
const RESULTS_ROUND = 7;

type NextRoundAction = { type: 'NEXT_ROUND' };
type AddGameActionAction = { type: 'ADD_GAME_ACTION', payload: GameAction };
type Action = NextRoundAction | AddGameActionAction;

function sumUpEffects(gameActions: GameAction[]): number {
  let totalEffects = 0;

  gameActions.forEach(({ effect }) => {
    totalEffects += effect;
  });

  return totalEffects;
}

function sumUpCosts(gameActions: GameAction[]): number {
  let totalCosts = 0;

  gameActions.forEach(({ cost }) => {
    totalCosts += cost;
  });

  return totalCosts;
}

export default function App() {
  const [state, dispatch] = useReducer(
    (state: RoundState, action: Action) => {
      switch (action.type) {
        case "ADD_GAME_ACTION":
          return {
            ...state,
            selectedGameActions: [
              ...state.selectedGameActions,
              action.payload
            ]
          };
        case 'NEXT_ROUND':
          return {
            ...state,
            actionCostThisRound: sumUpCosts(state.selectedGameActions),
            // storiesCompletedThisRound: capacity - state.actionCostThisRound,
            capacity: state.capacity + sumUpEffects(state.selectedGameActions),

            selectedGameActions: [],
            round: state.round + 1,
            storiesCompleted:
              state.storiesCompleted +
              Array(10).fill('').filter(storySucceeds).length,
          };
      }
    },
    INITIAL_STATE,
  );
  // I don't understand this declaration its like magic.
  const { round, storiesCompleted, capacity, actionCostThisRound } = state;

  return (
    <>
      <h1>High-Performance Team Game </h1>
      {round === RESULTS_ROUND ? (
        <>
          <h2>Results</h2>
          <p>Completed {storiesCompleted} user stories</p>
        </>
      ) : (
        <>
        <p>Round: {round - 1} results</p>
         <p>Action Cost: {actionCostThisRound} </p>
          <button onClick={() => dispatch({
            type: 'ADD_GAME_ACTION',
            payload: {
              effect: 1,
              cost: 2 // TODO - want to use this cost to display on the button
            }
          })}>BuildServer Cost</button>
          <p>Capacity: {capacity}</p>
          <h2>Round {round} of 6</h2>
          <button onClick={() => dispatch({ type: 'NEXT_ROUND' })}>Complete Round</button>
        </>
      )}
    </>
  );
}

