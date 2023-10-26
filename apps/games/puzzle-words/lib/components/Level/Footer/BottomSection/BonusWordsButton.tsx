import { Box, useTheme } from '@mui/material';
import { IconButton } from '../../../IconButton';
import { Park } from '@mui/icons-material';
import { Variants, motion } from 'framer-motion';
import { FC } from 'react';
import { FooterProps } from '../Footer';
import { BonusWordsPill } from './BonusWordsPill';
import {
  useObserver,
  useTemporaryAnimation,
  DEFAULT_ANIMATION_SPEED,
  LaunchIcon,
  IconAction,
} from '@worksheets/ui-games';

export const BonusWordsButton: FC<FooterProps> = ({
  bonuses,
  openBonusWords,
}) => {
  const theme = useTheme();
  const { triggerSuccess, triggerFailure, ...anims } = useBonusIconAnimations();

  // whenever the total number of found bonus words changes, display a star.
  const foundBonusWords = Object.values(bonuses).filter((v) => v).length;

  useObserver(foundBonusWords, {
    onUpdate: () => {
      triggerSuccess();
    },
  });

  useObserver(bonuses, {
    onUpdate: () => {
      if (foundBonusWords) {
        // if a word was submitted more than once trigger a failure animation.
        triggerFailure();
      }
    },
  });

  return (
    <Box position="relative" onClick={openBonusWords}>
      <motion.div {...anims} id="bonus-words-icon">
        <IconAction Icon={Park} color={theme.palette.primary.light} />
      </motion.div>
      <LaunchIcon count={foundBonusWords}>
        <Park color="secondary" />
      </LaunchIcon>
      <BonusWordsPill count={foundBonusWords} />
    </Box>
  );
};

const useBonusIconAnimations = () => {
  const { animate: success, trigger: triggerSuccess } = useTemporaryAnimation();

  const { animate: failure, trigger: triggerFailure } = useTemporaryAnimation();

  const variants: Variants = {
    expand: {
      scale: [1, 1.2, 0.8, 1],
      transition: { duration: DEFAULT_ANIMATION_SPEED },
    },
    rumble: {
      x: [0, 3, -3, 3, -3, 3, -3, 0],
      transition: { duration: DEFAULT_ANIMATION_SPEED },
    },
    stop: {
      scale: [1],
      transition: { repeat: Infinity },
    },
  };
  return {
    variants,
    animate: success ? 'expand' : failure ? 'rumble' : 'stop',
    triggerSuccess,
    triggerFailure,
  };
};
