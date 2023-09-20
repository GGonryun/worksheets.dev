import { Typography, Box } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { toPercentage } from '@worksheets/util/numbers';
import {
  printCountdownDuration,
  durationFromSeconds,
} from '@worksheets/util/time';
import { motion } from 'framer-motion';
import { FC } from 'react';
import styles from './Card.module.scss';
import { Icon } from '../Icon';

export const PlaceholderCard: FC<{ timer: number; max: number }> = ({
  timer,
  max,
}) => {
  const initial = { opacity: 0, translateY: 100 };
  const active = { opacity: 1, translateY: 0 };
  const ignored = { scale: [1, 1.05, 1], transition: { duration: 0.25 } };

  return (
    <div className={styles['card-container']}>
      <motion.div
        className={styles['card']}
        initial={initial}
        animate={active}
        exit={initial}
        whileTap={ignored}
      >
        <Box position="relative" sx={{ aspectRatio: '80/132' }}>
          <Box position="absolute" bottom={2} right={4}>
            <Typography variant="caption">
              {printCountdownDuration(durationFromSeconds(timer))}
            </Typography>
          </Box>
          <Flex centered fill>
            <Icon name="clock" size={42} />
          </Flex>
          <Box
            position="absolute"
            className={styles['loading-overlay']}
            top={toPercentage(max - timer, max)}
          />
        </Box>
      </motion.div>
    </div>
  );
};
