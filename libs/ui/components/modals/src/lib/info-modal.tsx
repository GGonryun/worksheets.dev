import { Box } from '@mui/material';
import { PaletteColor, Theme } from '@worksheets/ui/theme';
import { forwardRef } from 'react';

import { CloseButton, InfoButton } from './buttons';
import { Modal, ModalProps } from './modal';

export const InfoModal = forwardRef<
  HTMLDivElement,
  ModalProps & {
    maxWidth?: number;
    infoHref?: string;
    gutter?: number;
    color?: PaletteColor;
    hideClose?: boolean;
    background?: (theme: Theme) => string;
  }
>(
  (
    {
      children,
      open,
      onClose,
      background,
      maxWidth = 550,
      infoHref,
      gutter = 2,
      color,
      hideClose = false,
    },
    ref
  ) => (
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
      <>
        <Box
          ref={ref}
          width="100%"
          height="100%"
          position="relative"
          sx={{
            overflow: 'scroll',
            p: gutter,
          }}
        >
          {children}
        </Box>
        {infoHref && <InfoButton href={infoHref} color={color} />}
        {!hideClose && <CloseButton onClick={onClose} color={color} />}
      </>
    </Modal>
  )
);
