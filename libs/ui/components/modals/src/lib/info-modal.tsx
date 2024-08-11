import { Box } from '@mui/material';
import { PaletteColor, Theme } from '@worksheets/ui/theme';

import { CloseButton, InfoButton } from './buttons';
import { Modal, ModalProps } from './modal';

export const InfoModal: React.FC<
  ModalProps & {
    maxWidth?: number;
    infoHref?: string;
    gutter?: boolean;
    color?: PaletteColor;
    hideClose?: boolean;
    background?: (theme: Theme) => string;
  }
> = ({
  children,
  open,
  onClose,
  background,
  maxWidth = 550,
  infoHref,
  gutter = true,
  color,
  hideClose = false,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    sx={{
      background,
      maxHeight: '90%',
      width: '95%',
      maxWidth,
    }}
  >
    <Box width="100%" height="100%" position="relative">
      <Box width="100%" sx={{ p: gutter ? 2 : 0 }}>
        {children}
      </Box>
      {!hideClose && <CloseButton onClick={onClose} color={color} />}
      {infoHref && <InfoButton href={infoHref} color={color} />}
    </Box>
  </Modal>
);
