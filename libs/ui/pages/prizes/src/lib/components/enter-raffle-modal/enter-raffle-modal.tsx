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
  ModalWrapper<{ onEnter: (entries: number) => void; tokens: number }>
> = ({ open, onClose, onEnter, tokens }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleEnter = (entries: number) => {
    onEnter(entries);
    handleClose();
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

        <Typography variant={isMobile ? 'body2' : 'body1'}>
          How many raffle tickets would you like to purchase?
        </Typography>
        <Box my={2}>
          <Typography fontWeight={700}>
            1 ticket = {tokens} token{tokens > 1 ? 's' : ''}
          </Typography>
          <Typography fontWeight={700}>
            5 tickets = {tokens * 5} tokens
          </Typography>
          <Typography fontWeight={700}>
            10 tickets = {tokens * 10} tokens
          </Typography>
        </Box>

        <Button
          onClick={() => handleEnter(1)}
          fullWidth
          size={isMobile ? 'small' : 'medium'}
          variant="arcade"
          color="error"
        >
          Raffle Ticket x1
        </Button>
        <Button
          onClick={() => handleEnter(5)}
          fullWidth
          size={isMobile ? 'small' : 'medium'}
          variant="arcade"
          color="primary"
        >
          Raffle Ticket x5
        </Button>
        <Button
          onClick={() => handleEnter(5)}
          fullWidth
          size={isMobile ? 'small' : 'medium'}
          variant="arcade"
          color="success"
        >
          Raffle Ticket x10
        </Button>
      </Box>
    </BaseModal>
  );
};
