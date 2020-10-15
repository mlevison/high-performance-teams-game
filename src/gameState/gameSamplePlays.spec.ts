// If I eliminate all imports Typescript gets angry this is odd
import { GameAction } from './types';

class CoreAction {
  // TODO how do JavaScript programmers force methods to be overridden?
  getCost() { return 0 };
  getEffect() { return 0};
}

class BuilderServerAction extends CoreAction {
  getCost() { return 2 };
}

class TeamMembersOnSameFloor extends CoreAction {
  getCost() { return 3 };
}

type Round = {
  selectedGameActions: CoreAction[];
  round: number;
};

const INTIAL_ROUND: Round = {
  // TODO Array or Set
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

  for (const gameAction of round.selectedGameActions) {
    totalCosts += gameAction.getCost();
  };

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
      oneRoundOneAction.selectedGameActions[0] = new BuilderServerAction();
      let gameExample = INITIAL_GAME;
      gameExample.rounds[0] =  oneRoundOneAction;

      expect(roundActionCost(gameExample.rounds[0])).toEqual(2);

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

  describe('Team members on the same floor improve communication', () => {
    it('Prove that the action takes effect over many rounds', () => {
      let oneRoundOneAction = INTIAL_ROUND;
      // TODO Really this should be typed as TeamMembersOnSameFloor and then we could detect that in completeSprint and
      oneRoundOneAction.selectedGameActions[0] = new TeamMembersOnSameFloor();
      let gameExample = INITIAL_GAME;
      gameExample.rounds[0] =  oneRoundOneAction;

      expect(roundActionCost(gameExample.rounds[0])).toEqual(3);

      // Effect we're looking for: 1 Capacity, per round, for 5 rounds, accounting for face to face time
      gameExample = completeSprint(gameExample);
      expect(gameExample.currentRound).toEqual(2);
      // Capacity improved by one each round
      expect(gameExample.currentCapacity).toEqual(11);
      gameExample = completeSprint(gameExample);
      expect(gameExample.currentCapacity).toEqual(12);
      gameExample = completeSprint(gameExample);
      expect(gameExample.currentCapacity).toEqual(13);
      gameExample = completeSprint(gameExample);
      expect(gameExample.currentCapacity).toEqual(14);
      gameExample = completeSprint(gameExample);
      expect(gameExample.currentCapacity).toEqual(15);
    });
  });

  describe('Round 2 Actions', () => {
    it('Social Time only Avialble in Round 2', ()=>{
      // Should we test for this explicitly or simply enforce by convention --- only make

    });
    it('Unit Testing Only Avialble if the BuildServer was implemented', ()=>{

    });
  });
});
