import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Discovered } from '../../../types';
import { TopSection } from './TopSection';
import { BottomSection } from './BottomSection';

export type FooterProps = {
  tokens: number;
  water: number;
  bonuses: Discovered;
  words: Discovered;
  openBonusWords: () => void;
  shuffleBuilder: () => void;
  openPowerUps: () => void;
  openSubmitReport: () => void;
};

export const Footer: FC<FooterProps> = (props) => {
  return (
    <Flex column fill position="relative">
      <TopSection {...props} />
      <BottomSection {...props} />
    </Flex>
  );
};
