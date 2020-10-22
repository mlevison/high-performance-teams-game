type NonUndefined<A> = A extends undefined ? never : A;
type NumberKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends number ? K : never;
}[keyof T];

export function sumByProp<T extends object>(
  objects: T[],
  key: NumberKeys<T>,
): number {
  let sum = 0;
  objects.forEach((obj) => {
    sum += (obj as any)[key];
  });
  return sum;
}
