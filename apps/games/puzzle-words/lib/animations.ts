import { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

export const DEFAULT_ANIMATION_TIMEOUT = 1000; // milliseconds
export const DEFAULT_ANIMATION_SPEED = 0.3; // seconds

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

export const useRumble = (opts?: UseTemporaryAnimationOptions) => {
  const { animate, trigger } = useTemporaryAnimation(opts);

  const variants: Variants = {
    rumble: {
      x: [0, 3, -3, 3, -3, 3, -3, 0],
      transition: { duration: DEFAULT_ANIMATION_SPEED },
    },
    stop: {
      x: [0],
      transition: { repeat: Infinity },
    },
  };

  return {
    variants,
    animate: animate ? 'rumble' : 'stop',
    trigger,
  };
};

export const useBounce = (opts?: UseTemporaryAnimationOptions) => {
  const { animate, trigger } = useTemporaryAnimation(opts);
  const variants: Variants = {
    bounce: {
      y: [0, 3, -3, 3, -3, 3, -3, 0],
      transition: { duration: DEFAULT_ANIMATION_SPEED },
    },
    stop: {
      y: [0],
      transition: { repeat: Infinity },
    },
  };
  return {
    variants,
    animate: animate ? 'bounce' : 'stop',
    trigger,
  };
};
