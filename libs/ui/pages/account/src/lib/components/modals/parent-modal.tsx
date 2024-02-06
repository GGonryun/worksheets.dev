import { Cancel } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';
import { ReactNode } from 'react';

export const ParentModal: React.FC<ModalWrapper<{ children: ReactNode }>> = ({
  open,
  onClose,
  children,
}) => {
  const handleClose = () => onClose && onClose({}, 'escapeKeyDown');

  return (
    <BaseModal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'relative',
          p: 4,
          minWidth: 300,
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </BaseModal>
  );
};
