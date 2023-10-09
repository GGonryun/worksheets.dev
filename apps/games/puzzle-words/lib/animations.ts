import {
  UseTemporaryAnimationOptions,
  useTemporaryAnimation,
  DEFAULT_ANIMATION_SPEED,
} from '@worksheets/ui-games';
import { Variants } from 'framer-motion';

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
