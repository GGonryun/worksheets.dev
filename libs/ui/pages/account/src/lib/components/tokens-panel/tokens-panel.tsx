import { FavoriteBorder } from '@mui/icons-material';
import { Box, Divider, Link, Typography } from '@mui/material';
import { ValentinesTicket } from '@worksheets/icons/valentines';
import { TokensPanels } from '@worksheets/util/enums';
import { BasicGameDetails } from '@worksheets/util/types';
import { FC } from 'react';

import { usePanelController } from '../hooks/use-panel-controller';
import { useTimeUntil } from '../hooks/use-time-until';
import { PanelFooter } from '../panel-footer';
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
  bookmark: TokensPanels | undefined;
  tokens: number;
  refreshTimestamp: number;
  gameProgressTokens: number;
  referralProgress: ReferralProgress;
  giftBoxes: number;
  claimedDailyReward: boolean;
  bonusGames: BasicGameDetails[];
  onClaimDailyReward: () => void;
  onClaimGiftBox: () => void;
}> = ({
  bookmark,
  tokens,
  refreshTimestamp,
  gameProgressTokens,
  giftBoxes,
  referralProgress,
  claimedDailyReward,
  bonusGames,
  onClaimGiftBox,
  onClaimDailyReward,
}) => {
  const { active, toggleActive } = usePanelController(bookmark);

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

      <PlayGamesSection
        bonusGames={bonusGames}
        id={TokensPanels.PlayGames}
        active={active}
        onClick={toggleActive}
        tokens={gameProgressTokens}
      />

      <DailyRewardSection
        id={TokensPanels.DailyReward}
        active={active}
        onClick={toggleActive}
        claimed={claimedDailyReward}
        timeRemaining={timeRemaining}
        onClaim={onClaimDailyReward}
      />

      <GiftBoxSection
        id={TokensPanels.GiftBoxes}
        active={active}
        onClick={toggleActive}
        amount={giftBoxes}
        onClaim={onClaimGiftBox}
      />

      <InviteFriendsSection
        id={TokensPanels.InviteFriends}
        active={active}
        onClick={toggleActive}
        {...referralProgress}
      />

      <Divider sx={{ mt: 1 }} />
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          mt: 1,
        }}
      >
        <FavoriteBorder fontSize="small" color="primary" />
        <Typography>
          Redeem tokens for real world rewards at the{' '}
          <Link href="/prizes">prize wall</Link> or use them to{' '}
          <Link href="/raffles">enter raffles</Link>.
        </Typography>
      </Box>

      <PanelFooter
        learn={{
          href: '/help/prizes',
          text: 'Rewards',
        }}
      />
    </Box>
  );
};
