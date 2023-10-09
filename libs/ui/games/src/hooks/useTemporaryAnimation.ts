import { useState, useEffect } from 'react';
import { DEFAULT_ANIMATION_TIMEOUT } from '../util';

export type UseTemporaryAnimationOptions = {
  timeout: number; // in milliseconds
};

export const useTemporaryAnimation = (opts?: UseTemporaryAnimationOptions) => {
  const [animate, setAnimate] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  useEffect(() => {
    if (trigger) {
      setAnimate(true);

      setTimeoutId(
        setTimeout(() => {
          setAnimate(false);
          setTrigger(false);
          setTimeoutId(undefined);
        }, opts?.timeout ?? DEFAULT_ANIMATION_TIMEOUT)
      );
    }

    return () => timeoutId && clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return {
    animate,
    trigger: () => {
      setTrigger(true);
    },
  };
};
