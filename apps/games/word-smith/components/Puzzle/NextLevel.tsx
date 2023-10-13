import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import { SpeechBubble } from './SpeechBubble';

export type NextLevelBannersProps = {
  size: number;
  onNextPuzzle: () => void;
};

export const NextLevelBanners: FC<NextLevelBannersProps> = ({
  size,
  onNextPuzzle,
}) => (
  <Box
    sx={{
      position: 'absolute',
      zIndex: 5,
      left: 0,
      right: 0,
    }}
  >
    <motion.div
      style={{
        position: 'absolute',
        display: 'grid',
        left: 0,
        right: 0,
        top: -size * 1.7,
        placeItems: 'center',
      }}
      initial={{
        opacity: 0,
        scale: 0,
        y: size * 2,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
    >
      <SpeechBubble size={size} onClick={onNextPuzzle} />
    </motion.div>

    <motion.div
      style={{
        position: 'absolute',
        top: size * 1.3,
        display: 'grid',
        left: 0,
        right: 0,
        placeItems: 'center',
        zIndex: 10,
      }}
      initial={{
        opacity: 0,
        scale: 0,
        y: -size * 2,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
    >
      <Button
        color="inherit"
        variant="contained"
        sx={{
          outline: '2px solid black',
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
        endIcon={<ArrowForwardIos />}
        onClick={() => onNextPuzzle()}
      >
        <Typography fontWeight={900} fontSize={size * 0.35}>
          Next Puzzle
        </Typography>
      </Button>
    </motion.div>
  </Box>
);
