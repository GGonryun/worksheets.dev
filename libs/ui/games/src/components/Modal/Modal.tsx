import { FC } from 'react';
import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  Paper,
} from '@mui/material';
import { borderRadius } from '../../util';

export type ModalProps = Pick<
  MuiModalProps,
  'open' | 'onClose' | 'children' | 'sx'
> & {
  dense?: boolean;
  maxWidth?: number;
  maxHeight?: number;
};

export const Modal: FC<ModalProps> = ({
  children,
  maxWidth,
  maxHeight,
  dense,
  sx,
  ...props
}) => {
  return (
    <MuiModal {...props}>
      <div>
        <Paper
          elevation={6}
          sx={{
            borderRadius,
            position: 'absolute',
            maxWidth: maxWidth ?? 450,
            maxHeight: maxHeight ?? 450,
            display: 'flex',
            height: dense ? undefined : '90%',
            width: dense ? undefined : '90%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'scroll',
            ...sx,
          }}
        >
          {children}
        </Paper>
      </div>
    </MuiModal>
  );
};
