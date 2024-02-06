import { InfoOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { WonPrizeDetails } from '@worksheets/util/types';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';
import { PrizesTable } from '../tables/prizes-table';

export const PrizesSection: React.FC<{
  prizes: WonPrizeDetails[];
  onClaim: (prize: WonPrizeDetails) => void;
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
            Compete in <Link href="/raffles">raffles</Link> to win prizes. New
            winners are chosen every day.
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
          text: 'Redeem Tokens',
          href: '/prizes',
          color: 'primary',
        }}
      />
    </Box>
  );
};
