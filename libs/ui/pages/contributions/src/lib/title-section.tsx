import { KeyboardBackspace } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { CharityBallot } from '@worksheets/icons/charity';
import { BasicWebsiteStatistics } from '@worksheets/util/types';
import { FC } from 'react';

import { IconBox } from './icon-box';
import { RoundedButton } from './rounded-button';
import { TitleText } from './title-text';

export const TitleSection: FC<{ statistics?: BasicWebsiteStatistics }> = ({
  statistics,
}) => (
  <Paper
    sx={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 4,
      p: { xs: 2, sm: 4 },
      gap: 2,
    }}
  >
    <Button
      size="small"
      href="/help"
      startIcon={<KeyboardBackspace />}
      sx={{
        width: 'fit-content',
        alignSelf: 'flex-start',
        mb: 2,
      }}
    >
      <Typography textTransform="none">Help Center</Typography>
    </Button>
    <IconBox>
      <CharityBallot sx={{ fontSize: '4rem', mt: -2 }} />
      <TitleText variant="h1">Contribute a game</TitleText>
    </IconBox>
    <Typography>
      Help us build the worlds finest arcade for social good. Our platform
      provides a way for you to contribute to the causes you care about. Get
      your game out to thousands of players, build your brand, and help make a
      difference.
    </Typography>
    <Box>
      <Typography variant="h6">
        {statistics?.donatedGames ?? '?'}+ Games Donated
      </Typography>
      <Typography variant="h6">
        {statistics?.uniquePlayers ?? '?'}+ Monthly Unique Players
      </Typography>
      <Typography variant="h6">
        {statistics?.totalGamePlays ?? '?'} Total Game Plays
      </Typography>
      <Typography variant="h6">
        {statistics?.uniqueGames ?? '?'} Unique Games Played
      </Typography>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width={{ xs: '100%', sm: 'fit-content' }}
      gap={2}
    >
      <RoundedButton
        variant="contained"
        color="error"
        href={`/account/submissions`}
      >
        Submit a game
      </RoundedButton>
    </Box>
  </Paper>
);
