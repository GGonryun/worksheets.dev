import { FC } from 'react';
import { Button, Link, Paper, Typography, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { urls } from '../../util';
import Image from 'next/image';
import { WaterDrop } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { animate, backgroundColor } from '@worksheets/ui-games';

export type TitleContentProps = {
  onDonate: () => void;
  onStart: () => void;
  onSettings: () => void;
  level: number;
  water: number;
  gameOver: boolean;
};

export const TitleContent: FC<TitleContentProps> = ({
  onDonate,
  onStart,
  onSettings,
  level,
  water,
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
            textShadow: '0 2px 2px rgba(0,0,0,0.3)',
          }}
        >
          Word Smith
        </Typography>
      </motion.div>
      <motion.div {...animate(-75, 0.3)}>
        <Flex centered pb={2} gap={1}>
          <Typography
            color={theme.palette.primary.contrastText}
            variant="caption"
          >
            A game by{' '}
            <Link href={urls.worksheets()} color="primary.contrastText">
              Worksheets.dev
            </Link>
          </Typography>
          <Image
            src="/logo.svg"
            alt={'Worksheets Logo'}
            height={24}
            width={24}
          />
        </Flex>
      </motion.div>
      <motion.div {...animate(-100, 0.45)}>
        <Paper
          elevation={6}
          sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 1 }}
        >
          <Button
            disableRipple
            onClick={onStart}
            variant="contained"
            disabled={gameOver}
            sx={{
              backgroundColor,
            }}
          >
            <Typography fontWeight={900}>
              {gameOver
                ? 'Game Over'
                : !level
                ? 'Start Game'
                : `Start Puzzle #${level}`}
            </Typography>
          </Button>
          {gameOver && (
            <Flex column centered>
              <Typography
                variant="caption"
                color="text.secondary"
                textAlign="center"
              >
                You&apos;ve completed all the puzzles!
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                textAlign="center"
              >
                <Link href={urls.subscribe()}>Get notified</Link> when new
                puzzles are available.
              </Typography>
              <Typography variant="caption" color="text.secondary" pt={3}>
                <Link onClick={onSettings} sx={{ cursor: 'pointer' }}>
                  Start over at puzzle #1?
                </Link>
              </Typography>
            </Flex>
          )}
        </Paper>
      </motion.div>
      <motion.div {...animate(-125, 0.6)}>
        <Flex gap={1} pt={4}>
          <WaterDrop sx={{ color: 'primary.contrastText' }} />

          <Typography color="primary.contrastText">
            <Link color="inherit" onClick={onDonate} sx={{ cursor: 'pointer' }}>
              Water Donated:
            </Link>{' '}
            {water} ml
          </Typography>
          <WaterDrop sx={{ color: 'primary.contrastText' }} />
        </Flex>
      </motion.div>
    </Flex>
  );
};
