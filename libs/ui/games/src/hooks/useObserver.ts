import { useEffect, useState } from 'react';

type ObserverOptions<T> = {
  // triggered when the value changes.
  onUpdate?: (data: T) => void;
  // triggered on cache-miss.
  onIgnore?: (data: T) => void;
  // return true if the two objects are the same. and if they are the same the
  // cache will not update. by default uses a strict equality operator.
  compare?: (incoming: T, cache: T) => boolean;
};

const DEFAULT_COMPARISON = <T>(a: T, b: T) => a === b;

// a lot like use effect but comes with extra effects.
// always triggers when the data changes.
// and can fire an onIgnore callback if the data updated but the cache did not.
export const useObserver = <T>(data: T, opts: ObserverOptions<T>) => {
  const { compare, onUpdate, onIgnore } = opts;

  const [cache, setCache] = useState<T>(data);

  const predicate = compare ?? DEFAULT_COMPARISON;

  useEffect(() => {
    if (!predicate(data, cache)) {
      setCache(data);
      onUpdate?.(data);
    } else {
      onIgnore?.(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
};
