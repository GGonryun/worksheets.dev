import { Flex } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { animate, urls } from '../../util';
import { FC } from 'react';
import { MenuButton } from './MenuButton';

export type MainMenuFooterProps = {
  onShowMission: () => void;
};

export const MainMenuFooter: FC<MainMenuFooterProps> = ({ onShowMission }) => {
  const { push } = useRouter();
  return (
    <Flex fullWidth mx={'auto'} pb={2}>
      <Flex grow spaceBetween px={2}>
        <motion.div {...animate(-100, 0.3)}>
          <MenuButton onClick={() => push(urls.games())}>More Games</MenuButton>
        </motion.div>

        <motion.div {...animate(-100, 0.3)}>
          <MenuButton onClick={onShowMission}>Our Mission</MenuButton>
        </motion.div>
      </Flex>
    </Flex>
  );
};
