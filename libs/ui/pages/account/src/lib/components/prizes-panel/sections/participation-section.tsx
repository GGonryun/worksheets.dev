import { InfoOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { PrizesPanels } from '@worksheets/util/enums';
import { BasicPrizeDetails } from '@worksheets/util/types';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';
import { ParticipationTable } from '../tables/participation-table';

export const ParticipationSection: React.FC<{
  prizes: BasicPrizeDetails[];
}> = ({ prizes }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6">Participation</Typography>

      <ParticipationTable prizes={prizes} />

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
