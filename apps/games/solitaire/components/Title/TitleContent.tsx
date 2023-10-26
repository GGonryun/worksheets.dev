import { FC } from 'react';
import { Typography, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { TabletButton, animate, textShadow } from '@worksheets/ui-games';
import { GAME_TITLE } from '../../util/constants';

import { PlayArrow } from '@mui/icons-material';

export type TitleContentProps = {
  onStart: () => void;
};

export const TitleContent: FC<TitleContentProps> = ({ onStart }) => {
  const theme = useTheme();

  return (
    <Flex fill centered column>
      <motion.div {...animate(-50, 0.15)}>
        <Typography
          color={theme.palette.primary.contrastText}
          fontWeight={900}
          variant="h3"
          sx={{
            textShadow: textShadow(3, 0.5),
          }}
        >
          {GAME_TITLE}
        </Typography>
      </motion.div>
      <motion.div {...animate(-100, 0.45)}>
        <TabletButton
          onClick={onStart}
          color="white"
          startIcon={<PlayArrow sx={{ pb: '2px' }} />}
        >
          <Typography fontWeight={900} fontSize="1.25rem">
            Start Game
          </Typography>
        </TabletButton>
      </motion.div>
    </Flex>
  );
};
