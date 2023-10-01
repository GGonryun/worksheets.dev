import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

export const EnterDirectionally: FC<{
  children: ReactNode;
  x?: number;
  y?: number;
  delay?: number;
}> = ({ children, x = 0, y = 0, delay = 0.5 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.5,
          delay,
        },
      }}
    >
      {children}
    </motion.div>
  );
};
