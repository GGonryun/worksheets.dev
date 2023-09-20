import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { arrayFromLength } from '@worksheets/util/arrays';
import { FC } from 'react';
import { Icon } from '../Icon';
import { motion } from 'framer-motion';

export const PlayerTag: FC<{
  emoji: string;
  hp: number;
  max: number;
  slot: number;
}> = ({ emoji, hp, slot, max }) => {
  const damage = max - Math.max(hp, 0);

  return (
    <Flex centered gap={1}>
      <Flex centered sx={{ visibility: 'visible' }}>
        {emoji}
      </Flex>

      <Typography
        px={1}
        variant="body2"
        textAlign="center"
        sx={{ backgroundColor: slot == 1 ? 'primary.light' : 'error.light' }}
        width="70px"
        overflow={'hidden'}
        textOverflow={'ellipsis'}
        whiteSpace={'nowrap'}
      >
        {slot === 1 ? 'Player' : 'Enemy'}
      </Typography>

      <Flex>
        {arrayFromLength(damage).map((i) => (
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            key={i}
          >
            <Icon name="heart-empty" />
          </motion.div>
        ))}
        {arrayFromLength(hp).map((i) => (
          <motion.div key={i}>
            <Icon name="heart-full" key={i} />
          </motion.div>
        ))}
      </Flex>
    </Flex>
  );
};
