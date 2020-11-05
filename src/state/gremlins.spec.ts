import { renderHook, act, HookResult } from '@testing-library/react-hooks';
import { GameActionId } from './gameActions/gameActions';
import { GremlinId } from './gremlins';
import useAppState, { AppState } from './useAppState';

/* disable game effect to only tests gremlin effects */
jest.mock('./effects/effects', () => ({
  gameEffectList: [],
}));

describe('Gremlins', () => {
  // describe('emergency on another team', () => {
  //   it('reduces capacity for 3 rounds', () => {
  //   })
  // })
});
