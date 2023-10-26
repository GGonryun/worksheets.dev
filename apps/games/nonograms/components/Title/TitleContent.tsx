import { FC } from 'react';
import { Link, Paper, Typography, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  animate,
  tabletBoxShadow,
  textShadow,
  TabletButton,
  urls,
} from '@worksheets/ui-games';
import { GAME_TITLE } from '../../util/constants';

import { CollectionsOutlined, PlayArrow } from '@mui/icons-material';

export type TitleContentProps = {
  onGallery: () => void;
  onLevels: () => void;
  gameOver: boolean;
};

export const TitleContent: FC<TitleContentProps> = ({
  onLevels,
  onGallery,
  gameOver,
}) => {
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
        <Flex column centered gap={1.5}>
          {gameOver ? (
            <GameOverPaper />
          ) : (
            <TabletButton
              onClick={onLevels}
              color="white"
              startIcon={<PlayArrow sx={{ pb: '2px' }} />}
            >
              <Typography fontWeight={900} fontSize="1.25rem">
                Select Level
              </Typography>
            </TabletButton>
          )}
          <TabletButton
            onClick={onGallery}
            color="white"
            startIcon={<CollectionsOutlined sx={{ pb: '2px' }} />}
          >
            <Typography fontWeight={900} fontSize="1rem">
              Gallery
            </Typography>
          </TabletButton>
        </Flex>
      </motion.div>
    </Flex>
  );
};

const GameOverPaper = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        boxShadow: tabletBoxShadow,
      }}
    >
      <Flex column centered p={2}>
        <Typography variant="caption" color="text.secondary" textAlign="center">
          You&apos;ve completed all the puzzles!
        </Typography>
        <Typography variant="caption" color="text.secondary" textAlign="center">
          <Link href={urls.charityGames.contact()}>Get notified</Link> when new
          puzzles are available.
        </Typography>
      </Flex>
    </Paper>
  );
};
