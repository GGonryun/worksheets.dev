import { InfoOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { FriendsPanels, ReferralsPanels } from '@worksheets/util/enums';
import { TOKENS_PER_REFERRAL_ACCOUNT } from '@worksheets/util/settings';
import { Referral } from '@worksheets/util/types';
import React from 'react';

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
          `Users cannot remove their referral link once they've created an account.`,
          `Users can add a referral link to their account if they don't have one.`,
        ]}
      />

      <PanelFooter
        learn={{
          text: 'Referred Accounts',
          href: routes.account.referrals.path({
            bookmark: ReferralsPanels.ReferredAccounts,
          }),
        }}
        action={{
          text: 'Friends List',
          href: routes.account.friends.path({
            bookmark: FriendsPanels.FriendsList,
          }),
        }}
      />
    </Box>
  );
};
