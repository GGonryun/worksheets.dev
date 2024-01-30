import { ArrowRightAlt, KeyboardBackspace } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { BasicWebsiteStatistics } from '@worksheets/util/types';
import { FC, ReactNode } from 'react';

export const TitleSection: FC<{ statistics?: BasicWebsiteStatistics }> = ({
  statistics,
}) => (
  <Paper
    sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: (theme) => theme.palette.background['solid-blue'],
      background: (theme) => theme.palette.background['gradient-blue'],
      p: { xs: 2, sm: 4 },
      gap: 2,
      color: (theme) => theme.palette.text.arcade,
    }}
  >
    <Button
      size="small"
      variant="arcade"
      color="warning"
      href="/help"
      startIcon={<KeyboardBackspace />}
      sx={{
        width: 'fit-content',
        alignSelf: 'flex-start',
        mb: 1,
      }}
    >
      <Typography textTransform="none">Help Center</Typography>
    </Button>
    <Typography
      component="h1"
      sx={{
        typography: { xs: 'h4', sm: 'h3' },
      }}
    >
      Contribute a Game
    </Typography>
    <Typography>
      Help us build the worlds finest arcade for social good. Our platform
      provides a way for you to contribute to the causes you care about. Get
      your game out to thousands of players, build your brand, and help make a
      difference.
    </Typography>
    <Box>
      <TextPoint>{statistics?.donatedGames ?? '?'}+ Games Donated</TextPoint>
      <TextPoint>
        {statistics?.uniquePlayers ?? '?'}+ Monthly Unique Players
      </TextPoint>
      <TextPoint>
        {statistics?.totalGamePlays ?? '?'} Total Game Plays
      </TextPoint>
      <TextPoint>
        {statistics?.uniqueGames ?? '?'} Unique Games Played
      </TextPoint>
    </Box>
    <Button
      variant="arcade"
      color="secondary"
      href={`/account/submissions`}
      endIcon={<ArrowRightAlt />}
      sx={{
        width: { xs: '100%', sm: 'fit-content' },
        mt: 2,
        alignSelf: 'flex-end',
      }}
    >
      Submit a game
    </Button>
  </Paper>
);

const TextPoint: FC<{ children: ReactNode }> = ({ children }) => (
  <Typography
    component="li"
    sx={{
      typography: { xs: 'body1', sm: 'h6' },
      fontWeight: { xs: 500, sm: 500 },
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    }}
  >
    {children}
  </Typography>
);
