import { useRef, useEffect } from 'react';

export type UseIntervalOptions = {
  immediate?: boolean;
  waitFor?: number;
};
/**
 * @name useInterval
 * @description a hook that allows you to run a callback function on an interval
 * @param callback the callback function to run
 * @param delay the delay in milliseconds
 * @returns void
 */
export function useInterval(
  callback: () => void,
  delay: number,
  disable?: boolean
) {
  const savedCallback = useRef<() => void | undefined>();
  // Remember the latest callback.
  useEffect(
    function () {
      savedCallback.current = callback;
    },
    [callback]
  );

  // Execute callback if immediate is set.

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      const callback = savedCallback?.current;
      if (disable || !callback) return;

      callback();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return function () {
        return clearInterval(id);
      };
    }
  }, [delay, disable]);
}
