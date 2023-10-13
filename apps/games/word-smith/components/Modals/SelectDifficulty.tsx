import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Modal, borderRadius } from '@worksheets/ui-games';
import { Difficulty, urls } from '../../util';
import { useRouter } from 'next/router';
import { Button, capitalize } from '@mui/material';

export const SelectDifficultyModal: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { push } = useRouter();

  const handleStart = (difficulty: Difficulty) => {
    push(urls.puzzle(difficulty));
  };

  const buttonProps = (difficulty: Difficulty) => ({
    variant: 'contained' as const,
    onClick: () => handleStart(difficulty),
    children: capitalize(difficulty),
    sx: { textTransform: 'none', fontSize: 18, borderRadius: borderRadius },
  });
  return (
    <Modal open={open} onClose={onClose} maxHeight={300} maxWidth={250}>
      <Flex column p={3} grow gap={1} justifyContent={'space-evenly'}>
        <Button {...buttonProps('easy')} />
        <Button {...buttonProps('medium')} />
        <Button {...buttonProps('hard')} />
        <Button {...buttonProps('extreme')} />
      </Flex>
    </Modal>
  );
};
