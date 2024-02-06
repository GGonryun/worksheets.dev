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

export const ConfirmEntryModal: React.FC<
  ModalWrapper<{
    onConfirm: () => void;
    costPerEntry: number;
    numEntries: number;
  }>
> = ({ open, onClose, onConfirm, costPerEntry, numEntries }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const total = costPerEntry * numEntries;

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
          You are about to spend{' '}
          <b>
            {total} token{total > 1 ? 's' : ''}
          </b>{' '}
          for{' '}
          <b>
            {numEntries} raffle ticket
            {numEntries > 1 ? 's' : ''}
          </b>
          !
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
