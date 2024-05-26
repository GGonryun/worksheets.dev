import { Box } from '@mui/material';

import { CloseButton, InfoButton } from './buttons';
import { Modal, ModalProps } from './modal';

export const InfoModal: React.FC<
  ModalProps & { infoHref?: string; gutter?: boolean }
> = ({ children, open, onClose, infoHref, gutter = true }) => (
  <Modal
    open={open}
    onClose={onClose}
    sx={{
      maxHeight: '90%',
      width: '95%',
      maxWidth: 550,
    }}
  >
    <Box width="100%" height="100%" position="relative">
      <Box width="100%" sx={{ p: gutter ? 2 : 0 }}>
        {children}
      </Box>
      <CloseButton onClick={onClose} />
      {infoHref && <InfoButton href={infoHref} />}
    </Box>
  </Modal>
);
