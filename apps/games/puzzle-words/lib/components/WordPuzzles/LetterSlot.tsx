import { Typography, lighten } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { thinBorder } from '../../layouts';
import { motion } from 'framer-motion';

export const LetterSlot: FC<{
  letter: string;
  discovered: number;
  unlocked: boolean;
}> = ({ letter, discovered, unlocked }) => {
  return (
    <Flex
      width={26}
      height={26}
      centered
      sx={(theme) => ({
        border: thinBorder(theme),
        borderRadius: '4px',
        backgroundColor: discovered
          ? lighten(theme.palette.primary.main, 0.4)
          : unlocked
          ? lighten(theme.palette.secondary.main, 0.4)
          : 'transparent',
      })}
    >
      {discovered || unlocked ? (
        <motion.div
          initial={{
            opacity: 0,
            translateY: 100,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <Typography fontSize={20}>{letter}</Typography>
        </motion.div>
      ) : (
        <></>
      )}
    </Flex>
  );
};
