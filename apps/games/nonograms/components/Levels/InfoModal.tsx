import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { Modal, TabletButton } from '@worksheets/ui-games';
import Image from 'next/image';
import { FC } from 'react';
import { boxShadow } from '../../util/styles';

export type InfoModalProps = {
  open: boolean;
  onClose: () => void;
};

export const InfoModal: FC<InfoModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ boxShadow: boxShadow }}>
      <Flex centered fill>
        <Flex column p={3} centered gap={2}>
          <Typography variant="h5" fontWeight={900} textAlign="center">
            Browse Available Levels
          </Typography>
          <Image
            src="/art/16x16/assorted/octopus.png"
            alt={'Worksheets Logo'}
            width={128}
            height={128}
          />
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Select a level to start playing. Complete levels to unlock new ones.
            Requirements are listed below each level. <br />
            <br />
            Completed levels are marked with a checkmark.
          </Typography>
          <TabletButton onClick={onClose}>
            <Typography variant="body2" px={3} py={0.5} fontWeight={900}>
              Got it!
            </Typography>
          </TabletButton>
        </Flex>
      </Flex>
    </Modal>
  );
};
