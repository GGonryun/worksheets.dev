import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

export const EnterDirectionally: FC<{
  children: ReactNode;
  x?: number;
  y?: number;
  delay?: number;
  fullWidth?: boolean;
}> = ({ children, x = 0, y = 0, delay = 0.5, fullWidth }) => {
  const style = fullWidth ? { width: '100%' } : {};
  return (
    <motion.div
      style={style}
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
