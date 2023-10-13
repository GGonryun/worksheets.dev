import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { InnerBox } from './InnerBox';

export type TargetWordProps = {
  text: string;
  size: number;
  onNextPuzzle: () => void;
};

export const TargetWord: FC<TargetWordProps> = ({ text, size }) => {
  return (
    <Box
      className="target-word"
      sx={{
        position: 'absolute',
        zIndex: 3,
        display: 'flex',
        gap: 1,
      }}
    >
      {text.split('').map((letter, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0,
          }}
        >
          <InnerBox size={size} active={true}>
            {letter.toUpperCase()}
          </InnerBox>
        </motion.div>
      ))}
    </Box>
  );
};
