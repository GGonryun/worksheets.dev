import { Cancel } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';

export const EnterRaffleModal: React.FC<
  ModalWrapper<{
    onEnter: (entries: number) => void;
    costPerEntry: number;
    tokensOwned: number;
  }>
> = ({ open, onClose, onEnter, costPerEntry, tokensOwned }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleEnter = (entries: number) => {
    onEnter(entries);
  };

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
          <Typography>
            1 ticket = {costPerEntry} token{costPerEntry > 1 ? 's' : ''}
          </Typography>
          <Typography>5 tickets = {costPerEntry * 5} tokens</Typography>
          <Typography>10 tickets = {costPerEntry * 10} tokens</Typography>
        </Box>

        <Button
          disabled={tokensOwned < costPerEntry}
          onClick={() => handleEnter(1)}
          fullWidth
          size={isMobile ? 'small' : 'medium'}
          variant="arcade"
          color="error"
        >
          Raffle Ticket x1
        </Button>
        <Button
          disabled={tokensOwned < costPerEntry * 5}
          onClick={() => handleEnter(5)}
          fullWidth
          size={isMobile ? 'small' : 'medium'}
          variant="arcade"
          color="primary"
        >
          Raffle Ticket x5
        </Button>
        <Button
          disabled={tokensOwned < costPerEntry * 10}
          onClick={() => handleEnter(10)}
          fullWidth
          size={isMobile ? 'small' : 'medium'}
          variant="arcade"
          color="success"
        >
          Raffle Ticket x10
        </Button>
        <Button href="/help/tokens" sx={{ mt: 1 }}>
          Need more tokens?
        </Button>
      </Box>
    </BaseModal>
  );
};
