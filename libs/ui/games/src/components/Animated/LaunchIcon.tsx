import { FC, ReactNode } from 'react';
import { Variants, motion } from 'framer-motion';
import { useObserver, useTemporaryAnimation } from '../../hooks';
import { DEFAULT_ANIMATION_SPEED } from '../../util';

export const LaunchIcon: FC<{
  count: number;
  children: ReactNode;
  zIndex?: number;
}> = ({ count, children, zIndex = 0 }) => {
  const { trigger, variants, animate } = useLaunch();

  useObserver(count, {
    onUpdate: () => {
      trigger();
    },
  });

  return (
    <motion.div
      variants={variants}
      animate={animate}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: zIndex,
      }}
      id="star-icon"
    >
      {children}
    </motion.div>
  );
};

const useLaunch = () => {
  const { animate, trigger } = useTemporaryAnimation();

  const variants: Variants = {
    launch: {
      y: [0, -30, -50],
      scale: [1, 1.25, 1.5],
      opacity: [0, 1, 0],
      transition: { duration: DEFAULT_ANIMATION_SPEED * 2 },
    },
    stop: {
      y: [0],
      opacity: [0],
      transition: { duration: Infinity },
    },
  };
  return {
    variants,
    animate: animate ? 'launch' : 'stop',
    trigger,
  };
};
