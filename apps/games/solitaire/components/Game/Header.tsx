import { Home } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { printShortCountdown } from '@worksheets/util/time';
import { FC } from 'react';
import { GameDifficulty, difficultyName } from '../../util/playing-cards';

export type HeaderProps = {
  difficulty: GameDifficulty;
  score: number;
  timer: number;
  height: number;
  onHomeClick: () => void;
};

export const Header: FC<HeaderProps> = ({
  difficulty,
  score,
  timer,
  height,
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
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
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
        {/* placeholder box for styling*/}
        <Box />
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

        <Box onClick={onHomeClick} sx={{ cursor: 'pointer' }}>
          <Home {...headerButton} />
        </Box>
      </Box>
    </Box>
  );
};
