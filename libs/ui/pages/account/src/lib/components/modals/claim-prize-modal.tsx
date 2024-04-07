import { Box, Button, Typography } from '@mui/material';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
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
        You've won a copy of {prize?.name ?? '??'}.
      </Typography>

      {prize && (
        <Box position="relative" height={150}>
          <ResponsiveImage src={prize.imageUrl} alt={prize.name} />
        </Box>
      )}
      <Typography textAlign="center">
        Claim your prize and access the activation code!
      </Typography>

      <Button
        onClick={onClaim}
        fullWidth
        variant="arcade"
        size="large"
        color="success"
      >
        Claim
      </Button>
    </BasicModal>
  );
};
