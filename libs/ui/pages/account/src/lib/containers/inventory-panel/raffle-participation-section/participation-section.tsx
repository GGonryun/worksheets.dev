import { InfoOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ValentinesLetter } from '@worksheets/icons/valentines';
import { contestsRoutes, helpRoutes, portalRoutes } from '@worksheets/routes';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { InventoryPanels, SettingsPanels } from '@worksheets/util/enums';
import { EnteredRaffleSchema } from '@worksheets/util/types';
import React from 'react';

import { ParticipationTable } from './participation-table';

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
          <>
            Redeem tokens for{' '}
            <Link href={contestsRoutes.raffles.url()}>Raffle Entries</Link>.
          </>,
          `Play games, refer friends, and make purchases to earn tokens.`,
          `Some items have expiration dates. You'll receive a reminder to claim them before they expire.`,
          <>
            Configure your{' '}
            <Link
              href={portalRoutes.account.url({
                bookmark: SettingsPanels.Communication,
              })}
            >
              notification settings
            </Link>{' '}
            to receive reminders about your prizes.
          </>,
        ]}
      />

      <PanelFooter
        learn={{
          text: 'Prizes',
          href: helpRoutes.prizes.url(),
        }}
        action={{
          text: 'Activation Codes',
          href: portalRoutes.account.inventory.url({
            bookmark: InventoryPanels.ActivationCodes,
          }),
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
      <Typography
        typography={{ xs: 'h6', sm: 'h5', md: 'h4' }}
        color="error"
        textAlign={'center'}
      >
        You haven't participated in any raffles yet
      </Typography>
      <Typography variant="body2">
        Redeem your tokens for Raffle Entries or Prizes.
      </Typography>
      <Typography variant="body2">
        Play games and refer friends to earn more tokens.
      </Typography>
      <Link href={helpRoutes.prizes.url()} variant="body1" color="error">
        Learn More
      </Link>
    </Box>
  );
};
