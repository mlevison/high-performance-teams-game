import { useEffect } from 'react';
import { INITIAL_STATE } from 'state';
import { GameState } from 'state/game';
import versionP from './version';

const LOCAL_STATE_KEY = 'TEAM_GAME_STATE';
export const GAME_STATE_OUTDATED = Symbol('GAME_STATE_OUTDATED');
export const GAME_STATE_OK = Symbol('GAME_STATE_OK');
export type InitialStateWithStatus = {
  state: GameState;
  status: typeof GAME_STATE_OUTDATED | typeof GAME_STATE_OK;
};

export async function getInitialState(): Promise<InitialStateWithStatus> {
  const localStateData = localStorage.getItem(LOCAL_STATE_KEY);

  if (localStateData === null) {
    return { state: INITIAL_STATE, status: GAME_STATE_OK };
  }

  try {
    const localState = JSON.parse(localStateData);
    const version = await versionP;
    return {
      state: localState.state,
      status:
        localState.version !== version ? GAME_STATE_OUTDATED : GAME_STATE_OK,
    };
  } catch (err) {
    console.warn(err);
    return { state: INITIAL_STATE, status: GAME_STATE_OK };
  }
}

export function usePersistState(state: GameState) {
  useEffect(() => {
    let canceled = false;
    versionP
      .then((version) => {
        if (canceled) {
          return;
        }
        localStorage.setItem(
          LOCAL_STATE_KEY,
          JSON.stringify({ version, state }),
        );
      })
      .catch((err) => {
        if (canceled) {
          return;
        }
        console.warn(err);
      });

    return () => {
      canceled = true;
    };
  }, [state]);
}
