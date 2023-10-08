import { Close } from '@mui/icons-material';
import {
  IconButton,
  ModalProps as MuiModalProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { ReactNode, FC } from 'react';
import { animate } from '../../util';
export type ModalHeaderProps = {
  children: ReactNode;
  onClose: () => void | MuiModalProps['onClose'];
  variant?: TypographyProps['variant'];
  animationSpeed?: number;
};
export const ModalHeader: FC<ModalHeaderProps> = ({
  variant = 'h4',
  children,
  onClose,
  animationSpeed = 0.3,
}) => (
  <Flex spaceBetween fullWidth pb={1}>
    <motion.div {...animate(-50, animationSpeed)}>
      <Typography variant={variant}>{children}</Typography>
    </motion.div>
    <IconButton size="small" onClick={onClose}>
      <Close fontSize="large" />
    </IconButton>
  </Flex>
);
