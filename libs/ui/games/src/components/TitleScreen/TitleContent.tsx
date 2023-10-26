import { FC, ReactNode } from 'react';
import {
  Button,
  Link,
  Paper,
  Typography,
  darken,
  useTheme,
} from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { animate, urls } from '../../util';

export type TitleContentProps = {
  onStart: () => void;
  onSettings: () => void;
  gameOver: boolean;
  logo: ReactNode;
  startText: string;
  color?: string;
};

export const TitleContent: FC<TitleContentProps> = ({
  onStart,
  onSettings,
  startText,
  gameOver,
  logo,
  color: colorOverride,
}) => {
  const theme = useTheme();
  const color = colorOverride || theme.palette.primary.dark;

  return (
    <Flex fill centered column>
      <motion.div {...animate(-50, 0.15)}>{logo}</motion.div>
      <motion.div {...animate(-100, 0.45)}>
        <Paper
          elevation={6}
          sx={{
            mt: 3,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Button
            disableRipple
            onClick={onStart}
            variant="contained"
            disabled={gameOver}
            sx={{
              backgroundColor: color,
              '&:hover': {
                backgroundColor: darken(color, 0.2),
              },
            }}
          >
            <Typography fontWeight={900}>
              {gameOver ? 'Game Over' : startText}
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
                <Link href={urls.charityGames.newsletter()}>Get notified</Link>{' '}
                when new puzzles are available.
              </Typography>
              <Typography variant="caption" color="text.secondary" pt={3}>
                <Link onClick={onSettings} sx={{ cursor: 'pointer' }}>
                  Start over?
                </Link>
              </Typography>
            </Flex>
          )}
        </Paper>
      </motion.div>
    </Flex>
  );
};
