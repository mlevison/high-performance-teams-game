import { AvailabilityCheck } from './types';
import { GameActionId } from './gameActions';

/** --- AVAILABILITY --- */
export function fromRound(roundNumber: number): AvailabilityCheck {
  return (currentRound) => currentRound >= roundNumber;
}
export function unique(): AvailabilityCheck {
  return (_, finished, selected, id) =>
    ![...finished, ...selected].includes(id);
}
export function oncePerRound(): AvailabilityCheck {
  return (_, __, selected, id) => !selected.includes(id);
}
export function requires(id: GameActionId): AvailabilityCheck {
  return (_, finished) => finished.includes(id);
}
export function combine(checks: AvailabilityCheck[]): AvailabilityCheck {
  return (...args) => {
    for (let i = 0; i < checks.length; i++) {
      const check = checks[i];
      if (!check(...args)) {
        return false;
      }
    }
    return true;
  };
}

/** --- EFFECTS --- */
export function hasNoEffect() {
  return null;
}
