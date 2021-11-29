type NonUndefined<A> = A extends undefined ? never : A;
type NumberKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends number ? K : never;
}[keyof T];
type ArrayKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends any[] ? K : never;
}[keyof T];

export function sumByProp<T extends object>(
  objects: T[],
  key: NumberKeys<T>,
): number {
  let sum = 0;
  objects.forEach((obj) => {
    sum += (obj as any)[key] || 0;
  });
  return sum;
}

export function concatByProp<T extends object, K extends ArrayKeys<T>>(
  objects: T[],
  key: K,
): T[K] {
  const all: any = [];
  objects.forEach((obj) => {
    all.push(...(obj[key] as any));
  });
  return all;
}
