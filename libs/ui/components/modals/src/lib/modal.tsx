import {
  Box,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  Paper,
} from '@mui/material';
import { forwardRef } from 'react';

export type ModalProps = Pick<
  MuiModalProps,
  'open' | 'onClose' | 'children' | 'sx'
>;

export type OnClose = MuiModalProps['onClose'];

// eslint-disable-next-line @typescript-eslint/ban-types
export type ModalWrapper<T = {}> = Omit<ModalProps, 'children'> & T;

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <MuiModal {...props}>
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            maxHeight: '95vh',
            maxWidth: '95vw',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
            ...sx,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              borderRadius: (theme) => theme.shape.borderRadius,
              display: 'flex',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
            }}
            ref={ref}
          >
            {children}
          </Paper>
        </Box>
      </MuiModal>
    );
  }
);
