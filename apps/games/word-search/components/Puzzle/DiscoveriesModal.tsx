import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Divider, Link, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Modal, ModalHeader, animate } from '@worksheets/ui-games';
import { Star } from '@mui/icons-material';
import { bonusYellow } from '../../util';

export const DiscoveriesModal: FC<{
  open: boolean;
  onClose: () => void;
  discoveries: Record<string, number>;
}> = ({ open, onClose, discoveries }) => {
  const words = Object.keys(discoveries);
  // sort by length, then by order of discovery
  words.sort((a, b) => {
    if (a.length === b.length) {
      return discoveries[a] - discoveries[b];
    }
    return b.length - a.length;
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2} grow>
        <ModalHeader onClose={onClose} variant="h4">
          Bonus Words
        </ModalHeader>
        <Divider sx={{ backgroundColor: 'primary.main', mb: 2 }} />
        <motion.div {...animate(0, 0.3)}>
          <Flex column gap={1}>
            {words.map((word) => (
              <Flex key={word} spaceBetween>
                <Flex gap={0.5}>
                  <Star sx={{ color: bonusYellow }} />
                  <Typography>
                    <b>
                      <Link color="inherit">{word}</Link>
                    </b>
                  </Typography>
                </Flex>
                {word.length}
              </Flex>
            ))}
          </Flex>
        </motion.div>
      </Flex>
    </Modal>
  );
};
