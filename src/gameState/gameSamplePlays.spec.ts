// If I eliminate all imports Typescript gets angry this is odd
import { GameAction } from './types';

type Round = {
  // TODO Didn't really want to use GameActions - I just didn't have the energy
  selectedGameActions: GameAction[];
  round: number;
};

const INTIAL_ROUND: Round = {
  selectedGameActions: [],
  round: 0
}

type Game = {
  rounds: Round[];
  currentRound : number;
  currentCapacity : number;
  // Vastly less important than capacity
  totalStoriesCompleted : number;
}

const INITIAL_GAME: Game = {
  rounds: [],
  currentRound: 1,
  currentCapacity: 10,
  totalStoriesCompleted: 0,
};

function completeSprint(game : Game): Game {
  let newCapacity = game.currentCapacity - 1;
  let nextRound = game.currentRound + 1
  return { ...game, currentCapacity: newCapacity, currentRound: nextRound };
}

// TODO Object Oriented Mark would normally make round a class to encapsulate the math and the data
function roundActionCost(round: Round): number {
  let totalCosts = 0;

  round.selectedGameActions.forEach(({ cost }) => {
    totalCosts += cost;
  });

  return totalCosts;
}

describe('GameSamplePlays', () => {
  describe('Demonstrate Drag Effect if the team make no engineering improvement', () => {
    it('no Enginerring Improvement', () => {
      /* TDOD ideally if understood the functional style these would const or perhaps chained */
      let gameExample = INITIAL_GAME;
      // Ideally Stated as a precondition
      expect(gameExample.currentRound).toEqual(1);

      gameExample = completeSprint(gameExample);
      expect(gameExample.currentRound).toEqual(2);
      expect(gameExample.currentCapacity).toEqual(9);

      gameExample = completeSprint(gameExample);
      expect(gameExample.currentRound).toEqual(3);
      expect(gameExample.currentCapacity).toEqual(8)

     gameExample = completeSprint(gameExample);
     expect(gameExample.currentRound).toEqual(4);
     expect(gameExample.currentCapacity).toEqual(7);
    });

    it('Adding a BuildServer eliminates Drag Effect and has no positive effect on capacity', () => {
      let oneRoundOneAction = INTIAL_ROUND;
      // TODO Really this should be typed as buildServer and then we could detect that in completeSprint and
      oneRoundOneAction.selectedGameActions[0] = { effect: 0, cost: 1}
      let gameExample = INITIAL_GAME;
      gameExample.rounds[0] =  oneRoundOneAction;

      expect(roundActionCost(gameExample.rounds[0])).toEqual(1);

      gameExample = completeSprint(gameExample);
      expect(gameExample.currentRound).toEqual(2);
      // Capacity unchanged because we eliminate the drag effect
      expect(gameExample.currentCapacity).toEqual(10);

      gameExample = completeSprint(completeSprint(gameExample));

      expect(gameExample.currentRound).toEqual(4);
      // Capacity still **unchanged**
      expect(gameExample.currentCapacity).toEqual(10);
    });
  });
});
