import { Box } from '@mui/material';

import { CloseButton, InfoButton } from './buttons';
import { Modal, ModalProps } from './modal';

export const InfoModal: React.FC<ModalProps & { infoHref?: string }> = ({
  children,
  open,
  onClose,
  infoHref,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    sx={{
      width: '95%',
      maxWidth: 550,
    }}
  >
    <>
      <Box width="100%" sx={{ p: 2 }}>
        {children}
      </Box>
      {infoHref && <InfoButton href={infoHref} />}
      <CloseButton onClick={onClose} />
    </>
  </Modal>
);
