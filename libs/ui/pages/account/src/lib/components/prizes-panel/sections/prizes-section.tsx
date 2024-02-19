import { InfoOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/ui/routes';
import { WonRaffleDetails } from '@worksheets/util/types';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';
import { PrizesTable } from '../tables/prizes-table';

export const PrizesSection: React.FC<{
  prizes: WonRaffleDetails[];
  onClaim: (prize: WonRaffleDetails) => void;
}> = ({ prizes, onClaim }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6">My Prizes</Typography>

      <PrizesTable prizes={prizes} onClaim={onClaim} />

      <BulletPoints
        icon={<InfoOutlined fontSize="small" color="info" />}
        title={'How It Works'}
        points={[
          `Play games, refer friends, and make purchases to earn tokens.`,
          <>
            Compete in <Link href={routes.raffles.path()}>raffles</Link> to win
            prizes. New winners are chosen every day.
          </>,
          `If you win a prize, you'll have 72 hours to claim it. If you don't, it will expire.`,
          <>
            Configure your{' '}
            <Link href={routes.account.path()}>notification settings</Link> to
            receive reminders about your prizes.
          </>,
        ]}
      />

      <PanelFooter
        learn={{
          text: 'Prizes',
          href: routes.help.prizes.path(),
        }}
        action={{
          text: 'Redeem Tokens',
          href: routes.prizes.path(),
          color: 'primary',
        }}
      />
    </Box>
  );
};
