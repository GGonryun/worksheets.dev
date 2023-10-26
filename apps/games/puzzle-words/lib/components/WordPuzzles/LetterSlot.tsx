import { Typography, lighten } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { motion } from 'framer-motion';

export const LetterSlot: FC<{
  letter: string;
  discovered: number;
  unlocked: boolean;
}> = ({ letter, discovered, unlocked }) => {
  return (
    <Flex
      width={25}
      height={25}
      centered
      sx={(theme) => ({
        border: `1px solid black`,
        borderRadius: '4px',
        backgroundColor: discovered
          ? lighten(theme.palette.secondary.dark, 0.4)
          : unlocked
          ? lighten(theme.palette.info.main, 0.4)
          : 'white',
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
          <Typography fontSize={24}>{letter}</Typography>
        </motion.div>
      ) : (
        <></>
      )}
    </Flex>
  );
};
