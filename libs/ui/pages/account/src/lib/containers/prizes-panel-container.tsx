import { trpc } from '@worksheets/trpc-charity';
import { useBookmark } from '@worksheets/ui-core';
import { PrizesPanels } from '@worksheets/util/enums';
import { WonRaffleDetails } from '@worksheets/util/types';
import { useState } from 'react';

import { ClaimPrizeModal } from '../components/modals/claim-prize-modal';
import { RedemptionCodeModal } from '../components/modals/redemption-code-modal';
import { PrizesPanel } from '../components/prizes-panel/prizes-panel';

export const PrizesPanelContainer = () => {
  const bookmark = useBookmark<PrizesPanels>();

  const [openClaimPrizeModal, setOpenClaimPrizeModal] = useState(false);
  const [showRedemptionCodeModal, setShowRedemptionCodeModal] = useState(false);

  const [claiming, setClaiming] = useState<WonRaffleDetails | undefined>(
    undefined
  );
  const [code, setCode] = useState('');

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

    setCode(claimed.code);
    setShowRedemptionCodeModal(true);
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
      <RedemptionCodeModal
        open={showRedemptionCodeModal}
        onClose={() => {
          setCode('');
          setShowRedemptionCodeModal(false);
        }}
        prize={claiming}
        code={code}
      />
    </>
  );
};
