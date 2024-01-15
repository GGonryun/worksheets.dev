import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Divider, Link, Typography } from '@mui/material';
import { ValentinesTicket } from '@worksheets/icons/valentines';
import { FC } from 'react';

import { useTimeUntil } from '../__hooks__/use-time-until';
import { PanelHeader } from '../panel-header';
import { RewardsTimer } from '../rewards-timer';
import {
  DailyRewardSection,
  GiftBoxSection,
  InviteFriendsSection,
  PlayGamesSection,
} from './sections';
import { ReferralProgress } from './types';

export const TokensPanel: FC<{
  tokens: number;
  refreshTimestamp: number;
  gameProgressTokens: number;
  referralProgress: ReferralProgress;
  giftBoxes: number;
  claimedDailyGift: boolean;
  dailyGiftMomentum: number;
  onClaimDailyGift: () => void;
  onClaimGiftBox: () => void;
}> = ({
  tokens,
  refreshTimestamp,
  gameProgressTokens,
  giftBoxes,
  referralProgress,
  dailyGiftMomentum,
  claimedDailyGift,
  onClaimGiftBox,
  onClaimDailyGift,
}) => {
  const timeRemaining = useTimeUntil(refreshTimestamp);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <PanelHeader
        primary="Tokens"
        secondary={`${tokens} tokens`}
        icon={<ValentinesTicket fontSize="large" />}
      />

      <Divider />

      <RewardsTimer timeRemaining={timeRemaining} />

      <PlayGamesSection tokens={gameProgressTokens} />

      <DailyRewardSection
        momentum={dailyGiftMomentum}
        claimed={claimedDailyGift}
        timeRemaining={timeRemaining}
        onClaim={onClaimDailyGift}
      />

      <GiftBoxSection amount={giftBoxes} onClaim={onClaimGiftBox} />

      <InviteFriendsSection {...referralProgress} />

      <Divider sx={{ mt: 1 }} />
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          mt: 1,
        }}
      >
        <InfoOutlinedIcon fontSize="small" color="primary" />
        <Typography>
          Redeem tokens for real world rewards at the{' '}
          <Link href="/prizes">prize wall</Link> or at the{' '}
          <Link href="/auctions">auction house</Link>.
        </Typography>
      </Box>
      <Typography variant="body3" color="text.secondary" mt={1}>
        Learn more about tokens and rewards in the{' '}
        <Link href="/help/tokens">Help Center</Link>.
      </Typography>
    </Box>
  );
};
