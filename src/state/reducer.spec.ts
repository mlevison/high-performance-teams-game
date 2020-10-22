// import reducer from './reducer';
// import { INITIAL_STATE } from './initialState';
// import { GameAction } from './types';

// describe('GameState reducer', () => {
//   describe('adding a game action', () => {
//     it('stores selected game actions in state', () => {
//       const someGameAction: GameAction = { effect: 1, cost: 1 };
//       const nextState = reducer(INITIAL_STATE, {
//         type: 'ROUND_ADD_GAME_ACTION',
//         payload: someGameAction,
//       });

//       expect(nextState.selectedGameActions).toHaveLength(1);
//       expect(nextState.selectedGameActions[0]).toBe(someGameAction);
//     });
//   });

//   describe('moving to next round', () => {
//     it('sums up effects of selected game actions and resets them', () => {
//       const stateWithSelectedGameActions = {
//         ...INITIAL_STATE,
//         capacity: 10,
//         selectedGameActions: [
//           { effect: 1, cost: 1 },
//           { effect: 3, cost: 1 },
//         ],
//       };
//       const nextState = reducer(stateWithSelectedGameActions, {
//         type: 'NEXT_ROUND',
//       });

//       expect(nextState.capacity).toBe(14);
//     });

//     it('resets selected game actions', () => {
//       const stateWithSelectedGameAction = {
//         ...INITIAL_STATE,
//         selectedGameActions: [{ effect: 1, cost: 1 }],
//       };
//       const nextState = reducer(stateWithSelectedGameAction, {
//         type: 'NEXT_ROUND',
//       });

//       expect(nextState.selectedGameActions).toEqual([]);
//     });
//   });
// });
