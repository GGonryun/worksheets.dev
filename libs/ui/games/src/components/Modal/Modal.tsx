import { FC } from 'react';
import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  Paper,
  Theme,
} from '@mui/material';
import { borderRadius } from '../../util';

export type ModalProps = Pick<MuiModalProps, 'open' | 'onClose' | 'children'>;

export const Modal: FC<ModalProps> = ({ children, ...props }) => {
  return (
    <MuiModal {...props}>
      <div>
        <Paper
          elevation={6}
          sx={{
            borderRadius,
            position: 'absolute',
            maxWidth: 450,
            maxHeight: 450,
            display: 'flex',
            height: '90%',
            width: '90%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'scroll',
          }}
        >
          {children}
        </Paper>
      </div>
    </MuiModal>
  );
};
