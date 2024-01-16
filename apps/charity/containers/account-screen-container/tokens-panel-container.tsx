import { trpc } from '@worksheets/trpc-charity';
import { ClaimGiftModal, TokensPanel } from '@worksheets/ui/pages/account';
import { ErrorComponent } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { getNextUTCMidnight } from '@worksheets/util/time';
import { useSession } from 'next-auth/react';
import React from 'react';

export const TokensPanelContainer: React.FC = (props) => {
  const session = useSession();

  const enabled = session.status === 'authenticated';

  const rewards = trpc.user.rewards.get.useQuery(undefined, {
    enabled,
    retry: false,
  });

  const [showClaimGiftBox, setShowClaimGiftBox] = React.useState(false);
  const [giftBoxTokens, setGiftBoxTokens] = React.useState(0);

  const handleClaimDailyReward = React.useCallback(() => {
    alert('Claiming daily reward');
    alert("Show snackbar saying 'You've claimed your daily reward'");
  }, []);

  const handleClaimGiftBox = React.useCallback(() => {
    alert(
      'TODO: perform a network to claiming the gift box & set the amount of tokens for modal'
    );
    setGiftBoxTokens(123);
    setShowClaimGiftBox(true);
  }, []);

  const handleCloseClaimGiftBox = React.useCallback(() => {
    alert("TODO: show a snackbar saying 'You've claimed your gift box'");

    setGiftBoxTokens(0);
    setShowClaimGiftBox(false);
  }, []);

  if (rewards.isLoading) {
    return <LoadingScreen />;
  }
  if (rewards.error) {
    return <ErrorComponent />;
  }
  const {
    totalTokens,
    gamePlayTokens,
    referralTokens,
    numReferrals,
    referralLink,
    giftBoxes,
    dailyMomentum,
    claimedDailyReward,
  } = rewards.data;

  return (
    <>
      <TokensPanel
        tokens={totalTokens}
        refreshTimestamp={getNextUTCMidnight().getTime()}
        gameProgressTokens={gamePlayTokens}
        referralProgress={{
          referrals: numReferrals,
          tokens: referralTokens,
          link: referralLink,
        }}
        giftBoxes={giftBoxes}
        claimedDailyReward={claimedDailyReward}
        dailyGiftMomentum={dailyMomentum}
        onClaimDailyReward={handleClaimDailyReward}
        onClaimGiftBox={handleClaimGiftBox}
      />
      <ClaimGiftModal
        open={showClaimGiftBox}
        onClose={handleCloseClaimGiftBox}
        amount={giftBoxTokens}
      />
    </>
  );
};
