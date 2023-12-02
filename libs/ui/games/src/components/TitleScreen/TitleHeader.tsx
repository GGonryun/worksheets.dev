import { Settings } from '@mui/icons-material';
import { Flex } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { IconAction } from '../Buttons';
import { animate, assets, urls } from '../../util';
import { IconButton } from '@mui/material';
import Image from 'next/image';

export type TitleHeaderProps = {
  color?: string;
  onSettings: () => void;
};

export const TitleHeader: FC<TitleHeaderProps> = ({ color, onSettings }) => {
  return (
    <Flex fullWidth mx={'auto'} pt={2}>
      <Flex grow spaceBetween px={2}>
        <motion.div {...animate(100, 0.3)}>
          <IconButton
            size={'medium'}
            disableRipple
            href={urls.charityGames.home()}
          >
            <Image
              src={assets.charityGames.squareLogo}
              height={64}
              width={64}
              alt="charity-logo"
            />
          </IconButton>
        </motion.div>
        <motion.div {...animate(100, 0.3)}>
          <IconAction color={color} onClick={onSettings} Icon={Settings} />
        </motion.div>
      </Flex>
    </Flex>
  );
};
