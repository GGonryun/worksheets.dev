import { InfoOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { Trophy } from '@worksheets/icons/adventure';
import { routes } from '@worksheets/routes';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { UserBattleParticipationSchema } from '@worksheets/util/types';
import React from 'react';

import { ParticipationTable } from './participation-table';

export const ParticipationSection: React.FC<{
  battles: UserBattleParticipationSchema[];
}> = ({ battles }) => {
  const complete = battles.filter((r) => r.battle.status === 'COMPLETE');
  const active = battles.filter((r) => r.battle.status === 'ACTIVE');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {active.length === 0 && complete.length === 0 && (
        <EmptyParticipationTable />
      )}

      {active.length > 0 && (
        <>
          <Typography variant="h6">Active Raffles</Typography>
          <ParticipationTable participation={active} />
        </>
      )}

      {complete.length > 0 && (
        <>
          <Typography variant="h6">Expired Raffles</Typography>
          <ParticipationTable participation={complete} />
        </>
      )}

      <BulletPoints
        icon={<InfoOutlined fontSize="small" color="info" />}
        title={'How It Works'}
        points={[
          <>
            Use tokens and combat items to participate in{' '}
            <Link href={routes.battles.path()}>boss battles</Link>.
          </>,
          `Play games, refer friends, and complete quests to earn tokens and find combat items.`,
        ]}
      />

      <PanelFooter
        learn={{
          text: 'Boss Battles',
          href: routes.help.mobs.path(),
        }}
        action={{
          text: 'Battle Now',
          href: routes.battles.path(),
          color: 'error',
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
      <Trophy
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
        You haven't participated in any battles yet
      </Typography>
      <Typography variant="body2">
        Use your tokens and combat items to participate in boss battles.
      </Typography>
      <Link href={routes.help.mobs.path()} variant="body1" color="error">
        Learn More
      </Link>
    </Box>
  );
};
