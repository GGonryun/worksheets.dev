import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
import { routes } from '@worksheets/routes';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { RAFFLE_ENTRY_FEE } from '@worksheets/util/settings';

export const EnterRaffleModal: React.FC<
  ModalWrapper<{
    onEnter: () => void;
    tokensOwned: number;
  }>
> = ({ open, onClose, onEnter, tokensOwned }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography variant={isMobile ? 'h5' : 'h4'} color="primary" pt={2}>
        Enter Raffle
      </Typography>

      <Typography fontWeight={700}>You own {tokensOwned} tokens</Typography>
      <Box mb={2}>
        <Typography>1 entry = {RAFFLE_ENTRY_FEE} tokens</Typography>
      </Box>

      <Button
        disabled={tokensOwned < RAFFLE_ENTRY_FEE}
        onClick={onEnter}
        fullWidth
        size={isMobile ? 'small' : 'medium'}
        variant="arcade"
        color="error"
      >
        Enter Raffle
      </Button>

      <Button href={routes.help.tokens.path()} sx={{ mt: 1 }}>
        Need more tokens?
      </Button>
    </BasicModal>
  );
};
