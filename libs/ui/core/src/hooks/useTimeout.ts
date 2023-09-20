import React from 'react';
/**
 * @name useTimeout
 * @description a hook that allows you to run a callback function after a timeout
 * @param callback the callback function to run
 * @param delay the delay in milliseconds
 * @returns void
 */

type Callback = () => void;

export function useTimeout(callback: Callback, delay: number) {
  const timeoutRef = React.useRef<number | undefined>(undefined);
  const savedCallback = React.useRef<Callback | undefined>(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => savedCallback.current?.();
    timeoutRef.current = window.setTimeout(tick, delay);
    return clear;
  }, [delay]);

  const clear = () => {
    timeoutRef.current && window.clearTimeout(timeoutRef.current);
  };

  const restart = () => {
    clear();

    timeoutRef.current = window.setTimeout(
      () => savedCallback.current?.(),
      delay
    );
  };

  return {
    timeout: timeoutRef,
    restart,
    clear,
  };
}
