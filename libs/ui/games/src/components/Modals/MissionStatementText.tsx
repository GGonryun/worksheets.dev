import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { GameTitle, animate } from '../../util';
import { ContactLink, CharityGamesLink } from '../Links';

export type MissionStatementTextProps = {
  game: GameTitle;
  animationDelay?: number;
};
export const MissionStatementText: FC<MissionStatementTextProps> = ({
  game,
  animationDelay = 0.5,
}) => (
  <Flex column pt={1} pb={2}>
    <motion.div {...animate(-50, animationDelay)}>
      <Typography fontFamily="sans-serif">
        <b>{game}</b> is a free, open-source, and ad-free game. This game is
        designed to be played by anyone, anywhere, and at any time from your
        mobile device or computer.
        <br />
        <br />
        <b>{game}</b> is used to bring awareness for different charitable
        organizations.
        <br />
        <br />
        <CharityGamesLink /> is a collection of free browser-based games and
        software services. We are committed to utilizing software services for
        charitable and public welfare purposes. If you have a game or software
        you would like to contribute, please{' '}
        <ContactLink>contact us</ContactLink>.
      </Typography>
    </motion.div>
  </Flex>
);
