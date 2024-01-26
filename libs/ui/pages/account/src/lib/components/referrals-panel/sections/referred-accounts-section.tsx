import { InfoOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import {
  TOKENS_PER_REFERRAL_ACCOUNT,
  TOKENS_PER_REFERRAL_PURCHASE,
} from '@worksheets/util/settings';
import { Referral } from '@worksheets/util/types';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';
import { ReferralsTable } from '../referral-table';

export const ReferredAccountsSection: React.FC<{
  referrals: Referral[];
}> = ({ referrals }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6">My Referrals</Typography>

      <ReferralsTable referrals={referrals} />

      <BulletPoints
        icon={<InfoOutlined fontSize="small" color="info" />}
        title={'How It Works'}
        points={[
          `Earn ${TOKENS_PER_REFERRAL_ACCOUNT} tokens, when someone makes an account using your referral link.`,
          <>
            Earn {TOKENS_PER_REFERRAL_PURCHASE} tokens when someone spends money
            at the <Link href="/store">Charity Store</Link> using your referral
            link.
          </>,
          `Users cannot remove their referral link once they've created an account.`,
          `Users can add a referral link to their account if they don't have one.`,
        ]}
      />

      <PanelFooter
        learn={{
          text: 'Referred Accounts',
          href: '/account/referrals#referred-accounts',
        }}
        action={{
          text: 'Friends List',
          href: '/account/friends',
        }}
      />
    </Box>
  );
};
