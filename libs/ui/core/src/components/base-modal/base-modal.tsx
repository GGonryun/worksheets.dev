import { FC, JSXElementConstructor } from 'react';
import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  Paper,
  PaperProps,
  styled,
} from '@mui/material';

export type BaseModalProps = Pick<
  MuiModalProps,
  'open' | 'onClose' | 'children' | 'sx'
>;

export type ModalWrapper<T> = Omit<BaseModalProps, 'children'> & T;

export const BaseModal: FC<BaseModalProps> = ({ children, sx, ...props }) => {
  return (
    <MuiModal {...props}>
      <div>
        <CustomPaper sx={sx}>{children}</CustomPaper>
      </div>
    </MuiModal>
  );
};

const CustomPaper = styled<JSXElementConstructor<PaperProps>>((props) => (
  <Paper elevation={6} {...props} />
))(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 4,
  position: 'absolute',
  display: 'flex',
  maxHeight: '90vh',
  maxWidth: '90vw',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'scroll',
}));
