import { useEffect, useState } from 'react';
import { OverwritableConfig } from '../state';
import type { AppBaseState } from '../lib';
import { createInitialState } from './initialState';
import versionP from './version';

const LOCAL_STATE_KEY = 'TEAM_GAME_STATE';
export const GAME_STATE_OUTDATED = Symbol('GAME_STATE_OUTDATED');
export const GAME_STATE_OK = Symbol('GAME_STATE_OK');
export type InitialStateWithStatus = {
  state: AppBaseState;
  config: OverwritableConfig;
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
      const state = typeof data.state === 'object' ? data.state : data;
      const config = typeof data.config === 'object' ? data.config : {};
      return {
        state,
        config,
        restored: new Date(parseInt(search.from, 10)),
        status:
          search.version !== version ? GAME_STATE_OUTDATED : GAME_STATE_OK,
      };
    } catch (err) {
      console.warn(err);
    }
  }

  if (localStateData === null) {
    return { state: createInitialState(), config: {}, status: GAME_STATE_OK };
  }

  try {
    const localState = JSON.parse(localStateData);
    const version = await versionP;

    return {
      state: localState.state,
      config: typeof localState.config === 'object' ? localState.config : {},
      status:
        localState.version !== version ? GAME_STATE_OUTDATED : GAME_STATE_OK,
    };
  } catch (err) {
    console.warn(err);
    return { state: createInitialState(), config: {}, status: GAME_STATE_OK };
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

export function useStateLink(
  state: AppBaseState,
  from: number = new Date().getTime(),
  config: OverwritableConfig = {},
) {
  const version = useVersion();

  return `${window.location.origin}?restore=${encodeURIComponent(
    btoa(JSON.stringify({ state, config })),
  )}${
    version ? `&version=${encodeURIComponent(version)}` : ''
  }&from=${encodeURIComponent(from)}`;
}

export function saveToLocalStorage(
  state: AppBaseState,
  version: string,
  config: OverwritableConfig = {},
) {
  localStorage.setItem(
    LOCAL_STATE_KEY,
    JSON.stringify({ version, state, config }),
  );
}

export function usePersistState(state: AppBaseState) {
  const version = useVersion();
  useEffect(() => {
    if (version) {
      saveToLocalStorage(state, version);
    }
  }, [state, version]);
}
