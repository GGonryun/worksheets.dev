import { Cancel } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { routes } from '@worksheets/ui/routes';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';
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

  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');

  return (
    <BaseModal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
          p: { xs: 2, sm: 4 },
          minWidth: 240,
          maxWidth: 500,
        }}
      >
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            position: 'absolute',
            right: 6,
            top: 6,
          }}
        >
          <Cancel />
        </IconButton>
        <Typography variant={isMobile ? 'h5' : 'h4'} color="primary" pt={2}>
          Enter Raffle
        </Typography>

        <Typography>
          How many raffle tickets would you like to purchase?
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
      </Box>
    </BaseModal>
  );
};
