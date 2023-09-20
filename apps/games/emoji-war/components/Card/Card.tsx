import { Typography, Box } from '@mui/material';
import { Circle, ShapeColor, Flex } from '@worksheets/ui-core';
import { Icon } from '../Icon';
import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.scss';

import { CardType, cardCategory, cardIcon, cardName } from './types';
import clsx from 'clsx';

export const Card: FC<{
  type: CardType;
  color: ShapeColor;
  onClick: () => void;
  disabled?: boolean;
}> = ({ type, onClick, color, disabled }) => {
  const category = cardCategory[type];

  const animations = disabled
    ? {}
    : {
        initial: { opacity: 1, rotate: 0, scale: 1 },
        exit: { opacity: 0 },
        whileInView: { rotate: 360, opacity: 1 },
        whileTap: { scale: 0.95 },
        whileHover: {
          scale: 1.05,
        },
      };
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={styles['card-container']}
    >
      <motion.div className={styles['card']} {...animations}>
        <Box position="relative" sx={{ aspectRatio: '80/132' }}>
          <Box position="absolute" top={2} left={2} right={2}>
            <Flex spaceBetween>
              <Icon name={category} />
              <Circle size={10} color={color} />
            </Flex>
          </Box>
          <Box position="absolute" bottom={2} right={4}>
            <Typography variant="caption">{cardName[type]}</Typography>
          </Box>
          <Flex centered fill>
            <Icon name={cardIcon[type]} size={42} />
          </Flex>
          <Box
            position="absolute"
            className={clsx({ [styles['disabled-overlay']]: disabled })}
          />
        </Box>
      </motion.div>
    </div>
  );
};
