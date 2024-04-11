import { Box, Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { HelpPrizesQuestions } from '@worksheets/util/enums';
import {
  RaffleClaim,
  SteamKeyRaffleClaim,
  WonRaffleDetails,
} from '@worksheets/util/types';
import Image from 'next/image';

export const RedemptionModal: React.FC<
  ModalWrapper<{
    prize: WonRaffleDetails;
    claim: RaffleClaim;
  }>
> = ({ open, onClose, prize, claim }) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  return (
    <BasicModal open={open} onClose={onClose}>
      {claim.type === 'STEAM_KEY' ? (
        <ActivationCodeClaim
          claim={claim}
          onClose={handleClose}
          prize={prize}
        />
      ) : (
        <LootClaim prize={prize} onClose={handleClose} />
      )}
      <Button
        href={routes.help.prizes.path({
          bookmark: HelpPrizesQuestions.HowToClaim,
        })}
      >
        Need Help?
      </Button>
    </BasicModal>
  );
};

const ActivationCodeClaim: React.FC<{
  prize: WonRaffleDetails;
  claim: SteamKeyRaffleClaim;
  onClose: () => void;
}> = ({ prize, claim, onClose }) => {
  return (
    <>
      <Typography variant="h4" color="secondary.main" pt={2}>
        Redeem Your Prize on Steam
      </Typography>

      {prize && (
        <Image height={164} width={164} src={prize.imageUrl} alt={prize.name} />
      )}

      <Typography textAlign="center">
        Use the code below to access your copy of <b>{prize?.name}</b>.
      </Typography>

      <Box my={1}>
        {claim && <ClipboardText label="Redemption Code" text={claim.code} />}
      </Box>

      <Button
        onClick={onClose}
        fullWidth
        variant="arcade"
        size="large"
        color="secondary"
      >
        Close
      </Button>
    </>
  );
};

const LootClaim = ({
  prize,
  onClose,
}: {
  prize: WonRaffleDetails;
  onClose: () => void;
}) => {
  return (
    <>
      <Typography variant="h4" color="secondary.main" pt={2}>
        You found some loot from a raffle!
      </Typography>

      {prize && (
        <Image height={164} width={164} src={prize.imageUrl} alt={prize.name} />
      )}

      <Typography textAlign="center">
        We've added the prize to your account. Enjoy!
      </Typography>

      {/* TODO: add a link to redirect users to their inventory */}

      <Button
        sx={{ mt: 2 }}
        onClick={onClose}
        fullWidth
        variant="arcade"
        size="large"
        color="secondary"
      >
        Close
      </Button>
    </>
  );
};
