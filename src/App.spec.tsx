import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { App } from './App';
import {
  AppState,
  useAppState,
  UNIQUE_ACTION,
  ClosedRound,
  INITIAL_STATE,
} from './state';
import { GameActionId } from './config';

jest.mock('./state');
jest.mock('recharts');

const BASE_STATE: AppState = {
  ui: {
    review: false,
    view: 'welcome',
  },
  availableGameActions: [],
  currentRound: {
    selectedGameActions: [],
    number: 1,
    gremlinChance: 0,
    userStoryChance: 30,
    capacity: {
      available: 10,
      total: 10,
    },
    activeEffects: [],
  },
  link: 'https://example.org',
  pastRounds: [],
  log: [],
};

function renderApp(initialState: AppState) {
  const dispatch = jest.fn();
  const closeRound = jest.fn();
  const rollGremlin = jest.fn();

  (useAppState as jest.Mock).mockReturnValue([
    initialState,
    dispatch,
    closeRound,
    rollGremlin,
  ]);

  const { rerender } = render(<App initialState={INITIAL_STATE} />);

  return {
    dispatch,
    closeRound,
    rollGremlin,
    rerender: (newState: AppState) => {
      (useAppState as jest.Mock).mockReturnValue([
        newState,
        dispatch,
        closeRound,
        rollGremlin,
      ]);
      rerender(<App initialState={INITIAL_STATE} />);
    },
  };
}

describe('App UI', () => {
  it('displays current round', () => {
    renderApp({
      ...BASE_STATE,
      currentRound: {
        ...BASE_STATE.currentRound,
        number: 3,
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /play/i }));

    expect(
      screen.getByRole('heading', { name: /Round 3 of/i }),
    ).toBeInTheDocument();
  });

  it('has buttons to move between round views and to next round', () => {
    const { dispatch, closeRound, rerender } = renderApp({
      ...BASE_STATE,
      ui: { review: false, view: 'actions' },
    });

    fireEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(screen.getByText(/Round 1 of/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Begin Development/i }));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_UI_VIEW_ACTION',
      payload: 'results',
    });

    rerender({
      ...BASE_STATE,
      ui: { review: false, view: 'results' },
    });
    expect(screen.getByText(/Round 1 of/)).toBeInTheDocument();
    expect(screen.getByText(/working capacity/)).toBeInTheDocument();

    const closedRound: ClosedRound = {
      gremlin: null,
      selectedGameActionIds: [],
      storiesCompleted: 5,
    };
    closeRound.mockReturnValue(closedRound);
    fireEvent.click(screen.getByRole('button', { name: /Roll/i }));
    let lastDispatch = dispatch.mock.calls[dispatch.mock.calls.length - 1];
    expect(lastDispatch[0].type).toBe('SET_UI_CLOSED_ROUND_ACTION');

    rerender({
      ...BASE_STATE,
      ui: {
        review: false,
        view: 'results',
        closedRound: lastDispatch[0].payload,
      },
    });
    expect(screen.getByText(/10 user stories attempted/)).toBeInTheDocument();
    expect(screen.getByText(/5 user stories completed/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Next Round/i }));
    lastDispatch = dispatch.mock.calls[dispatch.mock.calls.length - 1];

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(lastDispatch[0]).toEqual({
      type: 'NEXT_ROUND',
      payload: { closedRound, gremlin: undefined },
    });
  });

  it('can select actions in round 1', () => {
    const { dispatch } = renderApp({
      ...BASE_STATE,
      ui: {
        review: false,
        view: 'actions',
      },
      availableGameActions: [
        {
          status: { type: 'AVAILABLE', times: UNIQUE_ACTION, dependencies: [] },
          gameAction: {
            id: 'MY_ACTION_ID' as GameActionId,
            icon: '👋',
            round: 1,
            name: 'My Action',
            effect: () => null,
            description: '',
            cost: 2,
          },
        },
      ],
    });

    fireEvent.click(screen.getByRole('button', { name: /play/i }));
    fireEvent.doubleClick(screen.getByRole('button', { name: /My Action/i }));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SELECT_GAME_ACTION',
      payload: 'MY_ACTION_ID',
    });
  });

  it('can not select an action when not enough capacity is available', () => {
    const { dispatch } = renderApp({
      ...BASE_STATE,
      ui: {
        review: false,
        view: 'actions',
      },
      currentRound: {
        ...BASE_STATE.currentRound,
        capacity: {
          available: 2,
          total: 10,
        },
      },
      availableGameActions: [
        {
          status: {
            type: 'AVAILABLE',
            times: UNIQUE_ACTION,
            dependencies: [],
          },
          gameAction: {
            id: 'BUILD_SERVER',
            icon: '',
            round: 1,
            name: 'My Action',
            effect: () => null,
            description: '',
            cost: 3,
          },
        },
      ],
    });

    fireEvent.click(screen.getByRole('button', { name: /play/i }));
    fireEvent.doubleClick(screen.getByRole('button', { name: /My Action/i }));

    expect(dispatch).not.toHaveBeenCalled();
  });
});
