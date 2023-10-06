import { PanHandlers, motion } from 'framer-motion';
import { FC } from 'react';

export const TouchLayer: FC<{
  disabled: boolean;
  onPanStart: PanHandlers['onPanStart'];
  onPan: PanHandlers['onPan'];
  onPanEnd: PanHandlers['onPanEnd'];
}> = ({ disabled, onPanStart, onPan, onPanEnd }) => {
  return (
    <motion.div
      onPanStart={disabled ? undefined : onPanStart}
      onPan={disabled ? undefined : onPan}
      onPanEnd={disabled ? undefined : onPanEnd}
      style={{
        position: 'absolute',
        opacity: 0.33,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
      }}
    />
  );
};
