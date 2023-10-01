import { VolumeUp, Close } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { maskWord } from '../../utility';
import { IconButton } from '../IconButton';

export const Header: FC<{
  word: string;
  pronounciation: string;
  discovered: number;
  audio?: string;
  onClose: () => void;
}> = ({ onClose, audio, word, pronounciation, discovered }) => {
  const playAudio = () => {
    if (!audio) return;
    new Audio(audio).play();
  };
  return (
    <Flex spaceBetween fullWidth pb={1}>
      <Flex gap={1}>
        <Typography fontSize={32}>{maskWord(word, !discovered)}</Typography>-{' '}
        <Typography>{maskWord(pronounciation, !discovered)}</Typography>
        {audio && (
          <>
            -
            <IconButton size="small" onClick={playAudio}>
              <VolumeUp fontSize="small" />
            </IconButton>
          </>
        )}
      </Flex>
      <IconButton size="small" onClick={onClose}>
        <Close fontSize="small" />
      </IconButton>
    </Flex>
  );
};
