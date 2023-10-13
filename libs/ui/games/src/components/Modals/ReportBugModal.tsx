import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { Modal, ModalHeader } from '../Modal';
import { animate } from '../../util';
import { ReportForm } from './ReportForm';

export const ReportBugModal: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2} grow>
        <ModalHeader onClose={onClose}>Report Problem</ModalHeader>
        <Divider sx={{ backgroundColor: 'primary.main', mb: 2 }} />
        <motion.div {...animate(0, 0.3)}>
          <ReportForm text={''} category={'bug'} onClose={onClose} />
        </motion.div>
      </Flex>
    </Modal>
  );
};
