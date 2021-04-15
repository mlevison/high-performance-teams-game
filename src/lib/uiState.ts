import type { ClosedRound, NextRoundAction } from '../state';

export type UIState<
  GameActionId extends string = string,
  GremlinId extends string = string
> = {
  review: false | number;
  view: 'welcome' | 'actions' | 'results';
  closedRound?: ClosedRound<GameActionId, GremlinId>;
};

export type SetUiReviewAction = {
  type: 'SET_UI_REVIEW_ACTION';
  payload: UIState['review'];
};
export type SetUiViewAction = {
  type: 'SET_UI_VIEW_ACTION';
  payload: UIState['view'];
};
export type SetUiClosedRoundAction<
  GameActionId extends string,
  GremlinId extends string
> = {
  type: 'SET_UI_CLOSED_ROUND_ACTION';
  payload: ClosedRound<GameActionId, GremlinId>;
};
export type UiAction<GameActionId extends string, GremlinId extends string> =
  | SetUiViewAction
  | SetUiClosedRoundAction<GameActionId, GremlinId>
  | SetUiReviewAction;

export function uiStateReducer<
  GameActionId extends string,
  GremlinId extends string
>(
  state: UIState<GameActionId, GremlinId>,
  action:
    | UiAction<GameActionId, GremlinId>
    | NextRoundAction<GameActionId, GremlinId>,
): UIState<GameActionId, GremlinId> {
  switch (action.type) {
    case 'SET_UI_VIEW_ACTION':
      return {
        ...state,
        view: action.payload,
      };
    case 'SET_UI_CLOSED_ROUND_ACTION':
      return {
        ...state,
        view: 'results',
        closedRound: action.payload,
      };
    case 'SET_UI_REVIEW_ACTION':
      return {
        ...state,
        view: 'welcome',
        review: action.payload,
      };
    case 'NEXT_ROUND':
      return {
        ...state,
        review: false,
        view: 'welcome',
        closedRound: undefined,
      };
  }
}
