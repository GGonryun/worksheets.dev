import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Star } from '@mui/icons-material';
import { Variants, motion } from 'framer-motion';
import { FC } from 'react';
import {
  useObserver,
  useTemporaryAnimation,
  DEFAULT_ANIMATION_SPEED,
  LaunchIcon,
  bubbleInsetBoxShadow,
  IconAction,
} from '@worksheets/ui-games';
import { Flex } from '@worksheets/ui-core';
import { bonusYellow } from '../../util';

export type DiscoveriesButtonProps = {
  discoveries: Record<string, number>;
  onClick: () => void;
};

export const DiscoveriesButton: FC<DiscoveriesButtonProps> = ({
  discoveries,
  onClick,
}) => {
  const theme = useTheme();
  const { triggerSuccess, triggerFailure, ...anims } = useBonusIconAnimations();

  // whenever the total number of found discoveries words changes, display a star.
  const foundDiscoveries = Object.values(discoveries).filter((v) => v).length;

  useObserver(foundDiscoveries, {
    onUpdate: () => {
      triggerSuccess();
    },
  });

  return (
    <Box
      position="relative"
      onClick={onClick}
      sx={{
        cursor: 'pointer',
      }}
    >
      <motion.div {...anims} id="bonus-words-icon">
        <IconAction Icon={Star} />
      </motion.div>
      <LaunchIcon count={foundDiscoveries} zIndex={1000}>
        <Star fontSize="large" sx={{ color: bonusYellow }} />
      </LaunchIcon>
      <NumberPill count={foundDiscoveries} />
    </Box>
  );
};

export const NumberPill: FC<{ count: number }> = ({ count }) => {
  return (
    <Box
      sx={(theme) => ({
        position: 'absolute',
        top: -2,
        right: -2,
        height: 22,
        minWidth: 22,
        borderRadius: '50%',
        border: `3px solid ${theme.palette.primary.dark}`,
        backgroundColor: theme.palette.background.paper,
        p: 0,
        m: 0,
      })}
    >
      <Flex fill centered>
        <Typography fontSize={14}>{count > 9 ? '!' : count}</Typography>
      </Flex>
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
