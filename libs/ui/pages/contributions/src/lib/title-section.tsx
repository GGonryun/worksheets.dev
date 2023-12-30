import { CharityBallot } from '@worksheets/ui/icons';
import { TitleText } from './title-text';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { RoundedButton } from './rounded-button';
import { styled } from '@mui/material/styles';
import urls from '@worksheets/util/urls';
import { FC } from 'react';
import { BasicWebsiteStatistics } from '@worksheets/util/types';

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
        href={urls.forms.submission}
        target="_blank"
      >
        Submit a game
      </RoundedButton>
    </Box>
  </Paper>
);

const IconBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
}));
