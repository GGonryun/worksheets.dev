import { HowToVote, InfoOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ValentinesLetter } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { SettingsPanels } from '@worksheets/util/enums';
import { EnteredRaffleSchema } from '@worksheets/util/types';
import React from 'react';

import { CollapsibleSection } from '../../../components';
import { ParticipationTable } from './participation-table';

export const RaffleParticipationSection: React.FC<{
  active: SettingsPanels | undefined;
  onClick: (id: string) => void;
  raffles: EnteredRaffleSchema[];
}> = ({ raffles, active: activeTag, onClick }) => {
  const expired = raffles.filter((r) => r.expiresAt < Date.now());
  const active = raffles.filter((r) => r.expiresAt >= Date.now());

  // soonest expiring active raffles first
  active.sort((a, b) => a.expiresAt - b.expiresAt);
  // then most recently expired raffles first
  expired.sort((a, b) => b.expiresAt - a.expiresAt);

  return (
    <CollapsibleSection
      id={SettingsPanels.RaffleParticipation}
      text="Raffle Participation"
      description="See a list of raffles that you've participated in."
      active={activeTag}
      onClick={onClick}
      status={<HowToVote fontSize="large" color="info" />}
      Icon={ValentinesLetter}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {active.length === 0 && expired.length === 0 && (
          <EmptyRaffleParticipationTable />
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
            `Play games for more chances to win.`,
            `Some items have expiration dates. You'll receive a reminder to claim them before they expire.`,
            <>
              Configure your{' '}
              <Link
                href={routes.account.path({
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
            href: routes.help.prizes.path(),
          }}
          action={{
            text: 'Activation Codes',
            href: routes.account.path({
              bookmark: SettingsPanels.ActivationCodes,
            }),
            color: 'success',
          }}
        />
      </Box>
    </CollapsibleSection>
  );
};

const EmptyRaffleParticipationTable = () => {
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
        Play games and refer friends for more chances to win.
      </Typography>
      <Link href={routes.help.prizes.path()} variant="body1" color="error">
        Learn More
      </Link>
    </Box>
  );
};
