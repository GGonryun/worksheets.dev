import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  Paper,
  PaperProps,
  styled,
} from '@mui/material';
import { FC, JSXElementConstructor } from 'react';

export type ModalProps = Pick<
  MuiModalProps,
  'open' | 'onClose' | 'children' | 'sx'
>;

export type ModalWrapper<T> = Omit<ModalProps, 'children'> & T;

export const Modal: FC<ModalProps> = ({ children, sx, ...props }) => {
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
  maxHeight: '95vh',
  maxWidth: '95vw',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'scroll',
}));
