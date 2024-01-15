import { InfoOutlined, LinkOutlined } from '@mui/icons-material';
import { Box, Divider, Link } from '@mui/material';
import { ValentinesWorld } from '@worksheets/icons/valentines';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { CollapsibleSection } from '../../collapsible-section';
import { TOKENS_PER_REFERRAL_ACCOUNT } from '../../const';
import { PanelFooter } from '../../panel-footer';
import { ReferralInfo } from '../../referral-info';

export const ShareYourLinkSection: React.FC<{
  referralLink: string;
  numReferrals: number;
  tokensEarned: number;
}> = ({ referralLink, numReferrals, tokensEarned }) => {
  return (
    <CollapsibleSection
      text="Share Your Link"
      description="Get a copy of your link and share it with friends or on social media."
      status={<LinkOutlined fontSize="large" color="info" />}
      Icon={ValentinesWorld}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <ReferralInfo
          referrals={numReferrals}
          tokens={tokensEarned}
          link={referralLink}
        />

        <Divider />
        <BulletPoints
          icon={<InfoOutlined fontSize="small" color="info" />}
          title="How It Works"
          points={[
            `When a user clicks your referral link, they will be redirected to the website.`,
            `If a user does not make an account, you can still earn tokens as long as they don't clear their cache.`,
            `If they make an account, you will earn ${TOKENS_PER_REFERRAL_ACCOUNT} tokens.`,
            <>
              <Link href="/help/vip">VIP Members</Link> get a significant boost
              to their referral earnings.
            </>,
          ]}
        />

        <PanelFooter
          learn={{ text: 'VIP Benefits', href: '/help/vip' }}
          action={{
            text: 'Become a VIP',
            href: '/account/vip',
          }}
        />
      </Box>
    </CollapsibleSection>
  );
};
