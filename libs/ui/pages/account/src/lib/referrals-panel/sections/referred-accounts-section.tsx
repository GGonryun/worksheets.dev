import { AccountCircleOutlined, InfoOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ValentinesWings } from '@worksheets/icons/valentines';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { CollapsibleSection } from '../../collapsible-section';
import { TOKENS_PER_REFERRAL_ACCOUNT } from '../../const';
import { PanelFooter } from '../../panel-footer';
import { Referral } from '../../types';
import { ReferralsTable } from '../referral-table';

export const ReferredAccountsSection: React.FC<{
  referrals: Referral[];
}> = ({ referrals }) => {
  return (
    <CollapsibleSection
      text="Referred Accounts"
      description="Earn tokens whenever someone makes an account using your referral link."
      status={<AccountCircleOutlined fontSize="large" color="info" />}
      Icon={ValentinesWings}
    >
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
              Earn {TOKENS_PER_REFERRAL_ACCOUNT} tokens when someone spends
              money at the <Link href="/store">Charity Store</Link> using your
              referral link.
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
    </CollapsibleSection>
  );
};
