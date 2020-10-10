(global as any).__HPTG = {};

export default function expose<T extends any>(key: string, thing: T) {
  (global as any).__HPTG[key] = thing;
}
