import { InfoOutlined } from '@mui/icons-material';
import { Box, Divider, Link } from '@mui/material';
import { routes } from '@worksheets/routes';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { TOKENS_PER_REFERRAL_ACCOUNT } from '@worksheets/util/types';
import React from 'react';

import { ReferralInfo } from '../../../components';

export const ShareYourLinkSection: React.FC<{
  referralLink: string;
  numReferrals: number;
}> = ({ referralLink, numReferrals }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <ReferralInfo referrals={numReferrals} link={referralLink} />

      <Divider />
      <BulletPoints
        icon={<InfoOutlined fontSize="small" color="info" />}
        title="How It Works"
        points={[
          `When a user clicks your referral link, they will be redirected to the website.`,
          `Earn ${TOKENS_PER_REFERRAL_ACCOUNT} tokens for each user that creates an account using your referral link.`,
          <>
            <Link href={routes.account.quests.path()}>Earn extra tokens</Link>{' '}
            when your referrals play games.
          </>,
          <>
            <Link href={routes.help.vip.path()}>VIP Members</Link> get a x2
            bonus to their referral earnings.
          </>,
        ]}
      />

      <PanelFooter
        learn={{ text: 'VIP Benefits', href: routes.help.vip.path() }}
        action={{
          text: 'Become a VIP',
          href: routes.vip.path(),
        }}
      />
    </Box>
  );
};
