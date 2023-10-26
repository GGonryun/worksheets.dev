import { FC } from 'react';
import { Discovered } from '../../types';
import { Flex } from '@worksheets/ui-core';
import { Divider } from '@mui/material';
import { WordList } from '../WordList';
import { Header } from './Header';
import { Modal } from '@worksheets/ui-games';

export type BonusWordsProps = {
  open?: boolean;
  onClose: () => void;
  onDefine: (word: string) => void;
  bonuses: Discovered;
};
export const BonusWords: FC<BonusWordsProps> = ({
  open,
  onClose,
  onDefine,
  bonuses,
}) => {
  return (
    <Modal open={open ?? false} onClose={onClose}>
      <Flex column gap={1} p={2} fullWidth>
        <Header words={bonuses} onClose={onClose} />
        <Divider sx={{ backgroundColor: 'primary.main' }} />
        <WordList words={bonuses} defineWord={onDefine} />
      </Flex>
    </Modal>
  );
};
