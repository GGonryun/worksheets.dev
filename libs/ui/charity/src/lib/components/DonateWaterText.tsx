import { motion } from 'framer-motion';
import { animateY, urls } from '../utils';
import { Flex } from '@worksheets/ui-core';
import { Link, Typography } from '@mui/material';
import { FC } from 'react';

export type DonateWaterTextProps = {
  game: 'Word Search' | 'Puzzle Words';
};
export const DonateWaterText: FC<DonateWaterTextProps> = ({ game }) => (
  <Flex column pt={2}>
    <motion.div {...animateY(-50, 0.5)}>
      <Typography fontFamily="sans-serif">
        More than <b>500 million people</b> in the world lack access to clean
        water. The majority of these people live in isolated rural areas and
        spend hours every day walking to collect water for their family. Not
        only does walking for water keep children out of school or take up time
        that parents could be using to earn money, but the water often carries
        diseases that can make everyone sick.
        <br />
        <br />
        Every time you play <b>{game}</b>, you are helping to provide clean
        water to those in need. We work with the non-profit organization{' '}
        <Link href={urls.waterOrg()} target="_blank" rel="noreferrer">
          Water.org
        </Link>{' '}
        to help provide clean water to those in need.
        <br />
        <br />
        Help us reach our goal of donating <u>1 million liters</u> of water by
        playing <b>{game}</b> today!
      </Typography>
    </motion.div>
  </Flex>
);
