import { FC } from 'react';
import { Link, Paper, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  animate,
  tabletBoxShadow,
  TabletButton,
  urls,
} from '@worksheets/ui-games';

import { CollectionsOutlined, PlayArrow } from '@mui/icons-material';
import { assets } from '../../util/assets';

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
  return (
    <Flex fill centered column gap={2}>
      <motion.div {...animate(-50, 0.15)}>
        <Image
          priority
          src={assets.logo}
          alt={'Nonograms Logo'}
          height={52}
          width={300}
        />
      </motion.div>
      <motion.div {...animate(-100, 0.45)}>
        <Flex column centered gap={1.5}>
          {gameOver ? (
            <GameOverPaper />
          ) : (
            <TabletButton
              onClick={onLevels}
              color="primary"
              startIcon={<PlayArrow sx={{ pb: '2px' }} />}
            >
              <Typography fontWeight={900} fontSize="1.25rem">
                Select Level
              </Typography>
            </TabletButton>
          )}
          <TabletButton
            onClick={onGallery}
            color="primary"
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
