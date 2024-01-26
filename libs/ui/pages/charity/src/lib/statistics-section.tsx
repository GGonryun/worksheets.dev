import { Box, Divider, Link, styled, Typography } from '@mui/material';
import { GamePopularityStatistics } from '@worksheets/util/types';
import { FC } from 'react';

import { CustomPaper } from './custom-paper';

export type StatisticsSectionProps = GamePopularityStatistics;

export const StatisticsSection: FC<Partial<GamePopularityStatistics>> = ({
  countries,
  games,
  players,
}) => {
  return (
    <CustomPaper sx={{ gap: 2 }}>
      <CustomBox>
        <Box>
          <Typography variant="h5" textAlign="center" color="text.arcade">
            Top Countries
          </Typography>
          <Divider sx={{ my: 1 }} />
          {countries?.map(({ name, percent }, index) => (
            <Box
              key={name}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" color="text.arcade">
                {index + 1}. {name}
              </Typography>
              <Typography variant="body2" color="text.arcade">
                {percent}%
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider orientation="vertical" sx={{ visibility: 'hidden' }} />
        <Box>
          <Typography variant="h5" textAlign="center" color="text.arcade">
            Most Popular Games
          </Typography>
          <Divider sx={{ my: 1 }} />
          {games?.map(({ name, id, plays }, index) => (
            <Box
              key={name}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" color="text.arcade">
                {index + 1}.{' '}
                <Link color="text.arcade" href={`/play/${id}`}>
                  {name}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.arcade">
                {plays} plays
              </Typography>
            </Box>
          ))}
        </Box>
      </CustomBox>
      <CustomBox
        sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <PlayerStatisticBox>
          <Typography variant="h6" color="text.arcade">
            New Players
          </Typography>
          <Typography variant="h1" color="text.arcade">
            {players?.new ?? '??'}
          </Typography>
          <Typography variant="body2" maxWidth={250} color="text.arcade" px={2}>
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
          <Typography variant="h6" color="text.arcade">
            Returning Players
          </Typography>
          <Typography variant="h1" color="text.arcade">
            {players?.returning ?? '??'}
          </Typography>
          <Typography variant="body2" maxWidth={250} color="text.arcade" px={2}>
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
