import { Typography, Divider, Link } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Modal, ModalHeader } from '../Modal';
import { urls } from '../../urls';
import { EnterDirectionally } from '../Animators';

type DonateWaterStatementModalProps = {
  onClose: () => void;
  open: boolean;
};

export const DonateWaterModal: FC<DonateWaterStatementModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2}>
        <EnterDirectionally delay={0.15}>
          <ModalHeader onClose={onClose}>Donate Water</ModalHeader>
        </EnterDirectionally>
        <Divider sx={{ backgroundColor: 'error.dark' }} />
        <ModalText />
      </Flex>
    </Modal>
  );
};

const ModalText = () => (
  <Flex column pt={2}>
    <EnterDirectionally delay={0.3}>
      <Typography fontFamily="sans-serif">
        More than <b>500 million people</b> in the world lack access to clean
        water. The majority of these people live in isolated rural areas and
        spend hours every day walking to collect water for their family. Not
        only does walking for water keep children out of school or take up time
        that parents could be using to earn money, but the water often carries
        diseases that can make everyone sick.
        <br />
        <br />
        Every time you play a game of Puzzle Words, you are helping to provide
        clean water to those in need. We donate <b>1 milliliter of water</b> for
        every word you find in the game. We work with the non-profit
        organization{' '}
        <Link href={urls.waterOrg()} target="_blank" rel="noreferrer">
          Water.org
        </Link>{' '}
        and{' '}
        <Link href={urls.charityWater()} target="_blank" rel="noreferrer">
          Charity: Water
        </Link>{' '}
        to help provide clean water to those in need.
        <br />
        <br />
        Help us reach our goal of donating <b>1 million liters of water</b> by
        playing Puzzle Words today!
      </Typography>
    </EnterDirectionally>
  </Flex>
);
