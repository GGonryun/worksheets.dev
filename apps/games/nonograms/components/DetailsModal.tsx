import { Typography, Button } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { Modal, TabletButton } from '@worksheets/ui-games';
import { FC } from 'react';
import { findPuzzle } from '../puzzles';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import Image from 'next/image';
import { Cancel, RemoveRedEyeOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  boxShadow,
  flyDownAnimation,
  flyUpAnimation,
  growAnimation,
} from '../util/styles';
export type DetailsModalProps = {
  id: string;
  onClose: () => void;
  onView: () => void;
};

export const DetailsModal: FC<DetailsModalProps> = ({
  id,
  onClose,
  onView,
}) => {
  if (!id) return null;
  const puzzle = findPuzzle(id);
  return (
    <Modal open={Boolean(id)} onClose={onClose} sx={{ boxShadow: boxShadow }}>
      <Flex centered fill column overflow="hidden">
        <motion.div {...flyDownAnimation(0)}>
          <Typography fontWeight={900} variant="h6">
            {capitalizeFirstLetter(puzzle.name)}
          </Typography>
        </motion.div>
        <motion.div
          style={{
            border: '12px solid black',
            height: 200,
            width: 200,
          }}
          {...growAnimation(0)}
        >
          <Image
            src={puzzle.image}
            alt={puzzle.name}
            width={200}
            height={200}
          />
        </motion.div>
        <Flex column pt={2} centered gap={2}>
          <motion.div {...flyUpAnimation(0)}>
            <TabletButton
              onClick={onClose}
              startIcon={<Cancel sx={{ pb: '2px' }} />}
            >
              <Typography variant="h6">Cancel</Typography>
            </TabletButton>
          </motion.div>
          <motion.div {...flyUpAnimation(0.1)}>
            <Button
              startIcon={<RemoveRedEyeOutlined sx={{ pb: '2px' }} />}
              onClick={onView}
            >
              View Level
            </Button>
          </motion.div>
        </Flex>
      </Flex>
    </Modal>
  );
};
