import { ArrowRightAlt, KeyboardBackspace } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { shorthandNumber } from '@worksheets/util/numbers';
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
      href={routes.help.path()}
      startIcon={<KeyboardBackspace />}
      sx={{
        width: 'fit-content',
        alignSelf: 'flex-start',
        mb: 1,
      }}
    >
      Help Center
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
      <TextPoint>
        {shorthandNumber(statistics?.uniqueGames ?? 0)}+ Games Donated
      </TextPoint>
      <TextPoint>
        {shorthandNumber(statistics?.uniquePlayers ?? 0)}+ Monthly Unique
        Players
      </TextPoint>
      <TextPoint>
        {shorthandNumber(statistics?.totalGamePlays ?? 0)}+ Total Game Plays
      </TextPoint>
      <TextPoint>
        {shorthandNumber(statistics?.tokensAccumulated ?? 0)}+ Tokens
        Accumulated
      </TextPoint>
      <TextPoint>
        {shorthandNumber(statistics?.rafflesParticipated ?? 0)}+ Raffle Entries
      </TextPoint>
      <TextPoint>
        {shorthandNumber(statistics?.prizesDelivered ?? 0)}+ Prizes Distributed
      </TextPoint>
    </Box>
    <Button
      variant="arcade"
      color="secondary"
      href={routes.account.submissions.path()}
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
