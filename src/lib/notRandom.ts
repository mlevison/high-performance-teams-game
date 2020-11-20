let rolls: number[] = [];

export function addRolls(r: number[]) {
  rolls.push(...r);
}
export function reset() {
  rolls = [];
}
export function random() {
  if (!rolls.length) {
    throw new Error('Unexpected random roll');
  }
  return rolls.pop()!;
}
