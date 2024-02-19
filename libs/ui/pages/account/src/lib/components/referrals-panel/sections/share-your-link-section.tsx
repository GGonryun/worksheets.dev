import { InfoOutlined } from '@mui/icons-material';
import { Box, Divider, Link } from '@mui/material';
import { routes } from '@worksheets/ui/routes';
import { TOKENS_PER_REFERRAL_ACCOUNT } from '@worksheets/util/settings';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';
import { ReferralInfo } from '../../referral-info';

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
          `If a user does not make an account, you can still earn tokens as long as they don't clear their cache.`,
          `If they make an account, you will earn ${TOKENS_PER_REFERRAL_ACCOUNT} tokens.`,
          <>
            <Link href={routes.help.vip.path()}>VIP Members</Link> get a
            significant boost to their referral earnings.
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
