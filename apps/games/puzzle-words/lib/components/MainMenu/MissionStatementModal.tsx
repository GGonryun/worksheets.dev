import { Typography, Divider, Link } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Modal, ModalHeader } from '../Modal';
import { urls } from '../../urls';
import { EnterDirectionally } from '../Animators';
import {
  CharityWaterLink,
  ContactLink,
  FreeRiceLink,
  FullStoryLink,
  WaterOrgLink,
  WorksheetsLink,
} from '../Links';

type MissionStatementModalProps = {
  onClose: () => void;
  open: boolean;
};

export const MissionStatementModal: FC<MissionStatementModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column fill>
        <EnterDirectionally delay={0.15}>
          <ModalHeader onClose={onClose}>Our Mission</ModalHeader>
        </EnterDirectionally>
        <Divider sx={{ backgroundColor: 'error.dark' }} />
        <MissionText />
      </Flex>
    </Modal>
  );
};

const MissionText = () => (
  <Flex column fullWidth p={2} sx={{ overflowY: 'auto', flex: 1, gap: 2 }}>
    <EnterDirectionally delay={0.3}>
      <Typography fontFamily="sans-serif">
        <b>Puzzle Words</b> is a free, open-source, and ad-free game that helps
        you learn and improve your vocabulary. This game is designed to be
        played by anyone, anywhere, and at any time from your mobile device or
        computer.
        <br />
        <br />
        This game is used to bring awareness for the millions of people around
        the world without access to clean water. All proceeds from the game are
        donated to <CharityWaterLink /> and <WaterOrgLink />
        . We were inspired by similar games such as <FreeRiceLink /> and wanted
        to create a similar game without the ads.
        <br />
        <br />
        If you would like to make a direct donation to support the cause, please
        visit{' '}
        <Link href={urls.charityWater()} target="_blank" rel="noreferrer">
          Charity: Water
        </Link>{' '}
        and{' '}
        <Link href={urls.waterOrg()} target="_blank" rel="noreferrer">
          Water.org
        </Link>{' '}
        and donate to them directly.
        <br />
        <br />
        <WorksheetsLink /> is a collection of free, open-source, and ad-free
        educational games and software services. <WorksheetsLink /> is committed
        to utilizing software services for charitable and public welfare
        purposes. If you have a game or software you would like to contribute,
        please <ContactLink>contact us</ContactLink>.
        <br />
        <br />
        The game is built with <FullStoryLink />, Next.js, and Framer Motion.
        Source code is available{' '}
        <Link href={urls.contact()}>upon request.</Link>
      </Typography>
    </EnterDirectionally>
  </Flex>
);
