import { Cancel } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { ReactNode } from 'react';

import { Modal, ModalWrapper } from './modal';

export const BasicModal: React.FC<ModalWrapper<{ children: ReactNode }>> = ({
  open,
  onClose,
  children,
}) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        minWidth: 300,
        width: '95%',
        maxWidth: 500,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          px: { xs: 2, sm: 4 },
          pt: 4,
          pb: { xs: 2, sm: 4 },
          width: '100%',
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
        <Column alignItems="center" gap={2} textAlign="center" width="100%">
          {children}
        </Column>
      </Box>
    </Modal>
  );
};
