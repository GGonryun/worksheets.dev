import { Box, Button, Typography } from '@mui/material';
import { PrizeType } from '@worksheets/prisma';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { assertNever } from '@worksheets/util/errors';
import { WonRaffleDetails } from '@worksheets/util/types';

export const ClaimPrizeModal: React.FC<
  ModalWrapper<{ prize?: WonRaffleDetails; onClaim: () => void }>
> = ({ open, onClose, prize, onClaim }) => {
  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography variant="h4" color="success.main" pt={2}>
        Congratulations!
      </Typography>

      <Typography textAlign="center">
        You've won a {prize?.name ?? '??'}.
      </Typography>

      {prize && (
        <Box position="relative">
          <ResponsiveImage src={prize.imageUrl} alt={prize.name} />
        </Box>
      )}
      <Typography textAlign="center">
        {prize ? claimPrizeMessage(prize) : '...'}
      </Typography>

      <Button
        onClick={onClaim}
        fullWidth
        disabled={!prize || !canClaimPrize(prize)}
        variant="arcade"
        size="large"
        color="success"
      >
        Claim
      </Button>
    </BasicModal>
  );
};

const canClaimPrize = (prize: WonRaffleDetails) => {
  switch (prize.type) {
    case PrizeType.STEAM_KEY:
      // You're always allowed to access the prize code if it's available
      return true;
    case PrizeType.LOOT:
      return !prize.claimedAt;
    default:
      throw assertNever(prize.type);
  }
};
const claimPrizeMessage = (prize: WonRaffleDetails) => {
  if (prize.claimedAt) {
    switch (prize.type) {
      case PrizeType.STEAM_KEY:
        return 'Your prize has been claimed! Access your Steam Key again:';
      case PrizeType.LOOT:
        return 'Your loot has been claimed!';

      default:
        throw assertNever(prize.type);
    }
  } else {
    return pendingClaimMessage(prize.type);
  }
};

const pendingClaimMessage = (type: PrizeType) => {
  switch (type) {
    case PrizeType.LOOT:
      return 'Collect your loot!';
    case PrizeType.STEAM_KEY:
      return 'Access your Steam Key!';

    default:
      throw assertNever(type);
  }
};
