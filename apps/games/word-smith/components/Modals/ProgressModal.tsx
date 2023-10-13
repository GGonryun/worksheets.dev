import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Divider, Link, Typography, capitalize } from '@mui/material';
import { motion } from 'framer-motion';
import { Modal, ModalHeader, animate } from '@worksheets/ui-games';
import { Star } from '@mui/icons-material';

export const ProgressModal: FC<{
  open: boolean;
  onClose: () => void;
  onDefine: (word: string) => void;
  discoveries: Record<string, number>;
}> = ({ open, onClose, onDefine, discoveries }) => {
  const words = Object.keys(discoveries);
  // sort by length, then by number of times discovered
  words.sort((a, b) => {
    if (a.length === b.length) {
      return discoveries[a] - discoveries[b];
    }
    return b.length - a.length;
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2} grow>
        <ModalHeader onClose={onClose} variant="h5">
          Discovered Words
        </ModalHeader>
        <Divider sx={{ backgroundColor: 'primary.main', mb: 2 }} />
        <motion.div {...animate(0, 0.3)}>
          <Flex column gap={1} pb={2}>
            {words.map((word) => (
              <Flex key={word} spaceBetween>
                <Flex gap={0.5}>
                  <Star sx={{ color: 'success.main' }} />
                  <Typography>
                    <b>
                      <Link
                        color="inherit"
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={() => onDefine(word)}
                      >
                        {capitalize(word)}
                      </Link>
                    </b>
                  </Typography>
                </Flex>
                {discoveries[word]}
              </Flex>
            ))}
          </Flex>
        </motion.div>
      </Flex>
    </Modal>
  );
};
