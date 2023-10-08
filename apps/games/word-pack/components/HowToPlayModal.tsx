import { Divider, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { Modal, ModalHeader, animate } from '@worksheets/ui-games';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

export const HowToPlayModal: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} maxHeight={500}>
      <Flex column fullWidth p={2}>
        <ModalHeader onClose={onClose} animationSpeed={0}>
          How to Play
        </ModalHeader>
        <Divider />
        <Flex column pt={2} gap={1} centered>
          <motion.div {...animate(-25, 0.15)}>
            <Typography variant="caption" color="error">
              This game is still in development. Please report any bugs you
              find.
            </Typography>
          </motion.div>
          <motion.div {...animate(-25, 0.3)}>
            <Typography variant="body2">
              Word Pack is a crossword puzzle game. Rearrange the words into the
              grid to complete the puzzle. Click on the grid to select a
              position. Then click on the word you want to place. You can also
              use your keyboard to type letters.
            </Typography>
          </motion.div>
          <motion.div {...animate(-50, 0.3)} style={{ paddingTop: '12px' }}>
            <Image
              src="/clips/tutorial.gif"
              width={200}
              height={200}
              alt="tutorial gif"
            />
          </motion.div>
        </Flex>
      </Flex>
    </Modal>
  );
};
