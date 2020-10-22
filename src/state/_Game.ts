import { CoreAction, PracticeType, TechnicalDebtDrag } from './CoreAction';

export class Round {
  readonly _selectedGameActions: Set<CoreAction>;
  readonly _round: number;
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
export class Game {
  readonly _roundList: Round[];
  _currentRound: number;
  _currentCapacity: number;
  // Vastly less important than capacity
  _totalStoriesCompleted: number;

  constructor() {
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

    this._roundList.push(new Round(this._currentRound));
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
