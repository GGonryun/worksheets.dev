import { FC, ReactNode } from 'react';
import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { IconButton } from './IconButton';
import { Close } from '@mui/icons-material';

export type ModalProps = Pick<MuiModalProps, 'open' | 'onClose' | 'children'>;

export const Modal: FC<ModalProps> = ({ children, ...props }) => {
  return (
    <MuiModal {...props}>
      <div>
        <Flex
          column
          position="absolute"
          width="90%"
          height="90%"
          maxWidth={450}
          maxHeight={450}
          sx={{
            bgcolor: 'background.paper',
            border: '2px solid black',
            borderRadius: 5,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'scroll',
          }}
        >
          {children}
        </Flex>
      </div>
    </MuiModal>
  );
};

export type ModalHeaderProps = {
  children: ReactNode;
  onClose: () => void | MuiModalProps['onClose'];
  variant?: TypographyProps['variant'];
};
export const ModalHeader: FC<ModalHeaderProps> = ({
  variant = 'h4',
  children,
  onClose,
}) => (
  <Flex spaceBetween fullWidth pb={1}>
    <Typography variant={variant}>{children}</Typography>
    <IconButton onClick={onClose}>
      <Close />
    </IconButton>
  </Flex>
);
