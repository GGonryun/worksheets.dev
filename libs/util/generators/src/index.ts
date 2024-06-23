export function eagerIterate<T>(collection: Generator<T>) {
  const items = [];
  for (const item of collection) {
    items.push(item);
  }
  return items;
}

export async function asyncEagerIterate<T>(collection: AsyncGenerator<T>) {
  const items = [];
  for await (const item of collection) {
    items.push(item);
  }
  return items;
}
