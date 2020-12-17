import { useEffect, useState } from 'react';
import { INITIAL_STATE } from 'state';
import { GameState } from 'state/game';
import versionP from './version';

const LOCAL_STATE_KEY = 'TEAM_GAME_STATE';
export const GAME_STATE_OUTDATED = Symbol('GAME_STATE_OUTDATED');
export const GAME_STATE_OK = Symbol('GAME_STATE_OK');
export type InitialStateWithStatus = {
  state: GameState;
  restored?: Date;
  status: typeof GAME_STATE_OUTDATED | typeof GAME_STATE_OK;
};

function getSearchParams() {
  return Object.fromEntries(
    window.location.search
      .replace(/^\?/, '')
      .split('&')
      .map((entry) => {
        const parts = entry.split('=');
        return [decodeURIComponent(parts[0]), decodeURIComponent(parts[1])];
      }),
  );
}

export async function getInitialState(): Promise<InitialStateWithStatus> {
  const localStateData = localStorage.getItem(LOCAL_STATE_KEY);
  const search = getSearchParams();
  const restoreData: string | undefined = search.restore;

  if (restoreData) {
    try {
      const data = JSON.parse(atob(restoreData));
      const version = await versionP;
      return {
        state: data,
        restored: new Date(parseInt(search.from, 10)),
        status:
          search.version !== version ? GAME_STATE_OUTDATED : GAME_STATE_OK,
      };
    } catch (err) {
      console.warn(err);
    }
  }

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

export function useVersion() {
  const [version, setVersion] = useState<string | null>(
    process.env.NODE_ENV === 'test' ? 'test' : null,
  );
  useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    let canceled = false;
    versionP
      .then((v) => {
        if (canceled) {
          return;
        }
        setVersion(v);
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
  }, []);

  return version;
}

export function useStateLink(state: GameState) {
  const version = useVersion();

  return `${window.location.href}?restore=${encodeURIComponent(
    btoa(JSON.stringify(state)),
  )}${
    version ? `&version=${encodeURIComponent(version)}` : ''
  }&from=${encodeURIComponent(new Date().getTime())}`;
}

export function saveToLocalStorage(state: GameState, version: string) {
  localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify({ version, state }));
}

export function usePersistState(state: GameState) {
  const version = useVersion();
  useEffect(() => {
    if (version) {
      saveToLocalStorage(state, version);
    }
  }, [state, version]);
}
