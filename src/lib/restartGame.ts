import { GameDispatch } from './useAppState';

export function restartGame(dispatch: GameDispatch) {
  return () => {
    if (
      window.confirm(
        'Do you really want to start a new Game? You can not come back to this one afterwards.',
      )
    ) {
      dispatch({ type: 'RESTART_GAME' });
    }
  };
}
