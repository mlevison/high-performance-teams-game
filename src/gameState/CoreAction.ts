export enum PracticeType {
  EngineeringPractice,
  CommunicationPractice,
  NoSpecificType,
}

export class CoreAction {
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
export class EngineeringAction extends CoreAction {
  practiceType(): PracticeType {
    return PracticeType.EngineeringPractice;
  }
}
export class BuilderServerAction extends EngineeringAction {
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

export class TeamMembersOnSameFloor extends CoreAction {
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

export class TechnicalDebtDrag extends CoreAction {
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
