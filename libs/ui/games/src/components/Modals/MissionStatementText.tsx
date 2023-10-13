import { Typography, Link } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { GameTitle, animate, urls } from '../../util';
import {
  WaterOrgLink,
  WorksheetsLink,
  ContactLink,
  FullStoryLink,
} from '../Links';

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
        <b>{game}</b> is a free, open-source, and ad-free game that helps you
        learn and improve your vocabulary. This game is designed to be played by
        anyone, anywhere, and at any time from your mobile device or computer.
        <br />
        <br />
        <b>{game}</b> is used to bring awareness for the millions of people
        around the world without access to clean water. All proceeds from the
        game are donated to <WaterOrgLink />.
        <br />
        <br />
        If you would like to make a direct donation to support the cause, please
        visit <WaterOrgLink /> and donate to them directly.
        <br />
        <br />
        <WorksheetsLink /> is a collection of free, open-source, and ad-free
        educational games and software services. We are committed to utilizing
        software services for charitable and public welfare purposes. If you
        have a game or software you would like to contribute, please{' '}
        <ContactLink>contact us</ContactLink>.
        <br />
        <br />
        The game is built with <FullStoryLink />, Next.js, and React. Source
        code is available <Link href={urls.contact()}>upon request.</Link>
      </Typography>
    </motion.div>
  </Flex>
);
