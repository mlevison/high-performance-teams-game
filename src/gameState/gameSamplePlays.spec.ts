// If I eliminate all imports Typescript gets angry this is odd
import { GameAction } from './types';

enum PracticeType {
  EngineeringPractice,
  CommunicationPractice,
  NoSpecificType,
}
class CoreAction {
  readonly _createdRound: number;
  constructor(createdRound: number) {
    this._createdRound = createdRound;
  }

  // TODO how do JavaScript programmers force methods to be overridden?
  getCost() {
    return 0;
  }
  getEffect(currentRound: number) {
    return 0;
  }

  actionName(): String {
    return '';
  }

  actionDescription(): String {
    return '';
  }

  practiceType(): PracticeType {
    return PracticeType.NoSpecificType;
  }
}

// TODO How to indicate this is intended to be a baseclass and never instatiated except for test
class EngineeringAction extends CoreAction {
  practiceType(): PracticeType {
    return PracticeType.EngineeringPractice;
  }
}
class BuilderServerAction extends EngineeringAction {
  getCost() {
    return 2;
  }

  actionName(): String {
    return 'Build Server';
  }

  actionDescription(): String {
    return 'Setup Build Server and Continuous Integration. This is required to make future engineering improvements';
  }
}

class TeamMembersOnSameFloor extends CoreAction {
  getCost() {
    return 3;
  }
  getEffect(currentRound: number) {
    if (currentRound - this._createdRound < 5) {
      return 1;
    }
    return 0;
  }

  actionName(): String {
    return 'Team Members On SameFloor';
  }

  actionDescription(): String {
    return "Getting Team Members on the same floor reduces the cost of communication as they don't have to go far to ask questions";
  }
}

class TechnicalDebtDrag extends CoreAction {
  // TODO I'm really bugged that I can't find a way to disable the action without resorting to a variable
  _effect: number;
  constructor() {
    super(1);
    this._effect = -1;
  }

  getEffect(currentRound: number) {
    return this._effect;
  }

  disable() {
    this._effect = 0;
  }
}

class Round {
  _selectedGameActions: Set<CoreAction>;
  _round: number;
  constructor(round: number) {
    this._round = round;
    this._selectedGameActions = new Set<CoreAction>();
  }

  roundActionCost(): number {
    let totalCosts = 0;

    this._selectedGameActions.forEach(
      (gameAction) => (totalCosts += gameAction.getCost()),
    );

    return totalCosts;
  }

  culmlativeEffectsForCurrentRound(currentRound: number): number {
    let totalEffect = 0;

    this._selectedGameActions.forEach(
      (gameAction) => (totalEffect += gameAction.getEffect(currentRound)),
    );

    return totalEffect;
  }

  addCoreAction(coreAction: CoreAction) {
    if (coreAction.practiceType() === PracticeType.EngineeringPractice) {
      this._selectedGameActions.forEach((existingAction) =>
        existingAction instanceof TechnicalDebtDrag
          ? existingAction.disable()
          : null,
      );
    }
    this._selectedGameActions.add(coreAction);
  }
}

class Game {
  _roundList: Round[];
  _currentRound: number;
  _currentCapacity: number;
  // Vastly less important than capacity
  _totalStoriesCompleted: number;

  constructor() {
    // TODO ugghh plural to indicate array
    this._roundList = [new Round(1)];
    this._roundList[0].addCoreAction(new TechnicalDebtDrag());
    this._currentRound = 1;
    this._currentCapacity = 10;
    this._totalStoriesCompleted = 0;
  }

  completeSprint() {
    let capacityChange = 0;
    for (const round of this._roundList) {
      capacityChange += round.culmlativeEffectsForCurrentRound(
        this._currentRound,
      );
    }

    this._currentCapacity += capacityChange;
    this._currentRound++;
  }

  addCoreAction(coreAction: CoreAction) {
    // -1 as arrays are 0 based and Sprints start 1
    this._roundList[this._currentRound - 1].addCoreAction(coreAction);
  }

  currentRoundCost(): number {
    // -1 as arrays are 0 based and Sprints start 1
    return this._roundList[this._currentRound - 1].roundActionCost();
  }

  getCurrentRound(): number {
    return this._currentRound;
  }

  getCurrentCapacity(): number {
    return this._currentCapacity;
  }
}

describe('GameSamplePlays', () => {
  describe('Demonstrate Drag Effect if the team make no engineering improvement', () => {
    it('no Enginerring Improvement', () => {
      /* TDOD ideally if understood the functional style these would const or perhaps chained - therefore:
      - Should completedSprint() and addCoreAction() return gameExample to allow chaining?
      */
      let gameExample = new Game();
      // Ideally Stated as a precondition
      expect(gameExample.getCurrentRound()).toEqual(1);

      gameExample.completeSprint();
      expect(gameExample.getCurrentRound()).toEqual(2);
      expect(gameExample.getCurrentCapacity()).toEqual(9);

      gameExample.completeSprint();
      expect(gameExample.getCurrentRound()).toEqual(3);
      expect(gameExample.getCurrentCapacity()).toEqual(8);

      gameExample.completeSprint();
      expect(gameExample.getCurrentRound()).toEqual(4);
      expect(gameExample.getCurrentCapacity()).toEqual(7);
    });

    it('Adding a BuildServer eliminates Drag Effect and has no positive effect on capacity', () => {
      let gameExample = new Game();
      gameExample.addCoreAction(new BuilderServerAction(1));

      expect(gameExample.currentRoundCost()).toEqual(2);

      gameExample.completeSprint();
      expect(gameExample.getCurrentRound()).toEqual(2);
      // Capacity unchanged because we eliminate the drag effect
      expect(gameExample.getCurrentCapacity()).toEqual(10);

      gameExample.completeSprint();
      gameExample.completeSprint();

      expect(gameExample.getCurrentRound()).toEqual(4);
      // Capacity still **unchanged**
      expect(gameExample.getCurrentCapacity()).toEqual(10);
    });
  });

  describe('Team members on the same floor improve communication', () => {
    it('Prove that the action takes effect over many rounds', () => {
      let gameExample = new Game();
      gameExample.addCoreAction(new TeamMembersOnSameFloor(1));

      // Note FakeEngineering action added to eliminate drag effect without having another effect. This just used to ensure we test only the action that matters.
      gameExample.addCoreAction(new EngineeringAction(1));

      expect(gameExample.currentRoundCost()).toEqual(3);

      // Effect we're looking for: 1 Capacity, per round, for 5 rounds, accounting for face to face time
      gameExample.completeSprint();
      expect(gameExample.getCurrentRound()).toEqual(2);
      // Capacity improved by one each round
      expect(gameExample.getCurrentCapacity()).toEqual(11);
      gameExample.completeSprint();
      expect(gameExample.getCurrentCapacity()).toEqual(12);
      gameExample.completeSprint();
      expect(gameExample.getCurrentCapacity()).toEqual(13);
      gameExample.completeSprint();
      expect(gameExample.getCurrentCapacity()).toEqual(14);
      gameExample.completeSprint();
      expect(gameExample.getCurrentCapacity()).toEqual(15);
    });
  });

  describe('Round 2 Actions', () => {
    it('Social Time only Avialble in Round 2', () => {
      // Should we test for this explicitly or simply enforce by convention --- only make
    });
    it('Unit Testing Only Avialble if the BuildServer was implemented', () => {
      //
    });
  });
});
