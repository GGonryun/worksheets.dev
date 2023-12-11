import { Box, Divider, Link, Typography, styled } from '@mui/material';
import { FC } from 'react';
import { CustomPaper } from './custom-paper';
import { CharityScreenProps } from './charity-screen';

export type StatisticsSectionProps = CharityScreenProps['statistics'];

export const StatisticsSection: FC<StatisticsSectionProps> = ({
  countries,
  games,
  players,
}) => {
  return (
    <CustomPaper sx={{ gap: 2 }}>
      <CustomBox>
        <Box>
          <Typography variant="h5" textAlign="center">
            Top Countries
          </Typography>
          <Divider sx={{ my: 1 }} />
          {countries.map(({ name, hours }, index) => (
            <Box
              key={name}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">
                {index + 1}. {name}
              </Typography>
              <Typography variant="body2">{hours} hours</Typography>
            </Box>
          ))}
        </Box>
        <Divider orientation="vertical" sx={{ visibility: 'hidden' }} />
        <Box>
          <Typography variant="h5" textAlign="center">
            Most Popular Games
          </Typography>
          <Divider sx={{ my: 1 }} />
          {games.map(({ name, id, plays }, index) => (
            <Box
              key={name}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">
                {index + 1}. <Link href={`/play/${id}`}>{name}</Link>
              </Typography>
              <Typography variant="body2">{plays} plays</Typography>
            </Box>
          ))}
        </Box>
      </CustomBox>
      <CustomBox
        sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <PlayerStatisticBox>
          <Typography variant="h6">New Players</Typography>
          <Typography variant="h1">{players.new}</Typography>
          <Typography
            variant="body2"
            maxWidth={250}
            color="text.secondary"
            px={2}
          >
            Players that played their first game during the current campaign.
          </Typography>
        </PlayerStatisticBox>
        <Divider
          orientation="vertical"
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        />
        <Divider
          orientation="horizontal"
          sx={{
            display: { xs: 'block', sm: 'none' },
          }}
        />
        <PlayerStatisticBox>
          <Typography variant="h6">Returning Players</Typography>
          <Typography variant="h1">{players.returning}</Typography>
          <Typography
            variant="body2"
            maxWidth={250}
            color="text.secondary"
            px={2}
          >
            Players that have played at least one game during the previous
            campaign.
          </Typography>
        </PlayerStatisticBox>
      </CustomBox>
    </CustomPaper>
  );
};

const CustomBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '100%',
  alignItems: 'flex-start',
  justifyContent: 'space-around',
  gap: theme.spacing(2),
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '47% 1% 47%',
  },
}));

const PlayerStatisticBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: 'column',
  minHeight: 250,
}));
