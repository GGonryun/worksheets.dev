import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { ViewportEventHandler } from '../util';

export const Item: FC<{
  children: ReactNode;
  onViewportEnter: ViewportEventHandler;
}> = ({ children, onViewportEnter }) => {
  return (
    <motion.div
      onViewportEnter={onViewportEnter}
      style={{
        aspectRatio: '1/1',
        display: 'flex',
        flexGrow: 1,
        // border: '1px solid black',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </motion.div>
  );
};
