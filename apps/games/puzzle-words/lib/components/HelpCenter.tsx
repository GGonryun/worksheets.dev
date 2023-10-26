import { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import {
  Extension,
  Park,
  Star,
  WaterDrop,
  Report,
  EmojiEvents,
} from '@mui/icons-material';
import { EnterDirectionally } from './Animators';
import {
  ContactLink,
  Modal,
  ModalHeader,
  WaterOrgLink,
} from '@worksheets/ui-games';

export const HelpCenter: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const iconStyles = { mb: '-2px', fontSize: 'inherit' };
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2}>
        <EnterDirectionally delay={0.0}>
          <ModalHeader onClose={onClose}>How to Play</ModalHeader>
        </EnterDirectionally>
        <Divider sx={{ backgroundColor: 'primary.main', mb: 1 }} />
        <EnterDirectionally delay={0.15}>
          <Typography fontFamily="sans-serif" variant="body2">
            Puzzle Words <Extension color="secondary" sx={iconStyles} /> is a
            word game that helps you learn and improve your vocabulary. The goal
            of the game is to find all the words in the puzzle. You can find
            words by swiping over the letters in the player circle.
            <br />
            <br />
            After you&apos;ve unlocked a word you can click on it to see the
            definition and pronunciation. Once you&apos;ve found all the words{' '}
            <EmojiEvents sx={{ ...iconStyles, color: '#FDCA40' }} /> in the
            puzzle, the current puzzle will automatically end and you will be
            taken to the next puzzle.
            <br />
            <br />
            Every letter you find will earn you points. Points can be used to
            buy hints or to unlock words. Click on the{' '}
            <Star color="warning" sx={iconStyles} /> icon to see the available
            hints.
            <br />
            <br />
            Some words are not shown in the puzzle. These are bonus words that
            can be found by swiping over the letters in the player circle. See a
            list of all the words you can find by clicking on the{' '}
            <Park color="success" sx={iconStyles} /> icon.
            <br />
            <br />
            If you have any questions or feedback, please{' '}
            <ContactLink>contact us</ContactLink> or submit an anonymous report
            by clicking on the <Report color="error" sx={iconStyles} /> icon.
          </Typography>
        </EnterDirectionally>
        <br />
        <br />
      </Flex>
    </Modal>
  );
};
