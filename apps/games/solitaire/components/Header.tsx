import { Home, Menu } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { printShortCountdown } from '@worksheets/util/time';
import { FC } from 'react';
import { GameDifficulty } from '../util/enums';
import { difficultyName } from '../util/maps';

export type HeaderProps = {
  difficulty: GameDifficulty;
  score: number;
  timer: number;
  height: number;
  onMenuClick: () => void;
  onHomeClick: () => void;
};

export const Header: FC<HeaderProps> = ({
  difficulty,
  score,
  timer,
  height,
  onMenuClick,
  onHomeClick,
}) => {
  const headerButton = {
    sx: { color: 'primary.contrastText' as const },
  };
  const headerText = {
    color: 'primary.contrastText' as const,
    variant: 'caption' as const,
  };
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: (theme) => theme.palette.grey[900],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: height,
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
        }}
      >
        <Box onClick={onHomeClick}>
          <Home {...headerButton} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography {...headerText}>{difficultyName[difficulty]}</Typography>
          <Typography {...headerText}>{printShortCountdown(timer)}</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              color={(theme) => theme.palette.grey[400]}
              variant="caption"
            >
              Score
            </Typography>
            <Typography {...headerText}>{score}</Typography>
          </Box>
        </Box>
        <Box onClick={onMenuClick}>
          <Menu {...headerButton} />
        </Box>
      </Box>
    </Box>
  );
};
