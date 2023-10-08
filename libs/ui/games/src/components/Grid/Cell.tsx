import { MotionStyle, motion } from 'framer-motion';
import { FC, MouseEventHandler, ReactNode } from 'react';
import { ViewportEventHandler } from '../../util';

export const Cell: FC<{
  children: ReactNode;
  onViewportEnter?: ViewportEventHandler;
  style?: MotionStyle;
  onClick?: MouseEventHandler<HTMLDivElement>;
}> = ({ children, onViewportEnter, style, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      onViewportEnter={onViewportEnter}
      style={{
        aspectRatio: '1/1',
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};
