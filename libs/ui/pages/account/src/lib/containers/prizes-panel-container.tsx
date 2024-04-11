import { trpc } from '@worksheets/trpc-charity';
import { useBookmark } from '@worksheets/ui-core';
import { PrizesPanels } from '@worksheets/util/enums';
import { RaffleClaim, WonRaffleDetails } from '@worksheets/util/types';
import { useState } from 'react';

import { ClaimPrizeModal } from '../components/modals/claim-prize-modal';
import { RedemptionModal } from '../components/modals/redemption-modal';
import { PrizesPanel } from '../panels';

export const PrizesPanelContainer = () => {
  const bookmark = useBookmark<PrizesPanels>();

  const [openClaimPrizeModal, setOpenClaimPrizeModal] = useState(false);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);

  const [claiming, setClaiming] = useState<WonRaffleDetails | undefined>(
    undefined
  );
  const [claim, setClaim] = useState<RaffleClaim | undefined>();

  const { data: enteredRaffles } = trpc.user.raffles.entered.useQuery({
    activeOnly: false,
  });

  const { data: wonRaffles } = trpc.user.raffles.won.useQuery(undefined);

  const claimPrize = trpc.user.raffles.claim.useMutation();

  const handleStartClaim = async (prize: WonRaffleDetails) => {
    setClaiming(prize);

    if (prize.claimedAt) {
      await handleClaimPrize();
    } else {
      setOpenClaimPrizeModal(true);
    }
  };

  const handleClaimPrize = async () => {
    if (!claiming) {
      return;
    }

    const claimed = await claimPrize.mutateAsync({
      winnerId: claiming.winnerId,
    });

    setClaim(claimed);
    setShowRedemptionModal(true);
  };

  return (
    <>
      <PrizesPanel
        bookmark={bookmark}
        previous={enteredRaffles ?? []}
        prizes={wonRaffles ?? []}
        onClaim={handleStartClaim}
      />
      <ClaimPrizeModal
        open={openClaimPrizeModal}
        onClose={() => {
          setClaiming(undefined);
          setOpenClaimPrizeModal(false);
        }}
        prize={claiming}
        onClaim={async () => {
          await handleClaimPrize();
          setOpenClaimPrizeModal(false);
        }}
      />
      {claim && claiming && (
        <RedemptionModal
          open={showRedemptionModal}
          onClose={() => {
            setClaim(undefined);
            setShowRedemptionModal(false);
          }}
          prize={claiming}
          claim={claim}
        />
      )}
    </>
  );
};
