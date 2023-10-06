import { drawLine } from '@worksheets/util-shapes';
import { AnimatePresence, Point, Variants, motion } from 'framer-motion';
import { FC } from 'react';

export const SelectionLine: FC<{
  size: number;
  from: Point | null;
  to: Point | null;
  matching?: boolean;
}> = ({ size, from, to, matching }) => {
  const data = drawLine(from, to, {
    thickness: size,
    padding: size,
    radius: size,
  });

  const variants: Variants = {
    rumble: {
      x: [0, 3, -3, 3, -3, 3, 0],
      transition: { duration: 0.3 },
    },
    stop: {
      x: [0],
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {from && to && (
        <motion.div
          exit={matching ? 'stop' : 'rumble'}
          variants={variants}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              ...data,
              opacity: 0.25,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
