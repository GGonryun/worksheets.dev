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
import { RAFFLE_ENTRY_FEE } from '@worksheets/util/settings';

export const ConfirmEntryModal: React.FC<
  ModalWrapper<{
    onConfirm: () => void;
  }>
> = ({ open, onClose, onConfirm }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');
  const handleConfirm = () => {
    onConfirm();
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
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          color="success.main"
          pt={2}
        >
          Confirm Entry
        </Typography>

        <Typography variant={isMobile ? 'body2' : 'body1'}>
          You are about to spend <b>{RAFFLE_ENTRY_FEE} tokens</b> for{' '}
          <b>1 raffle entry</b>!
        </Typography>

        <Button
          onClick={handleConfirm}
          fullWidth
          size={isMobile ? 'small' : 'medium'}
          variant="arcade"
          color="success"
          sx={{ mt: 2 }}
        >
          Continue
        </Button>
      </Box>
    </BaseModal>
  );
};
