import { InfoOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ValentinesLetter } from '@worksheets/icons/valentines';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { PrizesPanels } from '@worksheets/util/enums';
import { EnteredRaffleSchema } from '@worksheets/util/types';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';
import { ParticipationTable } from '../tables/participation-table';

export const ParticipationSection: React.FC<{
  raffles: EnteredRaffleSchema[];
}> = ({ raffles }) => {
  const expired = raffles.filter((r) => r.expiresAt < Date.now());
  const active = raffles.filter((r) => r.expiresAt >= Date.now());

  // soonest expiring active raffles first
  active.sort((a, b) => a.expiresAt - b.expiresAt);
  // then most recently expired raffles first
  expired.sort((a, b) => b.expiresAt - a.expiresAt);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {active.length === 0 && expired.length === 0 && (
        <EmptyParticipationTable />
      )}

      {active.length > 0 && (
        <>
          <Typography variant="h6">Active Raffles</Typography>
          <ParticipationTable raffles={active} />
        </>
      )}

      {expired.length > 0 && (
        <>
          <Typography variant="h6">Expired Raffles</Typography>
          <ParticipationTable raffles={expired} />
        </>
      )}

      <BulletPoints
        icon={<InfoOutlined fontSize="small" color="info" />}
        title={'How It Works'}
        points={[
          `Play games, refer friends, and make purchases to earn tokens.`,
          <>
            Redeem tokens for Raffle Tickets and Prizes from the{' '}
            <Link href="/prizes">Prize Wall</Link>.
          </>,
          `If you win a prize, you'll have 72 hours to claim it. If you don't, it will expire.`,
          <>
            Configure your <Link href="/account">notification settings</Link> to
            receive reminders about your prizes.
          </>,
        ]}
      />

      <PanelFooter
        learn={{
          text: 'Prizes',
          href: '/help/prize-wall',
        }}
        action={{
          text: 'My Prizes',
          href: `/account/prizes#${PrizesPanels.Prizes}`,
          color: 'success',
        }}
      />
    </Box>
  );
};

const EmptyParticipationTable = () => {
  const isMobile = useMediaQueryDown('sm');
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        flexDirection: 'column',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        padding: 3,
        gap: 2,
      }}
    >
      <ValentinesLetter
        sx={{
          height: isMobile ? 100 : 150,
          width: isMobile ? 100 : 150,
          py: 2,
        }}
      />
      <Typography typography={{ xs: 'h6', sm: 'h5', md: 'h4' }} color="error">
        You haven't participated in any raffles yet
      </Typography>
      <Typography variant="body2">
        Redeem your tokens for Raffle Tickets or Prizes.
      </Typography>
      <Typography variant="body2">
        Play games and refer friends to earn more tokens.
      </Typography>
      <Link href="/help/prize-wall" variant="body1" color="error">
        Learn More
      </Link>
    </Box>
  );
};
