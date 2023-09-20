import { Typography } from '@mui/material';
import { ShapeColor, Spacing, Flex, Circle } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { FC } from 'react';

export const ColorPlayArea: FC<{ color: ShapeColor; count: number }> = ({
  color,
  count,
}) => {
  return (
    <Spacing bottom={2}>
      <Flex column centered>
        <Typography variant="body1" fontWeight={900}>
          Combo
        </Typography>
        <Flex gap={1}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Circle color={count > 0 ? color : 'white'} size={24} />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Circle color={count > 1 ? color : 'white'} size={24} />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Circle color={count > 2 ? color : 'white'} size={24} />
          </motion.div>
        </Flex>
      </Flex>
    </Spacing>
  );
};
