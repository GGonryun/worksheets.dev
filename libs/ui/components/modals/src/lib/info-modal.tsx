import { Box } from '@mui/material';
import { PaletteColor } from '@worksheets/ui/theme';

import { CloseButton, InfoButton } from './buttons';
import { Modal, ModalProps } from './modal';

export const InfoModal: React.FC<
  ModalProps & { infoHref?: string; gutter?: boolean; color?: PaletteColor }
> = ({ children, open, onClose, infoHref, gutter = true, color }) => (
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
      <CloseButton onClick={onClose} color={color} />
      {infoHref && <InfoButton href={infoHref} color={color} />}
    </Box>
  </Modal>
);
