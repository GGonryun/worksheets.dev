import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-types
export function useTimeout(callback: any, delay: any) {
  const timeoutRef = React.useRef<any>(null);
  const savedCallback = React.useRef<any>(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(tick, delay);
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);
  return timeoutRef;
}
