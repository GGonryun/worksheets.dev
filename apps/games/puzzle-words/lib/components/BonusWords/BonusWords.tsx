import { FC } from 'react';
import { Discovered } from '../../types';
import { Modal } from '../Modal';
import { Flex } from '@worksheets/ui-core';
import { Divider } from '@mui/material';
import { WordList } from '../WordList';
import { Header } from './Header';

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
      <Flex column gap={1}>
        <Header words={bonuses} onClose={onClose} />
        <Divider sx={{ backgroundColor: 'error.dark' }} />
        <WordList words={bonuses} defineWord={onDefine} />
      </Flex>
    </Modal>
  );
};
