import { AccountCircleOutlined, InfoOutlined } from '@mui/icons-material';
import { Box, Link } from '@mui/material';
import { ValentinesChat } from '@worksheets/icons/valentines';
import { TokensPanels } from '@worksheets/util/enums';
import {
  MAX_TOKENS_FROM_REFERRAL_PLAYS,
  TOKENS_PER_REFERRAL_ACCOUNT,
  TOKENS_PER_REFERRAL_PLAY,
  TOKENS_PER_REFERRAL_PURCHASE,
} from '@worksheets/util/settings';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { CollapsibleSection } from '../../collapsible-section';
import { PanelFooter } from '../../panel-footer';
import { ReferralInfo } from '../../referral-info';
import { ReferralProgress } from '../types';

export const InviteFriendsSection: React.FC<
  ReferralProgress & {
    id: TokensPanels;
    active: TokensPanels | undefined;
    onClick: (id: string) => void;
  }
> = ({ link, tokens, referrals, id, active, onClick }) => (
  <CollapsibleSection
    id={id}
    active={active}
    onClick={onClick}
    text="Invite Friends"
    description="Refer your friends and get extra tokens when they play our games."
    Icon={ValentinesChat}
    status={<AccountCircleOutlined color="primary" fontSize="large" />}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <ReferralInfo link={link} referrals={referrals} />

      <BulletPoints
        icon={<InfoOutlined fontSize="small" color="info" />}
        title="How It Works"
        points={[
          <>
            Earn {TOKENS_PER_REFERRAL_PLAY} token when someone{' '}
            <Link href="/play">plays a game</Link> using your referral link.
          </>,
          <>
            Your referrals can earn you up to {MAX_TOKENS_FROM_REFERRAL_PLAYS}{' '}
            tokens every day when they <Link href="/play">play games</Link> with
            your link.
          </>,
          <>
            Earn {TOKENS_PER_REFERRAL_ACCOUNT} tokens when someone makes an
            account using your referral link.
          </>,
          <>
            Earn {TOKENS_PER_REFERRAL_PURCHASE} tokens when someone spends money
            at the <Link href="/store">Charity Store</Link> using your referral
            link.
          </>,
          <>
            <Link href="/help/vip">VIP Members</Link> earn 2x tokens from
            referrals and have no daily limit.
          </>,
        ]}
      />

      <PanelFooter
        learn={{
          text: 'Referrals',
          href: '/help/referrals',
        }}
        action={{
          text: 'View Referrals',
          href: '/account/referrals',
        }}
      />
    </Box>
  </CollapsibleSection>
);
