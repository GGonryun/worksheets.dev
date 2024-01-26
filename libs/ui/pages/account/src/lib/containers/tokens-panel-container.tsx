import { TRPCClientError } from '@trpc/client';
import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { ClaimGiftModal, TokensPanel } from '@worksheets/ui/pages/account';
import { ErrorComponent } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useBookmark } from '@worksheets/ui-core';
import { TokensPanels } from '@worksheets/util/enums';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';

export const TokensPanelContainer: React.FC<{ refreshTimestamp: number }> = ({
  refreshTimestamp,
}) => {
  const bookmark = useBookmark<TokensPanels>();
  const snackbar = useSnackbar();
  const session = useSession();
  const { recentlyPlayed } = useRecentlyPlayedGames();

  const enabled = session.status === 'authenticated';

  const claimDailyReward = trpc.user.rewards.dailyReward.claim.useMutation();
  const openGiftBox = trpc.user.rewards.giftBoxes.open.useMutation();

  const rewards = trpc.user.rewards.get.useQuery(undefined, {
    enabled,
    retry: false,
  });

  const [showClaimGiftBox, setShowClaimGiftBox] = React.useState(false);
  const [giftBoxTokens, setGiftBoxTokens] = React.useState(0);

  const handleClaimDailyReward = React.useCallback(async () => {
    try {
      await claimDailyReward.mutateAsync();
      await rewards.refetch();

      snackbar.trigger({
        message: 'You have claimed your daily reward',
        severity: 'success',
      });
    } catch (error) {
      if (error instanceof TRPCClientError) {
        snackbar.trigger({
          message: error.message,
          severity: 'error',
        });
      }
    }
  }, [claimDailyReward, rewards, snackbar]);

  const handleClaimGiftBox = useCallback(() => {
    openGiftBox
      .mutateAsync()
      .then((result) => {
        rewards.refetch();
        setGiftBoxTokens(result.tokensAwarded);
        setShowClaimGiftBox(true);
      })
      .catch((error) => {
        if (error instanceof TRPCClientError) {
          snackbar.trigger({
            message: error.message,
            severity: 'error',
          });
        } else {
          snackbar.trigger({
            message:
              'An unknown error occurred. Please try again, or contact us if the problem persists.',
            severity: 'error',
          });
        }
      });
  }, [rewards, snackbar, openGiftBox]);

  const handleCloseClaimGiftBox = useCallback(() => {
    setGiftBoxTokens(0);
    setShowClaimGiftBox(false);

    snackbar.trigger({
      message: "You've claimed your gift box!",
      severity: 'success',
    });
  }, [snackbar]);

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
    claimedDailyReward,
    bonusGames,
  } = rewards.data;

  return (
    <>
      <TokensPanel
        recentGames={recentlyPlayed}
        bonusGames={bonusGames}
        bookmark={bookmark}
        tokens={totalTokens}
        refreshTimestamp={refreshTimestamp}
        gameProgressTokens={gamePlayTokens}
        referralProgress={{
          referrals: numReferrals,
          tokens: referralTokens,
          link: referralLink,
        }}
        giftBoxes={giftBoxes}
        claimedDailyReward={claimedDailyReward}
        onClaimDailyReward={handleClaimDailyReward}
        onClaimGiftBox={handleClaimGiftBox}
      />
      <ClaimGiftModal
        open={showClaimGiftBox}
        onClose={handleCloseClaimGiftBox}
        amount={giftBoxTokens}
      />
      <Snackbar {...snackbar} />
    </>
  );
};
